import './index.css';
import {
    popupFormEditProfile,
    popupFormAddCard,
    popupFormUpdateAvatar,
    buttonEditProfile,
    buttonAddCard,
    nameInput,
    jobInput,
    buttonConfirm,
    profileText,
    profileHeading,
    profileAvatar,
    buttonAvatar,
    buttonDelete
} from '../scripts/utils.js';
import Card from '../components/Card.js';
import { config } from '../scripts/utils.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupForDeleteCard from '../components/PopupForDeleteCard';
// import indexOf from 'core-js/fn/array/index-of';
import Api from '../components/Api';

//Валидация
const popupValidationEditProfile = new FormValidator(config, popupFormEditProfile);
popupValidationEditProfile.enableValidation();

const popupValidationAddCard = new FormValidator(config, popupFormAddCard);
popupValidationAddCard.enableValidation();

const popupValidationUpdateAvatar = new FormValidator(config, popupFormUpdateAvatar);
popupValidationUpdateAvatar.enableValidation();

let userId

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
        authorization: '81bb1163-42bc-4044-b403-05dff297282e',
        'Content-Type': 'application/json'
    }
});

//Функция открытия полноэкранной картинки
const popupOpenImage = new PopupWithImage('.popup_full-size');
popupOpenImage.setEventListeners();

function handleCardClick(name, link) {
    popupOpenImage.open(name, link);
}

//Событие по клику кнопки редактирования
buttonAddCard.addEventListener('click', () => {
    popupValidationAddCard.resetValidation();
    popupFormAddCard.reset();
    popupAddCardForm.open();
});

//Закрытие попапа редактирования по кнопке "Сохранить"
const handleEditFormSubmit = (data) => {
    api.setUserInfoApi(data.name, data.job)
        .then((res) => {
            userInfo.setUserInfo(res);
            profileText.textContent = res.about;
            profileHeading.textContent = res.name;
        })
        .catch(() => {
            console.log('error');
        })
        .finally(() => {
            popupEditForm.loadingButton()
        })
}

const popupEditForm = new PopupWithForm('.popup_edit-profile', handleEditFormSubmit);
popupEditForm.setEventListeners();

//Установка инфо профиля
const userInfo = new UserInfo({ name: '.profile__heading', job: '.profile__text', avatar: '.profile__avatar' });

//Вставка карточек в разметку
const cardList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
    }},'.elements');


//Создание новой карточки
let card
const createCard = (data) => {
    card = new Card({
        data,
        handleCardClick, 
        addLikesApi, 
        deleteLikesApi,
        handleDeleteCard
    }, '#elements__card', userId);
    const cardElement = card.generateCard();
    return cardElement;
};

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
        userId = res._id;
    })
    .catch(() => {
        console.log('error');
    })

//Событие по кнопке редактирования профиля
buttonEditProfile.addEventListener('click', () => {
    popupValidationEditProfile.resetValidation();

    const info = userInfo.getUserInfo();
    nameInput.value = info.userName;
    jobInput.value = info.userJob;

    popupEditForm.open();
});

// Событие по клику на аватар
const popupChangeAvatar = new PopupWithForm('.popup__update-avatar', handleChangeAvatarSubmit);
popupChangeAvatar.setEventListeners();

buttonAvatar.addEventListener('click', () => {
    popupChangeAvatar.open();
    popupValidationUpdateAvatar.resetValidation();
    })

function handleChangeAvatarSubmit(item) {
    api.changeAvatar(item.avatar)
        .then((res) => {
            userInfo.setAvatar(res)
        })    
        .catch(() => {
            console.log('error');
        })
        .finally(() => {
            popupChangeAvatar.loadingButton()
        })
    }

//Открытие попапа добавления карточки, навешивание закрытия
const popupAddCardForm = new PopupWithForm('.popup_add-card', handleAddFormSubmit);
popupAddCardForm.setEventListeners();

//Добавление карточки из попапа
function handleAddFormSubmit(data) {
    api.getNewCard(data.place, data.link)
        .then((res) => {
            const cardElement = createCard(res);
            cardList.addItem(cardElement);

            popupAddCardForm.close();
        })
        .catch(() => {
            console.log('Ошибка');
        })
        .finally(() => {
            popupAddCardForm.loadingButton()
        })
};

//Добавление карточек из массива
api.getInitialCards()
    .then((cards) => {
        cards.reverse();
        cardList.renderItem(cards);
    })
//Удаление карточки
const popupConfirm = new PopupForDeleteCard('.popup__confirm');
popupConfirm.setEventListeners();

function handleDeleteCard(item) {
    const submitFormConfirm = () => {
        api.deleteCard(item.cardId)
        .then(() => {
            card.deleteCard();
        })
    };
    popupConfirm.setSubmitAction(submitFormConfirm);
    popupConfirm.open();
}


//Лайки
function addLikesApi(card) {
    api.addLike(card.cardId)
        .then((res) => {
            card.changeLikes(res);
        })
        .catch(() => {
            console.log('Ошибка');
        })
}
function deleteLikesApi(card) {
    api.removeLike(card.cardId)
        .then((res) => {
            card.changeLikes(res);
        })
        .catch(() => {
            console.log('Ошибка');
        })
}