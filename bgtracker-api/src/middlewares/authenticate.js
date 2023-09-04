const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");

module.exports = asyncHandler(async function (req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "No token or incorrect token format" });
    }

    const token = header.slice(7);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
});
