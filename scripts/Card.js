export class Card {
    constructor (name, link, cardTemplate, handleCardClick) {
        this.name = name;
        this.link = link;
        this.cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
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

        this._cardImage = this._element.querySelector('.elements__image');
        this._cardImage.src = this.link;
        this._cardImage.alt = this.name;

        this._submitButton = this._element.querySelector('.elements__button');
        this._element.querySelector('.elements__text').textContent = this.name;
        

        this._setEventListeners();

        return this._element;
    }
    
    _setEventListeners() {
        this._submitButton.addEventListener('click', () => {
            this._hadleLikeCard();
        });
        
        this._element.querySelector('.elements__delete').addEventListener('click', () => {
            this._handleDeleteCard();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
          });
      }

    _hadleLikeCard() {
        this._submitButton.classList.toggle('elements__button_active');
    }

    _handleDeleteCard() {
        this._element.remove();
    }   
}