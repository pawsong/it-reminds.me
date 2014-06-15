var MIN_SPEED = 10;
var MAX_SPEED = 25;
var MAX_ANGLE = 30;
var MAX_ANGLE_RAD = MAX_ANGLE * Math.PI/180;
var SYMBOL_NUMBER = 70;

var moveRainbow = new function() {
  var path = new Path({
    fillColor: '#DAD6FF'
  });

  var symbol = new Symbol(path);

  for (var i = 0; i < SYMBOL_NUMBER; i++) {

    // The center position is a random point in the view:
    var center = Point.random() * view.size;
    var placed = symbol.place();
    placed.scale(i / SYMBOL_NUMBER + 0.01);
    placed.data = {
      vector: new Point({
//        angle: Math.random() * 360,
        length : (i / SYMBOL_NUMBER) * Math.random() / 5
      })
    };
    placed.position = center;
  }

  var viewBounds = view.bounds;

  var extraWidth = 1 / Math.tan(MAX_ANGLE_RAD) * viewBounds.height * 2;
  var expandedViewBounds = viewBounds.expand(extraWidth, 0).expand(10);

  function keepInView(item) {
    var position = item.position;

    var itemBounds = item.bounds;

    if (itemBounds.intersects(expandedViewBounds)) {
      return;
    }

    position.x = Math.random() * (viewBounds.width + extraWidth) - extraWidth / 2;
    position.y = -itemBounds.height / 2;
  }

  return function(vector, event) {

    symbol.definition.translate(vector);

    var rotated = vector.rotate(90);

    var unitLength = 1/2;
    var length = -1/2 * unitLength + 1;
    var top = view.center + rotated.normalize(length);
    var bottom = view.center + rotated.normalize(length + unitLength);

    path.add(top);
    path.insert(0, bottom);

    if (path.segments.length > 30) {
      var index = Math.round(path.segments.length / 2);
      path.segments[index].remove();
      path.segments[index - 1].remove();
    }
    path.smooth();

    // Update symbols
    var layer = project.activeLayer;
    for (var i = 0; i < SYMBOL_NUMBER; i++) {
      var item = layer.children[i];
      var size = item.bounds.size;
      var length = vector.length / 10 * Math.sqrt(size.width * size.width + size.height * size.height) / 10;
      item.position += vector.normalize(length) + item.data.vector;
      keepInView(item);
    }

  }
};

(function (tool, view) {

  // Calculate the standard
  var tan = Math.tan(MAX_ANGLE_RAD);

  var offset = view.bounds.width / 2 * tan;

  var standard = view.bounds.topCenter + new Point(0, - offset);

  var position = view.bounds.topCenter;
  var mousePos = position;

  view.onFrame = function (event) {
    position += (mousePos - position) / 10;

    var vector = (position - standard) / 30;

    vector.length = Math.max(MIN_SPEED, vector.length);
    vector.length = Math.min(MAX_SPEED, vector.length);

    moveRainbow(vector, event);
  };

  tool.onMouseMove = function (event) {
    mousePos = event.point;
  };

  tool.onKeyDown = function (event) {
    if (event.key == 'space') {
      project.activeLayer.selected = !project.activeLayer.selected;
    }
  };
})(new Tool(), view);