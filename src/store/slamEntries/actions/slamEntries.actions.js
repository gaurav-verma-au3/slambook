export const fetchEntries = (isLoggedIn) => {
  return {
    type: "FETCH_ENTRIES",
    payload: isLoggedIn,
  };
};
export const addEntry = (payload) => {
  return {
    type: "ADD_ENTRY",
    payload: payload,
  };
};
export const deleteEntry = (payload) => {
  return {
    type: "DELETE_ENTRY",
    payload: payload,
  };
};
export const updateEntry = (payload) => {
  return {
    type: "UPDATE_ENTRY",
    payload: payload,
  };
};

export const markFavourite = (payload) => {
  return {
    type: "MARK_FAVOURITE",
    payload,
  };
};

export const clearEntries = () => {
  return {
    type: "CLEAR_ENTRY",
  };
};

export const updateEntriesInStore = (payload) => {
  return {
    type: "UPDATE_ENTRIES_IN_STORE",
    payload: payload,
  };
};
