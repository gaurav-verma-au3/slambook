import {
  addEntryAPI,
  fetchAllEntries,
  deleteEntryAPI,
  updateEntryAPI,
} from "../../api/slamEntriesAPI";

const slamEntriesReducer = (slamEntries = [], action) => {
  if (action.type === "FETCH_ENTRIES") {
    const { payload, enqueueSnackbar } = action.payload;
    fetchAllEntries(payload, enqueueSnackbar);
  }
  if (action.type === "ADD_ENTRY") {
    console.log("in reducer");
    const {
      name,
      custom_bg,
      message,
      isLoggedIn,
      enqueueSnackbar,
    } = action.payload;
    addEntryAPI(name, custom_bg, message, isLoggedIn, enqueueSnackbar);
  }
  if (action.type === "DELETE_ENTRY") {
    const { _id, isLoggedIn, enqueueSnackbar } = action.payload;
    deleteEntryAPI(_id, isLoggedIn, enqueueSnackbar);
  }
  if (action.type === "UPDATE_ENTRY") {
    const {
      _id,
      name,
      custom_bg,
      message,
      isLoggedIn,
      enqueueSnackbar,
    } = action.payload;
    updateEntryAPI(_id, message, custom_bg, name, isLoggedIn, enqueueSnackbar);
  }
  if (action.type === "UPDATE_ENTRIES_IN_STORE") {
    slamEntries = action.payload;
  }

  return slamEntries;
};

export default slamEntriesReducer;
