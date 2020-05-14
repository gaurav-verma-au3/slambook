import { API_ORIGIN_URL } from "../../config";
import {
  updateLoggedInUser,
  reUpdateLoggedInUser,
} from "../isLoggedIn/actions/isLoggedIn.actions";
import { handleNotification } from "../../utils";

export const login = (email, password, dispatch, enqueueSnackbar) => {
  let url = `${API_ORIGIN_URL}/auth/login`;
  let data = { email, password };
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => data.json())
    .then((data) => {
      const variant = data.error ? "error" : "success";
      const message = data.message;
      localStorage.setItem("auth_user_token", JSON.stringify(data));
      dispatch(updateLoggedInUser(data));
      handleNotification(enqueueSnackbar, message, variant);
    })
    .catch((error) =>
      handleNotification(enqueueSnackbar, "Server Error", "error")
    );
};

export const fetchProfile = (token, dispatch) => {
  const url = `${API_ORIGIN_URL}/profile`;
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => data.json())
    .then((result) => dispatch(reUpdateLoggedInUser(result)))
    .catch((err) => console.log(err));
};

export const updatePassword = (form, setResponse, token) => {
  const url = `${API_ORIGIN_URL}/profile`;

  fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      password: form.password,
    }),
  })
    .then((response) => response.json())
    .then((data) => setResponse(data));
};

export const updateBgAPI = (token, enqueueSnackbar, custom_bg) => {
  const url = `${API_ORIGIN_URL}/user/update-bg`;

  const body = {
    custom_bg,
  };

  fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      let { message, error } = data;
      let variant = error ? "error" : "success";
      // handleNotification(enqueueSnackbar, message, variant);
    });
};

export const updateProfile = (form, setResponse, token, dispatch) => {
  const url = `${API_ORIGIN_URL}/profile`;

  fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then((response) => response.json())
    .then((data) => {
      setResponse(data);
      fetchProfile(token, dispatch);
    });
};
