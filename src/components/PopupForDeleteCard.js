import Popup from './Popup.js';

export default class PopupForDeleteCard extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this.confirmButton = this.popup.querySelector('.popup__button-confirm');
    }
    
    setSubmitAction(action) {
        this.handleDeleteCard = action;
    }
    setEventListeners () {
        this.popup.addEventListener('click', (evt) => {
            super.setEventListeners();
            evt.preventDefault();
            this.handleDeleteCard();
        });   
    }
}