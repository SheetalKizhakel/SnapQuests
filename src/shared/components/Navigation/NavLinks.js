import React ,{useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth=useContext(AuthContext);//we want authenticate button to disappear when logged in and also display my places only when logged in as that user

  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>ALL USERS</NavLink>
    </li>
    {auth.isLoggedIn&&
    <li>
      <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
    </li>}
    {auth.isLoggedIn&&<li>
      <NavLink to="/places/new">ADD PLACE</NavLink>
    </li>}
    {!auth.isLoggedIn&&<li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li>}
    {auth.isLoggedIn&&
    <li>
      <button onClick={auth.logout}>LOGOUT</button>
    </li>}
  </ul>
};

export default NavLinks;