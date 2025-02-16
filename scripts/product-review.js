// Product data array
const products = [
    { id: "prod1", name: "Widget Pro" },
    { id: "prod2", name: "Super Gadget" },
    { id: "prod3", name: "Tech Master" },
    { id: "prod4", name: "Smart Device" }
];

// Populate product select options when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const productSelect = document.getElementById('productName');
    
    // Add product options to select element
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });

    // Handle form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Increment review counter in localStorage
        const currentCount = parseInt(localStorage.getItem('reviewCount') || '0');
        localStorage.setItem('reviewCount', currentCount + 1);

        // Submit the form
        this.submit();
    });
});

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