import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Questions from './components/Questions';
import ProtectedRoute from './HOC/protectedRoutes';
function App() {
  useEffect(() => {
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/login" />)}  />
          <Route exact path="/signup"  component={Signup} />
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/questions"  component={Questions} />
        </Switch>
        
        <section className="footer mt-5">
              <h3>Developed by: <a href="https://knowyash.herokuapp.com" target="_blank" style={{color: "#fff"}}>Yash</a></h3>
        </section>
      
      </div>
    </Router>
  );
}

export default App;
