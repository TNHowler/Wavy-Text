//GitHub Copilot assisted in creating this code.

let draggableText = "Access Is Important";
let trailingText = "Don't lock your creativity into a format we can't see";
let textX, textY;
let dragging = false;
let prevMouseX, prevMouseY;
let speed = 0;
let trail = [];
let hasDragged = false;
let letterSpacing = 3; // Adjust this value for desired spacing
let customFont;

function preload() {
  customFont = loadFont('BBB.otf'); // Replace with your font file path
}

function mouseReleased() {
  dragging = false;
  // Clear the trail and reset the hasDragged flag
  trail = [];
  hasDragged = false;
}

function mouseDragged() {
  if (dragging) {
    textX = mouseX;
    textY = mouseY;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  background("white");
  textSize(10);
  textAlign(CENTER, CENTER);
  textFont(customFont); // Apply the custom font
  textX = width / 2;
  textY = height / 2;
}

function draw() {
  background("white");
  
  if (dragging) {
    let dx = mouseX - prevMouseX;
    let dy = mouseY - prevMouseY;
    speed = sqrt(dx * dx + dy * dy);
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    hasDragged = true;
  } else {
    speed = 0;
  }
  
  let totalWidth = textWidth(draggableText) + (draggableText.length - 1) * letterSpacing;
  let startX = textX - totalWidth / 2;

  // Store the current position in the trail array
  if (hasDragged) {
    trail.push({ x: textX, y: textY });

    // Limit the length of the trail
    if (trail.length > 50) {
      trail.shift();
    }

    // Draw the trail with the alternate sentence
    for (let i = 0; i < trail.length; i++) {
      let pos = trail[i];
      let alpha = map(i, 0, trail.length, 0, 255);
      fill(0, 0, 0, alpha);
      let trailingTotalWidth = textWidth(trailingText) + (trailingText.length - 1) * letterSpacing;
      let trailingStartX = pos.x - trailingTotalWidth / 2;
      for (let j = 0; j < trailingText.length; j++) {
        let charX = trailingStartX + textWidth(trailingText.substring(0, j)) + j * letterSpacing;
        let charY = pos.y + sin(j * 0.5) * speed;
        text(trailingText[j], charX, charY);
      }
    }
  }

  // Draw the current text
  fill(0);
  for (let i = 0; i < draggableText.length; i++) {
    let charX = startX + textWidth(draggableText.substring(0, i)) + i * letterSpacing;
    let charY = textY + sin(i * 0.5) * speed;
    text(draggableText[i], charX, charY);
  }
}

function mousePressed() {
  let d = dist(mouseX, mouseY, textX, textY);
  if (d < textWidth(draggableText) / 2) {
    dragging = true;
    prevMouseX = mouseX;
    prevMouseY = mouseY;
  }
}
