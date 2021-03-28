const rootElement = document.documentElement;
const commentSection = document.querySelector('.comments');
const message = document.querySelector('.added-info');
const filter = document.querySelector('.items-container');
const orderButton = document.querySelector('.order-btn');
const closeButton = document.querySelector('.close-btn');
const finButton = document.querySelector('.fin-btn');
const emailInput = document.querySelector('.order-form input[type="email"]');
const cartItems = document.querySelector('.cart-items');
let cartList = JSON.parse(localStorage.getItem('list')) || [];

const removeElement = (element) => {
    const parent = element.parentElement;
    parent.remove();
}

const goToTop = () => {
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

const addToCart = (event) => {
    const product = event.target.parentElement.parentElement;
    const cartProduct = {
        name: product.getElementsByClassName('pname')[0].textContent,
        price: product.getElementsByClassName('pprice')[0].textContent,
        img: product.getElementsByClassName('pimg')[0].src,
        quantity: 1
    };
    if (cartList.length === 0) {
        cartList.push(cartProduct);
    } else if (cartList.some(element => element.name === cartProduct.name)) {
        cartList.forEach(element => {
            if (element.name === cartProduct.name) element.quantity += 1;
        })
    } else {
        cartList.push(cartProduct)
    }

    localStorage.setItem('list', JSON.stringify(cartList));
}

const buttonsMessage = () => {
    const addBtn = document.querySelectorAll('.add-to-cart-btn');

    addBtn.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            message.classList.remove('add-anim');
            addToCart(e);
            void message.offsetWidth;
            message.classList.add('add-anim');
        }, false);
    });
}

const getProductDetails = () => {
    const detailsButtons = document.querySelectorAll('.item-details-btn');
    const allItems = document.querySelectorAll('.product-item');

    detailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const expandedProduct = e.target.parentNode.parentNode;
            allItems.forEach(item => {
                if (expandedProduct === item) {
                    button.classList.toggle('btn-active');
                    item.classList.toggle('product-expanded');
                    return;
                }
                item.classList.remove('product-expanded');
            });
        });
    });
};



function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

