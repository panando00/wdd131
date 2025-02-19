document.addEventListener('DOMContentLoaded', () => {
    // FAQ Data
    const faqData = [
        {
            question: "How long can I rent textbooks for?",
            answer: "Our standard rental period is one semester (about 125 days). However, we also offer flexible rental periods ranging from 60 days to 150 days to accommodate different academic schedules."
        },
        {
            question: "What is your buyback policy?",
            answer: "We buy back textbooks in good condition at competitive prices. The buyback price depends on the book's condition and current market demand. You can get an instant quote by entering the ISBN on our buyback page."
        },
        {
            question: "How do digital textbooks work?",
            answer: "Digital textbooks can be accessed through our web platform or mobile app. Once purchased, you'll have instant access to the material for the rental period. You can highlight, take notes, and bookmark pages just like a physical book."
        },
        {
            question: "What are your shipping rates?",
            answer: "We offer free shipping on orders over R500. For orders under R500, standard shipping costs R75. Express shipping is available at additional cost. All orders are tracked and insured."
        }
    ];

    // Populate FAQ section
    const faqGrid = document.querySelector('.faq-grid');
    
    faqData.forEach(item => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        
        faqItem.innerHTML = `
            <div class="faq-question">
                ${item.question}
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
                ${item.answer}
            </div>
        `;
        
        faqGrid.appendChild(faqItem);
    });

    // FAQ Toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
            const icon = item.querySelector('.fa-chevron-down');
            icon.style.transform = item.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    });

    // Learn More button functionality
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const service = e.target.parentElement.querySelector('h2').textContent;
            alert(`More information about ${service} coming soon!`);
        });
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});