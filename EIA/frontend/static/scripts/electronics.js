// Standard carbon emission values (kg CO₂e per unit weight in kg)
const emissionFactors = {
    "smartphone": 55,
    "laptop": 250,
    "tablet": 200,
    "smartwatch": 25,
    "gaming_console": 200,
    "battery": 150,
    "power_bank": 30,
    "solar_panel": 50,
    "refrigerator": 450,
    "washing_machine": 375,
    "smart_tv": 400,
    "smart_assistant": 30,
    "desktop_computer": 800,
    "router_modem": 50,
    "data_center": 1.0, // per kWh
    "medical_device": 1500,
    "ai_robot": 1000,
    "electric_vehicle": 12000
};

// Sustainable alternatives
const sustainabilityTips = {
    "smartphone": "Use refurbished phones or recycle old ones.",
    "laptop": "Upgrade components instead of replacing the whole device.",
    "tablet": "Choose devices made from recycled materials.",
    "smartwatch": "Pick brands with eco-friendly manufacturing.",
    "gaming_console": "Enable power-saving modes when not in use.",
    "battery": "Use rechargeable batteries with solar charging.",
    "power_bank": "Choose energy-efficient and durable chargers.",
    "solar_panel": "Increase efficiency and ensure proper recycling.",
    "refrigerator": "Buy Energy Star-rated models for better efficiency.",
    "washing_machine": "Use cold water cycles and efficient models.",
    "smart_tv": "Reduce screen brightness and use energy-efficient models.",
    "smart_assistant": "Buy from brands like Fairphone that focus on sustainability.",
    "desktop_computer": "Use cloud services to reduce local computing needs.",
    "router_modem": "Turn off when not in use and choose energy-efficient models.",
    "data_center": "Use renewable-powered cloud services.",
    "medical_device": "Extend lifespan through regular maintenance.",
    "ai_robot": "Optimize AI models for energy efficiency.",
    "electric_vehicle": "Improve battery recycling and energy efficiency."
};

// Function to calculate carbon emission
function calculateEmission() {
    let productType = document.getElementById("productType").value;
    let weight = parseFloat(document.getElementById("weight").value);

    if (!productType || isNaN(weight) || weight <= 0) {
        alert("Please enter a valid product type and weight.");
        return;
    }

    // Get emission factor
    let emissionFactor = emissionFactors[productType] || 0;
    
    if (emissionFactor === 0) {
        alert("Invalid product type selected.");
        return;
    }

    // Calculate total carbon emission
    let totalEmission = emissionFactor * weight;

    // Get sustainability tip
    let tip = sustainabilityTips[productType] || "Consider reducing energy consumption.";

    // Display result
    document.getElementById("result").innerHTML = `
        <h3>Carbon Emission Analysis</h3>
        <p><strong>Product:</strong> ${productType.replace("_", " ").toUpperCase()}</p>
        <p><strong>Weight:</strong> ${weight} kg</p>
        <p><strong>Estimated Carbon Emission:</strong> ${totalEmission.toFixed(2)} kg CO₂e</p>
        <p><strong>Eco-Friendly Tip:</strong> ${tip}</p>
    `;
}

// Attach function to button click
document.getElementById("calculateBtn").addEventListener("click", calculateEmission);
