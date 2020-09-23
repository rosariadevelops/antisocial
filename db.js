const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL || "postgres:postgres:postgres@localhost:5432/anti"
);

module.exports.addUser = (first, last, email, pword) => {
    return db.query(
        `
        INSERT INTO users (firstname, lastname, email, pword)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
        [first, last, email, pword]
    );
};

module.exports.checkEmail = (email) => {
    return db.query(
        `
    SELECT * FROM users 
    WHERE email = ($1);`,
        [email]
    );
};
