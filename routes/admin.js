
const express = require('express');
const adminRouter = express.Router();
const {z} = require('zod');
const {adminModel, courseModel} = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_ADMIN_SECRET} = require('../config');
const {AdminMiddleware} = require('../middleware/admin');

adminRouter.post('/signup',async (req, res)=>{
    const {email, password, name} = req.body;
    const requiredBody = z.object({
        email : z.string().min(4).max(20).email(),
        password : z.string().min(4).max(20).regex(/[a-z]/).regex(/[A-Z]/).regex(/[!@#$%^&*]/),
        name : z.string().min(4).max(20),
    });
    const parsedData = requiredBody.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            msg : "Incorrect format!!",
            error : parsedData.error,
        });
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        await adminModel.create({
            email,
            password : hashedPassword,
            name,
        });
        res.json({
            msg : "Admin Signed Up!!",
        });
    }catch(error){
        res.status(403).json({
            msg : "Error during signed up!!",
        });
    }
});
 
adminRouter.post('/signin', async (req,res)=>{
    const {email, password} = req.body;
    const admin = await adminModel.findOne({
        email : email,
    });
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if(admin && passwordMatch){
        const token = jwt.sign({
            id : admin._id.toString(),
        }, JWT_ADMIN_SECRET);
        res.json({
            msg : "Admin Signin Successful!!",
            token : token,
        });
    }else{
        res.status(403).json({
            msg : "Admin Signin Failed!!",
        });
    }
});
//create a course by the admin
adminRouter.post('/course', AdminMiddleware, async (req,res)=>{
    const {title, description, price} = req.body;
    const adminId = req.adminId;
    const course = await courseModel.create({
        title,
        description,
        price, 
        creatorId : adminId,
    });
    res.json({
        msg : "Course created successfully!!",
        courseId : course._id,
    });
});
//update a course by the admin
adminRouter.put('/course', AdminMiddleware, async (req,res)=>{
    const {courseId, title, description, price} = req.body;
    const adminId = req.adminId;
    const adminCourse = await courseModel.findOne({
        _id : courseId,
        creatorId : adminId,    
    });
    if(!adminCourse){
        res.json({
            msg : "Admin and course does not match!!",
        });
        return;
    }
    const updatedCourse = await courseModel.updateOne({
        _id : courseId,
        creatorId : adminId,
    },{
        title, description, price,
    });
    res.json({
        msg : "Course updated successfully!!",
        courseId : courseId,
    });
});
//delete a course(of admin) by the admin

adminRouter.delete('/course', AdminMiddleware, async (req,res)=>{
    const {courseId} = req.body;
    const adminId = req.adminId;
    await courseModel.deleteOne({
        _id : courseId,
        creatorId : adminId,
    });
    res.json({
        msg : "Course deleted successfully!!",
    });
});
//get all courses of an admin

adminRouter.get('/courses', AdminMiddleware, async (req,res)=>{
    const adminId = req.adminId;
    const courses = await courseModel.find({
        creatorId : adminId,
    });
    if(courses.length>0){
        res.json({
            msg : "All courses created by the admin!!",
            courses : courses,
        });
    }else{
        res.json({
            msg : "No courses created by the admin!!",
            courses : [],
        });
    }
});

module.exports = {
    adminRouter : adminRouter,
}



