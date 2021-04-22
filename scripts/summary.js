finButton.disabled = true;
const firstName = document.querySelector('.order-form input[name="fname"]');
const surname = document.querySelector('.order-form input[name="sname"]');

orderButton.addEventListener('click', (e) => {
  e.preventDefault();
  const cartSummary = document.querySelector('.summary-wrapper');
  cartSummary.classList.remove('removed');
});

closeButton.addEventListener('click', (e) => {
  e.preventDefault();
  const cartSummary = document.querySelector('.summary-wrapper');
  cartSummary.classList.add('removed');
});

finButton.addEventListener('click', (e) => {
  e.preventDefault();
  const orderMessage = document.querySelector('.summary-content');
  const items = document.querySelectorAll('.quantity-input');
  const [...radioButtons] = document.querySelectorAll(
    '.order-form input[type="radio"]'
  );
  let currentButton;
  const totalPrice = document.querySelector('.total');
  const address = emailInput.value;
  let amount = 0;
  console.log(surname, firstName);
  items.forEach((item) => {
    amount += +item.value;
  });
  radioButtons.forEach((button) => {
    button.checked ? (currentButton = button.value) : '';
  });

  Email.send({
    SecureToken: '6b6e8294-cc9c-4357-a7f7-df82fe98060b',
    To: `${address}`,
    From: 'marcin.chodorek3@gmail.com',
    Subject: 'Order details',
    Body: `
                  <html>
                      <h2>Ordered items: ${amount}</h2>
                      </br>
                      <span>Buyer: ${firstName.value}  ${surname.value}</span>
                      </br>
                      <span>Price: ${totalPrice.textContent}</span>
                      </br>
                      <span>Chosen payment method: ${currentButton}</span>
                      </br>
                      <em>ski-resort</em>
                  </html>
                  `,
  }).then(
    (orderMessage.innerHTML = `
                      Order was successful
                      </br></br>
                      Soon you will get email with order details
                  `),
    (cartList = []),
    localStorage.setItem('list', JSON.stringify(cartList)),
    setTimeout(() => {
      window.location.href = '/offer/';
    }, 2000)
  );
});

firstName.addEventListener('keyup', () => {
  if (
    validateEmail(e.target.value.trim()) &&
    firstName.value !== '' &&
    surname.value !== ''
  ) {
    finButton.classList.remove('inactive');
    finButton.disabled = false;
    emailInput.classList.remove('invalid');
    emailInput.classList.add('valid');
  } else {
    emailInput.classList.remove('valid');
    emailInput.classList.add('invalid');
    finButton.disabled = true;
    finButton.classList.add('inactive');
  }
});

surname.addEventListener('keyup', () => {
  if (
    validateEmail(e.target.value.trim()) &&
    firstName.value !== '' &&
    surname.value !== ''
  ) {
    finButton.classList.remove('inactive');
    finButton.disabled = false;
    emailInput.classList.remove('invalid');
    emailInput.classList.add('valid');
  } else {
    emailInput.classList.remove('valid');
    emailInput.classList.add('invalid');
    finButton.disabled = true;
    finButton.classList.add('inactive');
  }
});

emailInput.addEventListener('keyup', (e) => {
  if (
    validateEmail(e.target.value.trim()) &&
    firstName.value !== '' &&
    surname.value !== ''
  ) {
    finButton.classList.remove('inactive');
    finButton.disabled = false;
    emailInput.classList.remove('invalid');
    emailInput.classList.add('valid');
  } else {
    emailInput.classList.remove('valid');
    emailInput.classList.add('invalid');
    finButton.disabled = true;
    finButton.classList.add('inactive');
  }
});
