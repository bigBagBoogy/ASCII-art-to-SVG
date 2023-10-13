let picture;

document
  .getElementById("saveCanvasButton")
  .addEventListener("click", captureAndSaveCanvas);

function preload() {
  picture = loadImage("images/picture.png");
}

function setup() {
  noCanvas();
  generateSVG();
}

function generateSVG() {
  // Load the original image
  const originalImage = loadImage("images/picture.png");

  // Scale down the image
  originalImage.resize(100, 100); // Adjust the dimensions as needed
  // Create an SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", picture.width);
  svg.setAttribute("height", picture.height);

  picture.loadPixels();
  let rectWidth = width / picture.width;
  let rectHeight = height / picture.height;

  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      const index = (x + y * picture.width) * 4;
      const r = picture.pixels[index];
      const g = picture.pixels[index + 1];
      const b = picture.pixels[index + 2];

      // Create an SVG rectangle for each pixel
      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      rect.setAttribute("x", x * rectWidth);
      rect.setAttribute("y", y * rectHeight);
      rect.setAttribute("width", rectWidth);
      rect.setAttribute("height", rectHeight);
      rect.setAttribute("fill", `rgb(${r}, ${g}, ${b})`);
      svg.appendChild(rect);
    }
  }

  // Create a Blob from the SVG data
  const blob = new Blob([new XMLSerializer().serializeToString(svg)], {
    type: "image/svg+xml",
  });

  // Create a URL for the Blob
  const blobURL = URL.createObjectURL(blob);

  // Create a download link for the SVG
  const a = document.createElement("a");
  a.href = blobURL;
  a.download = "pixel_image.svg"; // Set the name for the downloaded SVG file

  // Trigger a click event on the download link to initiate the download
  a.click();

  // Clean up by revoking the Blob URL
  URL.revokeObjectURL(blobURL);
}
