import React from "react";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import LockIcon from "@material-ui/icons/Lock";
import { Link } from "react-router-dom";
import ReactTyped from "react-typed";

const Menu = (props) => {
  return (
    <div
      className="container-fluid rounded bg-dark     d-flex justify-content-between align-items-center px-3"
      id="menu"
    >
      {/* <div className="d-flex justify-content-center align-items-center"> */}
      <div
        onClick={props.history.goBack}
        className="bg-white rounded-circle p-2 mr-2"
      >
        <ArrowBackIcon />
      </div>
      <Link to="/app/home" className="mt-3" id="menu-heading">
        <ReactTyped strings={["SlamBook"]} typeSpeed={60} />
      </Link>
      {/* </div> */}
      <div className="d-flex justify-content-center align-items-center">
        <PlaylistAddIcon className="mx-2 text-light" />
        <ListAltIcon className="mx-2 text-light" />
        <LockIcon className="mx-2 text-light" />
      </div>
    </div>
  );
};

export default Menu;
