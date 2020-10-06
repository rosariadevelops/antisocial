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

module.exports.addPwReset = (email, code) => {
    return db.query(
        `
        INSERT INTO resetpassword (email, code)
        VALUES ($1, $2)
        RETURNING *`,
        [email, code]
    );
};

module.exports.findPwReset = (email) => {
    return db.query(
        `
    SELECT * FROM resetpassword 
    WHERE email = ($1)
    ORDER BY id DESC
    LIMIT 1;`,
        [email]
    );
};

module.exports.getUserInfo = (id) => {
    return db.query(
        `
    SELECT * FROM users 
    WHERE id = ($1);`,
        [id]
    );
};

module.exports.updateProfPic = (id, url) => {
    return db.query(
        `
        UPDATE users 
        SET image_url = ($2)
        WHERE id = ($1)
        RETURNING *;`,
        [id, url]
    );
};

module.exports.updateBio = (id, bio) => {
    return db.query(
        `
        UPDATE users 
        SET bio = ($2)
        WHERE id = ($1)
        RETURNING *;`,
        [id, bio]
    );
};

module.exports.getLatestUsers = () => {
    return db.query(
        `
    SELECT id, firstname, lastname, image_url FROM users 
    ORDER BY id DESC
    LIMIT 3;`
    );
};

module.exports.findPeople = (val) => {
    return db.query(
        `
    SELECT id, firstname, lastname, image_url FROM users 
    WHERE firstname ILIKE $1;`,
        [val + "%"]
    );
};

module.exports.selectFriendship = (recipientId, senderId) => {
    return db.query(
        `
    SELECT * FROM friendships 
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1);`,
        [recipientId, senderId]
    );
};

module.exports.insertFriendship = (senderId, recipientId) => {
    return db.query(
        `
        INSERT INTO friendships (sender_id, recipient_id, accepted)
        VALUES ($1, $2, false)
        RETURNING *
        `,
        [recipientId, senderId]
    );
};

module.exports.cancelFriendshipRequest = (senderId, recipientId) => {
    return db.query(
        `
        DELETE FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)
        RETURNING *;`,
        [senderId, recipientId]
    );
};

module.exports.acceptFriendshipRequest = (senderId, recipientId) => {
    return db.query(
        `
        UPDATE friendships 
        SET accepted = true
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)
        RETURNING *;`,
        [senderId, recipientId]
    );
};

module.exports.deleteFriendship = (senderId, recipientId) => {
    return db.query(
        `
        DELETE FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)
        RETURNING *;`,
        [senderId, recipientId]
    );
};

module.exports.getRelationship = (recipientId) => {
    return db.query(
        `
        SELECT users.id, firstname, lastname, image_url, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id);`,
        [recipientId]
    );
};

module.exports.getLastTenMessages = () => {
    return db.query(
        `
    SELECT chats.id, sender_id, chat_msg, firstname, lastname, image_url, written_at 
    FROM chats 
    JOIN users
    ON sender_id = users.id
    ORDER BY written_at DESC
    LIMIT 10;`
    );
};
