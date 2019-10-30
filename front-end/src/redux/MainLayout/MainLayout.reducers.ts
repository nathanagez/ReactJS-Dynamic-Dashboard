import {
	IS_NOT_VALID,
	IS_VALID,
	CHECK_TOKEN,
	NO_TOKEN
} from "./MainLayout.types";

const INITIAL_STATE = {
	userData: null
};

export default (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case CHECK_TOKEN:
			return { ...state};
		case IS_VALID:
			return { ...state, userData: action.payload};
		case IS_NOT_VALID:
			return { ...state, userData: null};
		case NO_TOKEN:
			return {...state, userData: null}
		default:
			return state;
	}
};
