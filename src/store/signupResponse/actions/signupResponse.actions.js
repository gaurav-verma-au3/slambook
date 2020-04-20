export const updatesignupResponse = (payload) => {
  return {
    type: "UPDATE_SIGNUP_RESPONSE",
    payload: payload,
  };
};

export const clearSignupResponse = () => {
  return {
    type: "CLEAR_SIGNUP_RESPONSE",
  };
};
