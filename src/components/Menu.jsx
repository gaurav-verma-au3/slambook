import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import PostAddIcon from "@material-ui/icons/PostAdd";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import LockIcon from "@material-ui/icons/Lock";
import { Link, Redirect } from "react-router-dom";
import ReactTyped from "react-typed";
import BgPallete from "./BgPallete";
import { logout } from "../store/isLoggedIn/actions/isLoggedIn.actions";
import { handleNotification } from "../utils";

const Menu = ({ setShowPallete, showPallete, setBg, userName }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const handleLogout = () => {
    dispatch(logout());
    handleNotification(enqueueSnackbar, "Logged Out Successfully", "success");
  };

  return (
    <div className="container-fluid py-3">
      <div className="row d-flex justify-content-center rounded align-items-center rounded">
        <div className="col-12 rounded" style={{ border: "5px solid #161718" }}>
          <div className="row">
            <div
              className="col-md-2 com-sm-12 py-2 justify-content-center d-flex align-items-center"
              id="menu"
            >
              <Link to="/app/home" className="mt-3" id="menu-heading">
                <ReactTyped strings={["SlamBook"]} typeSpeed={60} />
              </Link>
            </div>
            <div className="col-md-8 col-sm-12">
              {showPallete ? (
                <>
                  <div className="col-12">
                    <div className="container d-flex justify-content-center align-items-center px-3">
                      <BgPallete
                        setShowPallete={setShowPallete}
                        setBg={setBg}
                      />
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            {isLoggedIn.success ? (
            <div className="col-md-2 col-sm-12 py-2 d-flex justify-content-center align-items-center">
              <div className="d-flex justify-content-center align-items-center">
                <ColorLensIcon
                  style={{
                    cursor: "pointer",
                  }}
                  className="mx-2 text-dark"
                  onClick={(_) => setShowPallete(!showPallete)}
                />
                <Link to="/app/add/user">
                  <GroupAddIcon className="mx-2 text-dark" />
                </Link>
                <Link to="/app/add/Questions">
                  <PostAddIcon className="mx-2 text-dark" />
                </Link>
                <LockIcon
                  className="mx-2 text-dark cursor-pointer"
                  onClick={(e) => handleLogout()}
                />
              </div>
            </div>
            ) : null}
          </div>
          <div className="col-12">
            <p className="font-weight-bold text-center">
              Welcome, {userName}
            </p>
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
