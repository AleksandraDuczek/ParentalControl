import * as firebase from 'firebase';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export function login(userCredentials) {
	if (!!firebase.auth().currentUser) {
		return {
			type: LOGIN_SUCCESS
		}
	} return {
		type: LOGIN_ERROR
	}
}
