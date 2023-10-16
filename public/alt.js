let picture;
let saveButton;

document
  .getElementById("saveCanvasButton")
  .addEventListener("click", captureAndSaveCanvas);

function preload() {
  picture = loadImage(
    "images/Banana Fire Spinnerblast Ball Python.png",
    (img) => {
      // Get the width and height of the loaded image
      canvasWidth = img.width;
      canvasHeight = img.height;
    }
  );
}

function setup() {
  createCanvas(canvasWidth, canvasHeight).id("yourCanvasId"); // Set canvas size to match the image
  background(0, 0); // Set a transparent background
  saveButton = document.getElementById("saveCanvasButton");
  noLoop(); // We don't need continuous draw updates
}

function draw() {
  image(picture, 0, 0); // Draw the loaded image on the canvas
  noStroke();

  let w = width / picture.width;
  let h = height / picture.height;
  picture.loadPixels();

  // Define the number of colors in your palette
  let numColors = 8; // Adjust this value as needed

  loadPixels(); // Load the canvas pixels

  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      let index = (x + y * picture.width) * 4;
      let r = picture.pixels[index + 0];
      let g = picture.pixels[index + 1];
      let b = picture.pixels[index + 2];
      let a = picture.pixels[index + 3]; // Alpha value

      // Quantize the colors to the limited palette
      r = (round((r / 255) * (numColors - 1)) / (numColors - 1)) * 255;
      g = (round((g / 255) * (numColors - 1)) / (numColors - 1)) * 255;
      b = (round((b / 255) * (numColors - 1)) / (numColors - 1)) * 255;

      // Preserve the original alpha value
      fill(r, g, b, a);
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
// ... (your existing code)

// Function to download the canvas as an image
function exportCanvas() {
  const canvas = document.getElementById("yourCanvasId"); // Use the ID you assigned

  if (canvas) {
    const canvasDataUrl = canvas.toDataURL("image/png");

    // Create a Blob from the data URL
    const blob = dataURLtoBlob(canvasDataUrl);

    // Create a download link
    const downloadLink = document.getElementById("downloadLink");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "your_image.png";

    // Trigger a click event on the download link
    downloadLink.click();
  } else {
    console.error("Canvas element not found with the specified ID.");
  }
}

// Function to convert data URL to Blob
function dataURLtoBlob(dataURL) {
  const parts = dataURL.split(",");
  const byteString = atob(parts[1]);
  const mimeString = parts[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

// Attach the exportCanvas function to the exportButton
document.getElementById("exportButton").addEventListener("click", exportCanvas);

// ...
