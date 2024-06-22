//Purpose-component that has all the links
//Contains all the urls we can navigate to from the homepage like login,see your places,add new place etc.
import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavLinks.css';
function NavLinks(props)
{
    return <ul className='nav-links'>
        <li>
            <NavLink to="/" exact>ALL USERS</NavLink>
        </li>
        <li>
            <NavLink to="/u1/places">MY PLACES</NavLink>
        </li>
        <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
        <li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
    </ul>
}
export default NavLinks;