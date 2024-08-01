let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function filterProducts(category) {
    const allProducts = document.querySelectorAll('.product-card');
    allProducts.forEach(product => {
        product.style.display = category === 'All' || product.getAttribute('data-category') === category ? 'flex' : 'none';
    });
}

function showMessage(message) {
    const messageContainer = document.getElementById('message-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.textContent = message;
    messageContainer.appendChild(messageDiv);
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 10); // Slight delay to allow for transition
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => {
            messageContainer.removeChild(messageDiv);
        }, 500); // Allow time for fade-out
    }, 3000); // Message display duration
}

function toggleWishlist(element) {
    if (element.classList.contains('liked')) {
        element.textContent = '♡';
        element.classList.remove('liked');
        showMessage('Item removed from wishlist');
    } else {
        element.textContent = '❤️';
        element.classList.add('liked');
        showMessage('Item added to wishlist');
    }
}

function addToCart(element) {
    const productCard = element.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('p').textContent;
    const productImage = productCard.querySelector('img').src;

    const cartItem = {
        name: productName,
        price: productPrice,
        image: productImage
    };

    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    showMessage('Item added to cart');
}
