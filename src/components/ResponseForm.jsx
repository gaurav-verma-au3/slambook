import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import {
  TextField,
  InputAdornment,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { withStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { submitResponseAPI } from "../store/api/submitResponse";
import { Redirect } from "react-router-dom";
const styles = {
  root: {
    background: "transparent",
  },
  input: {
    color: "#161718",
  },
  cssLabel: {
    color: "#161718",
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `#161718`,
    },
    color: "#161718",
  },

  cssFocused: {
    color: "#161718",
  },

  notchedOutline: {
    borderWidth: "2px",
    borderColor: "#161718 !important",
  },
};

const ResponseForm = ({ questions, slam_id, classes }) => {
  const [responses, setResponses] = useState(null);
  const [answeredCounter, setAnsweredCounter] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = (index) =>
    setResponses([
      ...responses.map((v, i) =>
        i === index ? { ...v, isOpen: !v.isOpen } : { ...v, isOpen: false }
      ),
    ]);

  const handleChange = (e, question, remainSilent = false) => {
    setResponses([
      ...responses.map((v) =>
        v.question === question
          ? { ...v, remainSilent: remainSilent, answer: e.target.value }
          : { ...v }
      ),
    ]);
  };

  const handleSubmit = () => {
    let q = responses;
    q.forEach((v) => {
      if (v?.answer?.length) {
        v.remainSilent = false;
      }
      delete v.isOpen;
    });
    const payload = {
      questions: q,
      slam_id,
      enqueueSnackbar,
    };
    submitResponseAPI(payload);
  };

  const next = (i) => {
    let temp = [...responses];
    temp[i] = { ...temp[i], isOpen: false };
    temp[i + 1] = { ...temp[i + 1], isOpen: true };
    setResponses(temp);
  };

  useEffect(() => {
    if (responses) {
      let counter = 0;
      responses.forEach((r) => {
        if (r?.answer?.length >= 0 || r.remainSilent) {
          counter++;
        }
      });
      setAnsweredCounter(counter);
    }
  }, [responses]);

  useEffect(() => {
    if (questions)
      setResponses(
        questions.map((v, i) =>
          i === 0 ? { ...v, isOpen: true } : { ...v, isOpen: false }
        )
      );
  }, []);

  return (
    <div className="col-md-6 col-sm-10 ">
      {responses ? (
        <h5>
          {answeredCounter} of {responses.length} Questions Answered{" "}
        </h5>
      ) : null}
      {responses
        ? responses.map((v, i) => {
            return (
              <div
                className="row border m-2 py-3  shadow shadom-sm border-dark rounded"
                key={`${i + i ** 2}`}
              >
                <div className="col-1">
                  <h6 className="font-weight-bold text-right cursor-pointer">
                    {i + 1}
                  </h6>
                </div>
                <div className="col-11">
                  <h6
                    className="font-weight-bold cursor-pointer"
                    onClick={(e) => handleClose(i)}
                  >
                    {v.question}
                  </h6>
                  {v.isOpen ? (
                    <>
                      {" "}
                      <FormControl
                        className={`py-3 ${isMobile ? "w-100" : "w-75"}`}
                      >
                        <TextField
                          disabled={v.remainSilent}
                          variant="outlined"
                          value={v.answer}
                          multiline
                          label="Answer"
                          name="answer"
                          className={`my-2 w-100 ${classes.root}`}
                          InputLabelProps={{
                            classes: {
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                            },
                          }}
                          InputProps={{
                            classes: {
                              root: classes.cssOutlinedInput,
                              focused: classes.cssFocused,
                              notchedOutline: classes.notchedOutline,
                            },
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                className="cursor-pointer"
                                onClick={(e) => next(i)}
                              >
                                <SendIcon className="text-dark" />
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) => handleChange(e, v.question)}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={v?.remainSilent ? v.remainSilent : false}
                              onChange={(e) =>
                                handleChange(e, v.question, !v.remainSilent)
                              }
                              name="unAnswered"
                            />
                          }
                          label="I choose my right to remain silent."
                        />
                      </FormControl>
                    </>
                  ) : null}
                </div>
              </div>
            );
          })
        : null}
      <div className="row pb-5">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <button
            className="btn btn-sm btn-success mx-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="btn btn-sm btn-danger mx-2"
            onClick={() => <Redirect to="/" />}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(ResponseForm);
