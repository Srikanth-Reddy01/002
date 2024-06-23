document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const catalog = document.querySelector('.catalog');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total h2');

    if (catalog) {
        catalog.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const product = event.target.closest('.card');
                const productName = product.querySelector('.card-title').textContent;
                const productPrice = parseFloat(product.querySelector('.card-text').textContent.replace('$', ''));
                cart.push({ name: productName, price: productPrice });
                updateCart();
            }
        });
    }

    if (cartItems) {
        cartItems.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const productIndex = Array.from(cartItems.children).indexOf(event.target.closest('.card'));
                cart.splice(productIndex, 1);
                updateCart();
            }
        });
    }

    function updateCart() {
        if (cartItems) {
            cartItems.innerHTML = '';
            cart.forEach((product, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('card', 'mb-3');
                cartItem.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-danger">Remove</button>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
            const total = cart.reduce((sum, product) => sum + product.price, 0);
            cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        }
    }
});
