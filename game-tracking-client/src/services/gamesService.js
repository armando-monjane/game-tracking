import { handleResponse, api } from './helpers';
import axios from "axios";

export const gamesService = {
    getGames,
    saveGame,
    updateGame,
    deleteGame,
    borrowGame,
    withdrawGame
};



function getGames() {

    var currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const options = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${currentUser?.data?.token}`
        }
    }

    return axios.get(`${api.endpoint}/games`, options)
                .then(response => {
                    return response.data;  
                }).catch((error) => {
                    handleResponse(error.response);
                    console.error(error);
                });
}


function saveGame(title, description, platform, launchDate) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${currentUser?.data?.token}`
        }
    }

    return axios.post(`${api.endpoint}/games`, JSON.stringify({title, description, platform, launchDate}), options)
                .then(response => response)
                .catch((error) => {
                    console.log(error);
                    handleResponse(error.response);
                });
}

function updateGame(id, title, description, platform, launchDate) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${currentUser?.data?.token}`
        }
    }

    return axios.put(`${api.endpoint}/games/${id}`, JSON.stringify({title, description, platform, launchDate}) ,options)
                .then(response => response).catch((error) => {
                    console.log(error);
                });

}


function deleteGame(id) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${currentUser?.data?.token}`
        }
    }

    return axios.delete(`${api.endpoint}/games/${id}`, options)
                .then(response => response)
                .catch((error) => {
                    handleResponse(error.response);
                    console.log(error);
                });

}

function borrowGame(gameId, friendId) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${currentUser?.data?.token}`
        }
    }

    return axios.post(`${api.endpoint}/loans`, JSON.stringify({gameId, friendId}), options)
                .then(response => response)
                .catch((error) => {
                    handleResponse(error.response);
                    console.log(error);
                });
}

function withdrawGame(loanId, gameId, friendId) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${currentUser?.data?.token}`
        }
    }

    return axios.put(`${api.endpoint}/loans/${loanId}`, JSON.stringify({gameId, friendId, status: "Devolvido"}), options)
                .then(response => response)
                .catch((error) => {
                    handleResponse(error.response);
                    console.log(error);
                });
}


