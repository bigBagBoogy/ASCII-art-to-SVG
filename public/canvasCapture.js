// Function to capture and save the canvas
export function captureAndSaveCanvas() {
  const canvas = document.getElementById("yourCanvasId"); // Replace 'yourCanvasId' with the actual ID of your canvas element

  // Capture the canvas as a data URL
  const canvasDataUrl = canvas.toDataURL("image/png");

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
      console.log(message); // Response from the server
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to set up the event listener for the "Save Canvas" button
export function setUpSaveCanvasButton() {
  const saveCanvasButton = document.getElementById("saveCanvasButton");
  if (saveCanvasButton) {
    saveCanvasButton.addEventListener("click", captureAndSaveCanvas);
  } else {
    console.error("Save Canvas button not found.");
  }
}
