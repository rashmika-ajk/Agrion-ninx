function loadCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const orderItemsContainer = document.querySelector('.order-items');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');

    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemCounts = {};
    let subtotal = 0;

    cartItemsContainer.innerHTML = ''; // Clear previous items
    orderItemsContainer.innerHTML = ''; // Clear previous order items

    // Count quantities of each item
    storedCartItems.forEach(item => {
        if (itemCounts[item.name]) {
            itemCounts[item.name].quantity += 1;
        } else {
            itemCounts[item.name] = { ...item, quantity: 1 };
        }
    });

    Object.values(itemCounts).forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';

        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name} x${item.quantity}</h3>
                <p>${item.price}</p>
                <button class="remove-item-btn" data-name="${item.name}">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItemDiv);

        const price = parseFloat(item.price.replace('₹', '')) * item.quantity;
        subtotal += price;

        const orderItemDiv = document.createElement('div');
        orderItemDiv.className = 'order-item';
        orderItemDiv.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>₹${price.toFixed(2)}</span>
        `;

        orderItemsContainer.appendChild(orderItemDiv);
    });

    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    subtotalElement.textContent = subtotal.toFixed(2);
    taxElement.textContent = tax.toFixed(2);
    totalElement.textContent = total.toFixed(2);

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', function() {
            removeFromCart(this.getAttribute('data-name'));
        });
    });
}

function removeFromCart(itemName) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.name === itemName);

    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCartItems();
    }
}

// Load cart items on page load if on the cart page
document.addEventListener('DOMContentLoaded', loadCartItems);
