export default class Popup {
    constructor(selectorPopup) {
        this.selectorPopup = document.querySelector(selectorPopup);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose (e) {
        if (e.key === 'Escape') {
            this.close();
          }
    }

    setEventListeners () {
        this.selectorPopup.addEventListener ('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
            if (evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        })
    }

    open () {
        this.selectorPopup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close () {
        this.selectorPopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
}