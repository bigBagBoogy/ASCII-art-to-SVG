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
    let xPosition = 10; // Initial X position for each row
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
        row += `<tspan style="opacity: 0.0;" x="${xPosition}">${c}</tspan>`;
      } else if (c == "") {
        row += `<tspan x="${xPosition}">&nbsp;</tspan>`; // Use a space for empty spaces
      } else {
        row += `<tspan x="${xPosition}">${c}</tspan>`;
      }

      // Adjust the horizontal position for the next character
      xPosition += 12; // You can adjust this value to control character spacing
    }

    createDiv(row);
  }
  noLoop(); // Stop the draw loop, as we only need to generate the art once.
}

document.getElementById("exportButton").addEventListener("click", function () {
  // Create an SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  // Set the width and height of the SVG to match your ASCII art size
  svg.setAttribute("width", picture.width);
  svg.setAttribute("height", picture.height);

  let totalHeight = 0; // To store the total height for all rows

  for (let y = 0; y < picture.height; y++) {
    let xPosition = 10; // Initial X position for each row
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
        row += `<tspan style="opacity: 0.0;" x="${xPosition}">${c}</tspan>`;
      } else if (c == "") {
        row += `<tspan x="${xPosition}">&nbsp;</tspan>`; // Use a space for empty spaces
      } else {
        row += `<tspan x="${xPosition}">${c}</tspan>`;
      }

      // Adjust the horizontal position for the next character
      xPosition += 12; // You can adjust this value to control character spacing
    }

    // Append the row to the SVG as a text element
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("y", totalHeight); // Set the Y position
    text.setAttribute("font-size", "12"); // Set the font size
    text.setAttribute("font-family", "monospace"); // Set the font family

    // Set the xml:space attribute to "preserve" to ensure spaces are preserved
    text.setAttribute("xml:space", "preserve");

    text.innerHTML = row; // Set the innerHTML to your row content
    svg.appendChild(text); // Append the text element to the SVG

    // Calculate totalHeight based on the number of rows and line spacing
    totalHeight += 12; // Adjust this value to control line spacing
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
  a.download = "ascii_art.svg"; // Set the name for the downloaded SVG file

  // Trigger a click event on the download link to initiate the download
  a.click();

  // Clean up by revoking the Blob URL
  URL.revokeObjectURL(blobURL);
});
