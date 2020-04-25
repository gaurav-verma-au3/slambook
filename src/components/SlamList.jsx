import React from "react";
import { useSelector } from "react-redux";
import SlamTile from "./SlamTile";
import AuthRedirect from "./AuthRedirect";
const SlamList = () => {
  const slamEntries = useSelector((state) => state.slamEntries);

  return (
    <div className="container">
      <AuthRedirect />
      <div className="row ">
        {slamEntries &&
          slamEntries.map((slam, idx) => (
            <div className="col-md-3 col-sm-12 mb-3">
              <SlamTile id={slam._id} slam={slam} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SlamList;
