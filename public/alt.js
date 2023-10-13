let picture;
let saveButton;

document
  .getElementById("saveCanvasButton")
  .addEventListener("click", captureAndSaveCanvas);

function preload() {
  picture = loadImage("images/picture.png");
}

function setup() {
  createCanvas(500, 500).id("yourCanvasId"); // Add an ID to your canvas
  saveButton = document.getElementById("saveCanvasButton");
}

function draw() {
  background(0);
  noStroke();

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

function captureAndSaveCanvas() {
  const canvas = document.getElementById("yourCanvasId"); // Use the ID you assigned

  if (canvas) {
    // Capture the canvas as a data URL
    const canvasDataUrl = canvas.toDataURL("image/png");

    // Log the data URL
    console.log("Canvas Data URL:", canvasDataUrl);

    // Send the canvas data to the server
    fetch("/uploadCanvas", {
      method: "POST",
      body: JSON.stringify({ canvasDataUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((message) => {
        console.log("Server Response:", message); // Response from the server
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    console.error("Canvas element not found with the specified ID.");
  }
}
