const jwt = require('jsonwebtoken');

function checkAdminToken(req, res, next) {
    const adminAuthToken = req.cookies.adminAuthToken;

    if(!adminAuthToken ){
        return res.status(401).json({message: 'Admin Authentication failed: No adminAuthToken  provided', ok: false })
    }
    jwt.verify(adminAuthToken, process.env.JWT_ADMIN_SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Admin Authentication failed: Invalid adminAuthToken', ok: false });
                } else {
            // admin Auth token is valid, continue with the request
            req.adminId = decoded.adminId;
            next();
        }
    });
}

module.exports = checkAdminToken
