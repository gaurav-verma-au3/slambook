import React, { useState } from "react";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ColorLensIcon from "@material-ui/icons/ColorLens";

import LockIcon from "@material-ui/icons/Lock";
import { Link } from "react-router-dom";
import ReactTyped from "react-typed";
import BgPallete from "./BgPallete";

const Menu = ({ setShowPallete, showPallete, setBg }) => {
  return (
    <div className="container-fluid py-3">
      <div className="row d-flex justify-content-center bg-dark align-items-center rounded">
        <div className="col-12">
          <div className="row">
            <div
              className="col-md-2 com-sm-12 py-2 justify-content-center d-flex align-items-center"
              id="menu"
            >
              <Link to="/app/home" className="mt-3" id="menu-heading">
                <ReactTyped strings={["SlamBook"]} typeSpeed={60} />
              </Link>
            </div>
            <div className="col-md-8 col-sm-12"></div>
            <div className="col-md-2 col-sm-12 py-2 d-flex justify-content-center align-items-center">
              <div className="d-flex justify-content-center align-items-center">
                <ColorLensIcon
                  className="mx-2 text-light"
                  onClick={(_) => setShowPallete(!showPallete)}
                />
                <PlaylistAddIcon className="mx-2 text-light" />
                <ListAltIcon className="mx-2 text-light" />
                <LockIcon className="mx-2 text-light" />
              </div>
            </div>
          </div>
        </div>
        {showPallete ? (
          <>
            <div className="col-12 py-2 ">
              <div className="container d-flex justify-content-center align-items-center px-3">
                <BgPallete setShowPallete={setShowPallete} setBg={setBg} />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Menu;
