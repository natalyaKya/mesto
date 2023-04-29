import './index.css';
import { initialCards, popupFormEditProfile, popupFormAddCard, buttonEditProfile, buttonAddCard, nameInput, jobInput } from '../scripts/utils.js';
import Card from '../components/Card.js';
import { config } from '../scripts/utils.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';


//Валидация
const popupValidationEditProfile = new FormValidator (config, popupFormEditProfile);
popupValidationEditProfile.enableValidation();

const popupValidationAddCard =  new FormValidator (config, popupFormAddCard);
popupValidationAddCard.enableValidation();

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
        handleCardClick
    }, '#elements__card');
    const cardElement = card.generateCard();

    return cardElement;
};

const cardList = new Section ({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        
        cardList.addItem(cardElement);
    }},
    '.elements'
);

cardList.renderItem();

//Добавление карточки из попапа
const handleAddFormSubmit = (data) => {
    data.name = data.place;
    const cardElement = createCard(data);
    cardList.addItem(cardElement);
    
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