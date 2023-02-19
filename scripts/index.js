let clickEditButton = document.querySelector('.profile__edit-button');
let form = document.querySelector('.form');

let nameInput = document.querySelector('.form__name');
let jobInput = document.querySelector('.form__job');

let profileName = document.querySelector('.profile__heading');
let profileJob = document.querySelector('.profile__text');


clickEditButton.addEventListener('click', function(){
    form.classList.add('form_opened');

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

let closeForm = document.querySelector('.form__close-icon');

closeForm.addEventListener('click', function(){
    form.classList.remove('form_opened');
})

function handleFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    form.classList.remove('form_opened');
}

form.addEventListener('submit', handleFormSubmit);