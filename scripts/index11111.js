//Popup Edit variables
const editButton = document.querySelector('.profile__edit-button');
const form = document.querySelector('.popup__form');
const formConteiner = document.querySelector('.popup')

const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');

const profileName = document.querySelector('.profile__heading');
const profileJob = document.querySelector('.profile__text');

const closePopup = document.querySelector('.popup__close-icon');

//Popup-Add variables
const addButton = document.querySelector('.profile__add-button');

const formAdd = document.querySelector('.popup-add__admin');
const formConteinerAdd = document.querySelector('.popup-add')

const placeInput = document.querySelector('.popup-add__text_type_place');
const linkInput = document.querySelector('.popup-add__text_type_link');

const closePopupAdd = document.querySelectorAll('.popup-add__close-icon');

//Popup-Full-Image variables
const formFull = document.querySelector('.popup-full-image__admin');
const formConteinerFull = document.querySelector('.popup-full-image')
const closePopupFull = document.querySelector('.popup-full-image__close-icon');

const cardList = document.querySelector('.elements');

//Popup actions
// function popupOpen(){
//     formConteiner.classList.add('popup_opened');

//     nameInput.value = profileName.textContent;
//     jobInput.value = profileJob.textContent;
// }

// editButton.addEventListener('click', popupOpen);

// function popupClose(){
//     formConteiner.classList.remove('popup_opened');
// }

// closePopup.addEventListener('click', popupClose);

function handleFormSubmit (event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupClose();
}

form.addEventListener('submit', handleFormSubmit);

function createCard(card){
    const cardTemplate = document.querySelector('#elements__card').content.cloneNode(true);
    cardTemplate.querySelector('.elements__text').textContent = card.name;
    cardTemplate.querySelector('.elements__image').src = card.link;
    
    //Открытие в модальном окне
    const clickImage = cardTemplate.querySelector('.elements__image');

    const imageFull = document.querySelector('.popup-full-image__image');
    const captionFull = document.querySelector('.popup-full-image__caption');

    const addImage = cardTemplate.querySelector('.elements__image');
    const addCaption = cardTemplate.querySelector('.elements__text');

    clickImage.addEventListener('click', () => {
        
        imageFull.src = addImage.src;
        imageFull.alt = addImage.alt;
        captionFull.textContent = addCaption.textContent;

        popupOpenFull();       
    });
    //Удаление
    const deleteButton = cardTemplate.querySelector('.elements__delete');
    deleteButton.addEventListener('click', handleDeleteCard);
    
    //Лайк
    const likeCard = cardTemplate.querySelector('.elements__button');
    likeCard.addEventListener('click', hadleLikeCard);

    return cardTemplate;
};

initialCards.forEach((card) => {
    cardList.append(createCard(card));
});

//Create card
function handleCardFormSubmit (event) {
    event.preventDefault();

    const newCard = {
        name: placeInput.value,
        link: linkInput.value
    }
    
    popupCloseAdd();
    cardList.prepend(createCard(newCard));
}

formAdd.addEventListener('submit', handleCardFormSubmit);

//Delete card
function handleDeleteCard (event){
    const button = event.target;
    const cardDelete = button.closest('.elements__card')
    cardDelete.remove();
};

//Card like
function hadleLikeCard (event) {
    const button = event.target;
    button.classList.toggle('elements__icon_active');
}



//Popup-Add actions
// function popupOpenAdd(){
//     formConteinerAdd.classList.add('popup-add_opened');
//     placeInput.value = '';
//     linkInput.value = '';
// }

// addButton.addEventListener('click', popupOpenAdd);

// function popupCloseAdd(){
//     formConteinerAdd.classList.remove('popup-add_opened');
// }

// closePopupAdd.addEventListener('click', popupCloseAdd);

//Popup-Full-Image actions
// function popupOpenFull(){
//     formConteinerFull.classList.add('popup-full-image_opened');
// }

// function popupCloseFull(){
//     formConteinerFull.classList.remove('popup-full-image_opened');
// }

// closePopupFull.addEventListener('click', popupCloseFull);









