class Vehicle {

  constructor(id, loc, vel, acc, color){
    this.id = id;
    this.loc = loc;
    this.vel = vel;
    this.acc = acc;
    this.color = color;
    this.maxForce = .05;
    this.maxVel = 3;
  }

  applyForce(f){
    this.acc.add(f);
  }

  checkEdges(){
    if(this.loc.x < 0) this.loc.x  = window.innerWidth;
    if(this.loc.x > window.innerWidth) this.loc.x  = 0;
    if(this.loc.y < 0) this.loc.y  = window.innerHeight;
    if(this.loc.y > window.innerHeight) this.loc.y  = 0;
  }

  separate(vehicles){
    var desiredSep = 35;
    var sum = new vector2d(0, 0);
    var count = 0;
    for(var i = 0; i < vehicles.length; i++){
      if(this !== vehicles[i]){ //don't check against self
        var distSq = vector2d.distanceSq(this.loc, vehicles[i].loc);
        if(distSq < desiredSep * desiredSep){
          var desired = vector2d.subtract(this.loc, vehicles[i].loc);
          desired.normalize();
          desired.scalarMult(2/distSq);
          sum.add(desired);
          count++;
        }
      }
    }
    if(count>0){
      sum.setMag(this.maxVel);
      var steer = vector2d.subtract(sum, this.vel);
      steer.limit(this.maxForce)
      return steer;
    }else{
      return new vector2d(0, 0);
    }
  }

  cohesion(vehicles){
    var sum = new vector2d(0, 0);
    var count = 0;
    var desiredCo = 50;
    for(var i = 0; i < vehicles.length; i++){
      if(this !== vehicles[i]){ //don't check against self
        var distSq = vector2d.distanceSq(this.loc, vehicles[i].loc);
        if(distSq < desiredCo * desiredCo){
          sum.add(vehicles[i].loc);
          count++;
        }
      }
    }
    if(count>0){
      sum.scalarDiv(count);
      var desired = vector2d.subtract(sum, this.loc);
      desired.setMag(this.maxVel);
      var steer = vector2d.subtract(desired, this.vel);
      steer.limit(this.maxForce)
      return steer;
    }else{
      return new vector2d(0, 0);
    }

  }

  align(vehicles){
    var sum = new vector2d(0,0);
    var count = 0;
    var desiredAlign = 50;

    for(var i = 0; i < vehicles.length; i++){
      if(this !== vehicles[i]){ //don't check against self
        var distSq = vector2d.distanceSq(this.loc, vehicles[i].loc);
        if(distSq < desiredAlign*desiredAlign){
          sum.add(vehicles[i].vel);
          count++;
        }
      }
    }
    if(count>0){
      sum.setMag(this.maxVel);
      var steer = vector2d.subtract(sum, this.vel);
      steer.limit(this.maxForce)
      return steer;
    }else{
      return new vector2d(0, 0);
    }
  }

  update(){
    this.checkEdges();
    if(this.id < 0){
      this.loc.x = mouseX || 0;
      this.loc.y = mouseY || 0;
    }else{
      var sep = this.separate(flock.vehicles);
      var co = this.cohesion(flock.vehicles);
      var align = this.align(flock.vehicles);

      sep.scalarMult(1.5);
      co.scalarMult(1.5);
      align.scalarMult(1.5);
      this.applyForce(sep);
      this.applyForce(co);
      this.applyForce(align);

      this.vel.add(this.acc);
      this.vel.limit(this.maxVel);
      this.loc.add(this.vel);
      this.acc.scalarMult(0);
    }

  }

  run(){
    this.update();

    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(this.vel.theta())
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(-12, -8);
    ctx.lineTo(-4, 0);
    ctx.lineTo(-12, 8);
    ctx.lineTo(8, 0);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();

  }


}
