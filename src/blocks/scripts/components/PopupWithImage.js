import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor (selectorPopup) {
        super(selectorPopup);

        this.imageFullSize = this.selectorPopup.querySelector('.popup__image');
        this.captionPopupFull = this.selectorPopup.querySelector('.popup__caption');
    }

    open (name, link) {
        this.imageFullSize.src = link;
        this.captionPopupFull.textContent = name;
        this.imageFullSize.alt = name;
        
        super.open();
    }
}