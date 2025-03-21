document.getElementById("carbonForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let material = document.getElementById("material").value;
    let weight = parseFloat(document.getElementById("weight").value);

    if (isNaN(weight) || weight <= 0) {
        alert("Please enter a valid weight.");
        return;
    }

    // Standard Carbon Emission Values (kg CO₂e per kg)
    let emissionValues = {
        fastFashion: 35,
        sustainableFashion: 7,
        footwear: 30,
        bags: 25,
        homeTextiles: 20
    };

    let alternatives = {
        fastFashion: "Choose sustainable brands, buy second-hand clothes.",
        sustainableFashion: "Good choice! Go for organic cotton, hemp, or bamboo fabrics.",
        footwear: "Use biodegradable shoes, recycled rubber soles.",
        bags: "Use jute bags, cork leather wallets.",
        homeTextiles: "Opt for eco-friendly fabrics (bamboo, hemp), avoid synthetics."
    };

    let carbonEmission = emissionValues[material] * weight;
    let suggestion = alternatives[material];

    document.getElementById("result").innerHTML = `
        <p><strong>Carbon Emission:</strong> ${carbonEmission.toFixed(2)} kg CO₂e</p>
        <p><strong>Suggestion:</strong> ${suggestion}</p>
    `;

    // Chart Data
    let ctx = document.getElementById("carbonChart").getContext("2d");
    if (window.carbonChart) window.carbonChart.destroy(); // Destroy previous chart if exists

    window.carbonChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Fast Fashion", "Sustainable Fashion", "Footwear", "Bags & Accessories", "Home & Textiles"],
            datasets: [{
                label: "Carbon Emission (kg CO₂e per kg)",
                data: Object.values(emissionValues),
                backgroundColor: ["#ff3d00", "#4caf50", "#ff9800", "#2196f3", "#9c27b0"],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});
