const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const captureButton = document.getElementById("capture");
const resultText = document.getElementById("result").querySelector("span");

// Access the camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => console.error("Camera access denied:", error));

// Capture image and display it on canvas
captureButton.addEventListener("click", () => {
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Simulating AI classification (random result for now)
    const randomResult = Math.random() < 0.5 ? "Biodegradable" : "Non-Biodegradable";
    resultText.innerText = randomResult;
    resultText.style.color = randomResult === "Biodegradable" ? "green" : "red";
   
});

