import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(selectorPopup, handleEditFormSubmit) {
        super(selectorPopup);
        this.handleEditFormSubmit = handleEditFormSubmit;
        this.form = this.selectorPopup.querySelector('.popup__form');
    }
    
    _getInputValues () {
        this.inputList = this.selectorPopup.querySelectorAll('.popup__text');

        const formValues = {};
        this.inputList.forEach(input => {
            const value = input.value;
            const name = input.name;

            formValues[name] = value;
        });

        return formValues;
    }

    setEventListeners () {
        this.selectorPopup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputValues();
            this.handleEditFormSubmit(inputValues);

            this.close();
        });

        super.setEventListeners();
    }

    close() {
        this.form.reset();

        super.close();
    }
}