import { combineReducers } from 'redux'
import login from "./login/login.reducers";
import checkAuth from "./MainLayout/MainLayout.reducers";
import services from "./services/services.reducers";
import widgets from "./widgets/widgets.reducer";

export default combineReducers({
    login,
    checkAuth,
    services,
    widgets
});