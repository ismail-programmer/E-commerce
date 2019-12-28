const cartProducts = JSON.parse(localStorage.getItem("cart"));
const previousProducts = JSON.parse(localStorage.getItem("previousProducts"));
const products = JSON.parse(localStorage.getItem("products")) || [];
const bigArray = [...previousProducts, ...products];
const bigIds = bigArray.map(el => el.productId);
let image;

//restriction
if (cartProducts === null) {
const row = document.getElementById('bigRow')
  row.innerHTML = `
  <h1>You had not add any product</h1>
  <a href="../Product/index.html">Please add some product</b>
  `;
} else {
  cartProducts.forEach((product, i) => {
    let index = bigIds.indexOf(product.productId);
    if (index) {
      image = bigArray[index].image;
      if (image.split(``)[0] === ".") {
        bigArray[index].image = `../Product/${bigArray[index].image}`;
      }
    }

    let template = `<div class="col l3 s12 m6">
      <div class="card">
        <div class="card-image">
          <img src=${bigArray[index].image}>
          <span class="card-title black-text">${product.title}</span>
        </div>
        <div class="card-content">
          <p>${product.price}</p>
        </div>
        <div class="card-action">
          <a href="#">Order Now</a>
        </div>
      </div>
    </div>`;
    document.getElementById("row").innerHTML += template;
  });
}
