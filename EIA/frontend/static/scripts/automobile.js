let chart;

function calculateEmissions() {
    let transportType = document.getElementById("transport");
    let emissionRate = parseFloat(transportType.value);
    let distance = parseFloat(document.getElementById("distance").value);

    if (isNaN(distance) || distance <= 0) {
        document.getElementById("result").innerHTML = "⚠️ Please enter a valid distance.";
        return;
    }

    let totalEmissions = (emissionRate * distance).toFixed(2);
    document.getElementById("result").innerHTML = `🌍 Estimated Carbon Footprint: <b>${totalEmissions} kg CO₂</b>`;

    updateChart(transportType.options[transportType.selectedIndex].text, totalEmissions);
}

function updateChart(transportName, emissionValue) {
    const ctx = document.getElementById("emissionChart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: [transportName, "Remaining Carbon Budget"],
            datasets: [{
                data: [emissionValue, 100 - emissionValue], // Assuming 100 kg as reference budget
                backgroundColor: ["#ff6384", "#36a2eb"],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",
                }
            }
        }
    });
}