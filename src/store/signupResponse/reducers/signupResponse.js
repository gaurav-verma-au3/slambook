const signupResponseReducer = (
  signupResponse = {
    error: false,
    message: null,
  },
  action
) => {
  if (action.type === "UPDATE_SIGNUP_RESPONSE") {
    return (signupResponse = action.payload);
  }

  if (action.type === "CLEAR_SIGNUP_RESPONSE") {
    return (signupResponse = {
      error: false,
      message: null,
    });
  }

  return signupResponse;
};

export default signupResponseReducer;
