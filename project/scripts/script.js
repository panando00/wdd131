// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Book data
    const featuredBooks = [
        {
            title: "Introduction to Computer Science",
            author: "Prosper Zvidzai",
            price: 79.99,
            originalPrice: 129.99,
            image: "images/books.jpg"
        },
        {
            title: "Advanced Mathematics",
            author: "Prosper Zvidzai",
            price: 89.99,
            originalPrice: 149.99,
            image: "images/books.jpg"
        },
        {
            title: "Business Economics",
            author: "Prosper Zvidzai",
            price: 69.99,
            originalPrice: 119.99,
            image: "images/books.jpg"
        },
        {
            title: "Modern Physics",
            author: "Prosper Zvidzai",
            price: 94.99,
            originalPrice: 159.99,
            image: "images/books.jpg"
        }
    ];

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', 
            menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });

    // Cart functionality
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    
    function updateCartCount() {
        cartCountElement.textContent = cartCount;
    }

    // Generate book cards
    const bookGrid = document.querySelector('.book-grid');
    
    function createBookCard(book) {
        const savings = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);
        
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title} Textbook Cover">
            <h3>${book.title}</h3>
            <p class="author">${book.author}</p>
            <div class="price-info">
                <div class="price">
                    <span class="current-price">R${book.price}</span>
                    <span class="original-price">R${book.originalPrice}</span>
                    <span class="savings">Save ${savings}%</span>
                </div>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
        
        const addToCartBtn = bookCard.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', function() {
            cartCount++;
            updateCartCount();
            const alert = document.createElement('div');
            alert.className = 'alert-success';
            alert.textContent = 'Added to cart!';
            document.body.appendChild(alert);
            setTimeout(() => alert.remove(), 2000);
        });
        
        return bookCard;
    }

    // Populate book grid
    featuredBooks.forEach(book => {
        bookGrid.appendChild(createBookCard(book));
    });

    // Search functionality
    const searchForm = document.querySelector('.search-bar');
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchInput = this.querySelector('input');
        console.log('Searching for:', searchInput.value);
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput.value) {
            const alert = document.createElement('div');
            alert.className = 'alert-success';
            alert.textContent = 'Thank you for subscribing!';
            document.body.appendChild(alert);
            setTimeout(() => alert.remove(), 2000);
            emailInput.value = '';
        }
    });
});
