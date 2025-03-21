const ctx = document.getElementById('emissionChart').getContext('2d');
let emissionData = {
    labels: [],
    datasets: [{
        label: 'Carbon Emission (kg CO₂/kWh)',
        data: [],
        backgroundColor: ['rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)'],
        borderWidth: 1
    }]
};

let chart = new Chart(ctx, {
    type: 'bar',
    data: emissionData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true }
        }
    }
});

function addData() {
    let product = document.getElementById('product').value;
    let emission = parseFloat(document.getElementById('emission').value);
    let tipsDiv = document.getElementById("tips");

    if (!isNaN(emission) && emission >= 0) {
        emissionData.labels.push(product);
        emissionData.datasets[0].data.push(emission);
        chart.update();

        // Display Tips Based on Emission Levels
        let tip = "";
        if (emission <= 0.5) {
            tip = "✅ Excellent! This product has very low emissions.";
        } else if (emission <= 1.5) {
            tip = "⚠️ Good, but consider alternatives with lower emissions.";
        } else {
            tip = "❌ High emission! Look for more eco-friendly options.";
        }
        tipsDiv.innerHTML = `<p>${tip}</p>`;
    } else {
        alert("Please enter a valid emission value.");
    }
}
