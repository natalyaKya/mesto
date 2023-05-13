import './index.css';
import { 
    popupFormEditProfile, 
    popupFormAddCard, 
    buttonEditProfile, 
    buttonAddCard, 
    nameInput, 
    jobInput, 
    buttonConfirm, 
    profileText, 
    profileHeading,
    profileAvatar } from '../scripts/utils.js';
import Card from '../components/Card.js';
import { config } from '../scripts/utils.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
// import indexOf from 'core-js/fn/array/index-of';


//Валидация
const popupValidationEditProfile = new FormValidator (config, popupFormEditProfile);
popupValidationEditProfile.enableValidation();

const popupValidationAddCard =  new FormValidator (config, popupFormAddCard);
popupValidationAddCard.enableValidation();

//Открытие попапа согласия
const popupConfirm = new Popup ('.popup__confirm');
popupConfirm.setEventListeners();

// buttonConfirm.addEventListener('click', () => {
    
// });

function openConfirm () {
    popupConfirm.open ();
}

//Функция открытия полноэкранной картинки
const popupOpenImage = new PopupWithImage ('.popup_full-size');
popupOpenImage.setEventListeners();

function handleCardClick (name, link) {
    popupOpenImage.open(name, link);
}

//Добавление карточек из массива
const createCard = (item) => {
    const card = new Card ({
        data: item,
        handleCardClick,
        addLikesApi,
        openConfirm
    }, '#elements__card');
    const cardElement = card.generateCard();
    return cardElement;
};
function addLikesApi(item) {
    console.log(item);
    api.addLike(item.cardId)
        .then((res) => {
            // card.changeLikes(res);
        })
        .catch(() => {
            console.log('Ошибка');
        })
}
//Добавление карточки из попапа
const handleAddFormSubmit = (data) => {

    api.getNewCard(data.place, data.link)
        .then((res) => {
            // console.log(res);
            data.name = data.place;
            const cardElement = createCard(res);
            cardList.addItem(cardElement);
            
            popupAddCardForm.close();
        })
        .catch(() => {
            console.log('Ошибка');
        })

};

//Открытие попапа добавления карточки, навешивание закрытия
const popupAddCardForm = new PopupWithForm ('.popup_add-card', handleAddFormSubmit);
popupAddCardForm.setEventListeners();

//Событие по клику кнопки редактирования
buttonAddCard.addEventListener('click', () => {
    popupValidationAddCard.resetValidation();
    popupFormAddCard.reset();
    popupAddCardForm.open();
});

//Закрытие попапа редактирования по кнопке "Сохранить"
const handleEditFormSubmit = (data) => {
        api.setUserInfoApi(data.name, data.job)
            .then ((res) => {
                userInfo.setUserInfo(res)
            })

            .catch(() => {
                console.log('error');
            })
}

const popupEditForm = new PopupWithForm ('.popup_edit-profile', handleEditFormSubmit);
popupEditForm.setEventListeners();

//Установка инфо профиля
const userInfo = new UserInfo ({name:'.profile__heading', job:'.profile__text'});





class Api {
    constructor({baseUrl, headers}) {
      this.baseUrl = baseUrl;
      this.headers = headers
    }
    checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getUserInfo () {
        return fetch(`${this.baseUrl}/users/me`,{
            method: 'GET',
            headers: this.headers
        })
        .then (
            this.checkStatus
        )
    }
    getInitialCards () {
        return fetch(`${this.baseUrl}/cards`,{
            method: 'GET',
            headers: this.headers
        })
        .then (
            this.checkStatus
        ) 
    }
    setUserInfoApi (name, about) {
        return fetch(`${this.baseUrl}/users/me`,{
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify ({name, about})
        })
        .then (
            this.checkStatus
        ) 
    }
    getNewCard (name, link) {
        return fetch(`${this.baseUrl}/cards`,{
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify ({name, link})
        })
        .then (
            this.checkStatus
        ) 
    }
    addLike (id) {
        return fetch(`${this.baseUrl}/cards/${id}/likes`,{
            method: 'PUT',
            headers: this.headers
        })
        .then (
            this.checkStatus
        )
    }
    removeLike (id) {
        return fetch(`${this.baseUrl}/cards/${id}/likes`,{
            method: 'DELETE',
            headers: this.headers
        })
        .then (
            this.checkStatus
        )
    }
}
  const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-65',
    headers: {
      authorization: '7a81a52c-ec20-46bf-9ad5-f9d022a2ae27',
      'Content-Type': 'application/json'
    }
  });

//загрузка информации о пользователе с сервера

function getUser() {
    return new Promise((resolve, reject) => {
        resolve(api.getUserInfo());
    })
}
getUser()
    .then((res) => {
        profileText.textContent = res.about;
        profileHeading.textContent = res.name;
        profileAvatar.src = res.avatar;
    })
    .catch(() => {
        console.log('error');
    })

// Добавление карточек с сервера
let initialCards;

function getServerCards() {
    return new Promise((resolve, reject) => {
        resolve(api.getInitialCards());
    })
}
getServerCards()
    .then((res) => {
        initialCards = res;
        const cardList = new Section ({
            items: initialCards,
            renderer: (item) => {
                const cardElement = createCard(item);
                
                cardList.addItem(cardElement);
            }},
            '.elements'
        );
        
        cardList.renderItem();
        
    })

//Событие по кнопке редактирования профиля


buttonEditProfile.addEventListener('click', () => {
    popupValidationEditProfile.resetValidation();

    const info = userInfo.getUserInfo();
    nameInput.value = info.userName;
    jobInput.value = info.userJob;
    // postUserInfo(info)
    //     .then(res => res.json())
    //     .then((post) => {
    //       post.name = info.userName;
    //       post.about = info.userJob;
    //       console.log(post);
    //     })

    popupEditForm.open();
});









