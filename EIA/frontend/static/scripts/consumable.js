const carbonEmissionData = {
    "Plastic Products": { min: 1.7, max: 6.0, alternative: "Use bioplastics or reusable materials." },
    "Paper Products": { min: 0.5, max: 1.2, alternative: "Use recycled paper and reduce consumption." },
    "Biodegradable Packaging": { min: 0.2, max: 0.8, alternative: "Compost after use to minimize waste." },
    "Electronics Packaging": { min: 1.5, max: 4.0, alternative: "Switch to sustainable cardboard or molded pulp." },
    "Single-Use Products": { min: 2.0, max: 5.5, alternative: "Opt for reusable or compostable options." },
    "Glass & Metal Packaging": { min: 0.7, max: 2.5, alternative: "Recycle to reduce new material extraction." },
    "Sustainable Packaging": { min: 0.3, max: 1.0, alternative: "Prioritize renewable and recyclable materials." }
};

function calculate() {
    let material = document.getElementById("material").value;
    let weight = parseFloat(document.getElementById("weight").value);
    let resultDiv = document.getElementById("result");

    if (isNaN(weight) || weight <= 0) {
        resultDiv.innerHTML = "<p style='color: red;'>Please enter a valid weight.</p>";
        return;
    }

    if (carbonEmissionData[material]) {
        let minEmission = (carbonEmissionData[material].min * weight).toFixed(2);
        let maxEmission = (carbonEmissionData[material].max * weight).toFixed(2);
        let alternative = carbonEmissionData[material].alternative;

        resultDiv.innerHTML = `
            <p><strong>Category:</strong> ${material}</p>
            <p><strong>Weight:</strong> ${weight} kg</p>
            <p><strong>Carbon Emission Range:</strong> ${minEmission} - ${maxEmission} kg CO₂</p>
            <p><strong>Alternative:</strong> ${alternative}</p>
        `;
    } else {
        resultDiv.innerHTML = "<p style='color: red;'>Material type not found.</p>";
    }
}