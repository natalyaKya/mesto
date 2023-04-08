import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { config } from './utils.js';
import FormValidator from './FormValidator.js';


//Popup elements
const popupList = document.querySelectorAll('.popup');
const popupForms = document.querySelectorAll('.popup__form');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
export const popupFullImage = document.querySelector('.popup_full-size');

const popupFormEditProfile = document.querySelector('.popup__form-edit-profile');
const popupFormAddCard = document.querySelector('.popup__form-add-card');

const popupValidationEditProfile = new FormValidator (config, popupFormEditProfile);
const popupValidationAddCard =  new FormValidator (config, popupFormAddCard);

//Cards section
const cardTemplate = document.querySelector('#elements__card').content.querySelector('.elements__card');
const cardsConteiner = document.querySelector('.elements');

//Buttons
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonsClosePopupList = document.querySelectorAll('.popup__close-button');
const buttonEdit = document.querySelector('.popup__button-edit');
const buttonCard = document.querySelector('.popup__button-card');

//Popup inputs
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');

//Edit profile inputs
const nameProfile = document.querySelector('.profile__heading');
const jobProfile = document.querySelector('.profile__text');

//Add card inputs
const placeInput = document.querySelector('.popup__text_type_place');
const linkInput = document.querySelector('.popup__text_type_link');

//Full size elements
export const imageFullSize = document.querySelector('.popup__image');
export const captionPopupFull = document.querySelector('.popup__caption');

//Open popup
export function openPopup (item){
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

function openPopupEditProfile (){
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    popupValidationEditProfile.resetValidation();
    openPopup(popupEditProfile);
};

buttonEditProfile.addEventListener('click', openPopupEditProfile);

function openPopupAddCard () {
    placeInput.value = '';
    linkInput.value = '';
    popupValidationAddCard.resetValidation();
    openPopup(popupAddCard);
};

buttonAddCard.addEventListener('click', openPopupAddCard);

//Close popup
function closePopup (item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
};

buttonsClosePopupList.forEach(item => {
    const el = item.closest('.popup');
    item.addEventListener('click', function(){
        closePopup(el);
    });
});

//Close popup by Escape
function closePopupEsc (e){
    if (e.key === 'Escape') {
        const popup = document.querySelector('.popup_opened')
        closePopup(popup);
      }
};

//Close popup by click overlay
function closePopupOverlay (e){
    if (e.target.classList.contains('popup_opened')) {
        const popup = document.querySelector('.popup_opened')
        closePopup(popup);
      }
};

popupList.forEach((item) => {
    item.addEventListener('click', closePopupOverlay); 
});

//Send edit profile popup
function handleProfileFormSubmit (event) {
    event.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup(popupEditProfile);
}

popupFormEditProfile.addEventListener('submit', handleProfileFormSubmit);

//Add inital cards
initialCards.forEach((item) => {
    const card = new Card (item.name, item.link);
    const cardElement = card.generateCard();
  
    document.querySelector('.elements').append(cardElement);
  }); 

//Create card
function handleCardFormSubmit (event) {
    event.preventDefault();
    
    const newCard = new Card (placeInput.value, linkInput.value);
    const cardElement = newCard.generateCard();

    document.querySelector('.elements').prepend(cardElement);
    closePopup(popupAddCard);                 
}

popupFormAddCard.addEventListener('submit', handleCardFormSubmit);

//Validation
popupForms.forEach((item) => {
    const validator = new FormValidator (config, item);
    validator.enableValidation();
});