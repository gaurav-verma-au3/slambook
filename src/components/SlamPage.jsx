import React from "react";
import AuthRedirect from "./AuthRedirect";

const SlamPage = (props) => {
  return (
    <div>
      <div className="container-fluid">
        <AuthRedirect />
        {props.match.params.id}
      </div>
    </div>
  );
};

export default SlamPage;
