const express = require("express");
const app = express();
const fs = require("fs");

// Increase payload size limit to handle larger data
app.use(express.json({ limit: "50mb" })); // Adjust the limit to your needs

// Serve static files from the "public" directory
app.use(express.static("public"));

// Serve the "libraries" directory for external libraries like p5.js
app.use("/libraries", express.static("libraries"));

let imageCounter = 0; // Initialize a counter for image numbering

app.post("/uploadCanvas", (req, res) => {
  const canvasDataUrl = req.body.canvasDataUrl;
  const filename = `public/images/canvas${imageCounter}.png`; // Define the unique filename

  if (canvasDataUrl) {
    // Decode the data URL and save it as an image file
    const imageData = canvasDataUrl.split(";base64,")[1];
    const imageBuffer = Buffer.from(imageData, "base64");

    // Save the image to a file with the unique filename
    fs.writeFileSync(filename, imageBuffer);

    // Get the size of the image in bytes
    const imageSize = imageBuffer.length;

    // Increment the image counter for the next image
    imageCounter++;

    res.send(
      `Canvas image saved on the server. Image size: ${imageSize} bytes`
    );
  } else {
    res.status(400).send("Invalid canvas data.");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
