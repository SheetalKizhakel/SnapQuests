const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const placeSchema=new Schema(
    {
        title:{type:String,required:true},
        description:{type:String,required:true},
        image:{type:String,required:true},//we use a url which is a pointer to the file
        address:{type:String,required:true},
        location:{
            lat:{type:Number,required:true},
            lng:{type:Number,required:true},
        },
        creator:{type:mongoose.Types.ObjectId,required:true,ref:'User'}//ref allows me to create a relation with another schema .here we want to establish from place to user

    }
);
module.exports=mongoose.model('Place',placeSchema);