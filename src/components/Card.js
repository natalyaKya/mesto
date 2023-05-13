export default class Card {
    constructor ({data, handleCardClick, addLikesApi, deleteLikesApi, openConfirm}, cardTemplate, userId) {
        this.name = data.name;
        this.link = data.link;
        this.cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
        this.addLikesApi = addLikesApi;
        this.deleteLikesApi = deleteLikesApi;
        this.openConfirm = openConfirm;
        this.ownerId = data.owner._id;
        this.userId = userId;
        this.cardId = data._id;
        this.likes = data.likes;
        this.item = data.item;
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
        this.sumLikes = this._element.querySelector('.elements__likes');
        this._element.querySelector('.elements__text').textContent = this.name;
        

        this._setEventListeners();

        return this._element;
    }
    
    _setEventListeners() {
        this._submitButton.addEventListener('click', () => {
            this._hadleLikeCard();
            console.log(card);
            this.checkActiveLike();
        });
        
        this._element.querySelector('.elements__delete').addEventListener('click', () => {
            this._handleOpenConfirm();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this.name, this.link);
          });
      }

    _hadleLikeCard() {
        this._submitButton.classList.toggle('elements__button_active');
    }
    checkActiveLike(card) {
        if (this._submitButton.classList.contains('elements__button_active')) {
            this.addLikesApi(card);
        }
        else {
            this.deleteLikesApi();
        };
    }
    _handleOpenConfirm() {
        this.openConfirm();
    }

    _handleDeleteCard() {
        this._element.remove();
    }
    changeLikes(data) {
        this.sumLikes.textContent = data.likes.lenght;
        this.likes = data.likes;
    }
    isLiked() {
        return this.likes.some((item) => item.id === this.userId);
    }
}