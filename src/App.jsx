import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
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
import FourZeroFour from "./components/FourZeroFour";

const redirectto404 = () => {
  return <Redirect to="/404" />;
};

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
      autoHideDuration={isMobile ? 1000 : 1500}
      anchorOrigin={
        isMobile
          ? {
              vertical: "bottom",
              horizontal: "center",
            }
          : {
              vertical: "bottom",
              horizontal: "right",
            }
      }
    >
      <div className="App container-fluid full-height pb-5 " id={bg}>
        <div className="pb-5">
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
            <Route path="/404" component={FourZeroFour} />
            {/* <Route component={redirectto404} /> */}
            {/* </Switch> */}
          </Router>
        </div>
        {!isMobile && (
          <a
            className="text-center text-muted font-weight-bold m-0 fixed-bottom"
            href="https://gaurav-verma-au3.github.io"
            target="blank"
          >
            <p className="text-center text-muted font-weight-bold m-0">
              Developed By Gaurav Verma
            </p>
          </a>
        )}
      </div>
    </SnackbarProvider>
  );
}

export default App;

// 5e9f889c5340891f3c23c9dd
