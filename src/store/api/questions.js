import { API_ORIGIN_URL } from "../../config";
import { updateQuestions } from "../isLoggedIn/actions/isLoggedIn.actions";
import { handleNotification } from "../../utils";

export const updateQuestionsAPI = ({
  questions,
  isLoggedIn,
  dispatch,
  enqueueSnackbar,
}) => {
  const url = `${API_ORIGIN_URL}/questions/update`;
  fetch(url, {
    method: "PUT",
    body: JSON.stringify({ questions }),
    headers: {
      Authorization: `Bearer ${isLoggedIn.token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        dispatch(updateQuestions(data.questions));
      }
      const variant = data.error ? "error" : "success";
      handleNotification(enqueueSnackbar, data.message, variant);
    });
};
