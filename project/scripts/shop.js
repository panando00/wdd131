document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            title: "Calculus: Early Transcendentals",
            author: "James Stewart",
            price: 799.99,
            condition: "new",
            category: "mathematics",
            image: "books.jpg"
        },
        {
            id: 2,
            title: "Introduction to Algorithms",
            author: "Thomas H. Cormen",
            price: 899.99,
            condition: "used-like-new",
            category: "computer-science",
            image: "books.jpg"
        },
    ];

    // Populate products grid
    function displayProducts(productsToShow) {
        const productsGrid = document.querySelector('.products-grid');
        productsGrid.innerHTML = '';

        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <img src="images/${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p class="author">by ${product.author}</p>
                    <p class="price">R${product.price.toFixed(2)}</p>
                    <p class="condition">${formatCondition(product.condition)}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });

        // Add event listeners to new Add to Cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Format condition text
    function formatCondition(condition) {
        return condition.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    // Filter functionality
    let activeFilters = {
        categories: [],
        priceRange: { min: 0, max: 1000 },
        conditions: []
    };

    function applyFilters() {
        let filteredProducts = products.filter(product => {
            const matchesCategory = activeFilters.categories.length === 0 || 
                                  activeFilters.categories.includes(product.category);
            const matchesCondition = activeFilters.conditions.length === 0 || 
                                   activeFilters.conditions.includes(product.condition);
            const matchesPrice = product.price >= activeFilters.priceRange.min && 
                               product.price <= activeFilters.priceRange.max;

            return matchesCategory && matchesCondition && matchesPrice;
        });

        displayProducts(filteredProducts);
    }

    // Event listeners for filters
    document.querySelectorAll('.category-list input').forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.checked) {
                activeFilters.categories.push(e.target.value);
            } else {
                activeFilters.categories = activeFilters.categories.filter(cat => cat !== e.target.value);
            }
        });
    });

    document.querySelectorAll('.condition-list input').forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.checked) {
                activeFilters.conditions.push(e.target.value);
            } else {
                activeFilters.conditions = activeFilters.conditions.filter(cond => cond !== e.target.value);
            }
        });
    });

    // Price range slider
    const priceSlider = document.getElementById('price-slider');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');

    priceSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        maxPriceInput.value = value;
        activeFilters.priceRange.max = Number(value);
    });

    minPriceInput.addEventListener('change', (e) => {
        activeFilters.priceRange.min = Number(e.target.value);
    });

    maxPriceInput.addEventListener('change', (e) => {
        activeFilters.priceRange.max = Number(e.target.value);
        priceSlider.value = e.target.value;
    });

    // Apply filters button
    document.querySelector('.apply-filters').addEventListener('click', applyFilters);

    // Sort functionality
    document.getElementById('sort-select').addEventListener('change', (e) => {
        const sortBy = e.target.value;
        let sortedProducts = [...products];

        switch(sortBy) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                break;
            default:
                break;
        }

        displayProducts(sortedProducts);
    });

    // Mobile filters toggle
    const mobileFilterToggle = document.createElement('button');
    mobileFilterToggle.className = 'mobile-filter-toggle';
    mobileFilterToggle.innerHTML = '<i class="fas fa-filter"></i> Filters';
    
    document.querySelector('.products-header').prepend(mobileFilterToggle);

    mobileFilterToggle.addEventListener('click', () => {
        document.querySelector('.filters').classList.toggle('active');
    });

    // Cart functionality
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const cart = new Map();
    function addToCart(e) {
        const productId = Number(e.target.dataset.id);
        const product = products.find(p => p.id === productId);
        
        if (product) {
            if (cart.has(productId)) {
                cart.set(productId, cart.get(productId) + 1);
            } else {
                cart.set(productId, 1);
            }
            
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Visual feedback
            const button = e.target;
            button.textContent = 'Added!';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.backgroundColor = '';
            }, 1000);
        }
    }

    // Pagination functionality
    const itemsPerPage = 12;
    let currentPage = 1;

    function updatePagination() {
        const totalPages = Math.ceil(products.length / itemsPerPage);
        const pageNumbers = document.querySelector('.page-numbers');
        const prevButton = document.querySelector('.prev-page');
        const nextButton = document.querySelector('.next-page');

        // Update page numbers
        pageNumbers.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            if (i === currentPage) button.classList.add('active');
            
            button.addEventListener('click', () => {
                currentPage = i;
                updatePagination();
                displayPageProducts();
            });
            
            pageNumbers.appendChild(button);
        }

        // Update prev/next buttons
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    function displayPageProducts() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageProducts = products.slice(start, end);
        displayProducts(pageProducts);
    }

    // Event listeners for pagination
    document.querySelector('.prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
            displayPageProducts();
        }
    });

    document.querySelector('.next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(products.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
            displayPageProducts();
        }
    });

    // Initialize the page
    updatePagination();
    displayPageProducts();
});