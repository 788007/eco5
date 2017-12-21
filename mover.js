class Mover{

  constructor(radius, loc, vel, acc, color, numOscillators){
    this.radius = radius;
    this.color = color;
    //let volume = area and density = 1, so mass = area
    this.mass = Math.PI * this.radius * this.radius;
    this.loc = loc;
    this.vel = vel;
    this.acc = acc;
    this.oscillators = this.makeOscillators(numOscillators);
  }

  makeOscillators(number){
    var arr = [];
    for(var i=0; i < number; i++){
      var radius = 10;
      var color = randomColor();
      var theta = Math.random() * 2 * Math.PI;
      var omega = Math.random() * 0.1 - 0.05;
      var alpha = 0;
      var amplitude = Math.random() * 30 + 40;

      var theta = new vector2d(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI);
      var omega = new vector2d(Math.random() * 0.1 - 0.05, Math.random() * 0.1 - 0.05);
      var alpha = new vector2d(0,0);
      var amplitude = new vector2d(Math.random() * 30 + 40, Math.random() * 30 + 40);

      arr[i] = new Oscillator(theta, omega, alpha, radius, amplitude, color, this);
    }
    return arr;
  }

  momentum(){
    return vector2d.scalarMult(this.vel, this.mass);
  }

  kineticEnergy(){
    var v = this.vel.magnitude();
    return this.mass * v * v / 2;
  }

  attractorForce (){
    //calculate direction of vector from attractor to mover
    var r = vector2d.subtract(attractor.loc, this.loc);
    var dir = vector2d.normalize(r);
    //scale force - inversely proportional to distance
    var attr_force = vector2d.scalarMult(dir, 13 / r.magnitude());
    return attr_force;
  }

  repellerForce (){
    //calculate direction of vector from repeller to mover
    var r = vector2d.subtract(this.loc, repeller.loc);
    var dir = vector2d.normalize(r);
    //scale force - inversely proportional to distance
    var rep_force = vector2d.scalarMult(dir, 13 / r.magnitude());
    return rep_force;
  }

  applyForce(f){
    this.acc.add(f);
  }

  //updates ball position
  update () {
    this.checkEdges();
    if(this !== attractor && this !== repeller){
      if(ATTR_ON) this.applyForce(this.attractorForce());
      if(REP_ON) this.applyForce(this.repellerForce());
    }

    this.vel.add(this.acc);
    this.vel.limit(8);
    //console.log(this.vel.magnitude());
    this.loc.add(this.vel);
    this.acc.scalarMult(0);
  }


  //reverses direction when ball hits edge
  checkEdges () {
    if(this.loc.x + this.radius >= canvas.width){
      this.loc.x = canvas.width - this.radius;
      this.vel.x *= -1;
    }
    if(this.loc.x - this.radius < 0){
      this.loc.x = this.radius;
      this.vel.x *= -1;
    }
    if(this.loc.y + this.radius >= canvas.height){
      this.loc.y = canvas.height - this.radius;
      this.vel.y *= -1;
    }
    if(this.loc.y - this.radius < 0){
      this.loc.y = this.radius;
      this.vel.y *= -1;
    }
  }

  //draws ball
  run () {
    this.update();
    for(var i = 0; i < this.oscillators.length; i++){
      this.oscillators[i].draw();
    }
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

}
