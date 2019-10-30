import { LOGGIN_IN, LOG_IN_FAILED, LOG_IN_SUCCESS, LOG_OUT } from "./login.types";

const INITIAL_STATE = {
	loading: false,
	user: null
};

export default (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case LOGGIN_IN:
			return { ...state, loading: true};
		case LOG_IN_SUCCESS:
			return { ...state, user: action.payload, loading: false };
		case LOG_IN_FAILED:
			return { ...state, user: null, loading: false};
		case LOG_OUT:
			return {...state, user: null}
		default:
			return state;
	}
};
