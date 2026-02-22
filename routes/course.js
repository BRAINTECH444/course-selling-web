
const express = require('express');
const courseRouter = express.Router();
const {UserMiddleware} = require("../middleware/user");
const {purchaseModel, courseModel} = require("../db");
//buy a course
courseRouter.post('/purchase', UserMiddleware, async (req,res)=>{
    try{
        const userId = req.userId;
        const courseId = req.body.courseId;
        await purchaseModel.create({
            userId,
            courseId,
        });
        res.json({
            msg : "You have successfully bought the course!!"
        });
    }catch(e){
        res.json({
            msg : "Invalid input!!"
        })
    }
});

//get all courses available
courseRouter.get('/preview', async (req,res)=>{
    const courses = await courseModel.find({});
    res.json({
        courses,
    });
});

module.exports = {
    courseRouter : courseRouter,
};


