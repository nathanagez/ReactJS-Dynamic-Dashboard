import axios from "axios";
import {
	ADD_SERVICE,
	ADD_SERVICE_SUCCESS,
	ADD_SERVICE_FAILED,
	GET_SERVICES,
	GET_SERVICES_SUCCESS
} from "./services.types";

interface ISaveServiceParams {
	serviceToken: String;
	serviceName: String;
}

export const saveOfficeToken = (code: any) => {
	return (dispatch: any) => {
		const token: String | null = window.localStorage.getItem("token");
		axios
			.post(
				"http://localhost:5000/add_office",
				{ code },
				{
					headers: {
						Authorization: token
					}
				}
			)
			.then(res => {
				console.log(res);
				dispatch({
					type: GET_SERVICES_SUCCESS,
					payload: res.data
				});
			})
			.catch(err => {
				console.log(err.response);
				dispatch({
					type: ADD_SERVICE_FAILED
				});
			});
	};
};

export const saveServiceToken = ({
	serviceToken,
	serviceName
}: ISaveServiceParams) => {
	return (dispatch: any) => {
		dispatch({ type: ADD_SERVICE });
		const token: String | null = window.localStorage.getItem("token");
		axios
			.post(
				"http://localhost:5000/add_service",
				{ serviceName, serviceToken },
				{
					headers: {
						Authorization: token
					}
				}
			)
			.then(res => {
				console.log(res);
				dispatch({
					type: GET_SERVICES_SUCCESS,
					payload: res.data
				});
			})
			.catch(err => {
				console.log(err.response);
				dispatch({
					type: ADD_SERVICE_FAILED
				});
			});
	};
};

export const getServices = () => {
	return (dispatch: any) => {
		const token: String | null = window.localStorage.getItem("token");
		dispatch({ type: GET_SERVICES });
		axios
			.get("http://localhost:5000/services", {
				headers: {
					Authorization: token
				}
			})
			.then(res => {
				console.log(res);
				dispatch({ type: GET_SERVICES_SUCCESS, payload: res.data });
			})
			.catch(err => {
				console.log(err);
			});
	};
};
