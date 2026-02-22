
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const adminSchema = new Schema({
    email : {type : String ,required : true, unique : true},
    password : {type : String},
    name : {type: String},
});

const userSchema = new Schema({
    email : {type: String, required : true, unique : true},
    password : {type : String},
    name : {type: String},
});

const courseSchema = new Schema({
    title : String,
    description : String,
    price : Number,
    creatorId : {type : ObjectId, ref : 'Admin'},
});

const purchaseSchema = new Schema({
    userId : {type : ObjectId, ref : 'User'},
    courseId : {type : ObjectId, ref : 'Course'},
});

const adminModel  = mongoose.model('Admin', adminSchema);
const userModel = mongoose.model('User', userSchema);
const courseModel = mongoose.model('Course', courseSchema);
const purchaseModel = mongoose.model('Purchase', purchaseSchema);

module.exports = {
    adminModel,
    userModel,
    courseModel,
    purchaseModel
}