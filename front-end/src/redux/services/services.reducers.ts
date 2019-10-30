import { ADD_SERVICE, ADD_SERVICE_SUCCESS, ADD_SERVICE_FAILED, GET_SERVICES, GET_SERVICES_SUCCESS } from "./services.types";

const INITIAL_STATE = {
    saved: false,
    loading: false,
	name: null,
	services: []
};

export default (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case ADD_SERVICE:
			return { ...state, loading: true};
		case ADD_SERVICE_SUCCESS:
			return { ...state, saved: true, name: action.payload, loading: false};
		case ADD_SERVICE_FAILED:
			return { ...state, saved: false, name: null, loading: false};
		case GET_SERVICES:
			return { ...state, saved: false, loading: true};
		case GET_SERVICES_SUCCESS:
				return { ...state, saved: false, services: action.payload, loading: false};
		default:
			return state;
	}
};
