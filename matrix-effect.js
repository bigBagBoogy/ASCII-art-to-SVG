const density = "Ñ@#W$9876543210?!abc;:=-,._M";
let picture;

function preload() {
  picture = loadImage("picture.png");
}

function setup() {
  noCanvas();
}

function draw() {
  background(0);

  let w = width / picture.width;
  let h = height / picture.height;
  picture.loadPixels();
  for (let y = 0; y < picture.height; y++) {
    let row = "";
    for (let x = 0; x < picture.width; x++) {
      let pixelIndex = (x + y * picture.width) * 4;
      let r = picture.pixels[pixelIndex + 0];
      let g = picture.pixels[pixelIndex + 1];
      let b = picture.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const length = density.length;
      const charIndex = floor(map(avg, 0, 255, length, 0));
      const c = density.charAt(charIndex);
      if (c == "M") {
        // Use dot for empty space with reduced alpha.
        row += '<span style="opacity: 0.0;">' + c + "</span>";
      } else if (c == "") {
        row += "&nbsp;";
      } else {
        row += c;
      }
    }
    createDiv(row);
  }
}
