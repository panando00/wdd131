// temples data array
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // 3 additional temples
    {
        templeName: "Nauvoo Illinois",
        location: "Nauvoo, Illinois, United States",
        dedicated: "2002, June, 27",
        area: 54000,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/nauvoo-illinois-temple/nauvoo-illinois-temple-50576-main.jpg"
    },
    {
        templeName: "Colonia Juárez Chihuahua México",
        location: "Colonia Juárez, Chihuahua, Mexico",
        dedicated: "1999, March, 6",
        area: 6800,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/9130468c8099ce6d57d408945a4d94ebc97d969a/full/500%2C/0/default"
    },
    {
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-57252-thumb.jpg"
    },
];

// DOM elements
const templeGrid = document.querySelector('.temple-grid');
const navLinks = document.querySelectorAll('nav a');

//fFiltered functions
const filters = {
    home: () => temples,
    old: () => temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(', ')[0]);
        return year < 1900;
    }),
    new: () => temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(', ')[0]);
        return year > 2000;
    }),
    large: () => temples.filter(temple => temple.area > 90000),
    small: () => temples.filter(temple => temple.area < 10000)
};

// temple card HTML
function createTempleCard(temple) {
    return `
        <figure>
            <img src="${temple.imageUrl}" 
                 alt="${temple.templeName} Temple" 
                 loading="lazy">
            <figcaption>
                <h3>${temple.templeName}</h3>
                <p>Location: ${temple.location}</p>
                <p>Dedicated: ${temple.dedicated}</p>
                <p>Area: ${temple.area.toLocaleString()} sq ft</p>
            </figcaption>
        </figure>
    `;
}

// displaying temples based on filter
function displayTemples(filterName = 'home') {
    const filteredTemples = filters[filterName]();
    templeGrid.innerHTML = filteredTemples.map(createTempleCard).join('');
}

// Event listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const filterName = e.target.getAttribute('href').replace('#', '');
        displayTemples(filterName);
    });
});

// Initial display
displayTemples();