import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Redirect } from "react-router-dom";
import { handleNotification } from "../utils";
const AuthRedirect = () => {
  const { enqueueSnackbar } = useSnackbar();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    console.log(!isLoggedIn.success);
    if (!isLoggedIn.success)
      handleNotification(enqueueSnackbar, "Please Login First !", "error");
  }, [isLoggedIn]);

  return <div>{!isLoggedIn.success ? <Redirect to="/login" /> : null}</div>;
};

export default AuthRedirect;
