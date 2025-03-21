// Initial Data
const emissionData = {
    "Petrochemicals & Plastics": 5.5,
    "Industrial Gases": 8.0,
    "Fertilizers & Agrochemicals": 6.2,
    "Pharmaceuticals & Biochemicals": 12.3,
    "Paints, Coatings & Adhesives": 4.8,
    "Textile Chemicals & Dyes": 3.9,
    "Metal Treatment & Electroplating Chemicals": 7.1,
    "Cleaning & Detergent Chemicals": 2.5,
    "Explosives & Propellants": 10.0,
    "Lubricants & Industrial Oils": 5.2
};

// Chart Setup
const ctx = document.getElementById('emissionChart').getContext('2d');
const emissionChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: Object.keys(emissionData),
        datasets: [{
            label: 'CO₂ Emissions (kg CO₂/kg)',
            data: Object.values(emissionData),
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Function to Add Data
function addData() {
    const product = document.getElementById("product").value;
    const emissionValue = parseFloat(document.getElementById("emissionValue").value);

    if (!isNaN(emissionValue) && emissionValue > 0) {
        emissionData[product] = emissionValue;
        updateChart();
    } else {
        alert("Please enter a valid number for CO₂ emissions.");
    }
}

// Update Chart Function
function updateChart() {
    emissionChart.data.labels = Object.keys(emissionData);
    emissionChart.data.datasets[0].data = Object.values(emissionData);
    emissionChart.update();
}
