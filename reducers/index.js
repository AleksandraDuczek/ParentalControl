import {LOGIN_SUCCESS} from '../actions';

const newState = {
	user: {
		loggedIn: false,
	}
};

const userReducer = (state = newState, action = {}) => {
	if (action.type === LOGIN_SUCCESS) {
		return { ...state, loggedIn: true}
	} else {
		return state;
	}
};

export default userReducer;