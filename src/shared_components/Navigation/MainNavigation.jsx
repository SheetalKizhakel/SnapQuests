//nav tag defines a set of navigation links
//Purpose-defines the main header of the website which should be present all the time the your places one
import React,{useState} from "react";
import MainHeader from './MainHeader';
import './MainNavigation.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NavLinks from './NavLinks';
import SideDrawer from "./SideDrawer";
import Backdrop from '../UIElements/Backdrop'
function MainNavigation(props)
{
    const [drawerIsOpen,setDrawerIsOpen]=useState(false);
    function OpenDrawerHandler()
    {
        setDrawerIsOpen(true);
    }
    function CloseDrawerHandler()
    {
        setDrawerIsOpen(false);
    }
    return (
    <>
    {drawerIsOpen&&<Backdrop onClick={CloseDrawerHandler}/>}
    <SideDrawer show={drawerIsOpen} onClick={CloseDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
            <NavLinks/>
        </nav>
    </SideDrawer>
    
    <MainHeader>
        <button className="main-navigation__menu-btn" onClick={OpenDrawerHandler}>
        <span></span>
        <span></span>
        <span>
        </span>
        </button>
        <h1 className="main-navigation__title">
            <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
        <NavLinks/>
        </nav>
    </MainHeader>
    </>
    );
}
export default MainNavigation;