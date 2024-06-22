// page which should be rendered for when we press on an individual user
import React from "react";
import PlaceList from '../components/PlaceList';
import {useParams} from 'react-router-dom';
const DUMMY_PLACES = [
    {
        id: "1",
        title: 'Empire State Building',
        description: "One of the most famous skyscrapers in the world",
        imageUrl: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_334,q_75,w_579/v1/crm/newyorkstate/GettyImages-486334510_CC36FC20-0DCE-7408-77C72CD93ED4A476-cc36f9e70fc9b45_cc36fc73-07dd-b6b3-09b619cd4694393e.jpg",
        address: "20w 34th St, New York, NY 10001",
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: "2",
        title: 'Empire State Building',
        description: "One of the most famous skyscrapers in the world",
        imageUrl: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_334,q_75,w_579/v1/crm/newyorkstate/GettyImages-486334510_CC36FC20-0DCE-7408-77C72CD93ED4A476-cc36f9e70fc9b45_cc36fc73-07dd-b6b3-09b619cd4694393e.jpg",
        address: "20w 34th St, New York, NY 10001",
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
    
];


function UserPlaces() {
    const userId=useParams().userid;//from here you get the userid which is present in the url
    const loadedPlaces=DUMMY_PLACES.filter((place)=>place.creator===userId);//you only want to return the content for whom the creator id matches 
    return (
        <PlaceList items={loadedPlaces} />
    );
}

export default UserPlaces;
