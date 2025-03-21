// Select the canvas
const ctx = document.getElementById('emissionChart').getContext('2d');

// Default data
let emissionData = {
    labels: [
        "Cement & Concrete", "Bricks & Blocks", "Steel & Metals", "Wood & Timber",
        "Glass & Glazing", "Insulation Materials", "Roofing Materials",
        "Flooring & Finishing", "Plastics & Composites", "Adhesives & Paints"
    ],
    datasets: [{
        label: 'CO₂ Emissions (kg CO₂/kg)',
        data: [0.9, 0.3, 2.0, -1.0, 1.2, 0.5, 1.0, 0.8, 2.5, 1.5],
        backgroundColor: [
            '#ff5733', '#ffbd33', '#33ff57', '#33a8ff', '#b833ff',
            '#ff3380', '#33ffd1', '#ff8333', '#a833ff', '#ff3366'
        ],
        borderWidth: 1
    }]
};

// Create Chart
let myChart = new Chart(ctx, {
    type: 'bar',
    data: emissionData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

// Function to update chart
function updateChart() {
    // Get input values
    let newData = [
        parseFloat(document.getElementById('cement').value),
        parseFloat(document.getElementById('bricks').value),
        parseFloat(document.getElementById('steel').value),
        parseFloat(document.getElementById('wood').value),
        parseFloat(document.getElementById('glass').value),
        parseFloat(document.getElementById('insulation').value),
        parseFloat(document.getElementById('roofing').value),
        parseFloat(document.getElementById('flooring').value),
        parseFloat(document.getElementById('plastics').value),
        parseFloat(document.getElementById('paints').value)
    ];

    // Update chart data
    myChart.data.datasets[0].data = newData;
    myChart.update();
}
