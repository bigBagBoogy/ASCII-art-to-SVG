const density = "Ñ@#W$9876543210?!abc;:=-,._ ";
let picture;

function preload() {
  picture = loadImage("picture.png");
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
      let index = (x + y * picture.width) * 4;
      let r = picture.pixels[index + 0];
      let g = picture.pixels[index + 1];
      let b = picture.pixels[index + 2];
      let v = r * 0.3 + g * 0.59 + b * 0.11;
      fill(v, v, v);
      rect(x * w, y * h, w, h);
    }
  }
}
