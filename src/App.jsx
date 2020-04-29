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
import { isMobile } from "react-device-detect";

function App() {
  const [bg, setBg] = useState("background-5");
  const [showPallete, setShowPallete] = useState(false);
  const [userName, setUserName] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn.success) setUserName(isLoggedIn.name);
  }, [isLoggedIn]);

  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={
        isMobile
          ? {
              vertical: "top",
              horizontal: "center",
            }
          : {
              vertical: "bottom",
              horizontal: "right",
            }
      }
    >
      <div className="App container-fluid full-height" id={bg}>
        <Router>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route
            path="/app"
            render={(props) => (
              <Menu
                {...props}
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
            render={(props) => <AddEntry {...props} bg={bg} />}
          />
          <Route exact path="/app/add/questions" component={AddQuestions} />
          <Route
            path="/app/slam/:id"
            render={(props) => <SlamPage {...props} setBg={setBg} bg={bg} />}
          />
          <Route
            path="/app/fill/slam/:slam_id"
            render={(props) => (
              <PostResponse
                {...props}
                setUserName={setUserName}
                setBg={setBg}
              />
            )}
          />
        </Router>
      </div>
    </SnackbarProvider>
  );
}

export default App;

// 5e9f889c5340891f3c23c9dd
