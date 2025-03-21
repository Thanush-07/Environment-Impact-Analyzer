function calculateCarbon() {
    // Get input values
    let beef = parseFloat(document.getElementById("beef").value) || 0;
    let chicken = parseFloat(document.getElementById("chicken").value) || 0;
    let milk = parseFloat(document.getElementById("milk").value) || 0;
    let tofu = parseFloat(document.getElementById("tofu").value) || 0;
    let coffee = parseFloat(document.getElementById("coffee").value) || 0;

    // Carbon footprint calculation (kg CO₂ per kg)
    let totalCarbon = (beef * 27) + (chicken * 6) + (milk * 3.2) + (tofu * 3.2) + (coffee * 29);

    // Display result
    document.getElementById("result").innerHTML = `Your carbon footprint is <b>${totalCarbon.toFixed(2)}</b> kg CO₂ per week.`;

    // Provide sustainability tips
    let tips = document.getElementById("sustainability-tips");
    if (totalCarbon > 50) {
        tips.innerHTML = "🌿 Consider reducing meat consumption and switching to plant-based options.";
    } else if (totalCarbon > 20) {
        tips.innerHTML = "🥦 Try incorporating more plant-based meals to lower your impact.";
    } else {
        tips.innerHTML = "✅ You're making eco-friendly choices! Keep it up!";
    }
}
