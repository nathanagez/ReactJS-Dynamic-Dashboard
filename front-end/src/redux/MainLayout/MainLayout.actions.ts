import {
	IS_NOT_VALID,
	IS_VALID,
	CHECK_TOKEN,
	NO_TOKEN
} from "./MainLayout.types";

import {LOG_IN_SUCCESS} from '../login/login.types';
import axios from "axios";

export const checkToken = () => {
	return (dispatch: any) => {
		dispatch({ type: CHECK_TOKEN });
		const token = window.localStorage.getItem("token");
		if (token) {
			axios
				.get(`${process.env.REACT_APP_BASEURL}/user`, {
					headers: {
						"Authorization": token
					}
				})
				.then(res => {
                    dispatch({
						type: LOG_IN_SUCCESS,
						payload: res.data.userData
					});
					dispatch({
						type: IS_VALID,
						payload: res.data.userData
					});
				})
				.catch(err => {
					dispatch({
						type: IS_NOT_VALID
					});
				});
		} else {
			dispatch({ type: NO_TOKEN });
		}
	};
};
