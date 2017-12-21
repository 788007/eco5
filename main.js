window.onload = init;
var canvas;
var ctx;
var BALLS_ON = true;
var balls = [];
var ATTR_ON = true;
var attractor;
var REP_ON = true;
var repeller;
var SNAKES_ON = true;
var snakes = [];
var FLOCK_ON = true;
var flock;
var PS_ON = true;
var particleSystems = [];

function init(){
  //get the canvas
  canvas = document.getElementById('cnv');

  canvas.width = 1300;
  canvas.height = 900;
  canvas.style.backgroundColor = 'rgb(29, 84, 82)';

  ctx = canvas.getContext('2d');

  //create buttons to toggle different aspects of ecosystem
  for(var i = 1; i < 7; i++){
    var name = 'button' + i;
    var button = document.getElementById(name);
    button.addEventListener("click", buttonHandler);
  }

  //create balls, attractor, repeller, snakes, and flock
  makeBalls(20, 0);
  makeAttractor();
  makeRepeller();
  makeSnakes(4);
  flock = new Flock();
  flock.makeVehicles(70);

  //if canvas is clicked, a new particle system will appear at the location of the click
  canvas.addEventListener("click", makeParticleSystem);

  animate();
}

function buttonHandler(){
  //toggle between red & green for off/on
  if(this.style.borderColor != 'red'){
    this.style.backgroundColor = '#f76a6a';
    this.style.borderColor = 'red';
  }else{
    this.style.backgroundColor = '#6af794';
    this.style.borderColor = 'green';
  }
  //toggle on & off for creatures in ecosystem
  if(this.id === "button1"){
    BALLS_ON = !BALLS_ON;
  }else if(this.id === "button2"){
    ATTR_ON = !ATTR_ON;
  }else if(this.id === "button3"){
    REP_ON = !REP_ON;
  }else if(this.id === "button4"){
    SNAKES_ON = !SNAKES_ON;
  }else if(this.id === "button5"){
    FLOCK_ON = !FLOCK_ON;
  }else if(this.id === "button6"){
    PS_ON = !PS_ON;
    //clear the array of particle systems
    while(particleSystems.length > 0){
      particleSystems.pop();
    }
  }

}

function makeParticleSystem(e){
  // if particle systems are on, create an new particle system at location of click
  if(PS_ON){
    var x = e.offsetX;
    var y = e.offsetY;
    particleSystems.push(new ParticleSystem(new vector2d(x, y), 20));
  }

}

function makeSnakes(numSnakes){
  for(var i = 0; i < numSnakes; i++){
    var radius = Math.random()*15 + 10;
    var color = randomColor();
    //set location vector
    var x = Math.random() * (canvas.width-20) + 10;
    var y = Math.random() * (canvas.height-20) + 10;
    var loc = new vector2d(x, y);
    //set velocity vector
    var r = (Math.random()* 3 + 1);
    var theta = Math.random() * 2 * Math.PI;
    var vel = new vector2d(undefined, undefined, r, theta);
    //set acceleration vector
    var acc = new vector2d(0, 0);

    var numSegs = Math.random() * 8 + 3;
    var segLength = Math.random() * 10 + 10;
    snakes.push(new Snake(loc, vel, acc, numSegs, segLength, randomColor()));
  }
}

function makeBalls(numBalls, numOscillators){
  //create array of balls
  for (var i = 0; i < numBalls; i++){
    var radius = Math.random()*5 + 5;
    var color = randomColor();
    //set location vector
    var x = Math.random() * (canvas.width-20) + 10;
    var y = Math.random() * (canvas.height-20) + 10;
    var loc = new vector2d(x, y);
    //set velocity vector
    var r = (Math.random()* 3 + 1);
    var theta = Math.random() * 2 * Math.PI;
    var vel = new vector2d(undefined, undefined, r, theta);
    //var vel = new vector2d(0, 0);
    //set acceleration vector
    var acc = new vector2d(0, 0);

    balls.push(new Mover(radius, loc, vel, acc, color, numOscillators));

  }
}

function makeAttractor(){
  var loc = new vector2d(canvas.width * 3/4, canvas.height * 3/4);
  var theta = Math.random() * 2 * Math.PI;
  var vel = new vector2d(undefined, undefined, 2, theta);
  attractor = new Mover(25, loc, vel, new vector2d(0, 0), 'red');
}

function makeRepeller(){
  var loc = new vector2d(canvas.width/4, canvas.height/4);
  var theta = Math.random() * 2 * Math.PI;
  var vel = new vector2d(undefined, undefined, 2, theta);
  repeller = new Mover(25, loc, vel, new vector2d(0,0), 'blue');
}

//returns a random pastel color
function randomColor(){
  var hue = Math.floor(Math.random() * 360);
  var l = Math.random() * 15 + 70;
  var pastel = 'hsl(' + hue + ', 100%, ' + l + '%)';
  return pastel;
}

function animate(){
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(BALLS_ON){
    for(var i = 0; i < balls.length; i++){
      balls[i].run();
    }
  }
  if(SNAKES_ON){
    for(var i = 0; i < snakes.length; i++){
      snakes[i].run();
    }
  }
  if(PS_ON){
    for(var i = 0; i < particleSystems.length; i++){
      particleSystems[i].run();
    }
  }

  if(ATTR_ON) attractor.run();
  if(REP_ON) repeller.run();

  if(FLOCK_ON) flock.run();
}
