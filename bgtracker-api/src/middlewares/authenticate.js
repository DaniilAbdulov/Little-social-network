const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ errors: { global: "No token" } });
    }
    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ errors: { global: "Invalid token" } });
    }
};
