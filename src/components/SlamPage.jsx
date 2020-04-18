import React from "react";

const SlamPage = (props) => {
  return (
    <div>
      <div className="container-fluid">{props.match.params.id}</div>
    </div>
  );
};

export default SlamPage;
