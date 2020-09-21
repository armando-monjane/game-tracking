import { BehaviorSubject } from 'rxjs';
import { handleResponse, api } from './helpers';
import axios from "axios"

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
    };

    return axios.post(`${api.endpoint}/authenticate/login`, JSON.stringify({ username, password }), requestOptions)
                .then((response) => {

                    localStorage.setItem('currentUser', JSON.stringify(response));
                    currentUserSubject.next(response);

                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    handleResponse(error.response);
                });
}

function register(email, password, firstname, lastname) {

    const requestOptions = {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
    };

    return axios.post(`${api.endpoint}/authenticate/register`, JSON.stringify({ email, password, firstname, lastname }), requestOptions)
                .then((response) => response)
                .catch((error) => {
                    console.log(error);
                    handleResponse(error.response);
                });

}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}