import React,{useCallback,useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { AuthContext } from './shared/components/context/auth-context';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
//whenever the value in Authcontext provider changes all components that listen to our context(those components will be provided a code to listen) will re render
//Here we create a separation between routes which should be available if aunthenticated and which should not be available when not authenticated
const App = () => {
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const login=useCallback(()=>{
    setIsLoggedIn(true)
  },[]);
  const logout=useCallback(()=>{
    setIsLoggedIn(false)
  },[]);
  let routes;
  if(isLoggedIn)
    {
      routes=(
        <Switch>
           <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Route path="/places/:placeId" exact>
            <UpdatePlace />
          </Route>
          <Redirect to="/"/>

        </Switch>
      );
    }
    else
    {
      //ROUTES WHICH CAN BE REACHED EVEN IF USER IS NOT AUTHENTICATED
      routes=(
        <>
        <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/auth" exact>
          <Auth/>
          </Route>
          <Redirect to="/auth"/>
          </>
      );
    }
  return (
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn,login:login,logout:logout}}>
    <Router>
      <MainNavigation />
      <main>
        
         {routes}
       
      </main>
    </Router>
    </AuthContext.Provider>
  );
};

export default App;
