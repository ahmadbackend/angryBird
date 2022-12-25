// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var propeller1;
var propeller2;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle=0;
var angleSpeed=0;
var canvas;
var totalNUMBirds=20;
var totalSlings=15;
////////////////////////////////////////////////////////////
function setup() {
  canvas = createCanvas(1000, 600);

  engine = Engine.create();  // create an engine

  setupGround();

  setupPropeller(150, 480, 200, 15);

  setupTower();

  setupSlingshot();

  setupMouseInteraction();
  counter();

}
////////////////////////////////////////////////////////////
function draw() {
  background(0);

  Engine.update(engine);

  drawGround();

  drawPropeller();

  drawTower();

  drawBirds();

  drawSlingshot();
 
  towerEvac();
  winner();
  texts();
}
////////////////////////////////////////////////////////////
//texts written on the screen
function texts()
{
  textSize(32);
  text(totalTime/1000,width/2,30);
  textSize(15);
  text(`birds count ${totalNUMBirds}`,10,25);
  text(`slingsshots count ${totalSlings}`,10,50);

}
//use arrow keys to control propeller
function keyPressed(){
  if (keyCode == LEFT_ARROW){
    //your code here
      angleSpeed+=0.01;
  }
  else if (keyCode == RIGHT_ARROW){
    //your code here
      angleSpeed-=0.01;
  }
}
////////////////////////////////////////////////////////////

function keyTyped(){
  //if 'b' create a new bird to use with propeller
  //control slingshot number
  if (key==='b'&&totalSlings>0){
    setupBird();
    totalSlings--;
  }

  //if 'r' reset the slingshot
  if (key==='r'&&totalNUMBirds>0){
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
    totalNUMBirds--; //control total number of birds to make it more difficult
  }
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
  setTimeout(() => {
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body){
  var pos = body.position;
  return (pos.y > height || pos.x<0 || pos.x>width);
}
//removing offscreen boxes for the array 
function towerEvac()
{
  for (let i=0;i<boxes.length;i++)
  {
    if(isOffScreen(boxes[i]))
    {
      boxes.splice(i,1);
      i--;
    }
  }
}
//check if tower is empty
function winner()
{
  const resul=(boxes.length==0)? true : false; //ternary operator :-D 
  if(resul)
  {
      textSize(42);
      text("you win hero",width/2,height/2);
      noLoop();
  }
  
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
  World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
var totalTime=60000;
var decreasing=1000;
function counter()
{
    setInterval(displayTime,decreasing);
    
}
function displayTime()
{
if(totalTime<=1)
{
 
  stroke(255,0,0);
  strokeWeight(42);
  text("you lost",width/2,height/2);
  noStroke();
  noLoop()
}
totalTime-=decreasing;
//console.log(totalTime);

}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
  push();
  var offsetA = constraint.pointA;
  var posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  strokeWeight(5);
  stroke(255);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
  pop();
}
