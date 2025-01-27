const temperature = 75; // °F
const windSpeed = 5;   // mph

// calculating windchill
function calculateWindChill(temp, speed) {
    return 35.74 + (0.6215 * temp) - (35.75 * Math.pow(speed, 0.16)) + (0.4275 * temp * Math.pow(speed, 0.16));
}

// to update windchill
function updateWindChill() {
    const windchillSpan = document.querySelector("#windchill");
    
    // checking if conditions are met
    if (temperature <= 50 && windSpeed > 3) {
        const windChill = calculateWindChill(temperature, windSpeed);
        windchillSpan.textContent = `${Math.round(windChill)}°F`;
    } else {
        windchillSpan.textContent = "N/A";
    }
}

// For the date on the footer
function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    document.querySelector("#currentyear").textContent = currentYear;
}

function setLastModified() {
    const lastModified = new Date(document.lastModified);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    document.querySelector("#lastModified").textContent = `Last Modified: ${lastModified.toLocaleDateString('en-US', options)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    // for footer date
    setCurrentYear();
    setLastModified();
    
    // calculate and display wind chill
    updateWindChill();
});