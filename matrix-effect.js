const density = "Ñ@#W$9876543210?!abc;:=-,._M";
let picture;

function preload() {
  picture = loadImage("images/zombie.png");
}

function setup() {
  noCanvas();
}

function draw() {
  background(0);

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
        // Use M for empty space with reduced alpha.
        row += '<span style="opacity: 0.0;">' + c + "</span>";
      } else if (c == "") {
        row += "&nbsp;";
      } else {
        row += c;
      }
    }
    createDiv(row);
  }
  noLoop(); // Stop the draw loop, as we only need to generate the art once.
}

document.getElementById("exportButton").addEventListener("click", function () {
  // Create an SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  // Create an SVG text element to hold your ASCII art
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", "10"); // Set the X position
  text.setAttribute("y", "30"); // Set the Y position
  text.setAttribute("font-size", "12"); // Set the font size
  text.setAttribute("font-family", "monospace"); // Set the font family

  // Set the text fill color
  text.setAttribute("fill", "white");

  // Set the xml:space attribute to "preserve" to ensure spaces are preserved
  text.setAttribute("xml:space", "preserve");

  let maxWidth = 0; // To store the maximum row width
  let totalHeight = 0; // To store the total height for all rows
  let rowWidth = 0;

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

      if (rowWidth > maxWidth) {
        maxWidth = rowWidth;
        // console.log(`maxWidth: ${maxWidth}`);
      }
      if (c == "M") {
        // Use dot for empty space with reduced alpha.
        row += '<tspan style="opacity: 0.0;">' + c + "</tspan>";
      } else if (c == "") {
        row += " "; // Use a space for empty spaces
      } else {
        row += c;
        rowWidth += 0.1; // Increase rowWidth only for non-empty characters
      }
    }

    totalHeight += 7; // Adjust this value to control line spacing
    const tspan = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "tspan"
    );
    tspan.setAttribute("x", "10"); // Set the X position
    tspan.setAttribute("y", totalHeight); // Set the Y position
    tspan.innerHTML = row; // Set the content of the tspan
    text.appendChild(tspan); // Append the tspan to the text element
  }
  maxWidth = maxWidth * 2 - rowWidth * 0.1;

  // Set the width and height attributes of the SVG based on maxWidth and totalHeight
  svg.setAttribute("width", maxWidth); // Add extra space for padding
  console.log(`ending maxWidth: ${maxWidth}`);
  svg.setAttribute("height", totalHeight + 20); // Add extra space for padding
  console.log(`ending totalHeight: ${totalHeight}`);
  // Create a black background
  const backgroundRect = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  // Set the width and height of the background to make it a squire
  if (maxWidth >= totalHeight) {
    totalHeight = maxWidth;
  } else {
    maxWidth = totalHeight;
  }

  backgroundRect.setAttribute("width", maxWidth + 20);
  console.log(`ending maxWidth + 20: ${maxWidth + 20}`);
  backgroundRect.setAttribute("height", totalHeight + 20);
  console.log(`ending totalHeight + 20: ${totalHeight + 20}`);
  backgroundRect.setAttribute("fill", "black"); // Set the background color to black
  svg.appendChild(backgroundRect); // Append the background to the SVG

  // Append the text element to the SVG
  svg.appendChild(text);

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
