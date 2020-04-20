import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SlamList from "./components/SlamList";
import AddEntry from "./components/AddEntry";
import SlamPage from "./components/SlamPage";
import FillSlam from "./components/FillSlam";
import Landing from "./components/Landing";
import "./components/styles/landingPage.css";
import Menu from "./components/Menu";
import AddQuestions from "./components/AddQuestions";
import { SnackbarProvider } from "notistack";
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
        </Router>
      </div>
    </SnackbarProvider>
  );
}

export default App;
