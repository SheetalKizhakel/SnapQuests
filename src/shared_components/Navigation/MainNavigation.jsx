//nav tag defines a set of navigation links
//Purpose-defines the main header of the website which should be present all the time
import React from "react";
import MainHeader from './MainHeader';
import './MainNavigation.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function MainNavigation(props)
{
    return (
    <MainHeader>
        <button className="main-navigation__menu-btn">
        <span></span>
        <span></span>
        <span>
        </span>
        </button>
        <h1 className="main-navigation__title">
            <Link to="/">YourPlaces</Link>
        </h1>
        <nav>

        </nav>
    </MainHeader>
    );
}
export default MainNavigation;