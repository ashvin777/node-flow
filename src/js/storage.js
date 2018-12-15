const STORAGE = 'storage';

let storage = {
  set(data) {
    localStorage.setItem(STORAGE, JSON.stringify(data));
  },

  get() {
    return JSON.parse(localStorage.getItem(STORAGE));
  },

  removeAll() {
    localStorage.clear();
  }
}