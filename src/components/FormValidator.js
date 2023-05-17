export default class FormValidator {
    constructor (config, form) {
        this._config = config;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    }

    enableValidation() {
        this._setEventListeners();
    }

    _showInputError (formInput) {
        const errorElement = this._form.querySelector(`.${formInput.id}-error`);
        
        formInput.classList.add(this._config.inputErrorClass);
        errorElement.textContent = formInput.validationMessage;
      };

      _hideInputError (formInput) {
        const errorElement = this._form.querySelector(`.${formInput.id}-error`);
        
        formInput.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
      };
    
     _isValid (formInput) {
        if (!formInput.validity.valid){
            this._showInputError(formInput); 
        } else {
            this._hideInputError(formInput);
        }
    }
    
     _setEventListeners () {
        this._inputList.forEach((formInput) => {
          formInput.addEventListener('input', () => {
            this._isValid(formInput)
    
            this._toggleButtonState();
          });
        });
      };

      _hasInvalidInput () {
        return this._inputList.some((formInput) => {
          return !formInput.validity.valid;
        })
      };
    
      _toggleButtonState () {
        if (this._hasInvalidInput()) { 
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', '');
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled', '');
        }
      };  

      resetValidation () {
        this._toggleButtonState();
        this._inputList.forEach ((item) => {
            this._hideInputError(item);
        })
      };
}