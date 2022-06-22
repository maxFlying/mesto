export class Api {
  constructor() {

  }

  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-43/users/me', {
      method: 'GET',
        headers: {
          authorization: '02a71f6f-2ada-48d2-887a-7441d08e7ada',
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`); 
    })
  }

  getDefaultCard() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-43/cards', {
      method: 'GET',
        headers: {
          authorization: '02a71f6f-2ada-48d2-887a-7441d08e7ada',
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`); 
    })
  }

  editUserInfo(name, job) {
    return fetch('https://nomoreparties.co/v1/cohort-43/users/me', {
      method: 'PATCH',
        headers: {
          authorization: '02a71f6f-2ada-48d2-887a-7441d08e7ada',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`); 
    })
  }
  
  addUserCard(item) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-43/cards', {
      method: 'POST',
        headers: {
          authorization: '02a71f6f-2ada-48d2-887a-7441d08e7ada',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: item.input_title,
        link: item.input_link
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`); 
    })
  }

  deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-43/cards/${cardId}`, {
      method: 'DELETE',
        headers: {
          authorization: '02a71f6f-2ada-48d2-887a-7441d08e7ada',
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`); 
    })
  }

  addLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-43/cards/${cardId}/likes`, {
      method: 'PUT',
        headers: {
          authorization: '02a71f6f-2ada-48d2-887a-7441d08e7ada',
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`); 
    })
  }

  removeLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-43/cards/${cardId}/likes`, {
      method: 'DELETE',
        headers: {
          authorization: '02a71f6f-2ada-48d2-887a-7441d08e7ada',
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`); 
    })
  }


}
