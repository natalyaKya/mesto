export default class Section {
    constructor({renderer}, selector) {
        this._renderer = renderer;
        this.selector = document.querySelector(selector);
      }
      
    renderItem(items) {
        items.forEach(item => 
            this._renderer(item));
    }

    addItem(el) {
        this.selector.prepend(el);
    }
}