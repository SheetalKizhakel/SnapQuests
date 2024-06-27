const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
const Schema=mongoose.Schema;
const userSchema=new Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},//unique helps to query the emial faster
        password:{type:String,required:true,minlength:5},
        image:{type:String,required:true},
        places:[{type:mongoose.Types.ObjectId,required:true,ref:'Place'}],//ids of the places each user has,ref allows to establish connection to another schema
        //array in places indicates multiple values can be added

    }
);
userSchema.plugin(uniqueValidator);
module.exports=mongoose.model('User',userSchema);