// Product data
const products = [
    {
        imageUrl: 'images/white_Blue_Premium_4_new.png',
        name: 'AGIA Beamer Shoes - Cricket Shoes for Kids / Youth / Men - Fluro Blue - White',
        price: 'From $49.99 USD',
        category: 'cricket',
        priceValue: 49.99
    },
    {
        imageUrl: 'images/white_orange_premium_5_new.png',
        name: 'AGIA Beamer Shoes - Cricket Shoes for Kids / Youth / Men - Fluro Orange - White',
        price: 'From $49.99 USD',
        category: 'cricket',
        priceValue: 49.99
    },
    {
        imageUrl: 'images/white_Black_Premium_5_new.png',
        name: 'AGIA Beamer Shoes - Cricket Shoes for Kids / Youth / Men - Grey - White',
        price: 'From $49.99 USD',
        category: 'cricket',
        priceValue: 49.99
    },
    {
        imageUrl: 'images/DSC_9099.jpg',
        name: 'AGIA DashFlex - Cricket Shoes for Kids / Youth / Men - White & Blue',
        price: 'From $41.99 USD',
        category: 'cricket',
        priceValue: 41.99
    },
    {
        imageUrl: 'images/Metal_Spikes_Yellow_4.png',
        name: 'AGIA Hattrick - SwiftStrike Cricket Spike Shoes for Kids / Youth / Men - White and Yellow',
        price: 'From $44.99 USD',
        category: 'cricket',
        priceValue: 44.99
    },
    {
        imageUrl: 'images/White_Black_1.png',
        name: 'AGIA Hattrick - Velocity Grip Cricket Spike Shoes for Kids / Youth / Men Black and White',
        price: 'From $44.99 USD',
        category: 'cricket',
        priceValue: 44.99
    },
    {
        imageUrl: 'images/Full_Blue_5.png',
        name: 'AGIA ProPace - Cricket Shoes for Kids / Youth / Men - Blue and Red',
        price: 'From $41.99 USD',
        category: 'cricket',
        priceValue: 41.99
    },
    {
        imageUrl: 'images/Soccer_Green_white_2.png',
        name: 'AGIA Rapid React - Soccer Cleats - Youth / Adults',
        price: 'From $29.99 USD',
        category: 'soccer',
        priceValue: 29.99
    },
    {
        imageUrl: 'images/Full_red_2.png',
        name: 'AGIA SpinSprint - Cricket Shoes for Kids / Youth / Men - Red, Blue & White',
        price: 'From $41.99 USD',
        category: 'cricket',
        priceValue: 41.99
    },
    {
        imageUrl: 'images/White_Orange_10.png',
        name: 'AGIA TurboThrust - Cricket Shoes for Kids / Youth / Men - White & Orange',
        price: 'From $41.99 USD',
        category: 'cricket',
        priceValue: 41.99
    },
    {
        imageUrl: 'images/Red_Shoes_Photo_1_88e5aaf2-5ac9-4c19-b9e4-b1bcfea462e3.jpg',
        name: 'AGIA Vortex - Soccer Cleats - Youth / Adults',
        price: 'From $29.99 USD',
        category: 'soccer',
        priceValue: 29.99
    }
];

let filteredProducts = [...products];

// DOM elements
const productGrid = document.getElementById('product-grid');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const searchInput = document.getElementById('search-input');
const noResults = document.getElementById('no-results');
const modal = document.getElementById('product-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const closeModal = document.querySelector('.close');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    setupEventListeners();
    addScrollAnimations();
});

// Render products
function renderProducts(productsToRender) {
    if (productsToRender.length === 0) {
        productGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    productGrid.style.display = 'grid';
    noResults.style.display = 'none';

    productGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer relative" onclick="openModal('${product.imageUrl}', '${product.name}', '${product.price}')">
            <div class="product-category absolute top-4 right-4 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium uppercase">${product.category === 'cricket' ? 'Cricket' : 'Soccer'}</div>
            <img src="${product.imageUrl}" alt="${product.name}" class="product-image w-full h-64 object-cover transition-transform duration-300" loading="lazy">
            <div class="product-info p-6">
                <h3 class="product-name text-lg font-semibold mb-2 text-gray-900 leading-tight">${product.name}</h3>
                <p class="product-price text-xl font-bold text-indigo-500 mb-4">${product.price}</p>
                <div class="product-actions">
                    <button class="btn-secondary bg-gray-100 text-indigo-500 border border-indigo-500 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-md w-full font-semibold flex items-center justify-center gap-2" onclick="event.stopPropagation(); viewDetails('${product.name}')">
                        <i class="fas fa-eye"></i> Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add animation to newly rendered cards
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Filter products
function filterProducts() {
    const categoryValue = categoryFilter.value;
    const priceValue = priceFilter.value;
    const searchValue = searchInput.value.toLowerCase();

    filteredProducts = products.filter(product => {
        // Category filter
        const categoryMatch = categoryValue === 'all' || product.category === categoryValue;

        // Price filter
        let priceMatch = true;
        if (priceValue === 'low') {
            priceMatch = product.priceValue < 35;
        } else if (priceValue === 'mid') {
            priceMatch = product.priceValue >= 35 && product.priceValue <= 45;
        } else if (priceValue === 'high') {
            priceMatch = product.priceValue > 45;
        }

        // Search filter
        const searchMatch = product.name.toLowerCase().includes(searchValue);

        return categoryMatch && priceMatch && searchMatch;
    });

    renderProducts(filteredProducts);
}

// Setup event listeners
function setupEventListeners() {
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    searchInput.addEventListener('input', debounce(filterProducts, 300));

    // Modal event listeners
    closeModal.addEventListener('click', closeModalHandler);
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalHandler();
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Modal functions
function openModal(imageUrl, name, price) {
    modalImage.src = imageUrl;
    modalTitle.textContent = name;
    modalPrice.textContent = price;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Product actions
function addToCart(productName) {
    // Simulate add to cart
    showNotification(`${productName} added to cart!`, 'success');
}

function viewDetails(productName) {
    // Simulate view details
    showNotification(`Viewing details for ${productName}`, 'info');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature, .about-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Scroll to catalog function
function scrollToCatalog() {
    document.getElementById('catalog').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModalHandler();
    }
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

