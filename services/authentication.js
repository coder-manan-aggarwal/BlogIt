const jwt = require("jsonwebtoken");

const secret = "IronM@nTonYStarK";

function createTokenForUser(user) {
    const payload = {
        username: user.fullName,
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
    };
    return jwt.sign(payload, secret);
}

function validateToken(token) {
    return jwt.verify(token, secret);
}

module.exports = {
    createTokenForUser,
    validateToken
};
