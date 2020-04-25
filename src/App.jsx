import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SlamList from "./components/SlamList";
import AddEntry from "./components/AddEntry";
import SlamPage from "./components/SlamPage";
import Landing from "./components/Landing";
import PostResponse from "./components/PostResponse";
import AddQuestions from "./components/AddQuestions";
import Menu from "./components/Menu";
import { SnackbarProvider } from "notistack";
import "./components/styles/landingPage.css";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const [bg, setBg] = useState("background-9");
  const [showPallete, setShowPallete] = useState(false);
  const [userName, setUserName] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn.success) setUserName(isLoggedIn.name);
  }, [isLoggedIn]);

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
                userName={userName}
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
          <Route
            path="/app/fill/slam/:slam_id"
            component={() => (
              <PostResponse setUserName={setUserName} setBg={setBg} />
            )}
          />
        </Router>
      </div>
    </SnackbarProvider>
  );
}

export default App;

// 5e9f889c5340891f3c23c9dd
