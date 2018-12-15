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

    // M10,10 C200,10 10,200 200,200
    // let path = `M${startCoord.x}, ${startCoord.y} C${(startCoord.x + dragCoord.x)/2} 10 10 ${(startCoord.y + dragCoord.y)/2} ${dragCoord.x} ${dragCoord.y}`;
    //M10 20 Q 50 20, 50 100 T 100 200
    // let path = `
    //   M${startCoord.x}, ${startCoord.y}
    //   Q${(dragCoord.x + startCoord.x)/ 2} ${startCoord.y} ${(dragCoord.x + startCoord.x)/ 2} ${dragCoord.y / 2}
    //   T ${dragCoord.x} ${dragCoord.y}`;

    let path = `
      M${startCoord.x}, ${startCoord.y}
      H${(startCoord.x + dragCoord.x) / 2 - 10}
      a10,10 0 0 1 10,10
      V${dragCoord.y - 10}
      a10,10 1 0 0 10,10
      L${dragCoord.x} ${dragCoord.y}`;

    console.log('path - ', path);
    $path.setAttribute('d', path);
    //$pathcoord.x - offset.x, coord.y - offset.y
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