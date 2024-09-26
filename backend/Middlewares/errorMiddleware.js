function errorHandler(statuscode, err, req, res, next){
    console.error(err.stack);
    if(res.headersSent){
        return next(err);
    }
    console.log("Error Middleware")
    res.status(statuscode || 500).json({
        ok: false,
        message: err.message,
    });
}
module.exports = errorHandler;