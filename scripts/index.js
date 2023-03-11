//Popup elements
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupFullImage = document.querySelector('.popup_full-size');

const popupForm = document.querySelector('.popup__form');
const popupFormAddCard = document.querySelector('.popup__form-add-card');

//Cards section
const cardTemplate = document.querySelector('#elements__card');
const cardsConteiner = document.querySelector('.elements');

//Buttons
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonsClosePopup = document.querySelectorAll('.popup__close-button');

//Popup inputs
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');

//Edit profile inputs
const nameProfile = document.querySelector('.profile__heading');
const jobProfile = document.querySelector('.profile__text');

//Add card inputs
const placeInput = document.querySelector('.popup__text_type_place');
const linkInput = document.querySelector('.popup__text_type_link');

//Open popup
function openPopup (item){
    item.classList.add('popup_opened');
};

function openPopupEditProfile (){
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    
    openPopup(popupEditProfile);
};

buttonEditProfile.addEventListener('click', openPopupEditProfile);

function openPopupAddCard () {
    placeInput.value = '';
    linkInput.value = '';
    openPopup(popupAddCard);
};

buttonAddCard.addEventListener('click', openPopupAddCard);

//Close popup
function closePopup (item) {
    item.classList.remove('popup_opened');
};

buttonsClosePopup.forEach(item => {
    item.addEventListener('click', function(){
        const el = item.closest('.popup');
        closePopup(el);
    });
});

//Send edit profile popup
function handleFormSubmit (event) {
    event.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup(popupEditProfile);
}

popupForm.addEventListener('submit', handleFormSubmit);

//Cards
function createCard(card){
    const cardTemplate = document.querySelector('#elements__card').content.cloneNode(true);
    const captionCardTemplate = cardTemplate.querySelector('.elements__text');
    const imageCard = cardTemplate.querySelector('.elements__image');

    captionCardTemplate.textContent = card.name;
    imageCard.src = card.link;
    
    //Open in full size
    const imageFullSize = document.querySelector('.popup__image');
    const captionPopupFull = document.querySelector('.popup__caption');

    imageCard.addEventListener('click', () => {
        
        imageFullSize.src = imageCard.src;
        imageFullSize.alt = imageCard.alt;
        captionPopupFull.textContent = captionCardTemplate.textContent;

        openPopup(popupFullImage);   
    });

    //Delete card
    const buttonDeleteCard = cardTemplate.querySelector('.elements__delete');
    buttonDeleteCard.addEventListener('click', handleDeleteCard);
    
    //Like card
    const buttonLikeCard = cardTemplate.querySelector('.elements__button');
    buttonLikeCard.addEventListener('click', hadleLikeCard);

    return cardTemplate;
};

initialCards.forEach((card) => {
    cardsConteiner.append(createCard(card));
});

//Create card
function handleCardFormSubmit (event) {
    event.preventDefault();

    const newCard = {
        name: placeInput.value,
        link: linkInput.value
    }
  
    cardsConteiner.prepend(createCard(newCard));
    closePopup(popupAddCard);                 
}

popupFormAddCard.addEventListener('submit', handleCardFormSubmit);

//Delete card
function handleDeleteCard (event){
    const button = event.target;
    const cardDelete = button.closest('.elements__card')
    cardDelete.remove();
};

//Like card
function hadleLikeCard (event) {
    const button = event.target;
    button.classList.toggle('elements__button_active');
};