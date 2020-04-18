import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SlamList from "./components/SlamList";
import AddEntry from "./components/AddEntry";
import SlamPage from "./components/SlamPage";
import FillSlam from "./components/FillSlam";

function App() {
  return (
    <Router>
      <div className="App container">
        
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/home" component={SlamList} />
        <Route exact path="/add" component={AddEntry} />
        <Route path="/slam/:id" component={SlamPage} />
        <Route path="/fill/:id" component={FillSlam} />
      </div>
    </Router>
  );
}

export default App;
