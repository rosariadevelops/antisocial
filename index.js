// MIDDLEWARE
const express = require("express");
const app = express();
const db = require("./db");
const bc = require("./bc");
const bodyParser = require("body-parser");
const s3 = require("./s3");
const multer = require("multer"); //npm package
const uidSafe = require("uid-safe"); //npm package
const path = require("path"); // core node module
const { s3Url } = require("./config");
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { sendEmail } = require("./ses");
const cryptoRandomString = require("crypto-random-string");

app.use(express.static("./public"));
app.use(express.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(
    cookieSession({
        secret: `something secret`,
        maxAge: 1000 * 60 * 60 * 24,
    })
);

app.use(csurf());
app.use(function (req, res, next) {
    //console.log("csurf token: ", req.csrfToken());
    res.cookie("mytoken", req.csrfToken());
    next();
});

// GET // REGISTRATION PAGE
app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// POST // REGISTRATION PAGE
app.post("/welcome", (req, res) => {
    const { first, last, email, password } = req.body;
    console.log("req.body: ", req.body);
    if (first === "" || last === "" || email === "" || password === "") {
        res.json({
            errorMsg: "Please make sure all input fields have been filled.",
            success: false,
        });
    } else {
        bc.hash(password)
            .then((password) => {
                const pword = password;
                console.log("req body password: ", pword);
                db.addUser(first, last, email, pword).then((result) => {
                    req.session.userId = result.rows[0].id;
                    console.log("user created");
                    console.log("req.session.userId: ", req.session.userId);
                    res.json({
                        success: true,
                    });
                });
            })
            .catch((err) => {
                console.log("err in hash: ", err);
            });
    }
});

// GET // LOGIN PAGE
app.get("/login", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// POST // LOGIN PAGE
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === "" || password === "") {
        res.json({
            errorMsg: "Please make sure all input fields have been filled.",
            success: false,
        });
    } else {
        db.checkEmail(email)
            .then((results) => {
                console.log("results: ", results.rows);
                if (
                    results.rows.length === 0 ||
                    results.rows[0].email === "" ||
                    results.rows[0].pword === ""
                ) {
                    console.log("entered login details are somewhat empty");
                    res.json({
                        errorMsg:
                            "The entered email or password are incorrect. Please try again",
                        success: false,
                    });
                } else {
                    bc.compare(password, results.rows[0].pword)
                        .then((result) => {
                            console.log("compare result:", result);
                            if (result) {
                                // console.log("result:", result);
                                const userId = results.rows[0].id;
                                //console.log("userId", userId);
                                req.session.userId = userId;
                                res.json({
                                    success: true,
                                });
                            } else {
                                res.json({
                                    errorMsg:
                                        "The entered email or password are incorrect. Please try again",
                                    success: false,
                                });
                            }
                        })
                        .catch((err) => {
                            console.log("err in compare: ", err);
                        });
                }
            })
            .catch((err) => {
                console.log("err in checkEmail: ", err);
            });
    }
});

// GET // PASSWORD RESET PAGE
app.get("/password/reset", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
        // console.log("is this rendering?");
    }
});

// POST // PASSWORD RESET START PAGE
app.post("/password/reset/start", (req, res) => {
    const { email } = req.body;

    if (email === "") {
        res.json({
            errorMsg:
                "Please make sure you have entered your registered email.",
            success: false,
        });
    } else {
        db.checkEmail(email)
            .then((result) => {
                console.log("checkEmail /pw/reset/start result: ", result);
                console.log("results: ", result.rows);
                const correctEmail = result.rows[0].email;
                const name = result.rows[0].firstname;
                if (result.rows.length === 0 || correctEmail === "") {
                    console.log("entered login details are somewhat empty");
                    res.json({
                        errorMsg:
                            "The entered email or password are incorrect. Please try again",
                        success: false,
                    });
                } else {
                    const secretCode = cryptoRandomString({
                        length: 6,
                    });
                    db.addPwReset(correctEmail, secretCode).then((r) => {
                        console.log("addPwReset r: ", r);
                        sendEmail(
                            correctEmail,
                            `${secretCode} is your Antisocial account recovery code`,
                            secretCode,
                            name
                        );
                        console.log("Email has been sent to: ", correctEmail);
                        console.log("Timestamp: ", r.rows[0].created_at);
                        res.json({
                            success: true,
                            timestamp: r.rows[0].created_at,
                        });
                    });
                    //
                }
            })
            .catch((err) =>
                console.log("err in checkEmail /password/reset/start: ", err)
            );
    }
});

// POST // PASSWORD RESET VERIFY PAGE
app.post("/password/reset/verify", (req, res) => {
    console.log("verify req.body: ", req.body);
    const { cryptocode, password, email } = req.body;

    if (cryptocode === "" || password === "") {
        res.json({
            errorMsg:
                "Please make sure you have entered your code and new password.",
            success: false,
        });
    } else {
        db.findPwReset(email)
            .then((result) => {
                console.log("cryptocode: ", cryptocode);
                console.log(
                    "findPwReset result.rows[0].code: ",
                    result.rows[0].code
                );
                if (cryptocode === result.rows[0].code) {
                    res.json({
                        success: true,
                    });
                } else {
                    res.json({
                        errorMsg:
                            "The code you entered is incorrect, please try again.",
                        success: false,
                    });
                }
            })
            .catch((err) => console.log("err in findPwReset: ", err));
    }
});

// GET // USER PAGE
app.get("/user", (req, res) => {
    console.log("/user req.body: ", req.body);
    console.log("/user req.session.userId: ", req.session.userId);
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        db.getUserInfo(req.session.userId)
            .then(({ rows }) => {
                res.sendFile(__dirname + "/index.html");
                console.log("/user response: ", rows);
                const { id, firstname, lastname, image_url, bio } = rows[0];
                res.json({
                    id,
                    firstname,
                    lastname,
                    image_url,
                    bio,
                });
            })
            .catch((err) => console.log("err in getUserInfo: ", err));
    }
});

// POST // USER PAGE UPLOAD CHANGE PROFILE PIC
app.post("/user/upload", uploader.single("file"), s3.upload, (req, res) => {
    const filename = req.file.filename;
    const url = `${s3Url}${filename}`;
    console.log("filename being passed: ", filename);
    console.log("url being passed: ", url);

    if (req.file) {
        db.updateProfPic(req.session.userId, url)
            .then(({ rows }) => {
                console.log("updatePic rows: ", rows);
                res.json({
                    image: rows[0].image_url,
                    success: true,
                });
            })
            .catch((err) => {
                console.log("err in addImage: ", err);
            });
    } else {
        res.json({
            errorMsg: "The image you uploaded is too large.",
            success: false,
        });
    }
});

// GET // PROFILE
app.get("/profile", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// POST // PROFILE CHANGE BIO
app.post("/profile/edit-bio", (req, res) => {
    //console.log("EDIT BIO REQ BODY: ", req.body);
    //console.log("EDIT BIO REQ BODY: ", req.body[0]);
    const bioInput = req.body[0];

    if (bioInput != null) {
        db.updateBio(req.session.userId, bioInput)
            .then(({ rows }) => {
                console.log("UPDATE BIO RESULT BIO: ", rows[0].bio);
                res.json({
                    newBio: rows[0].bio,
                    success: true,
                });
            })
            .catch((err) => {
                console.log("err in updateBio: ", err);
            });
    } else {
        res.json({
            errorMsg: "Please enter a bio message.",
            success: false,
        });
    }
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
