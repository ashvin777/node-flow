define(() => {

  let selectedElement = null;
  let connectorElement = null;
  let offset = null;
  let transform = null;
  let svg = null;

  let drag = {
    init(evt) {
      svg = evt.target;
      svg.addEventListener('mousedown', this.start.bind(this));
      svg.addEventListener('mousemove', this.drag.bind(this));
      svg.addEventListener('mouseup', this.end.bind(this));
      svg.addEventListener('mouseleave', this.end.bind(this));
    },

    start(evt) {
      selectedElement = evt.target.parentNode;
      connectorElement = evt.target.classList.contains('connector') ? evt.target : null;

      if (selectedElement.classList.contains('draggable') && !connectorElement) {
        offset = util.getMousePosition(evt);
        // Make sure the first transform on the element is a translate transform
        var transforms = selectedElement.transform.baseVal;
        if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
          // Create an transform that translates by (0, 0)
          var translate = svg.createSVGTransform();
          translate.setTranslate(0, 0);
          selectedElement.transform.baseVal.insertItemBefore(translate, 0);
        }
        // Get initial translation
        transform = transforms.getItem(0);
        offset.x -= transform.matrix.e;
        offset.y -= transform.matrix.f;
      } else if (selectedElement && connectorElement) {
        path.start(evt);
      } else {
        selectedElement = null;
      }
    },

    drag(evt) {
      if (selectedElement && !connectorElement) {
        evt.preventDefault();
        var coord = util.getMousePosition(evt);
        transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
      } else if (selectedElement && connectorElement) {
        evt.preventDefault();
        path.drag(evt);
      }
    },

    end(evt) {
      if (selectedElement && !connectorElement) {
        selectedElement = null;
      } else if (selectedElement && connectorElement) {
        selectedElement = null;
        path.end(evt);
      }
    }
  };

  return drag;
});