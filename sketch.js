let motion = false;
let ios = false;

// below code is essential for ios13 and above. 
// A click is needed for the device to request permission 
if (typeof DeviceMotionEvent.requestPermission === 'function') {
  document.body.addEventListener('click', function() {
    DeviceMotionEvent.requestPermission()
      .then(function() {
        console.log('DeviceMotionEvent enabled');

        motion = true;
        ios = true;
      })
      .catch(function(error) {
        console.warn('DeviceMotionEvent not enabled', error);
      })
  })
} 

function setup() {
  createCanvas(800, 575);
  
  // Rear axle location
  rearAxleX = 350;
  rearAxleY = 550;
  
  // Angle of car 
  carTheta = 0;
  
  // Angle of the front wheels
  leftTheta = 0;
  rightTheta = 0;
  
  // Car width and height
  carW = 50;
  carH = 100;
  
  // Tire width and height
  tireW = 10;
  tireH = 20;
  
  // Rear Axle offset from back edge of car
  off = 15
  
  // Max and min turning radii
  maxR = 2000       // Max turning radius
  minR = carH*1.5   // Min turning radius
  
  // Car speeds
  speed = 300       // Higher is faster
  turnSpeed = 17    // Lower is faster
  
  // Initial turning radius set to maxR so wheels straight
  turnRadius = maxR
  
  corX = rearAxleX + turnRadius*cos(carTheta)
  corY = rearAxleY - turnRadius*sin(carTheta)
  
  goUp = 1;
  goDown = 1;
  
  buff = 1;
  
  restart = 0
  
  carHit = 0
}

function draw() {
  background(240);
  
  // Draw the center of rotation
  // circle(corX,corY, 10)
  
  // Draw road
  fill(140,140,140)
  rect(100,0,360,700)
  fill(255,255,0)
  rect(286,0,7,600)
  rect(274,0,7,600)
  fill(255)
  rect(390,205,70,5)
  rect(390,340,70,5)
  rect(390,480,70,5)
  rect(390,70,70,5)
  
  
  
  
  // Draw parked cars
  fill(0)
  rect(395, 360, tireW, tireH)
  rect(395, 425, tireW, tireH)
  rect(445, 360, tireW, tireH)
  rect(445, 425, tireW, tireH)
  fill(150,250,150)
  rect(400, 350, carW, carH)
  car1 = [[400-buff,350-buff],[400-buff, 350+carH+buff], [400+carW+buff,350+carH+buff], [400+carW+buff,350-buff], [400-buff,350-buff]]
  
  fill(0)
  rect(395, 110, tireW, tireH)
  rect(395, 175, tireW, tireH)
  rect(445, 110, tireW, tireH)
  rect(445, 175, tireW, tireH)
  fill(150,150,250)
  rect(400, 100, carW, carH)
  car2 = [[400-buff,100-buff],[400-buff, 100+carH+buff], [400+carW+buff,100+carH+buff], [400+carW+buff,100-buff], [400-buff,100-buff]]
  
  
  
  if (keyIsDown(UP_ARROW)){
    if (abs(turnRadius) < maxR & goUp == 1){
      carTheta -= 0.01*sign(turnRadius)/abs(turnRadius/speed);
      rearAxleX = corX - turnRadius*cos(carTheta)
      rearAxleY = corY + turnRadius*sin(carTheta)
    }
    else if(goUp == 1){
      rearAxleX -= speed/100*sin(carTheta)
      rearAxleY -= speed/100*cos(carTheta)
    }
  }
  
  if (keyIsDown(DOWN_ARROW)){
    if (abs(turnRadius) < maxR & goDown == 1){
      carTheta += 0.01*sign(turnRadius)/abs(turnRadius/speed);
      rearAxleX = corX - turnRadius*cos(carTheta)
      rearAxleY = corY + turnRadius*sin(carTheta)
    }
    else if(goDown == 1){
      rearAxleX += speed/100*sin(carTheta)
      rearAxleY += speed/100*cos(carTheta)
    }
  }
  
  //*****************MOBILE************************************
  // text(speed, 100, 100);
  // console.log(rotationX)
  if(rotationX){
    if (abs(turnRadius) < maxR & goUp == 1 & goDown == 1 & rotationX!=0){
        carTheta -= 0.01*sign(turnRadius)/abs(turnRadius/speed);
        rearAxleX = corX - turnRadius*cos(carTheta)
        rearAxleY = corY + turnRadius*sin(carTheta)
      }
      else if(goUp == 1 & rotationX!=0){
        rearAxleX -= speed/100*sin(carTheta)
        rearAxleY -= speed/100*cos(carTheta)
      }
    speed -=rotationX;
  }
  //***********************************************************
  
  if (keyIsDown(LEFT_ARROW)){
    
    if (sign(turnRadius) == 1 ){
      turnRadius += 3*abs(turnRadius/turnSpeed)
    }
    
    if (sign(turnRadius) == -1 & turnRadius < -minR){
      turnRadius += 3*abs(turnRadius/turnSpeed)
    }
    
    if (turnRadius > maxR){
      turnRadius = -maxR
    }
    corX = rearAxleX + turnRadius*cos(carTheta)
    corY = rearAxleY - turnRadius*sin(carTheta)
  }
  
  if (keyIsDown(RIGHT_ARROW)){
    
    if (sign(turnRadius) == -1){
      turnRadius -= 3*abs(turnRadius/turnSpeed)
    }
    
    if (sign(turnRadius) == 1 & turnRadius > minR){
      turnRadius -= 3*abs(turnRadius/turnSpeed)
    }
    
    if (turnRadius < -maxR){
      turnRadius = maxR
    }
    corX = rearAxleX + turnRadius*cos(carTheta)
    corY = rearAxleY - turnRadius*sin(carTheta)
  }
  
  
  //*****************MOBILE************************************
  // if(abs(rotationY) > 10){
  //   turnRadius -= rotationY/90;
  //   if (turnRadius < -maxR){
  //     turnRadius = maxR;
  //   }
  //   if (turnRadius > maxR){
  //     turnRadius = -maxR
  //   }
  //   corX = rearAxleX + turnRadius*cos(carTheta)
  //   corY = rearAxleY - turnRadius*sin(carTheta)
  // }
  
  //
//   if(rotationY){
//     if (sign(turnRadius) == 1 ){
//         turnRadius += rotationY*abs(turnRadius/turnSpeed)
//       }

//     if (sign(turnRadius) == -1 & turnRadius < -minR){
//         turnRadius += rotationY*abs(turnRadius/turnSpeed)
//       }

//     if (turnRadius > maxR){
//         turnRadius = -maxR
//     }
//     corX = rearAxleX + turnRadius*cos(carTheta)
//     corY = rearAxleY - turnRadius*sin(carTheta)
//   }
  // corX = rearAxleX + turnRadius*cos(carTheta)
  // corY = rearAxleY - turnRadius*sin(carTheta)
  //************************************************************
  
  
  // Distances to front and rear tire from center rear axle
  frontD = sqrt(((carW-2)/2)*((carW-2)/2) + (carH-35)*(carH-35));
  frontTh = atan2(carH - 35,(carW-2)/2);
  rearD = (carW-2)/2;
  
  // Tire coordinates
  frontLx = rearAxleX - frontD*cos(frontTh-carTheta);
  frontLy = rearAxleY - frontD*sin(frontTh-carTheta);
  frontRx = rearAxleX + frontD*cos(frontTh+carTheta);
  frontRy = rearAxleY - frontD*sin(frontTh+carTheta);
  
  rearLx = rearAxleX - rearD*cos(carTheta);
  rearLy = rearAxleY + rearD*sin(carTheta);
  rearRx = rearAxleX + rearD*cos(carTheta);
  rearRy = rearAxleY - rearD*sin(carTheta);
  
  
  
  
  // Tire angles
  if (abs(turnRadius) < maxR){
    leftTheta = atan2(corY - frontLy, corX - frontLx); 
    rightTheta = atan2(corY - frontRy, corX - frontRx);
  }
  else{
    leftTheta = -carTheta;
    rightTheta = -carTheta;
  }
  
  // Draw front tires
  fill(0)
  rectAngle(frontLx, frontLy, tireW, tireH, tireH/2, -(leftTheta));
  rectAngle(frontRx, frontRy, tireW, tireH, tireH/2, -(rightTheta));
  
  // Draw rear tires
  rectAngle(rearLx, rearLy, tireW, tireH, tireH/2, carTheta);
  rectAngle(rearRx, rearRy, tireW, tireH, tireH/2, carTheta);
  
  textSize(30)
  text("Parllel Park!", 570, 505)
  line(570, 509, 735, 509)
  textSize(20)
  text("Arrow keys to drive", 600, 530)
  text("Space to restart", 600, 550)
  
  
  
  // Draw the car
  fill(250,130,130)
  rectAngle(rearAxleX,rearAxleY,carW, carH, off, carTheta)
  
  d1 = sqrt((carW/2)*(carW/2) + (carH-off)*(carH-off))
  d2 = sqrt((carW/2)*(carW/2) + (off*off))
  th1 = atan2(carH - off,carW/2)
  th2 = atan2(off, carW/2)
  
  car0 = [[rearAxleX-d1*cos(th1 - carTheta), rearAxleY-d1*sin(th1-carTheta)],[rearAxleX-d2*cos(th2 + carTheta), rearAxleY+d2*sin(th2+carTheta)], [rearAxleX+d2*cos(th2 - carTheta), rearAxleY+d2*sin(th2-carTheta)],[rearAxleX+d1*cos(th1 + carTheta), rearAxleY-d1*sin(th1+carTheta)], [rearAxleX-d1*cos(th1 - carTheta), rearAxleY-d1*sin(th1-carTheta)]]
  
  
  
//   for (i = 0; i < car0.length -1; i++){
//     stroke(255)
//     line(car0[i][0], car0[i][1],car0[i+1][0], car0[i+1][1])
//   }
  
//   for (i = 0; i < car2.length -1; i++){
//     stroke(255)
//     line(car2[i][0], car2[i][1],car2[i+1][0], car2[i+1][1])
//   }
//   stroke(0)
  // console.log(mouseX, mouseY)
  //console.log(car0.length)
  //console.log(car2.length)
  if (rectInt(car0,car2) == 1 || rectInt(car0,car1) == 1){
    if(keyIsDown(UP_ARROW)){
       goUp = 0;
       goDown = 0;
    }
    if(keyIsDown(DOWN_ARROW)){
       goUp = 0;
       goDown = 0;
    }
    fill(240,50,50)
    textSize(42)
    text("YOU HIT A CAR!", 469, 300)
    textSize(22)
    text("(Press Space to Restart)", 495, 335)
    carHit = 1;
  }
  else{
    goUp = 1
    goDown = 1
    carHit = 0
  }
  
  if (rearAxleY < -20){
    rearAxleY += 620
    corY += 620
  }
  if (rearAxleY > 650){
    rearAxleY = -650
    corY -= 650
  }
  
  if (rearAxleX < -60){
    rearAxleX = 835
    corX += 840
  }
  if (rearAxleX > 860){
    rearAxleX = -35
    corX -= 820
  }
  
  if (keyIsDown(32)){
   restart = 1 
  }
  
  if (restart == 1){
    restart = 0
    // Rear axle location
  rearAxleX = 350;
  rearAxleY = 550;
  
  // Angle of car 
  carTheta = 0;
  
  // Angle of the front wheels
  leftTheta = 0;
  rightTheta = 0;
  
  // Car width and height
  carW = 50;
  carH = 100;
  
  // Tire width and height
  tireW = 10;
  tireH = 20;
  
  // Rear Axle offset from back edge of car
  off = 15
  
  // Max and min turning radii
      maxR = 2000       // Max turning radius
    minR = carH*1.5   // Min turning radius

    // Car speeds
    speed = 300       // Higher is faster
    turnSpeed = 17    // Lower is faster

    // Initial turning radius set to maxR so wheels straight
    turnRadius = maxR

    corX = rearAxleX + turnRadius*cos(carTheta)
    corY = rearAxleY - turnRadius*sin(carTheta)

    goUp = 1;
    goDown = 1;

    buff = 1;
    
    carHit = 0
  }
  
  if (frontLx > 390 & frontLx < 460 & frontRx > 390 & frontRx < 460 & rearLx > 390 & rearLx < 460 & rearRx > 390 & rearRx < 460 & frontLy > 210 & frontLy < 340 & frontRy > 210 & frontRy < 340 & rearLy > 210 & rearLy < 340 & rearRy > 210 & rearRy < 340 & abs(carTheta) < PI/18 & carHit == 0){
    textSize(42)
    fill(50,205,50)
    text("Good Job!!!", 510, 350 - 250)
    textSize(22)
    text("(press space to replay)", 530, 380 - 250)
    }
  
}

function rectAngle(x, y, w, h, offset, theta){
  d1 = sqrt((w/2)*(w/2) + (h-offset)*(h-offset))
  d2 = sqrt((w/2)*(w/2) + (offset*offset))
  th1 = atan2(h - offset,w/2)
  th2 = atan2(offset, w/2)
  
  quad(x-d1*cos(th1 - theta), y-d1*sin(th1-theta), x-d2*cos(th2 + theta), y+d2*sin(th2+theta), x+d2*cos(th2 - theta), y+d2*sin(th2-theta), x+d1*cos(th1 + theta), y-d1*sin(th1+theta))
}

function sign(x) {
  if (x > 0) {
    return 1
  }
  else{
    return -1
  }
}

function orient(x1,y1,x2,y2,x3,y3){
  val = (y2 - y1)*(x3 - x2) - (y3 - y2)*(x2 - x1)

  return sign(val)
}

function intersect(x1,y1,x2,y2,x3,y3,x4,y4){
  if (orient(x1,y1,x2,y2,x3,y3) != orient(x1,y1,x2,y2,x4,y4) & 
  orient(x3,y3,x4,y4,x1,y1) != orient(x3,y3,x4,y4,x2,y2)){
    return 1
  }
  else{
    return 0
  }
}

function rectInt(car1, car2){
  cal = 0
  for (i = 0; i < 4; i++){
    for (j = 0; j < car2.length-1;j++){
      if (intersect(car1[i][0], car1[i][1],car1[i+1][0], car1[i+1][1], car2[j][0], car2[j][1], car2[j+1][0], car2[j+1][1]) == 1){
        cal = 1; 
        break
        }
      }
    }
  return cal
}
