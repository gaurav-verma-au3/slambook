export const updateLoggedInUser = (payload) => {
  return {
    type: "UPDATE_LOGGEDIN_USER",
    payload: payload,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const reUpdateLoggedInUser = (payload) => {
  return {
    type: "RE_UPDATED_LOGGEDIN_USER",
    payload: payload,
  };
};

export const updateQuestions = (payload) => {
  return {
    type: "UPDATE_QUESTIONS",
    payload,
  };
};
