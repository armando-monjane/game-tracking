import { handleResponse, api } from './helpers';
import axios from "axios";

export const friendsService = {
    getFriends,
    saveFriend,
    updateFriend,
    deleteFriend
};


function getFriends() {

    var currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const options = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${currentUser?.data?.token}`
        }
    }

    return axios.get(`${api.endpoint}/friends`, options)
                .then(response => {
                    return response.data;  
                }).catch((error) => {
                    console.error(error);
                    handleResponse(error.response);
                });;
}


function saveFriend(name) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${currentUser?.data?.token}`
        }
    }

    return axios.post(`${api.endpoint}/friends`, JSON.stringify({name}), options)
                .then(response => response)
                .catch((error) => {
                    console.error(error);
                    handleResponse(error.response);
                });
}


function updateFriend(id, name) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${currentUser?.data?.token}`
        }
    }

    return axios.put(`${api.endpoint}/friends/${id}`, JSON.stringify({name}) ,options)
                .then(response => response)
                .catch((error) => {
                    console.error(error);
                    handleResponse(error.response);
                });;

}


function deleteFriend(id) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${currentUser?.data?.token}`
        }
    }

    return axios.delete(`${api.endpoint}/friends/${id}`, options)
                .then(response => response)
                .catch((error) => {
                    console.error(error);
                    handleResponse(error.response);
                });

}


