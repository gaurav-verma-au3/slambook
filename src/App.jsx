import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  // Switch,
  // Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SlamList from "./components/SlamList";
import AddEntry from "./components/AddEntry";
import SlamPage from "./components/SlamPage";
import Landing from "./components/Landing";
import PostResponse from "./components/PostResponse";
import AddQuestions from "./components/AddQuestions";
// import { bgs } from "./components/styles/bg";
import Menu from "./components/Menu";
import { useSnackbar } from "notistack";
import "./components/styles/landingPage.css";
import "./App.css";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import FourZeroFour from "./components/FourZeroFour";
import { updateBgAPI } from "./store/api/auth";
import AuthRedirect from "./components/AuthRedirect";

// const redirectto404 = () => {
//   return <Redirect to="/404" />;
// };

function App() {
  const [bg, setBg] = useState("background-1");
  const [showPallete, setShowPallete] = useState(false);
  const [userName, setUserName] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (isLoggedIn.success) {
      setUserName(isLoggedIn.name);
      setBg(isLoggedIn.custom_bg);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    updateBgAPI(isLoggedIn.token, enqueueSnackbar, bg);
  }, [bg]);

  return (
    <div
      className="App container-fluid full-height"
      id={bg}
      // style={bgs[bg.split("-")[0] + bg.split("-")[1]]}
    >
      <div>
        <Router>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          {isLoggedIn.token ? (
            <div
              style={
                !isMobile
                  ? {
                      paddingTop: "15vh",
                    }
                  : { paddingTop: "21.5vh" }
              }
            >
              <Route
                path="/app"
                render={(props) => (
                  <Menu
                    {...props}
                    bg={bg}
                    userName={userName}
                    setShowPallete={setShowPallete}
                    showPallete={showPallete}
                    setBg={setBg}
                  />
                )}
              />
              <div className="container px-0">
                <Route exact path="/app/home" component={SlamList} />
                <Route
                  exact
                  path="/app/add/user"
                  render={(props) => <AddEntry {...props} bg={bg} />}
                />
                <Route
                  exact
                  path="/app/add/questions"
                  component={AddQuestions}
                />
                <Route
                  path="/app/slam/:id"
                  render={(props) => (
                    <SlamPage {...props} setBg={setBg} bg={bg} />
                  )}
                />
              </div>
            </div>
          ) : null}
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
        {!isMobile && (
          <div className="container-fluid fixed-bottom py-2" id={bg}>
            <p className="text-center text-dark font-weight-bold m-0">
              Developed By{" "}
              <a
                className="text-center text-dark font-weight-bold m-0  "
                href="https://gaurav-verma-au3.github.io"
                target="blank"
              >
                Gaurav Verma
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

// 5e9f889c5340891f3c23c9dd
