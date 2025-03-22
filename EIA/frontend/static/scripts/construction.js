const ctx = document.getElementById('emissionChart').getContext('2d');

let emissionData = {
    labels: [
        "Cement & Concrete", "Bricks & Blocks", "Steel & Metals", "Wood & Timber",
        "Glass & Glazing", "Insulation Materials", "Roofing Materials",
        "Flooring & Finishing", "Plastics & Composites", "Adhesives & Paints"
    ],
    datasets: [{
        label: 'CO₂ Emissions (kg CO₂/kg)',
        data: [0.9, 0.3, 2.0, -1.0, 1.2, 0.5, 1.0, 0.8, 2.5, 1.5],
        backgroundColor: ['#ff5733', '#ffbd33', '#33ff57', '#33a8ff', '#b833ff'],
        borderWidth: 1
    }]
};

let myChart = new Chart(ctx, {
    type: 'bar',
    data: emissionData,
    options: { responsive: true }
});

function updateChart() {
    let newData = [...document.querySelectorAll('input')].map(input => parseFloat(input.value));
    myChart.data.datasets[0].data = newData;
    myChart.update();

    let sustainabilityTips = document.getElementById('sustainabilityAdvice');
    sustainabilityTips.innerHTML = "Try using recycled materials, bamboo, and low-carbon concrete to reduce emissions!";
}
