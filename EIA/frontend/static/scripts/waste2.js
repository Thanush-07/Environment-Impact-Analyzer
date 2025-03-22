const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const captureButton = document.getElementById("capture");
const resultText = document.getElementById("result").querySelector("span");

// Load TensorFlow.js model
let model;
(async function() {
    model = await mobilenet.load();
    console.log("Model loaded successfully!");
})();

// Access the camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => console.error("Camera access denied:", error));

// Capture image and classify waste
captureButton.addEventListener("click", async () => {
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas image to Tensor
    const imageTensor = tf.browser.fromPixels(canvas).resizeNearestNeighbor([224, 224]).toFloat().expandDims();

    // Predict using model
    if (model) {
        const predictions = await model.classify(imageTensor);
        console.log(predictions);
        
        // Define categories based on prediction labels
        const biodegradableKeywords = ["leaf", "food", "fruit", "paper"];
        const nonBiodegradableKeywords = ["plastic", "metal", "glass", "electronics"];

        let classification = "Unknown";
        for (let pred of predictions) {
            if (biodegradableKeywords.some(keyword => pred.className.includes(keyword))) {
                classification = "Biodegradable";
                break;
            } else if (nonBiodegradableKeywords.some(keyword => pred.className.includes(keyword))) {
                classification = "Non-Biodegradable";
                break;
            }
        }

        // Update result text
        resultText.innerText = classification;
        resultText.style.color = classification === "Biodegradable" ? "green" : "red";
    } else {
        resultText.innerText = "Model not loaded!";
    }
});
