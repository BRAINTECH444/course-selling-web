
const express = require('express');
const userRouter = express.Router();

const {z} = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_USER_SECRET} = require("../config");
const {userModel, purchaseModel, courseModel } = require("../db");
const {UserMiddleware}= require("../middleware/user");

//user signup endpoint
userRouter.post('/signup', async function(req, res){
    const { email, password, name } = req.body;
    //input validation using zod
    const requiredBody = z.object({
        email: z.string().min(4).max(20).email(),
        password: z.string().min(4).max(20).regex(/[a-z]/).regex(/[A-Z]/).regex(/[!@#$%^&*]/),
        name: z.string().min(4).max(20),
    });
    const parsedData = requiredBody.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            msg: "Incorrect format!!",
            error: parsedData.error,
        });
        return;
    }
    try{
        const hashedPassword = await bcrypt.hash(password , 10);
        await userModel.create({
            email,
            password : hashedPassword,
            name,
        });
        res.json({
            msg: "User created successfully"
        });
    }catch(error){
            res.status(403).json({
            msg : "Error while signing up!!"
         });
    }
});

//user signin endpoint
userRouter.post('/signin', async (req,res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({
        email: email,
    });
    try{
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(user && passwordMatch){
            const token = jwt.sign({
                id : user._id.toString(),
            }, JWT_USER_SECRET);
            res.json({
                msg : "User Signin Successful!!",
                token : token,
            });
        }
    }catch(error){
        res.status(403).json({
            msg : "you are not signed up!!",
        })
    }
});

//see purchased courses
userRouter.get('/purchasedCourses', UserMiddleware, async (req, res) => {
    const userId = req.userId;
    try {
        const purchasedData = await purchaseModel.find({
            userId: userId,
        }).populate('courseId');
        const purchasedCourses = purchasedData.map((c) => c.courseId);
        if (purchasedCourses.length === 0) {
            res.json({
                msg: "You have not bought any courses!!",
            });
            return;
        }
        res.json({
            purchasedCourses,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error fetching courses!!",
            error: error.message,
        });
    }
});

module.exports = {
    userRouter,
}