const jwt = require('jsonwebtoken');

function checkAuth(req, res, next){
    const authToken = req.cookies.authToken;
    const refreshToken = req.cookies.refreshToken;

    if(!authToken || !refreshToken){
        return res.status(401).json({message: 'Authentication failed: No authToken or refreshToken provided', ok: false })
    }
    jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            // Auth token has expired, check the refresh token
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (refreshErr, refreshDecoded) => {
                if (refreshErr) {
                    // Both tokens are invalid, send an error message and prompt for login
                    return res.status(401).json({ message: 'Authentication failed: Both tokens are invalid', ok: false });
                } else {
                    // Generate new auth and refresh tokens
                    const newAuthToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '10d' });
                    const newRefreshToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10d' });

                    res.cookie('authToken', newAuthToken, {
                        httpOnly: true,
                        sameSite: 'None',
                        secure: false 
                      });
                      res.cookie('refreshToken', newRefreshToken, {
                        httpOnly: true,
                        sameSite: 'None',
                        secure: false
                      });
                      

                    req.userId = refreshDecoded.userId;
                    req.ok = true;
                    next();
                }
            });
        } else {
            req.userId = decoded.userId;
            next();
        }
    });
}

module.exports = checkAuth;