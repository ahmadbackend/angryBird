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
//set up propeller
function setupPropeller(x,y,w,h){
  // your code here
  propeller1 = Bodies.rectangle(x, y, w, h, {isStatic: true, angle: angle});
  propeller2=Bodies.rectangle(width/2,height-y, w, h, {isStatic: true, angle: -angle});
  World.add(engine.world, [propeller1,propeller2]);

}

////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
 
  push();
  // your code here
  fill(255);
  drawVertices(propeller1.vertices);
  drawVertices(propeller2.vertices);
  Body.setAngle(propeller1, angle);
  Body.setAngle(propeller2, -angle);
  Body.setAngularVelocity(propeller1, angleSpeed);
  Body.setAngularVelocity(propeller2, angleSpeed);
  angle += angleSpeed;
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, random(15,25), {friction: 0,
      restitution: 0.95 ,
      collisionFilter:{
        category: defaultCategory,

      }
    });
  Matter.Body.setMass(bird, bird.mass*random(10,30));
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
      {restitution:0.7, isStatic:false ,
      collisionFilter:{  //so slingbird and tower only caninteract
        category: defaultCategory}
     });
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
//to create collision filters and masks that mouse has no effect on the tower 
//guidance material https://www.temiz.dev/blog/matter-js-collisions-explained
var defaultCategory = 0x0001; 
var redCategory = 0x0002; 
var yellowCategory = 0x0004 ;
function setupSlingshot(){
//your code here
fill(255);
slingshotBird=Bodies.circle(150, height/2, random(15,40), {friction: 0,
  restitution: 0.95 ,
  
  collisionFilter:{
    category: redCategory, //interact with red and defaultCategory
  }
});
Matter.Body.setMass(slingshotBird, slingshotBird.mass*random(15,45));


slingshotConstraint=Constraint.create({
  pointA:{x:150,y:height * 2/5},
  bodyB: slingshotBird  ,
  pointB:{x:0,y:0},
  stiffness:0.01,
  damping :0.0001
});
//slingshotBird.setCollisionGroup(1);
//slingshotBird.setCollidesWith(0);
//by this way mouse won`t affect boxes or cause them to fall 
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
  // to avoid mouse interact with boxes
 
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 },
    collisionFilter:{
      mask: redCategory, // affect only red category 
    }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
  //mouseConstraint.setCollisionGroup(1);
  //mouseConstraint.setCollidesWith(0);

}

