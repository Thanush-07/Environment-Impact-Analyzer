const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const captureButton = document.getElementById("capture");
const resultText = document.getElementById("result").querySelector("span");

// Access the camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error("❌ Camera access denied:", error);
        resultText.innerText = "❌ Camera access denied!";
        resultText.style.color = "red";
    });

// Capture image and classify waste
captureButton.addEventListener("click", () => {
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get pixel data to analyze colors (simple color detection)
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let redCount = 0, greenCount = 0, blueCount = 0, skinToneCount = 0;

    // Loop through pixels and analyze color distribution
    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        if (r > 200 && g > 180 && b > 160) {
            skinToneCount++; // Likely human skin tone
        } else if (r > g && r > b) {
            redCount++; // Red objects
        } else if (g > r && g > b) {
            greenCount++; // Green objects (likely biodegradable)
        } else if (b > r && b > g) {
            blueCount++; // Blue objects (non-biodegradable like plastic)
        }
    }

    // Classification logic
    if (skinToneCount > redCount + greenCount + blueCount) {
        resultText.innerText = "🚫 Humans not recognized!";
        resultText.style.color = "red";
    } else if (greenCount > redCount && greenCount > blueCount) {
        resultText.innerText = "♻️ Biodegradable Waste";
        resultText.style.color = "green";
    } else if (blueCount > redCount && blueCount > greenCount) {
        resultText.innerText = "🚮 Non-Biodegradable Waste";
        resultText.style.color = "blue";
    } else {
        resultText.innerText = "⚠️ Unknown Object";
        resultText.style.color = "orange";
    }
});
