const density = "Ñ@#W$9876543210?!abc;:=-,._ ";
let picture;

function preload() {
  picture = loadImage("images/zombie.png");
}

function setup() {
  createCanvas(750, 700);
}

function draw() {
  background(0);

  let w = width / picture.width;
  let h = height / picture.height;
  picture.loadPixels();
  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      let pixelIndex = (x + y * picture.width) * 4;
      let r = picture.pixels[pixelIndex + 0];
      let g = picture.pixels[pixelIndex + 1];
      let b = picture.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      noStroke();
      fill(255);
      // fill(57, 255, 20); // Bright green

      const length = density.length;
      const charIndex = floor(map(avg, 0, 255, length, 0));

      textSize(w);
      textAlign(CENTER, CENTER);
      text(density[charIndex], x * w, y * h);
    }
  }
}
