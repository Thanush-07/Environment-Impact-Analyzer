function calculateCarbon() {
    let carbonValues = {
        beef: 27.0, chicken: 6.0, milk: 3.2, tofu: 3.2, coffee: 29.0
    };
    
    let totalCO2 = 0;
    let tips = "";
    
    Object.keys(carbonValues).forEach(item => {
        let quantity = parseFloat(document.getElementById(item).value) || 0;
        totalCO2 += quantity * carbonValues[item];
        
        if (item === "beef" && quantity > 0) tips += "\n➡️ Reduce beef consumption & try plant-based options!";
        if (item === "coffee" && quantity > 0) tips += "\n➡️ Choose shade-grown, organic coffee to lower impact!";
    });
    
    document.getElementById("result").innerText = `Total Carbon Emissions: ${totalCO2.toFixed(2)} kg CO₂/week`;
    document.getElementById("sustainability-tips").innerText = tips;
}