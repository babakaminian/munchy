var munch = (function(circle) {
  var o = {};
  var circle = {};
  var subCircles = [];
  var canvasWidth = 600;
  var canvasHeight = 600;
  
  // space between circles
  var space = 80;

  // placement for sub-circles
  var coordinates = [
    {"x" : Math.cos(Math.PI/2), "y" : Math.sin(Math.PI/2)},
    {"x" : Math.cos(Math.PI*3/2), "y" : Math.sin(Math.PI*3/2)},
    {"x" : Math.cos(Math.PI*2), "y" : Math.sin(Math.PI*2)},
    {"x" : Math.cos(Math.PI), "y" : Math.sin(Math.PI)},
    {"x" : Math.cos(Math.PI/4), "y" : Math.sin(Math.PI/4)},
    {"x" : Math.cos(Math.PI*3/4), "y" : Math.sin(Math.PI*3/4)},
    {"x" : Math.cos(Math.PI*5/4), "y" : Math.sin(Math.PI*5/4)},
    {"x" : Math.cos(Math.PI*7/4), "y" : Math.sin(Math.PI*7/4)}
  ];

  function draw() {
    var canvas = document.getElementById("munchCanvas");
    var ctx = canvas.getContext("2d");
    
    // draw main circle
    ctx.beginPath();
    ctx.arc(canvasWidth/2, canvasHeight/2, circle.radius, 0, Math.PI*2);
    ctx.fillStyle = circle.color;
    ctx.fill();

    // draw sub-circles
    for (var i = 0; i < subCircles.length; i++) {

      // calculate the center of the sub-circle
      var x = canvasWidth/2 + subCircles[i].coordinates.x * space;
      var y = canvasHeight/2 + subCircles[i].coordinates.y * space;

      ctx.beginPath();
      ctx.arc(x, y, subCircles[i].radius, 0, Math.PI*2);
      ctx.fillStyle = subCircles[i].color;
      ctx.fill();

      // add x and y coordinates for the click event
      subCircles[i].x = x;
      subCircles[i].y = y;
    }
  }

  function createCircle() {
    var color = 'seagreen';
    var radius = '30';
    return { 'color': color, 'radius': radius};
  }

  function clickEvent(e) {
    for (var i = 0; i < subCircles.length; i++) {
      var circle = subCircles[i];
      if (e.offs)
      console.log(circle.x);
    }
  }

  o.start = function() {
    
    for (var i = 0; i < coordinates.length; i++) {
      var subCircle = createCircle();
      subCircle.coordinates = coordinates[i];
      subCircles.push(subCircle);
    }
    circle = createCircle();
    draw();

    var canvas = document.getElementById("munchCanvas");
    canvas.addEventListener("click", clickEvent);
  };

  return o;
}());
