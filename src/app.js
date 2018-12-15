// require(['src/js/draggable'], (require) => {
define((require) => {
  // console
  let draggable = require('src/js/draggable');

  console.log(draggable);

  window.app = {
    init() {

    },

    draggable(evt) {
      draggable.init(evt);
    }
  }

});