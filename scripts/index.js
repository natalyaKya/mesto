import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { config } from './utils.js';
import FormValidator from './FormValidator.js';

//Popup elements
const popupList = document.querySelectorAll('.popup');
const popupForms = document.querySelectorAll('.popup__form');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupFullImage = document.querySelector('.popup_full-size');

const popupFormEditProfile = document.querySelector('.popup__form-edit-profile');
const popupFormAddCard = document.querySelector('.popup__form-add-card');

const popupValidationEditProfile = new FormValidator (config, popupFormEditProfile);
popupValidationEditProfile.enableValidation();
const popupValidationAddCard =  new FormValidator (config, popupFormAddCard);
popupValidationAddCard.enableValidation();

//Cards section
// const cardTemplate = document.querySelector('#elements__card').content.querySelector('.elements__card');
const cardsConteiner = document.querySelector('.elements');

//Buttons
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
// const buttonsClosePopupList = document.querySelectorAll('.popup__close-button');
// const buttonEdit = document.querySelector('.popup__button-edit');
// const buttonCard = document.querySelector('.popup__button-card');

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
const imageFullSize = document.querySelector('.popup__image');
const captionPopupFull = document.querySelector('.popup__caption');

//Open popup
function openPopup (item){
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

function handleCardClick () {
    imageFullSize.src = this.link;
    captionPopupFull.textContent = this.name;
    imageFullSize.alt = this.name;
    
    openPopup(popupFullImage);
  }

//Close popup
function closePopup (item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
};

//Close popup by Escape
function closePopupEsc (e){
    if (e.key === 'Escape') {
        const popup = document.querySelector('.popup_opened')
        closePopup(popup);
      }
};

//Close popup by click overlay/button
popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    })
})

//Send edit profile popup
function handleProfileFormSubmit (event) {
    event.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup(popupEditProfile);
}

popupFormEditProfile.addEventListener('submit', handleProfileFormSubmit);

//Create card
function createCard(item) {
    const card = new Card (item.name, item.link, '#elements__card', handleCardClick);
    const cardElement = card.generateCard();

    return cardElement;
}

//Add inital cards
initialCards.forEach((item) => {
    const cardElement = createCard(item);
    cardsConteiner.append(cardElement);
  }); 

function handleCardFormSubmit (event) {
    event.preventDefault();
    const cardElement = createCard({name: placeInput.value, link: linkInput.value});

    cardsConteiner.prepend(cardElement);
    closePopup(popupAddCard);                 
}

popupFormAddCard.addEventListener('submit', handleCardFormSubmit);