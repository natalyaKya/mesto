// const formElement = document.querySelector('.popup__form');
// const formInput = formElement.querySelectorAll('.popup__text');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
}; 


const showInputError = (formElement, formInput, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    
    formInput.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
  };
  
  const hideInputError = (formElement, formInput, config) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    
    formInput.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  };

const isValid = (formElement, formInput, config) => {
    if (!formInput.validity.valid){
        showInputError(formElement, formInput, formInput.validationMessage, config); 
    } else {
        hideInputError(formElement, formInput, config);
    }
}

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        isValid(formElement, formInput, config)

        toggleButtonState(inputList, buttonElement, config);
      });
    });
  };

  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
  
    formList.forEach((formElement) => {
      setEventListeners(formElement, config);
    });
  };
  
  enableValidation(config);

  // Button

const hasInvalidInput = (inputList) => {
    
    return inputList.some((formInput) => {
      return !formInput.validity.valid;
    })
  };

  const toggleButtonState = (inputList, buttonElement, config) => {
   
    if (hasInvalidInput(inputList)) { 
      disableButton(buttonElement, config);
    } else {
      enableButton(buttonElement, config);
    }
  }; 

  function disableButton (buttonElement, config){
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  };

  function enableButton (buttonElement, config) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');
  };

  

 
  