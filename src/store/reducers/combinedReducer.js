import { combineReducers } from "redux";
import isLoggedInReducer from "../isLoggedIn/reducers/isLoggedIn";
const combinedReducers = combineReducers({
  isLoggedIn: isLoggedInReducer,
});
export default combinedReducers;
