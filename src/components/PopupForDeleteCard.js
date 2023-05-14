import Popup from './Popup.js';

export default class PopupForDeleteCard extends Popup {
    constructor(selectorPopup, data, handleDeleteCard) {
        super(selectorPopup);
        this.cardId = data.cardId;
        this.handleDeleteCard = handleDeleteCard;
        this.confirmButton = this.popup.querySelector('.popup__button-confirm');
    }
    

    setEventListeners () {
        this.popup.addEventListener('click', () => {
            this.handleDeleteCard(this);
            this.close();
        });

        super.setEventListeners();
    }
}