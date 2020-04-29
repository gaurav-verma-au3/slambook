const isLoggedInReducer = (
  isLoggedIn = {
    success: null,
    error: null,
  },
  action
) => {
  if (action.type === "UPDATE_LOGGEDIN_USER") {
    return (isLoggedIn = action.payload);
  }

  if (action.type === "RE_UPDATED_LOGGEDIN_USER") {
    const { name, email } = action.payload;

    return (isLoggedIn = {
      ...isLoggedIn,
      name,
      email,
    });
  }
  if (action.type === "UPDATE_QUESTIONS") {
    return (isLoggedIn = {
      ...isLoggedIn,
      questions: action.payload,
    });
  }
  if (action.type === "LOGOUT") {
    localStorage.clear();
    return (isLoggedIn = {
      success: null,
      error: null,
    });
  }

  return isLoggedIn;
};

export default isLoggedInReducer;
