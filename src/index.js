import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";
import { SnackbarProvider } from "notistack";
import { isMobile } from "react-device-detect";
ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={isMobile ? 1000 : 1500}
      anchorOrigin={
        isMobile
          ? {
              vertical: "bottom",
              horizontal: "center",
            }
          : {
              vertical: "bottom",
              horizontal: "right",
            }
      }
    >
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
