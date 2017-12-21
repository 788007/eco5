class Oscillator  {

  constructor(theta, omega, alpha, radius, amplitude, color, ball){
    this.theta = theta;
    this.omega = omega;
    this.alpha = alpha;
    this.radius = radius;
    this.amplitude = amplitude;
    this.color = color;
    this.ball = ball;
  }


  center(){
    return this.ball.loc;
  }

  location(){
    var x = Math.cos(this.theta.x) * this.amplitude.x; //this.amplitude.x;
    var y = Math.sin(this.theta.y) * this.amplitude.y; //this.amplitude.y;
    var location = vector2d.add(this.center(), new vector2d(x,y));
    return location;
  }

  update(){
    this.omega.add(this.alpha);
    this.theta.add(this.omega);
  }

  draw(){
    this.update();
    var loc = this.location();

    // ctx.beginPath();
    // ctx.lineWidth = 1;
    // ctx.moveTo(this.center().x, this.center().y);
    // ctx.lineTo(loc.x, loc.y);
    // ctx.stroke();

    ctx.beginPath();
    ctx.arc(loc.x, loc.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    //ctx.fill();

  }

}
