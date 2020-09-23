// MIDDLEWARE
const express = require("express");
const app = express();
const db = require("./db");
const bc = require("./bc");
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

app.use(express.static("./public"));
app.use(express.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));

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
            error: "Please make sure all input fields have been filled.",
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
            error: "Please make sure all input fields have been filled.",
            success: false,
        });
    } else {
        db.checkEmail(email)
            .then((results) => {
                console.log("results: ", results.rows);
                if (results.rows.length === 0) {
                    console.log("result does not match any existing account");
                    res.json({
                        error:
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
                                console.log("userId", userId);
                                req.session.userId = userId;
                                res.json({
                                    success: true,
                                });
                            } else {
                                res.json({
                                    error:
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
