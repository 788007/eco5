class Flock {

  constructor(){
    this.vehicles = [];
  }

  makeVehicles(num){
    for(var i = 0; i < num; i++){
      var x = Math.random()*canvas.width;
      var y = Math.random()*canvas.height;
      var loc = new vector2d(x, y);
      var vel = new vector2d(undefined, undefined, Math.random()*2+1, Math.random()*2*Math.PI);
      var acc = new vector2d(0, 0);
      this.vehicles.push(new Vehicle(i, loc, vel, acc, 'white'));
    }
  }

  run(){
    for(var i = 0; i < this.vehicles.length; i++){
      this.vehicles[i].run();
    }
  }

}
