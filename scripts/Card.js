import { imageFullSize, captionPopupFull, openPopup, popupFullImage } from "./index.js";

export class Card {
    constructor (name, link, cardTemplate) {
        this.name = name;
        this.link = link;
        this.cardTemplate = cardTemplate;
    }

    _getTemplate() {
        const cardElement  = document
        .querySelector(this.cardTemplate)
        .content
        .querySelector('.elements__card')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.elements__image').src = this.link;
        this._element.querySelector('.elements__text').textContent = this.name;
        this._element.querySelector('.elements__image').alt = this.name;

        this._setEventListeners();

        return this._element;
    }
    
    _setEventListeners() {
        this._element.querySelector('.elements__button').addEventListener('click', () => {
            this._hadleLikeCard();
        });
        
        this._element.querySelector('.elements__delete').addEventListener('click', () => {
            this._handleDeleteCard();
        });

        this._element.querySelector('.elements__image').addEventListener('click', () => {
            this._openFullSize();
        });
      }

    _hadleLikeCard() {
        this._element.querySelector('.elements__button').classList.toggle('elements__button_active');
    }

    _handleDeleteCard() {
        this._element.remove();
    }

    _openFullSize() {
        imageFullSize.src = this.link;
        imageFullSize.alt = this.name;
        captionPopupFull.textContent = this.name;

        openPopup(popupFullImage); 
    }
   
}