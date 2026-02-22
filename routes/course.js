
const express = require('express');
const courseRouter = express.Router();
const {courseModel, purchaseModel} = require('../db');
const {UserMiddleware} = require('../middleware/user');

courseRouter.get('/all', async (req, res)=>{
    const courses = await courseModel.find({});
    res.json({
        courses,
    });
});

courseRouter.get('/:courseId', async (req, res)=>{
    const courseId = req.params.courseId;
    const course = await courseModel.findById(courseId);
    res.json({
        course,
    });
});

courseRouter.post('/purchase', UserMiddleware, async (req,res)=>{
    const {courseId} = req.body;
    const userId = req.userId;
    await purchaseModel.create({
        courseId,
        userId,
    });
    res.json({
        msg : "Course Purchased!!",
    });
});

module.exports = {
    courseRouter,
}