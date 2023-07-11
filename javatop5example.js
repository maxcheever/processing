/**
 * Using Geometry by Marius Watz (Java Version) as a reference
 *
 * Using sin/cos, blends colors, and draws a series of
 * rotating arcs on the screen.
*/

let COUNT = 150;

let pt = [];
let style = [];


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  //setAttributes({ version: 2 })
  background(255);
  // randomSeed(100);  // use this to get the same result each time

  // Set up arc shapes
  let index = 0;
  for (let i = 0; i < COUNT; i++) {
    pt[index++] = random(TAU); // Random X axis rotation
    pt[index++] = random(TAU); // Random Y axis rotation

    pt[index++] = random(60,80); // Short to quarter-circle arcs
    if (random(100) > 90) {
      pt[index] = floor(random(8,27)) * 10;
    }

    pt[index++] = int(random(2,50)*5); // Radius. Space them out nicely

    pt[index++] = random(4,32); // Width of band
    if (random(100) > 90) {
      pt[index] = random(40,60); // Width of band
    }

    pt[index++] = radians(random(5,30)) / 5; // Speed of rotation

    /*
    // alternate color scheme
    float prob = random(100);
    if (prob < 30) {
      style[i*2] = colorBlended(random(1), 255,0,100, 255,0,0, 210);
    } else if (prob < 70) {
      style[i*2] = colorBlended(random(1), 0,153,255, 170,225,255, 210);
    } else if (prob < 90) {
      style[i*2] = colorBlended(random(1), 200,255,0, 150,255,0, 210);
    } else {
      style[i*2] = color(255,255,255, 220);
    }
    */

    let prob = random(100);
    if (prob < 50) {
      style[i*2] = colorBlended(random(1), 200,255,0, 50,120,0, 210);
    } else if (prob <90) {
      style[i*2] = colorBlended(random(1), 255,100,0, 255,255,0, 210);
    } else {
      style[i*2] = color(255,255,255, 220);
    }

    style[i*2+1] = floor(random(100)) % 3;
  }
}


function draw() {
  background(0);

  translate(0, 0, 0);
  rotateX(PI / 6);
  rotateY(PI / 6);

  let index = 0;
  for (let i = 0; i < COUNT; i++) {
    push();
    rotateX(pt[index++]);
    rotateY(pt[index++]);

    if (style[i*2+1] == 0) {
      stroke(style[i*2]);
      noFill();
      strokeWeight(1);
      arcLine(0, 0, pt[index++], pt[index++], pt[index++]);

    } else if(style[i*2+1] == 1) {
      fill(style[i*2]);
      noStroke();
      arcLineBars(0, 0, pt[index++], pt[index++], pt[index++]);

    } else {
      fill(style[i*2]);
      noStroke();
      arc(0, 0, pt[index++], pt[index++], pt[index++]);
    }

    // increase rotation
    pt[index-5] += pt[index] / 10;
    pt[index-4] += pt[index++] / 20;
  }
}


// Get blend of two colors
function colorBlended(fract,
                 r, g, b,
                 r2, g2, b2, a) {
  return color(r + (r2 - r) * fract,
               g + (g2 - g) * fract,
               b + (b2 - b) * fract, a);
}


// Draw arc line
function arcLine(x, y, degrees, radius, w) {
  let lineCount = floor(w/2);

  for (let j = 0; j < lineCount; j++) {
    beginShape();
    for (let i = 0; i < degrees; i++) {  // one step for each degree
      let angle = radians(i);
      vertex(x + cos(angle) * radius,
             y + sin(angle) * radius);
    }
    endShape();
    radius += 2;
  }
}


// Draw arc line with bars
function arcLineBars(x, y, degrees, radius, w) {
  beginShape(TESS);
  for (let i = 0; i < degrees/4; i += 4) {  // degrees, but in steps of 4
    let angle = radians(i);
    vertex(x + cos(angle) * radius,
           y + sin(angle) * radius);
    vertex(x + cos(angle) * (radius+w),
           y + sin(angle) * (radius+w));

    angle = radians(i+2);
    vertex(x + cos(angle) * (radius+w),
           y + sin(angle) * (radius+w));
    vertex(x + cos(angle) * radius,
           y + sin(angle) * radius);
  }
  endShape();
}


// Draw solid arc
function arc(x, y, degrees, radius, w) {
  beginShape(TESS);
  for (let i = 0; i < degrees; i++) {
    let angle = radians(i);
    vertex(x + cos(angle) * radius,
           y + sin(angle) * radius);
    vertex(x + cos(angle) * (radius+w),
           y + sin(angle) * (radius+w));
  }
  endShape();
}
