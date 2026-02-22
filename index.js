
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {userRouter} = require('./routes/user');
const {adminRouter} = require('./routes/admin');
const {courseRouter} = require('./routes/course');
const app = express();
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/course", courseRouter);

async function connectDB(){
    await mongoose.connect(process.env.mongo_url);
    app.listen(3000);
    console.log("listening on port 3000....");
}
connectDB();



