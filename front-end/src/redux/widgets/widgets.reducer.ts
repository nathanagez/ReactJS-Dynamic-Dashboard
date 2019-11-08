import { CLOSE_WIDGET } from "./widgets.types";

const INITIAL_STATE = {
	id: null
};

export default (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case CLOSE_WIDGET:
			return { ...state, id: action.payload };
		default:
			return state;
	}
};
