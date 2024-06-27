//the middle ware function part of the middleware(middleware-path+middleware functions) are called controllers
//also contains the logic of adding data to the database
const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const mongoose=require('mongoose');
const Place=require('../models/place')
const User=require('../models/user')

//CRUD - READ FUNCTIONALITY

async function getPlaceById(req, res, next) {
    const placeId = req.params.pid; // params stores the data passed as object like {pid: 'p1'}
    let place;
    try{
    place = await Place.findById(placeId); // check if id of place matches any of the ids in DUMMY_PLACES
    }
    catch(err){
    const error=new HttpError(
        'Get request did not work.Something went wrong,could not find a place',500
    );
    return next(error);
    }
    if (!place) {
        return next(new HttpError('Could not find place with given place id', 404));
    }
    
    res.json({ place:place.toObject({getters:true}) });
}



async function getPlacesByUserId(req, res, next) {
    const userId = req.params.uid; // params stores the data passed as object like {uid: 'u1'}
    // check if creator id matches the userId
    let places;
    try
    {
    places=await Place.find({creator:userId});
    }
    catch(err)
    {
        const error=new HttpError('Fetching places failed,please try again later',500);
        return next(error)
    }
    if (!places || places.length === 0) {
        return next(new HttpError('Could not find places with given user id', 404));
    }
    
    res.json({ places:places.map(p=>p.toObject({getters:true})) });
}


//CRUD=CREATE FUNCTIONALITY

async function createPlace(req, res, next) {
    const errors = validationResult(req); // comes with express-validator
    
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }
    
    const { title, description, address, creator } = req.body; // obtained from the body parser

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }
    
    const createdPlace=new Place({
        title:title,
        description:description,
        address:address,
        location:coordinates,
        image:'https://www.esbnyc.com/sites/default/files/styles/on_single_feature/public/2019-10/home_banner-min.jpg?itok=OVtUHvyB',
        creator
    });

    let user;
    try{
        user=await User.findById(creator);//check if id of the creator exists in User 
    }
    catch(err)
    {
        return next(new HttpError('Creating place failed,please try again',500));
    }
    //there is no user with such a creator id
    if(!user)
        {
            return next(new HttpError('Could not find user for provided id',404));
        }

        console.log(user)
    //if such a user exists though we can a)create a new document with that place b)add the place id to the corresponding user

    try{
    const sess=await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({session:sess})//task1=create the document
    user.places.push(createdPlace);//task2 add the created place to the user and access the user's places property
    await user.save({session:sess})//save the updated user
    await sess.commitTransaction();//here the changes are permanantely made to the database .if any of the steos in the session had problem all changes would be rolled back

    }
    catch(err)
    {
        const error=new HttpError('Could not save place to the collection',500);
        return next(error);//stop code execution if error is encountered
    }
    res.status(201).json({ place: createdPlace });
}


//CRUD=UPDATE FUNCTIONALITY


async function updatePlace(req, res, next) {
    const errors = validationResult(req); // comes with express-validator
    
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }
    
    const { title, description } = req.body; // extract title and description from request body
    const placeId = req.params.pid; // extract the place id which has to be updated

    // Find the place by ID
    let place
    try{
    place = await Place.findById(placeId);
    }
    catch(err){
    const error=new HttpError(
        'Something went wrong,could not update place',500
    );
    return next(error);
    }
    //update the new title and description
    place.title=title;
    place.description=description;
    //resave the updated data
    try
    {
    await place.save()
    }
    catch(err)
    {
        const error=new HttpError('Could not resave updated place',500);
        return next(error);
    }
    // Return the updated place
    res.status(200).json({ place: place.toObject({getters:true})});//get rid of underscore we use getters
}



//CRUD=DELETE FUNCTIONALITY


async function deletePlace(req, res, next) {
    const placeId = req.params.pid;//obtained the id of the place which has to be deleted from the body
    let place
    try{
        place=await Place.findById(placeId).populate('creator');
    }
    catch (err) {
        return next(new HttpError('Could not delete place', 500));
    }

    if(!place)
        {
            const error=new HttpError('Could not find place for this id.',404);
            return next(error);
        }


        try {
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await Place.deleteOne({ _id: placeId }, { session: sess }); // delete the place with given id from places collection
            place.creator.places.pull(place); // now we have to access the place stored in the creator, remove the place from creator
            await place.creator.save({ session: sess });
            await sess.commitTransaction();
        } 
    catch (err) {
        return next(new HttpError('Something went wring Could not delete place', 500));
    }
    res.status(200).json({ message: 'Place is deleted' });
}

module.exports = { getPlaceById, getPlacesByUserId, createPlace, updatePlace, deletePlace };
