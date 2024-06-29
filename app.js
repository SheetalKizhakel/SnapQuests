//our main entry file.same as server.js
const express=require('express');
const path=require('path')
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const placesRoutes=require('./routes/places-routes')
const userRoutes=require('./routes/users-routes')
const HttpError=require('./models/http-error')
const fs=require('fs')//this module allows us to interact with our files in the system
const app=express();
app.use(bodyParser.json());//will parse any incoming requests body and extract any JSON data which is in there,convert it to regular javascript data structures and then call next automatically
app.use('/uploads/images',express.static(path.join('uploads','images')));
app.use((req,res,next)=>//Middle ware required to get around CORS policy
{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');
    next();
})
app.use('/api/places',placesRoutes);//the routes we configured as places-routes are added as middleware in app.js
app.use('/api/users',userRoutes);
app.use((req,res,next)=>{
    const error=new HttpError('Could not find this route',404);
    throw error;
})
app.use((error,req,res,next)=>{
    if(req.file)
        {
            fs.unlink(req.file.path,err=>{
                console.log(err);
            });
        }
    if(res.headerSent)
        {
            return next(error);
        }
       res.status(error.code||500)
       res.json({message:error.message||'An unknown error occurred'})
})
mongoose.connect('mongodb+srv://sheetal_1:sheetal@cluster0.la76lhw.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{app.listen(5000);})//if the result of my promise returned by connect is fulfilled(if my connection was successful) start the server.We first want to estblish connection to the database and then start the server
.catch((err)=>{console.log(err);})//if my connection was not successful,we do not want to start a server and instead throw an error
