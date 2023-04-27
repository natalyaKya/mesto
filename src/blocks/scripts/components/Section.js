export default class Section {
    constructor({items, renderer}, selector) {
        this._items = items;
        this._renderer = renderer;
        this.selector = document.querySelector(selector);
      }
      
    renderItem() {
        this._items.forEach(item => 
            this._renderer(item));
    }

    addItem(el) {
        this.selector.append(el);
    }
}