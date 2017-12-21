class ParticleSystem {

  constructor(loc, numP){
    this.particles = [];
    this.origin = loc;
    this.makeParticles(numP);
    this.counter = 0;
  }


  makeParticles(number){
    //create array of balls
    for (var i = 0; i < number; i++){
      var radius = Math.random()*5 + 5;
      var color = randomColor();
      //set location vector
      var loc = vector2d.copy(this.origin);
      //set velocity vector
      var r = Math.random();
      var theta = Math.random() * Math.PI * 2;
      var vel = new vector2d(undefined, undefined, r, theta);
      //set acceleration vector
      var acc = new vector2d(0, 0.01);
      var lt = Math.floor(Math.random()*200) + 150;
      this.particles.push(new Particle(radius, loc, vel, acc, lt, color));
    }
  }

  run(){
    if (this.counter %5 == 0){
      this.makeParticles(1);
    }
    //console.log(this.particles.length);
    for(var i = this.particles.length - 1; i >= 0; i--){
      if(this.particles[i].isDead()){
        this.particles.splice(i, 1);
      }else{
        this.particles[i].render();
      }
  }
  this.counter++;

}

}
