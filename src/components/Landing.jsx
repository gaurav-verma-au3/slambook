import React from "react";
import Typed from "react-typed";
import Title from "./Title";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className="container-fluid full-height d-flex justify-content-center align-items-center">
      <div className="container">
        <Title />
        <div style={{ height: "40vh" }}>
          <p className="text-center typed-punch">
            <Typed
              strings={["Some memories must be preserved..."]}
              typeSpeed={60}
            />
          </p>
        </div>
        <div className="row d-flex py-3 justify-content-center align-items-center">
          <Link className="btn bg-green text-white btn-lg mx-2" to="/login">
            Login
          </Link>
          <Link className="btn bg-pink text-white btn-lg mx-2" to="/signup">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Landing;
