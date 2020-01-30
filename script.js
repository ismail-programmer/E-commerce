//
let rowId = 0;
let rowIdHtml = 0;
localStorage.removeItem('pIndex')
// geting  users
let users =
  JSON.parse(localStorage.getItem("users")) === null
    ? []
    : JSON.parse(localStorage.getItem("users"));

const userIndex = localStorage.getItem("userIndex");
// geting older products created  by users
let products =
  JSON.parse(localStorage.getItem("products")) === null
    ? []
    : JSON.parse(localStorage.getItem("products"));
const allProducts = JSON.parse(localStorage.getItem("previousProducts"));
allProducts.forEach(el => {
  el.image = `./Product/images${el.image}`;
});

let bigArray = [...products, ...allProducts];

const createHtml = () => {
  const abc = document.createElement("div");
  abc.className = `row`;
  abc.id = `row-${rowId}`;
  rowId++;
  document.body.insertBefore(abc, document.body.lastElementChild);
};
createHtml();

//  for rendering recent 9 products
if (bigArray.length >= 10) {
  let newArray = bigArray.slice(0, 10);
  bigArray = newArray;
}
for (let i = 0; i < bigArray.length; i++) {
  if (i % 4 === 3) createHtml();
}

bigArray.forEach((el, i) => {
  let template = `
  <div class="col l3 m4 s6 ${el.catagory}">
  <div class="card">
    <div style="overflow:visible" class="card-image waves-effect waves-block waves-light">
      <img
        src="${el.image}"
        alt="${el.title}"
      />
      <a data-index=${el.index} class="crt btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${el.title}<i class="material-icons right">more_vert</i></span>
      <span class="card-title activator grey-text text-darken-2">${el.price}</span>
      <p> <a  href="../Product/ViewDetails/index.html">   <button class="btn link" data-index="${i}">View More</button></a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${el.title}<i class="material-icons right">close</i></span>
      <ul>
      <li>${el.description}</li></ul>
    </div>
  </div>
</div>`;

  const a = el.index % 4;
  let htmlElement = document.getElementById(`row-${rowIdHtml}`);
  if (a === 3) {
    rowIdHtml++;
  }
  htmlElement.insertAdjacentHTML("beforeend", template);
});

setTimeout(() => {
  const heights = Array.from(document.querySelectorAll(".card-image img")).map(
    el => el.offsetHeight
  );
  let maxHeight;
  setTimeout(() => {
    maxHeight = Math.max(...heights);
    document
      .querySelectorAll(`.card-image`)
      .forEach(el => (el.style.height = `${maxHeight + 20}px`));
  }, 50);
}, 200);

setTimeout(() => {
  const heights = Array.from(document.querySelectorAll(".card-content")).map(
    el => el.offsetHeight
  );
  let maxHeight;
  setTimeout(() => {
    maxHeight = Math.max(...heights);
    document
      .querySelectorAll(`.card-content`)
      .forEach(el => (el.style.height = `${maxHeight + 20}px`));
  }, 50);
}, 200);

//for getting index for view details
document.querySelectorAll(".link").forEach(el => {
  el.addEventListener("click", e => {
    localStorage.setItem("pIndex", e.target.dataset.index);
  });
});

//adding cart
let myCart;
class Cart {
  constructor(productId, userIndex, productIndex) {
    this.productId = productId;
    this.userIndex = userIndex;
    this.productIndex = productIndex;
    this.quantity = 1;
  }
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartId = cart.map(el => el.productId);
document.querySelectorAll(".crt").forEach((el, i) => {
  const cartProduct = bigArray[i];
  el.addEventListener("click", e => {
    if (!cartProduct.userIndex || cartProduct.userIndex === `-1`) {
      cartProduct.userIndex = `-1`;
    }
    if (cartId.includes(cartProduct.productId)) {
      cart[cartId.indexOf(cartProduct.productId)].quantity++;
    } else {
      myCart = new Cart(cartProduct.productId, cartProduct.userIndex, e.target.dataset.index);
      cart.unshift(myCart);
      cartId.unshift(myCart.productId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  });
});

//user info

const elements = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  userName: document.getElementById("user"),
  userId: document.getElementById("userId"),
  infoContainer: document.getElementById("nav-nav")
};

// console.log(userIndex);
setTimeout(()=>{
  if (userIndex) {
    document.getElementById( "name").innerHTML = `${users[userIndex].fname} ${users[userIndex].lname}`;
    document.getElementById("email").innerHTML = users[userIndex].email;
    document.getElementById("user").innerHTML = users[userIndex].username;
    document.getElementById("userId").innerHTML = users[userIndex].id;
  } else {
    document.getElementById("nav-nav").innerHTML = `
    <div class="row">
      <div class="s12 center-align"><img src="./images/icon.png" alt="Login" class="img" width="150px"></div>
    </div>
    <div class="row">
      <div class="col s6 center-align"><a href="../Login/index.html" class="btn white grey-text center">Login</a></div>
      <div class="col s6 center-align"><a href="../SignUp/index.html" class="btn white grey-text center">SignUp</a></div>
    </div>`;
  }
  
},1000)