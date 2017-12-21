class Particle extends Mover{

  constructor(radius, loc, vel, acc, lifespan, color){
    super(radius, loc, vel, acc, color, 0);

    this.initialLife = lifespan;
    this.lifespan = lifespan;
  }


  update(){
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.lifespan -= 1;
  }

  render(){
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
    ctx.globalAlpha = this.lifespan / this.initialLife;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.restore();

    // ctx.beginPath();
    // ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI * 2);
    // ctx.globalAlpha = this.lifespan / this.initialLife;
    // ctx.fillStyle = this.color;
    // ctx.fill();
    // ctx.globalAlpha = 1;
  }

  isDead(){
    return (this.lifespan <= 1);
  }

}
