
const jwt = require('jsonwebtoken');
const {JWT_ADMIN_SECRET} = require('../config');
const e = require('express');

function AdminMiddleware(req, res, next){
    const token = req.headers.authorization;
    try{
        const decodedData = jwt.verify(token, JWT_ADMIN_SECRET);
        req.adminId = decodedData.id;
        next();
    }catch(error){
        res.status(403).json({
            msg : "Admin not authenticated!!",
        });
    }
}

module.exports = {
    AdminMiddleware,
}