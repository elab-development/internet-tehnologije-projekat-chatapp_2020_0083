const mongoose = require("mongoose")

const userShema=new mongoose.Schema({
    name:{type:String,required:true,minlength:3,maxlength:30},
    email:{type:String,required:true,minlength:3,maxlength:200,unique:true},
    password:{type:String, required:true,minlength:3,maxlength:1024}
},{
    timestamps:true,
}
);

const userModel= mongoose.model("User",userShema)

module.exports=userModel;