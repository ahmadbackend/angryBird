////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
  propeller = Bodies.rectangle(150, 480, 200, 15, {isStatic: true, angle: angle});
   World.add(engine.world, [propeller]);

}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
 
  push();
  // your code here
  fill(255);
  drawVertices(propeller.vertices);
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  
  push();
  //your code here
  fill(255);
for(let p=0;p<birds.length;p++)
{
  drawVertices(birds[p].vertices);
  if(isOffScreen(birds[p]))
  {
    removeFromWorld(p);
    birds.splice(p,1);
    p--;
  }
}
     
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
  for(let i=0;i<6;i++)
  {
    for(let j=0;j<3;j++)
    {
      //60 is ground.height/2 + box.height/2 (drawing from the center) mode(CENTER)
     var box=Bodies.rectangle(width*0.7+(j*80),height-(i*80)-60,80,80,
      {restitution:0.7, isStatic:false });
     //(100*0.6+(j*80),400*0.8+(80*i),80,80,
     colors.push([random(100,250)]);
     World.add(engine.world, [box]);
     
     boxes.push(box);
     
    }
  }
  
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
  for(let i=0;i<boxes.length;i++)
  {  
    fill(100,colors[i],100);
    drawVertices(boxes[i].vertices);
   // console.log(boxes[i]);
    
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
fill(255);
slingshotBird=Bodies.circle(150, height/2, 30, {friction: 0,
  restitution: 0.95 });
Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);


slingshotConstraint=Constraint.create({
  pointA:{x:150,y:height * 2/5},
  bodyB: slingshotBird  ,
  pointB:{x:0,y:0},
  stiffness:0.01,
  damping :0.0001
});
World.add(engine.world, [slingshotBird,slingshotConstraint]);

}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  fill(255);
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}

