import { combineReducers } from "redux";
import isLoggedInReducer from "../isLoggedIn/reducers/isLoggedIn";
import slamEntriesReducer from "../slamEntries/reducers/slamEntries";
const combinedReducers = combineReducers({
  isLoggedIn: isLoggedInReducer,
  slamEntries: slamEntriesReducer,
});
export default combinedReducers;
