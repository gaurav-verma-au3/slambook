import { API_ORIGIN_URL } from "../../config";
import { store } from "../index";
import { updateEntriesInStore } from "../slamEntries/actions/slamEntries.actions";
import { handleNotification } from "../../utils";
export const addEntryAPI = (
  name,
  custom_bg,
  message,
  isLoggedIn,
  enqueueSnackbar
) => {
  const { token } = isLoggedIn;
  const url = `${API_ORIGIN_URL}/slam`;
  const body = {
    name,
    message,
    questions: isLoggedIn.questions,
    custom_bg,
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const variant = data.error ? "error" : "success";
      //notistack
      handleNotification(enqueueSnackbar, data.message, variant);
      //update categories
      fetchAllEntries(isLoggedIn, enqueueSnackbar);
    });
};

export const deleteEntryAPI = (_id, isLoggedIn, enqueueSnackbar) => {
  const { token } = isLoggedIn;
  const url = `${API_ORIGIN_URL}/slam/delete`;
  const body = {
    _id,
  };
  fetch(url, {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      handleNotification(enqueueSnackbar, "Slam Entry Deleted", "error");
      fetchAllEntries(isLoggedIn, enqueueSnackbar);
    });
};

export const updateEntryAPI = (
  _id,
  message,
  custom_bg,
  name,
  isLoggedIn,
  enqueueSnackbar
) => {
  const { token } = isLoggedIn;
  const url = `${API_ORIGIN_URL}/slam/edit`;
  const body = {
    _id,
    message,
    custom_bg,
    name,
  };
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      fetchAllEntries(isLoggedIn, enqueueSnackbar);
    });
};

export const fetchAllEntries = (isLoggedIn, enqueueSnackbar) => {
  const { token } = isLoggedIn;
  const url = `${API_ORIGIN_URL}/slam/all`;
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const variant = data.error ? "error" : "success";
      // handleNotification(enqueueSnackbar, data.message, variant);
      //notistack
      store.dispatch(updateEntriesInStore(data.slams));
    });
};

export const getSlamDetailsAPI = async (_id, isLoggedIn, enqueueSnackbar) => {
  const { token, _id: owner_id } = isLoggedIn;
  const url = `${API_ORIGIN_URL}/slam/details/${owner_id}/${_id}`;
  const data = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const slamDetails = await data.json();
  const variant = data.error ? "error" : "success";
  handleNotification(enqueueSnackbar, "Slam Loaded", variant);
  return slamDetails;
};

export const markFavouriteAPI = ({
  _id,
  isFavourite,
  isLoggedIn,
  enqueueSnackbar,
}) => {
  const { token } = isLoggedIn;
  const url = `${API_ORIGIN_URL}/slam/markfavourite`;
  const body = {
    _id,
    isFavourite,
  };
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      //notistack

      fetchAllEntries(isLoggedIn, enqueueSnackbar);
    });
};
