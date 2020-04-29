import React from "react";
import { Link } from "react-router-dom";

const FourZeroFour = () => {
  return (
    <div className="row" style={{ minHeight: "90vh" }}>
      <div className=" col-12 d-flex align-items-center justify-content-center ">
        <h1 className="text-center text-dark four-zero-four">
          if &#40;404 &#41; <br /> &#123;{" "}
          <Link to="/" className="text-dark">
            {" "}
            Home Page
          </Link>
          &#125;
        </h1>
      </div>
    </div>
  );
};

export default FourZeroFour;
