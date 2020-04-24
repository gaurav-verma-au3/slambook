import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SlamList from "./components/SlamList";
import AddEntry from "./components/AddEntry";
import SlamPage from "./components/SlamPage";
import FillSlam from "./components/FillSlam";
import Landing from "./components/Landing";
import PostResponse from "./components/PostResponse";
import AddQuestions from "./components/AddQuestions";
import Menu from "./components/Menu";
import { SnackbarProvider } from "notistack";
import "./components/styles/landingPage.css";
import "./App.css";

function App() {
  const [bg, setBg] = useState("background-9");
  const [showPallete, setShowPallete] = useState(false);
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <div className="App container-fluid full-height" id={bg}>
        <Router>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route
            path="/app"
            component={() => (
              <Menu
                setShowPallete={setShowPallete}
                showPallete={showPallete}
                setBg={setBg}
              />
            )}
          />
          <Route exact path="/app/home" component={SlamList} />
          <Route
            exact
            path="/app/add/user"
            component={() => <AddEntry bg={bg} />}
          />
          <Route
            exact
            path="/app/add/questions"
            component={() => <AddQuestions />}
          />
          <Route path="/app/slam/:id" component={SlamPage} />
          <Route path="/app/fill/:id" component={FillSlam} />
          <Route path="/fill/slam/:slam_id" component={PostResponse} />
        </Router>
      </div>
    </SnackbarProvider>
  );
}

export default App;
