let $path = null;
let startCoord = null;
let path = {
  start(evt) {
    $path = document.getElementById('link');
    let $shapes = document.getElementById('shapes');
    $path = $path.cloneNode();

    $shapes.prepend($path);
    startCoord = util.getMousePosition(evt);
  },

  drag(evt) {
    var dragCoord = util.getMousePosition(evt);

    let path = `
      M${startCoord.x}, ${startCoord.y}
      H${(startCoord.x + dragCoord.x) / 2}`;

      // a10,10 0 0 1 10,10
    path += `V${dragCoord.y}`;
      // a10,10 1 0 0 10,10
    path += `L${dragCoord.x} ${dragCoord.y}`;

    $path.setAttribute('d', path);
  },

  end(evt) {
    let isConnector = evt.target.classList.contains('connector');

    if (isConnector) {
      //don't remove
    } else {
      $path.remove();
    }
  }
}