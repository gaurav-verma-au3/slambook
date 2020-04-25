import React from "react";

const Footer = () => {
  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center bg-dark text-white"
      style={{ height: "5vh" }}
    >
      <p className="text-center font-weight-bold m-0">
        Developed By{" "}
        <a
          href="https://gaurav-verma-au3.github.io"
          target="blank"
        //   style={{ color: "black" }}
        >
          Gaurav Verma
        </a>
      </p>
    </div>
  );
};

export default Footer;
