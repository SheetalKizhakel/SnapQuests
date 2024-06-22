import React from 'react';
import { BrowserRouter as Router,Route,Redirect,Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared_components/Navigation/MainNavigation';
function App() {
  return (
    <Router>
    <MainNavigation/>
    <main>
    <Switch>
      <Route path="/" exact>
        <Users/>
      </Route>
      <Route path="/places/new" exact>
        <NewPlace/>
      </Route>
      <Redirect to="/" />
    </Switch>
    </main>
    </Router>
  )
}

export default App;
