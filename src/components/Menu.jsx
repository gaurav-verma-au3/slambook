import React from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import PostAddIcon from "@material-ui/icons/PostAdd";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import LockIcon from "@material-ui/icons/Lock";
import InfoIcon from "@material-ui/icons/Info";
import HomeIcon from "@material-ui/icons/Home";
import { Link, useHistory } from "react-router-dom";
import ReactTyped from "react-typed";
import BgPallete from "./BgPallete";
import { logout } from "../store/isLoggedIn/actions/isLoggedIn.actions";
import { handleNotification } from "../utils";
import { clearEntries } from "../store/slamEntries/actions/slamEntries.actions";
import HowTo from "./HowTo";
const Menu = ({ setShowPallete, showPallete, bg, setBg, userName }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [helpOpen, setHelpOpen] = React.useState(false);

  const handleClickOpen = () => {
    setHelpOpen(true);
  };

  const handleClose = () => {
    setHelpOpen(false);
  };
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearEntries());
    history.replace("/");
    handleNotification(enqueueSnackbar, "Logged Out Successfully", "success");
  };

  return (
    <div
      id={bg}
      className={`container-fluid  ${
        !isMobile ? "fixed-top py-2" : "fixed-top py-1"
      }`}
    >
      <HowTo
        handleClickOpen={handleClickOpen}
        helpOpen={helpOpen}
        handleClose={handleClose}
      />
      <div className="row d-flex justify-content-center rounded align-items-center rounded">
        <div className="col-12 rounded">
          <div className="row">
            <div
              className="col-md-2 com-sm-12 py-2 justify-content-center d-flex align-items-center"
              id="menu"
            >
              <Link to="/app/home" className="mt-3" id="menu-heading">
                <ReactTyped strings={["Slambook"]} typeSpeed={60} />
              </Link>
            </div>
            <div className="col-md-8 col-sm-12">
              {showPallete ? (
                <>
                  <div className="col-12 h-100">
                    <div className="container h-100 d-flex justify-content-center align-items-center px-3">
                      <BgPallete
                        setShowPallete={setShowPallete}
                        setBg={setBg}
                      />
                    </div>
                  </div>
                </>
              ) : userName ? (
                <p className="font-weight-bold text-center pt-4">
                  Welcome, {userName && userName.split(" ")[0]}
                </p>
              ) : null}
            </div>

            <div
              id={isMobile ? bg : ""}
              className={
                isMobile
                  ? `fixed-bottom d-flex flex-column justify-content-center pb-1 pt-3 text-light  mobile-menu-shadow`
                  : `col-md-2 col-sm-12 py-2 d-flex justify-content-center align-items-center`
              }
            >
              <div className="d-flex justify-content-center align-items-center">
                {isLoggedIn.success ? (
                  <>
                    <Link to="/">
                      <HomeIcon
                        className={
                          isMobile
                            ? " mx-3 text-dark"
                            : "mx-2 text-dark cursor-pointer"
                        }
                      />
                    </Link>
                    <ColorLensIcon
                      className={
                        isMobile
                          ? " mx-3 text-dark"
                          : "mx-2 text-dark cursor-pointer"
                      }
                      onClick={(_) => setShowPallete(!showPallete)}
                    />
                    <Link to="/app/add/user">
                      <GroupAddIcon
                        className={
                          isMobile
                            ? " mx-3 text-dark"
                            : "mx-2 text-dark cursor-pointer"
                        }
                      />
                    </Link>
                    <Link to="/app/add/Questions">
                      <PostAddIcon
                        className={
                          isMobile
                            ? " mx-3 text-dark"
                            : "mx-2 text-dark cursor-pointer"
                        }
                      />
                    </Link>

                    <InfoIcon
                      className={
                        isMobile
                          ? " mx-3 text-dark"
                          : "mx-2 text-dark cursor-pointer"
                      }
                      onClick={handleClickOpen}
                    />
                    <LockIcon
                      className={
                        isMobile
                          ? " mx-3 text-dark"
                          : "mx-2 text-dark cursor-pointer"
                      }
                      onClick={(e) => handleLogout()}
                    />
                  </>
                ) : (
                  <>
                    <Link
                      className={
                        isMobile
                          ? " mx-3 text-dark border border-dark rounded px-3 py-1 "
                          : "mx-2 text-dark cursor-pointer  border border-dark rounded px-3 py-1"
                      }
                      to="/login"
                    >
                      Login
                    </Link>
                    <Link
                      className={
                        isMobile
                          ? " mx-3 text-dark border border-dark rounded px-3 py-1"
                          : "mx-2 text-dark cursor-pointer border border-dark rounded px-3 py-1"
                      }
                      to="/signup"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

              {isMobile && (
                <a
                  id={bg}
                  style={{ fontSize: "0.6rem" }}
                  className="text-center mt-2 text-dark font-weight-light"
                  href="https://gaurav-verma-au3.github.io"
                  target="blank"
                >
                  <p className="m-0">Developed By Gaurav Verma</p>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* <p className="text-light text-center text-justify ">
          1. Click <PostAddIcon className="mx-2 text-light" /> to add question
          in Your SlamBook. 2. Click
          <GroupAddIcon className="mx-2 text-light" /> to add People. 3. Share
          Genarated link with the Person. Enjoy .
        </p> */}
      </div>
    </div>
  );
};

export default Menu;
