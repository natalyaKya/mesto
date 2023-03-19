const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelectorAll('.popup__text');

const showInputError = (formElement, formInput, errorMessage) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    
    formInput.classList.add('popup__text_type_error');
    errorElement.textContent = errorMessage;
  };
  
  const hideInputError = (formElement, formInput) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    
    formInput.classList.remove('popup__text_type_error');
    errorElement.textContent = '';
  };

const isValid = (formElement, formInput) => {
    if (!formInput.validity.valid){
        showInputError(formElement, formInput, formInput.validationMessage); 
    } else {
        hideInputError(formElement, formInput);
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
    const buttonElement = formElement.querySelector('.popup__button');

    inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        isValid(formElement, formInput)

        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
  
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };
  
  enableValidation();

  // Button

const hasInvalidInput = (inputList) => {
    
    return inputList.some((formInput) => {
      return !formInput.validity.valid;
    })
  };

  const toggleButtonState = (inputList, buttonElement) => {
   
    if (hasInvalidInput(inputList)) { 
      buttonElement.classList.add('popup__button_disabled');
    } else {
      buttonElement.classList.remove('popup__button_disabled');
    }
  }; 