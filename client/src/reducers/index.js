import { combineReducers } from "redux";
import ratings from "./ratings"
import authentication from "./authentication"

export default combineReducers({
    ratings,
    authentication
});
