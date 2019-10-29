import { combineReducers } from 'redux'
import login from "./login/login.reducers";

export default combineReducers({
    login: login
});