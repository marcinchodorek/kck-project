const searchField = document.querySelector('.search-bar');
const form = document.querySelector('form');
const selectList = document.querySelector('form select');
const productsContainer = document.querySelector('.items-wrapper');

const displayProduct = (data, sortType = '') => {
  sortType != ''
    ? sortType === 'highest'
      ? data.sort((a, b) => b.price - a.price)
      : sortType === 'lowest'
      ? data.sort((a, b) => a.price - b.price)
      : sortType === 'asc'
      ? data.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      : data.sort((a, b) => (a.name > b.name ? -1 : b.name > a.name ? 1 : 0))
    : '';

  productsContainer.innerHTML = '';
  data.forEach((product) => {
    productsContainer.innerHTML += `
        <div class="product-item">
            <div class="item-info">
                <img src="${product.picture}" class="pimg">
                <button class="item-details-btn"><i class="fas fa-arrow-down"></i></button>
                <span class="pname">${product.name}</span>
            </div>
            <div class="item-content">
                <div class="show-info">${product.info}</div>
                <div><span class="pprice">${product.price}</span>zł / szt.</div>
                <button class="add-to-cart-btn"><i class="fas fa-cart-plus"></i></button>
            </div>
        </div>
        `;
  });
};

const nameSearch = (search) => {
  const productName = document.querySelectorAll('.item-info span');
  Array.from(productName)
    .filter((item) => !item.textContent.toLowerCase().includes(search))
    .forEach((item) => item.parentNode.parentNode.classList.add('filtered'));
  Array.from(productName)
    .filter((item) => item.textContent.toLowerCase().includes(search))
    .forEach((item) => item.parentNode.parentNode.classList.remove('filtered'));
};

searchField.addEventListener('keyup', () => {
  const search = searchField.value.toLowerCase().trim();
  nameSearch(search);
});

const getProductList = async () => {
  const productQuery = `/json/products.json`;
  const request = await fetch(productQuery);
  const productData = await request.json();

  return productData;
};

getProductList().then((data) => {
  displayProduct(data);
  buttonsMessage();
  getProductDetails();
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectValue = selectList.options[selectList.selectedIndex].value;
    displayProduct(data, selectValue);
    buttonsMessage();
    getProductDetails();
  });
});
