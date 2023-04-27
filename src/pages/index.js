import './index.css';
import { initialCards, popupFormEditProfile, popupFormAddCard, buttonEditProfile, buttonAddCard, nameInput, jobInput } from '../blocks/scripts/utils.js';
import Card from '../blocks/scripts/components/Card.js';
import { config } from '../blocks/scripts/utils.js';
import FormValidator from '../blocks/scripts/components/FormValidator.js';
import Popup from '../blocks/scripts/components/Popup.js';
import Section from '../blocks/scripts/components/Section.js';
import PopupWithForm from '../blocks/scripts/components/PopupWithForm.js';
import PopupWithImage from '../blocks/scripts/components/PopupWithImage.js';
import UserInfo from '../blocks/scripts/components/UserInfo.js';


//Валидация
const popupValidationEditProfile = new FormValidator (config, popupFormEditProfile);
popupValidationEditProfile.enableValidation();

const popupValidationAddCard =  new FormValidator (config, popupFormAddCard);
popupValidationAddCard.enableValidation();

//Функция открытия полноэкранной картинки
function handleCardClick (name, link) {
    const popupOpenImage = new PopupWithImage ('.popup_full-size');
    popupOpenImage.open(name, link);
    
    popupOpenImage.setEventListeners();
}

//Добавление карточек из массива
const cardList = new Section ({
    items: initialCards,
    renderer: (item) => {
        const card = new Card ({
            data: item,
            handleCardClick
        }, '#elements__card');

        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }},
    '.elements'
);

cardList.renderItem();

//Добавление карточки из попапа
const handleAddFormSubmit = (data) => {
    data.name = data.place;
    const card = new Card ({data, handleCardClick}, '#elements__card');
    const cardElement = card.generateCard();
    document.querySelector('.elements').prepend(cardElement);
    
    popupAddCardForm.close();
}

//Открытие попапа добавления карточки, навешивание закрытия
const popupAddCardForm = new PopupWithForm ('.popup_add-card', handleAddFormSubmit);
popupAddCardForm.setEventListeners();

//Событие по клику кнопки редактирования
buttonAddCard.addEventListener('click', () => {
    popupValidationAddCard.resetValidation();
    popupFormAddCard.reset();
    popupAddCardForm.open();
});

//Открытие попапа редактирования, навешивание закрытия
const handleEditFormSubmit = (data) => {
    userInfo.setUserInfo(data);
}

const popupEditForm = new PopupWithForm ('.popup_edit-profile', handleEditFormSubmit);
popupEditForm.setEventListeners();

//Установка инфо профиля
const userInfo = new UserInfo ({name:'.profile__heading', job:'.profile__text'});

//Событие по кнопке добавления
buttonEditProfile.addEventListener('click', () => {
    popupValidationEditProfile.resetValidation();
    const info = userInfo.getUserInfo();
    nameInput.value = info.userName;
    jobInput.value = info.userJob;

    popupEditForm.open();
});