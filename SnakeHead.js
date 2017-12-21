class SnakeHead extends Mover {

  constructor(radius, loc, vel, acc, color){
    super(radius, loc, vel, acc, color, 1);
    
  }


  update () {
    this.checkEdges();
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.scalarMult(0);
  }


  draw () {
    this.update();
    this.oscillators[0].draw();
    // ctx.beginPath();
    // ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI * 2);
    // ctx.fillStyle = this.color;
    // ctx.fill();
  }




}
