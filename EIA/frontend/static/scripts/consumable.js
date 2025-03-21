const carbonEmissionData = {
    "Plastic Products": { min: 1.7, max: 6.0, alternative: "Use bioplastics.", tips: "Avoid single-use plastics." },
    "Paper Products": { min: 0.5, max: 1.2, alternative: "Use recycled paper.", tips: "Print less, use both sides of paper." },
    "Biodegradable Packaging": { min: 0.2, max: 0.8, alternative: "Compost after use.", tips: "Ensure proper composting." }
};

let emissionChart = null;

function nextStep(step) {
    document.getElementById("step1").style.display = step === 1 ? "block" : "none";
    document.getElementById("step2").style.display = step === 2 ? "block" : "none";
    document.getElementById("results").style.display = "none";
}

function prevStep(step) {
    nextStep(step);
}

function calculate() {
    let material = document.getElementById("material").value;
    let weight = parseFloat(document.getElementById("weight").value);

    if (isNaN(weight) || weight <= 0) {
        alert("Please enter a valid weight.");
        return;
    }

    let minEmission = (carbonEmissionData[material].min * weight).toFixed(2);
    let maxEmission = (carbonEmissionData[material].max * weight).toFixed(2);
    let alternative = carbonEmissionData[material].alternative;
    let tip = carbonEmissionData[material].tips;

    document.getElementById("result").innerHTML = `Carbon Emission: ${minEmission} - ${maxEmission} kg CO₂`;
    document.getElementById("tips").innerHTML = `Alternative: ${alternative} | Tip: ${tip}`;
    
    drawGraph(material, [minEmission, maxEmission]);
    document.getElementById("step2").style.display = "none";
    document.getElementById("results").style.display = "block";
}

function resetForm() {
    document.getElementById("weight").value = "";
    nextStep(1);
}

function drawGraph(material, data) {
    let ctx = document.getElementById('emissionChart').getContext('2d');
    if (emissionChart) emissionChart.destroy();
    emissionChart = new Chart(ctx, {
        type: 'bar',
        data: { labels: ["Min", "Max"], datasets: [{ label: material, data: data }] }
    });
}
