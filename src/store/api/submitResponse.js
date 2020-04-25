import { API_ORIGIN_URL } from "../../config";
import { handleNotification } from "../../utils";

export const submitResponseAPI = ({ slam_id, questions, enqueueSnackbar }) => {
  const url = `${API_ORIGIN_URL}/fill/postresponse`;

  fetch(url, {
    method: "POST",
    body: JSON.stringify({ slam_id, questions }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => {
      const variant = data.error ? "error" : "success";
      handleNotification(enqueueSnackbar, data.message, variant);
    });
};
