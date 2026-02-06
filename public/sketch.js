// Project: Collective Omikuji - Sensor & Networked Experience
// Author: Yiming BI
// Concept: A digital ritual involving physical gesture (shaking), 
//          coordinated grid interaction, and collective fortune.

let socket;
let gameState = "START";
let myNumber = 0;
let fortuneResult = "";
let onlineUserCount = 0;
let currentBgColor = [245, 245, 220];
let isProcessing = false;


let threshold = 25;
let prevX, prevY, prevZ;

function setup() {
  createCanvas(windowWidth, windowHeight);
  

  socket = io();


  socket.on('fortuneUpdate', (data) => {
    fortuneResult = data.text;
    currentBgColor = data.color; 
  });

  socket.on('userCount', (count) => {
    onlineUserCount = count;
  });

  textAlign(CENTER, CENTER);
}

function draw() {
  background(currentBgColor);
  

  drawSystemInfo();

  if (gameState === "START") {
    drawStartScreen();
  } else if (gameState === "SHAKING") {
    drawShakingScreen();
    checkShake();
  } else if (gameState === "GRID") {
    drawNumberGrid();
  } else if (gameState === "REVEAL") {
    drawFortuneCard();
  }
}



function drawSystemInfo() {
  push();
  fill(100);
  textSize(14);
  textAlign(LEFT);
  text("Nodes Connected: " + onlineUserCount, 20, 30);
  pop();
}

function drawStartScreen() {
  textSize(22);
  fill(50);
  text("Step 1: Tap to Sync\nStep 2: Shake to Draw a Number", width/2, height/2);
}

function drawShakingScreen() {
  textSize(28);
  fill(50);
  push();
  translate(random(-5, 5), random(-5, 5));
  text("SHAKING THE BOX...", width/2, height/2);
  pop();
}

function drawNumberGrid() {
  textSize(18);
  fill(50);
  text("You drew number: " + myNumber, width/2, 40);
  text("Find it in the grid to reveal destiny", width/2, 65);

  let cols = 5;
  let rows = 6;
  let gap = 10;
  let gridW = min(width * 0.8, 400);
  let cellW = gridW / cols;
  let startX = (width - gridW) / 2 + cellW / 2;
  let startY = 120;

  for (let i = 0; i < 30; i++) {
    let x = startX + (i % cols) * cellW;
    let y = startY + floor(i / cols) * cellW;

    stroke(218, 165, 32);
    fill(255);
    rectMode(CENTER);
    rect(x, y, cellW - gap, cellW - gap, 4);

  
    noStroke();
    fill(0);
    textSize(16);
    text(i + 1, x, y);


    if (mouseIsPressed && dist(mouseX, mouseY, x, y) < cellW/2) {
      if (i + 1 === myNumber) {
        socket.emit('drawFortuneRequest');
        gameState = "REVEAL";
      }
    }
  }
}

function drawFortuneCard() {
  push();
  translate(width / 2, height / 2);


  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = 'rgba(0,0,0,0.1)';
  fill(255);
  stroke(218, 165, 32); 
  strokeWeight(5);
  rectMode(CENTER);
  rect(0, 0, 180, 420, 10);
  drawingContext.shadowBlur = 0;

 
  strokeWeight(2);
  let r = 35;
  noFill();

  arc(-90, -210, r, r, 0, HALF_PI);
  arc(90, -210, r, r, HALF_PI, PI);
  arc(90, 210, r, r, PI, PI + HALF_PI);
  arc(-90, 210, r, r, PI + HALF_PI, TWO_PI);


  fill(0);
  noStroke();
  

  let words = fortuneResult ? fortuneResult.split("\n")[0] : "抽签中"; 
  let charArray = words.split("");

  textFont('sans-serif');
  textStyle(BOLD);
  
  if(charArray.length === 1) {
    textSize(90);
    text(charArray[0], 0, 0);
  } else if (charArray.length === 2) {
    textSize(80);
    text(charArray[0], 0, -80);
    text(charArray[1], 0, 80);
  } else if (charArray.length >= 3) {
    textSize(60);
    for(let i=0; i < charArray.length; i++) {
        text(charArray[i], 0, -110 + i*110);
    }
  }
  pop();
  
  textSize(16);
  fill(100);
  text("Tap anywhere to reset", width/2, height - 50);
}



function mousePressed() {

  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission();
  }

  if (gameState === "START") {
    gameState = "SHAKING";
  } 

  else if (gameState === "SHAKING") {
    myNumber = floor(random(1, 31));
    gameState = "GRID";
  } 

  else if (gameState === "REVEAL") {
    gameState = "START";
  }
}
function checkShake() {
  if (isProcessing) return;

  if (prevX === undefined) {
    prevX = accelerationX; prevY = accelerationY; prevZ = accelerationZ;
    return;
  }

  let acceleration = p5.Vector.dist(
    createVector(accelerationX, accelerationY, accelerationZ), 
    createVector(prevX, prevY, prevZ)
  );
  
  if (acceleration > threshold) {
    isProcessing = true;
    myNumber = floor(random(1, 31));
    

    setTimeout(() => {
      gameState = "GRID";
      isProcessing = false;
    }, 800); 
  }
  
  prevX = accelerationX; prevY = accelerationY; prevZ = accelerationZ;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}