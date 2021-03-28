const cartElements = document.querySelector('.cart-wrapper');
const totalValue = document.querySelector('.cart-total span span');
const removeMessage = document.querySelector('.removed-info');

const changeQuantity = () => {
    const quantityInput = document.querySelectorAll('.quantity-input');
    quantityInput.forEach(input => {
        input.addEventListener('input', (e) => {
            const currentProduct = e.target.parentNode.parentNode.parentNode;
            const currentName = currentProduct.getElementsByClassName('pname')[0].textContent;
            cartList.forEach(product => {
                product.name === currentName ? product.quantity = +input.value : '';
            });
            input.value === 0 ? input.value = 1 : '';
            localStorage.setItem('list', JSON.stringify(cartList));
            addItemsToCart();
        });
    });
}

const deleteElement = () => {
    const deleteBtn = document.querySelectorAll('.remove-from-cart-btn');

    deleteBtn.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const removedElement = e.target.parentNode.parentNode.getElementsByClassName('pname')[0].textContent;
            removeMessage.classList.remove('add-anim');
            void removeMessage.offsetWidth;
            removeMessage.classList.add('add-anim');
            cartList.some(product => {
                if (product.name === removedElement)
                    cartList.forEach((element, index) => {
                        if (element.name === removedElement)
                            cartList.splice(index, 1);
                    });
            });
            localStorage.setItem('list', JSON.stringify(cartList));
            addItemsToCart();
        });
    });
};

function addItemsToCart() {
    const message = document.querySelector('.cart-message');
    const totalDisplay = document.querySelector('.cart-total');
    let total = 0;

    if (cartList.length === 0) {
        message.classList.add('cart-empty');
        totalDisplay.classList.add('filtered');
    }

    if (cartList.length != 0) {
        message.classList.remove('cart-empty');
        totalDisplay.classList.remove('filtered');

    }


    cartElements.innerHTML = '';
    cartList.forEach(element => {
        cartElements.innerHTML += `
        <div class="product-item">
            <div class="item-info">
                <img src="${element.img}" class="pimg">
                <span class="pname">${element.name}</span>
            </div>
            <div class="item-content">
                <div>
                    <span class="pprice">${element.price * element.quantity}</span>
                    <input type="number" name="quantity" min="1" max="20" value="${element.quantity}" class="quantity-input" onkeydown="return false"></input>
                </div>
                <button class="remove-from-cart-btn"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
        `;
        total += element.price * element.quantity;
    });

    totalValue.textContent = `${total}zł`;
    deleteElement();
    changeQuantity();
}

addItemsToCart();