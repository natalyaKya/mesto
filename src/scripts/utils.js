export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
}; 

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Popup elements
// export const popupList = document.querySelectorAll('.popup');
// export const popupForms = document.querySelectorAll('.popup__form');
// export const popupEditProfile = document.querySelector('.popup_edit-profile');
// export const popupAddCard = document.querySelector('.popup_add-card');
// export const popupFullImage = document.querySelector('.popup_full-size');

export const popupFormEditProfile = document.querySelector('.popup__form-edit-profile');
export const popupFormAddCard = document.querySelector('.popup__form-add-card');


//Cards section
// const cardTemplate = document.querySelector('#elements__card').content.querySelector('.elements__card');
// export const cardsConteiner = document.querySelector('.elements');


//Buttons
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');
// const buttonsClosePopupList = document.querySelectorAll('.popup__close-button');
// const buttonEdit = document.querySelector('.popup__button-edit');
// const buttonCard = document.querySelector('.popup__button-card');

//Popup inputs
export const nameInput = document.querySelector('.popup__text_type_name');
export const jobInput = document.querySelector('.popup__text_type_job');

//Edit profile inputs
// export const nameProfile = document.querySelector('.profile__heading');
// export const jobProfile = document.querySelector('.profile__text');

//Add card inputs
// export const placeInput = document.querySelector('.popup__text_type_place');
// export const linkInput = document.querySelector('.popup__text_type_link');

//Full size elements
// export const imageFullSize = document.querySelector('.popup__image');
// export const captionPopupFull = document.querySelector('.popup__caption');