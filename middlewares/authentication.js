const { validateToken } = require("../services/authentication");
const User = require("../models/user");  // ✅ Import User model

function checkForAuthenticationCookie(cookieName) {
    return async (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
            req.user = null;  // ✅ Ensure `req.user` is null if no token is found
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            const user = await User.findById(userPayload._id).lean(); // ✅ Fetch full user details

            if (!user) {
                req.user = null; // ✅ If user is not found in DB, set req.user to null
                return next();
            }

            req.user = user; // ✅ Store full user details in `req.user`
        } catch (error) {
            console.error("Invalid token:", error.message);
            req.user = null; // ✅ Ensure `req.user` is cleared if token is invalid
        }

        return next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
};
