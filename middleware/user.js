
const jwt = require('jsonwebtoken');
const {JWT_USER_SECRET} = require('../config');

function UserMiddleware(req, res, next){
    const token = req.headers.authorization;
    try{
        const decodedData = jwt.verify(token, JWT_USER_SECRET);
        req.userId = decodedData.id;
        next();
    }catch(error){
        res.status(403).json({
            msg : "User not authenticated!!",
        });
    }
}

module.exports = {
    UserMiddleware,
}