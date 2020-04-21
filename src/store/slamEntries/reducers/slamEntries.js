import {
  addEntryAPI,
  fetchAllEntries,
  deleteEntryAPI,
  updateEntryAPI,
} from "../../api/slamEntriesAPI";

const slamEntriesReducer = (slamEntries = [], action) => {
  if (action.type === "FETCH_ENTRIES") {
    const { payload } = action.payload;
    fetchAllEntries(payload);
  }
  if (action.type === "ADD_ENTRY") {
    const { name, custom_bg, message } = action.payload;
    addEntryAPI(name, custom_bg, message);
  }
  if (action.type === "DELETE_ENTRY") {
    const { _id, isLoggedIn } = action.payload;
    deleteEntryAPI(_id, isLoggedIn);
  }
  if (action.type === "UPDATE_ENTRY") {
    const { _id, isLoggedIn } = action.payload;
    updateEntryAPI(_id, isLoggedIn);
  }
  if (action.type === "UPDATE_ENTRIES_IN_STORE") {
    slamEntries = action.payload;
  }

  return slamEntries;
};

export default slamEntriesReducer;
