var munch = (function() {
  var o = {};
  var mainCircle;
  var subCircles;
  var canvasWidth = 600;
  var canvasHeight = 600;
  
  // space between circles
  var space = 120;

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

    // reset canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    
    // draw main circle
    ctx.beginPath();
    ctx.arc(canvasWidth/2, canvasHeight/2, mainCircle.radius, 0, Math.PI*2);
    ctx.fillStyle = mainCircle.color;
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
    var niceColors = ['#24CA61', '#24CAB4', '#248DCA', '#243ACA', '#6124CA', '#B424CA', '#CA248D', '#CA243A', '#CA6124', '#CAB424', '#8DCA24', '#3ACA24'];
    var color = niceColors[getRandomInt(0, niceColors.length - 1)]
    var radius = getRandomInt(25, 45);
    return { 'color': color, 'radius': radius};
  }

  function clickEvent(e) {
    for (var i = 0; i < subCircles.length; i++) {
      var circle = subCircles[i];
      
      // calculate the distance between center of circle and clicked point
      var a = Math.pow( Math.abs( circle.x - e.offsetX ), 2 );
      var b = Math.pow( Math.abs( circle.y - e.offsetY ), 2 );
      var distance = Math.sqrt( a + b );

      if (distance < circle.radius) {
        o.start(circle);
        break;
      }
    }
  }

  function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  o.start = function(circle) {
    if (circle) mainCircle = circle;
    else mainCircle = createCircle();
    
    // reset
    subCircles = [];

    var numberOfCircles = getRandomInt(1, 8);
    for (var i = 0; i < numberOfCircles; i++) {
      var subCircle = createCircle();
      subCircle.coordinates = coordinates[i];
      subCircles.push(subCircle);
    }

    draw();

    var canvas = document.getElementById("munchCanvas");
    canvas.addEventListener("click", clickEvent);
  };

  return o;
}());
