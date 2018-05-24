// useful to have them as global variables
var canvas, ctx, w, h; 
var mousePos;

class Ball {
  constructor (x, y, radius, color, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.speedX = speedX;
      this.speedY = speedY;
  }  
}

var player = {
  x:10,
  y:10,
  width:20,
  height:20,
  color:'red',
  
  move: function(x, y) {
      this.x = x;
      this.y = y;
  },
  
  draw: function (ctx) {
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();
  
    // translate the coordinate system, draw relative to it
    ctx.translate(this.x, this.y);
  
    ctx.fillStyle = this.color;
    // (0, 0) is the top left corner of the monster.
    ctx.fillRect(0, 0, this.width, this.height);
  
    // GOOD practice: restore the context
    ctx.restore();
    },
};

window.onload = function init() {
    // called AFTER the page has been loaded
    canvas = document.querySelector("#myCanvas");
  
    // often useful
    w = canvas.width; 
    h = canvas.height;  
  
    // important, we will draw with this object
    ctx = canvas.getContext('2d');
  
    // add a mousemove event listener to the canvas
    canvas.addEventListener('mousemove', mouseMoved);

    // ready to go !
    mainLoop();
};


function mouseMoved(evt) {
    mousePos = getMousePos(canvas, evt);
}

function getMousePos(canvas, evt) {
    // necessary work in the canvas coordinate system
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function mainLoop() {
  // 1 - clear the canvas
  ctx.clearRect(0, 0, w, h);
  
  // draw the player
  player.draw(ctx);
  
  // make the player follow the mouse
  // Note that given the animation starts when the page loads there can be cases where the mouse is not in the canvas yet and where the position of the mouse will be undefined.
  if (mousePos != undefined) {
      player.move(mousePos.x, mousePos.y);
  }

  // ask for a new animation frame
  requestAnimationFrame(mainLoop);
}