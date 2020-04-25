import React, { useState } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
const AddQuestions = () => {
  const questions = useSelector((state) => state.isLoggedIn.questions);

  // const handleRemove = (i) => {
  //   let qes = [...userQuestions];
  //   qes.splice(i, 1);
  //   setUserQuestions(qes);
  // };

  return (
    <div className={`container-fluid ${isMobile ? "py-2" : "py-5"}`}>
      <div className="row">
        {questions.map((q, i) => {
          return (
            <div
              className="col-12 d-flex justify-content-center  align-items-center"
              key={q.question + i}
            >
              <div className="row w-100">
                <div className="col-1 d-flex font-weight-bolder justify-content-center">
                  <p className="m-0 my-2 question-list">{i + 1}.</p>
                </div>
                <div className="col-9">
                  <p className="m-0 my-2 question-list" key={q + i}>
                    {q.question}
                  </p>
                </div>
                <div className="col-1 d-flex justify-content-center my-2">
                  <HighlightOffIcon
                    className="my-2"
                    // onClick={(e) => handleRemove(i)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddQuestions;
