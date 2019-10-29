import { LOGGIN_IN, LOG_IN_SUCCESS, LOG_IN_FAILED, LOG_OUT } from "./login.types";
import axios from "axios";
export const logUserIn = (data: { email: String; password: String }) => {
	return (dispatch: any) => {
		dispatch({ type: LOGGIN_IN });
		axios
			.post("http://localhost:5000/login", {
				email: data.email,
				password: data.password
			})
			.then(res => {
				window.localStorage.setItem('token', res.data.token);
				dispatch({
					type: LOG_IN_SUCCESS,
					payload: res.data
				});
			})
			.catch(err => {
				dispatch({
					type: LOG_IN_FAILED
				});
			});
	};
};

export const logUserOut = () => {
	window.localStorage.removeItem('token');
	return {
		type: LOG_OUT
	};
}
