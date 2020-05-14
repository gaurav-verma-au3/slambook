import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { isMobile } from "react-device-detect";
import { useSelector, useDispatch } from "react-redux";
import AuthRedirect from "./AuthRedirect";
import { updateQuestionsAPI } from "../store/api/questions";
import { useSnackbar } from "notistack";
import { handleNotification } from "../utils";
import { TextField, InputAdornment, withStyles } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
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

const AddQuestions = ({ classes }) => {
  const { enqueueSnackbar } = useSnackbar();
  const questions = useSelector((state) => state.isLoggedIn.questions);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const [question, setQuestion] = useState(null);

  const reorder = (a, startIndex, endIndex) => {
    const result = Array.from(a);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    let finalComposedResult = result.map((v, idx) => {
      return { ...v, index: idx };
    });
    return finalComposedResult;
  };

  /*
   * Drag controller
   */
  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
    const content = reorder(
      questions,
      result.source.index,
      result.destination.index
    );

    let temp = content.map((c, idx) => ({
      question: c.question,
      index: idx,
    }));
    // console.table(temp);
    updateQuestionsAPI({
      isLoggedIn,
      questions: temp,
      enqueueSnackbar,
      dispatch,
    });
  };

  const handleRemove = (i) => {
    let newQuestions = [...questions];
    newQuestions.splice(i, 1);
    newQuestions = newQuestions.map((v, idx) => ({ ...v, index: idx }));
    updateQuestionsAPI({
      isLoggedIn,
      questions: newQuestions,
      enqueueSnackbar,
      dispatch,
    });
  };
  const handleAdd = (question) => {
    if (!question || question.length < 1) {
      handleNotification(
        enqueueSnackbar,
        "Question can't be empty...",
        "error"
      );
    } else {
      let newQuestions = [...questions];
      let q = {
        question,
        index: questions.length,
      };
      newQuestions.push(q);
      updateQuestionsAPI({
        isLoggedIn,
        questions: newQuestions,
        enqueueSnackbar,
        dispatch,
      });
    }
  };

  return (
    <div className={`container-fluid px-0 ${isMobile ? "py-3" : "py-5"}`}>
      <AuthRedirect />
      <div className="row">
        <div className="col-12">
          <p className="text-center font-weight-bold">
            Drag and Drop questions To Arrange Order
          </p>
        </div>
        <div className="col-12 d-flex justify-content-center align-items-center">
          <div className="row  w-100 ">
            <div className="col-12">
              <TextField
                variant="outlined"
                required
                multiline
                className={`w-100 my-2 ${classes.root}`}
                label="Question"
                name="question"
                onChange={(e) => setQuestion(e.target.value)}
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
                    <InputAdornment position="end">
                      <AddBoxIcon
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdd(question);
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="container"
        style={
          isMobile
            ? {
                paddingBottom: "9vh",
              }
            : {}
        }
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => {
              return (
                <div className="row" ref={provided.innerRef}>
                  {questions &&
                    questions.map((q, i) => {
                      return (
                        <Draggable
                          key={q.question + i}
                          draggableId={q.question}
                          index={i}
                        >
                          {(provided, snapshot) => {
                            return (
                              <div
                                className="col-12 d-flex justify-content-center  align-items-center"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="row w-100">
                                  <div className="col-1 col-xs-1 d-flex font-weight-bolder justify-content-center">
                                    <p className="m-0 my-2 question-list">
                                      {i + 1}.
                                    </p>
                                  </div>
                                  <div className="col-9 col-xs-8">
                                    <p
                                      className="m-0 my-2 question-list"
                                      key={q + i}
                                    >
                                      {q.question}
                                    </p>
                                  </div>
                                  <div className="col-1 col-xs-1 d-flex justify-content-center my-2">
                                    <HighlightOffIcon
                                      className="my-2 text-danger"
                                      onClick={(e) => handleRemove(i)}
                                      style={{ cursor: "pointer" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default withStyles(styles)(AddQuestions);
