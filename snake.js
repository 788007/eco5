class Snake extends Mover{

  constructor(loc, vel, acc, numSegs, segLength, color){
    super(segLength/2, loc, vel, acc, color, 0);
    this.numSegs = numSegs;
    this.segLength = segLength;
    //this.oscillator = oscillator;
    this.color = color;
    this.wanderAngle = Math.random() * 2 * Math.PI;
    //make array of location vectors of all segments
    this.segments = [];
    this.maxVel = 3;

    for(var i = 0; i < numSegs; i++){
      var x = Math.random() * (canvas.width-20) + 10;
      var y = Math.random() * (canvas.height-20) + 10;
      var loc = new vector2d(x, y);
      this.segments.push(loc);
    }
  }

  wanderForce(){
    //make the snakes wander around canvas
    var circleDistance = 2;
    var circleRadius = 13;
    var angleChange = 0.5;
    var circleCenter = vector2d.copy(this.vel);
    circleCenter.setMag(circleDistance);
    var displacement = new vector2d(0, circleRadius);
    displacement.setDirection(this.wanderAngle);

    this.wanderAngle += (Math.random() * angleChange - angleChange/2) ;

    var wf = vector2d.add(circleCenter, displacement);
    wf.setMag(.2);
    return wf;

  }

  avoidEdges(){
    var pi = Math.PI
    if(this.loc.x < 50){
      var desired = new vector2d(this.maxVel, this.vel.y);
      var f = vector2d.subtract(desired, this.vel);
      f.setMag(1);
      this.applyForce(f);
      //this.applyForce(new vector2d(0.5, 0));
      var a = this.wanderAngle % (pi*2);
      while(!((a > pi/6 && a < pi/3) || (a < 11*pi/6) && (a > 5*pi/3) )){
        this.wanderAngle = Math.random() * 2 * pi;
        a = this.wanderAngle;
      }

    }
    if(this.loc.x + 30 > canvas.width){
      this.applyForce(new vector2d(-0.5, 0));
      this.wanderAngle = Math.random() * Math.PI/2 + Math.PI * 3/4;
    }
    if(this.loc.y < 30) {
      this.applyForce(new vector2d(0, 0.5));
      this.wanderAngle = Math.random() * Math.PI/2 + Math.PI/4;
    }
    if(this.loc.y + 30 > canvas.height){
      this.applyForce(new vector2d(0, -0.5));
      this.wanderAngle = Math.random() * Math.PI/2 + Math.PI * 5/4;
    }

  }

  checkEdges(){
    if(this.loc.x < 0) this.loc.x  = window.innerWidth;
    if(this.loc.x > window.innerWidth) this.loc.x  = 0;
    if(this.loc.y < 0) this.loc.y  = window.innerHeight;
    if(this.loc.y > window.innerHeight) this.loc.y  = 0;
  }

  update(){
    this.avoidEdges();
    this.checkEdges();
    this.applyForce(this.wanderForce());
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    this.loc.add(this.vel);
    this.acc.scalarMult(0);
    //move head of snake to location of snake
    this.segments[0] = this.loc;
    //move each segment along vector between new location of previous segment
    //and current location of current segment
    for (var i = 1; i < this.segments.length; i++){
      var distance = vector2d.subtract(this.segments[i-1], this.segments[i]);
      distance.setMag(this.segLength);
      this.segments[i] = vector2d.subtract(this.segments[i-1], distance);
    }
  }

  run(){
    this.update();
    for (var i = 0; i < this.segments.length; i++){
      var loc = this.segments[i];
      ctx.beginPath();
      ctx.arc(loc.x, loc.y, this.segLength/2, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

  }

}
