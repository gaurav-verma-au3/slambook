import React from "react";
import AddEntryForm from "./AddEntryForm";
import { isMobile } from "react-device-detect";

const AddEntry = ({ bg}) => {
  return (
    <div className={`container-fluid ${isMobile ? "py-2" : "py-5"}`}>
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <AddEntryForm bg={bg} />
        </div>
      </div>
    </div>
  );
};

export default AddEntry;
