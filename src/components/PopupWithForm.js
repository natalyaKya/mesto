import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(selectorPopup, handleSubmit) {
        super(selectorPopup);
        this.handleSubmit = handleSubmit;
        this.form = this.popup.querySelector('.popup__form');
        this.inputList = this.form.querySelectorAll('.popup__text');
        this.loader = this.popup.querySelector('.popup__button-load');
    }
    
    _getInputValues () {
        const formValues = {};
        this.inputList.forEach(input => {
            const value = input.value;
            const name = input.name;

            formValues[name] = value;
        });

        return formValues;
    }

    setEventListeners () {
        this.popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputValues();
            this.handleSubmit(inputValues);

            this.close();
        });

        super.setEventListeners();
    }

    close() {
        this.form.reset();

        super.close();
    }

    loadingButton() {
        this.loader.textContent = 'Сохранение...';
    }
}