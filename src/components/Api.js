export default class Api {
    constructor(options) {
        this.options = options;
        this.baseUrl = this.options.baseUrl;
        this.headers = this.options.headers;
    }
    checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
        .then(res => this.checkStatus(res))
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
        .then(res => this.checkStatus(res))
    }
    setUserInfoApi(name, about) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({ name, about })
        })
            .then(
                this.checkStatus
            )
    }
    getNewCard(name, link) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ name, link })
        })
        .then(res => this.checkStatus(res))
    }
    addLike(id) {
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this.headers
        })
        .then(res => this.checkStatus(res))
    }
    removeLike(id) {
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(res => this.checkStatus(res))
    }
    deleteCard(id) {
        return fetch(`${this.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(res => this.checkStatus(res))
    }
    changeAvatar(avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({ avatar })
        })
        .then(res => this.checkStatus(res))
    }
}