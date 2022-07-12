const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const handleErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const generateAccessToken = (id, name) => {
    return jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { handleErrors, generateAccessToken, verifyToken };
