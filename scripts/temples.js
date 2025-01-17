//dom elements
const hamburgerBtn = document.querySelector('.hamburger-btn');
const navMenu = document.querySelector('nav ul');
let isMenuOpen = false;

//menu
function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    navMenu.classList.toggle('show');
    
    // updating the appearance of hamburger button
    if (isMenuOpen) {
        hamburgerBtn.innerHTML = '×'; // this hanges to x when the menu is open
        hamburgerBtn.setAttribute('aria-expanded', 'true');
    } else {
        hamburgerBtn.innerHTML = '☰'; // this changes back to hamburger icon when the menu is closed
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
}

//click event listener for hamburger button
hamburgerBtn.addEventListener('click', toggleMenu);

// closing the menu
document.addEventListener('click', (event) => {
    if (isMenuOpen && !event.target.closest('nav') && !event.target.closest('.hamburger-btn')) {
        toggleMenu();
    }
});

// current year for the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// last modified date for footer as wel
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;


