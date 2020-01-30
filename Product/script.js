let rowId = 0;
let rowIdHtml = 0;
localStorage.removeItem('pIndex');
// geting  users
let users =
  JSON.parse(localStorage.getItem("users")) === null
    ? []
    : JSON.parse(localStorage.getItem("products"));

// geting older products created  by users
let products =
  JSON.parse(localStorage.getItem("products")) === null
    ? []
    : JSON.parse(localStorage.getItem("products"));

const allProducts = [
  {
    title: `A macro step change inferred`,
    category: `computer`,
    price: `$129.50`
  },
  {
    title: `AI CHIPS WITH MILITARY PRECISION`,
    category: `computer`,
    price: `$100.00`
  },
  {
    title: `Qualcomm, Nvidia with new AI chips`,
    category: `computer`,
    price: `$99.99`
  },
  { title: `Earbuds for smartphones`, category: `mobile`, price: `$10.00` },
  {
    title: `Precision Crafted for Sound and Beauty`,
    category: `mobile`,
    price: `$200.00`
  },
  {
    title: `handfree`,
    category: `mobile`,
    price: `$499.99`
  },
  {
    title: `23 Ltr Burger Microwave Oven Grill Black`,
    category: `home`,
    price: `$799.99`
  },
  {
    title: `Electrolux SEM-130ESL-B6 Microwave Oven`,
    category: `home`,
    price: `$999.99`
  },
  {
    title: `Laptop`,
    category: `laptop`,
    price: `$1909.50`
  },
  {
    title: `Laptop`,
    category: `laptop`,
    price: `$1909.50`
  },
  {
    title: `Laptop`,
    category: `laptop`,
    price: `$1909.50`
  }
];
const descriptions = [
  `AI chips could play a critical role in economic growth going forward because they will inevitably feature in cars,intelligent; robotics, obviously; and many other technologies.`,
  `The vision is there, but the technology isn’t not quite in place yet. In order to process the data sets of future AI applications, the underlying chips must first reach a new level. One current solution approach for armaments industry.`,
  `Chinese’s largest telecommunications gear and mobile phone maker on Wednesday unveiled its latest Ascend series chips, machine-learning capable workhorses that it says can go toe-to-toe with designs from Qualcomm Inc and Nvidia Corp.`,
  `Call them what you want - in-ears, in-ear-monitors or inter aurals - these tiny earbuds are among the most common gadgets around.`,
  `Patented Damping System and Transmission Tube designed to deliver crystal clear and detailed sound.Ergonomically-designed for a perfect fit to your ear.CNC precision crafted with diamond cut rings to deliver the ASUS iconic Zen design`,
  `ishopping.pk brings you the best price for White & Decker Microwave Oven 20Ltr (MZ2010P) with 1 year official warranty and express shipping all over Pakistan.`,
  `With our Burger 23D Grill Black We Have perfected the art of combining power efficiency with microwave cooking. Burger is just great with the usual microwave features but saves up on energy to keep a tight check on your electricity bills.`,
  `We operate under an advanced corporate governance structure that comprises of a Board of Directors.`,
  `The vision is there, but the technology isn’t not quite in place yet. In order to process the data sets of future AI applications, the underlying chips must first reach a new level. One current solution approach for armaments industry.`,
  `The vision is there, but the technology isn’t not quite in place yet. In order to process the data sets of future AI applications, the underlying chips must first reach a new level. One current solution approach for armaments industry.`,
  `The vision is there, but the technology isn’t not quite in place yet. In order to process the data sets of future AI applications, the underlying chips must first reach a new level. One current solution approach for armaments industry.`
];

const ids = JSON.parse(localStorage.getItem("productID")) || [];
for (let i = 0; i <= allProducts.length; i++) {
  //! IF length of ids is smaller than products length
  if (allProducts.length - ids.length >= 1) {
    //* Add an id in the beggining of the array
    ids.unshift(
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }
}

for (let i = 0; i < descriptions.length; i++) {
  const product = `./images/p${i}.jfif`;
  allProducts[i].image = product;
  allProducts[i].description = descriptions[i];
  allProducts[i].date = new Date(`june 28, 2000`);
  allProducts[i].productId = ids[i];
  allProducts[i].index = products.length + i;
}
//? Saving the id in localstorage
localStorage.setItem("productID", JSON.stringify(ids));

const bigArray = [...products, ...allProducts];

const createHtml = () => {
  const abc = document.createElement("div");
  abc.className = `row`;
  abc.id = `row-${rowId}`;
  rowId++;
  document.body.insertBefore(abc, document.body.lastElementChild);
};
createHtml();
for (let i = 0; i < bigArray.length; i++) {
  if (i % 4 === 3) createHtml();
}

bigArray.map((el, i) => {
  let template = `
  <div class="col l3 m4 s6 ${el.category}">
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
        <p> <a  href="./ViewDetails/index.html">   <button class="btn link" data-index=${el.index}>View More</button></a></p>
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
  const heights = Array.from(document.querySelectorAll("img")).map(
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

localStorage.setItem("previousProducts", JSON.stringify(allProducts));
document.querySelectorAll(".link").forEach(el => {
  el.addEventListener("click", e => {
    localStorage.setItem("pIndex", e.target.dataset.index);
  });
});


// *********************
//adding cart
// *********************
let myCart;
class Cart {
  constructor(productId, userIndex, productIndex) {
    this.productId = productId;
    this.userIndex = userIndex;
    this.productIndex = productIndex;
    this.quantity = 1;
  }
}
const elements = {
  list: document.querySelector(".sidenav"),
  productName: document.querySelector(".prod")
};
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartId = cart.map(el => el.productId);
document.querySelectorAll(".crt").forEach((el, i) => {
  const cartProduct = bigArray[i];
  el.addEventListener("click", () => {
    if (!cartProduct.userIndex || cartProduct.userIndex === `-1`) {
      cartProduct.userIndex = `-1`;
    }
    if (cartId.includes(cartProduct.productId)) {
      cart[cartId.indexOf(cartProduct.productId)].quantity++;
    } else {
      myCart = new Cart(cartProduct.productId, cartProduct.userIndex, i);
      cart.unshift(myCart);
      cartId.unshift(myCart.productId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  });
});

//!*********************************!\\
//*Rendering the Side Catagories bar*\\
//?*********************************?\\

const catagories = [`computer`, `mobile`, `home`];

bigArray.forEach(el => {
  if (!catagories.includes(el.category)) {
    catagories.push(el.category);
  }
});

catagories.forEach(el => {
  let capital = el.split(``);
  capital[0] = capital[0].toUpperCase();
  capital = capital.join(``);
  const markup = `
  <li><button class="${el}-btn waves-effect">${capital}</button></li>
  <li>
    <div class="divider"></div>
  </li>`;
  elements.list.insertAdjacentHTML("beforeend", markup);
});
//* Category selecting Variable
let array;

//? To show all products
const showAll = () =>
  document.querySelectorAll(".col").forEach(el => {
    elements.productName.innerHTML = ``;
    el.classList.remove(`hidden`);
    el.classList.remove(`fade`);
  });

//! TO show selected products
const showProducts = nameProduct => {
  //* Selecting all elements with class of category
  array = document.querySelectorAll(`.${nameProduct}`);

  //? Selecting all cards
  const allProducts = document.querySelectorAll(".col");

  //! Adding Class of Hidden
  allProducts.forEach(el => el.classList.add("hidden"));

  //* Changing HTML of Heading
  elements.productName.innerHTML = nameProduct;

  //? Removing class of hidden from specific elements
  array.forEach(el => el.classList.remove("hidden"));
};

//! Adding Listener to all Buttons
catagories.forEach(el => {
  document
    .querySelector(`.${el}-btn`)
    .addEventListener("click", () => showProducts(el));
});
