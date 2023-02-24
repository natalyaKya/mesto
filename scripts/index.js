let editButton = document.querySelector('.profile__edit-button');
let form = document.querySelector('.popup__admin');
let formConteiner = document.querySelector('.popup')

let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_job');

let profileName = document.querySelector('.profile__heading');
let profileJob = document.querySelector('.profile__text');

let formClose = document.querySelector('.popup__close-icon');

function popupOpen(){
    formConteiner.classList.add('popup_opened');

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

editButton.addEventListener('click', popupOpen);

function popupClose(){
    formConteiner.classList.remove('popup_opened');
}

formClose.addEventListener('click', popupClose);

function handleFormSubmit (event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupClose();
}

form.addEventListener('submit', handleFormSubmit);