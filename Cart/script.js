const html = `<li class="collection-item avatar" id="%I%"><div class="div cancel"><button class="transparent delete btn grey-text">&rotimes;</button></div><img src="%IMAGE%" alt="" class="circle" /><span style="font-size: 1.8rem;" class="title">%TITLE%</span><p><span>%PRICE%</span><br /><span>%CATAGORY%</span></p><a href="../OrderInfo/index.html?id=%I%" class="orderBtn btn grey white-text waves-effect waves-block">Order</a><div class="secondary-content"><div class="div up"><button class="btn-small increase transparent grey-text">&bigtriangleup;</button></div><div class="q" data-index="%I%" contenteditable="true" id="%I%">%QUANTITY%</div><div class="div down"><button class="btn-small decrease transparent grey-text">&bigtriangledown;</button></div></div></li>`;
const products = JSON.parse(localStorage.getItem("previousProducts")) || [];
const cart = JSON.parse(localStorage.getItem("cart")) || [];
// new products by user
const users = JSON.parse(localStorage.getItem("users")) || [];
const userIndex = JSON.parse(localStorage.getItem("userIndex"));
let userProducts = JSON.parse(localStorage.getItem("products")) || [];
const allProducts = userProducts ? [...userProducts, ...products] : products;
const elements = {
  collection: document.querySelector(".collection")
};
const ids = allProducts.map(el => el.productId);

const cartProducts = cart.map(el => {
  if (ids.includes(el.productId)) {
    const index = ids.indexOf(el.productId);
    allProducts[index].quantity = el.quantity;
    return allProducts[index];
  }
});

const calculateTotal = (amount, price) => {
  let prices = +price.split(`$`)[1];
  return prices * amount;
};

const renderHtml = (el, i) => {
  if(!el.userIndex){
    el.image = `../Product/${el.image}`
    // alert()
  }
  let newHtml = html.replace(/%IMAGE%/g, el.image);
  newHtml = newHtml.replace(/%TITLE%/g, el.title);
  newHtml = newHtml.replace(/%PRICE%/g, el.price);
  newHtml = newHtml.replace(/%CATAGORY%/g, el.category);
  newHtml = newHtml.replace(/%QUANTITY%/g, el.quantity);
  newHtml = newHtml.replace(/%I%/g, i);
  elements.collection.insertAdjacentHTML("beforeend", newHtml);
};

const collection = document.querySelector(".collection");

cartProducts.forEach(renderHtml);

const jsRenderElements = {
  btnInc: document.querySelectorAll(".increase"),
  btnDec: document.querySelectorAll(".decrease"),
  quantity: document.querySelector(".q")
};
jsRenderElements.btnInc.forEach(el => {
  el.addEventListener("click", e => {
    //! UI
    let q = e.target.parentNode.nextElementSibling;
    const price =
      e.target.parentNode.parentNode.previousElementSibling.previousElementSibling.firstElementChild.innerHTML;
    let innerhtml;
    if (q.innerHTML === `0`) {
      innerhtml = `1`;
    } else {
      innerhtml = Math.ceil(+q.innerHTML);
    }
    innerhtml++;
    q.innerHTML = `${innerhtml}`;
    cartProducts[q.id].quantity = innerhtml;
    cart[q.id].quantity = innerhtml;
    document.querySelector(`.price${q.id}`).innerHTML =
      `$` + calculateTotal(innerhtml, price).toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));
  });
});
jsRenderElements.btnDec.forEach(el => {
  el.addEventListener("click", e => {
    //! UI
    const q = e.target.parentNode.previousElementSibling;
    const price =
      e.target.parentNode.parentNode.previousElementSibling
        .previousElementSibling.firstElementChild.innerHTML;
    let innerhtml;
    if (q.innerHTML === `0`) {
      innerhtml = `1`;
    } else {
      innerhtml = Math.ceil(+q.innerHTML);
    }
    innerhtml--;
    if (innerhtml === 0) {
      return;
    }
    q.innerHTML = `${innerhtml}`;
    cartProducts[q.id].quantity = innerhtml;
    cart[q.id].quantity = innerhtml;
    document.querySelector(`.price${q.id}`).innerHTML =
      `$` + calculateTotal(innerhtml, price).toFixed(2);
      
    localStorage.setItem("cart", JSON.stringify(cart));
  });
});
const createListItems = i => {
  const abc = document.createElement("li");
  abc.classList.add("collection-item");
  abc.id = `item${i}`;
  abc.innerHTML = `<h4>Total: <span class="price${i}">${cartProducts[i].price}</span></h4>`;
  abc.style.height = `${zero.firstElementChild.offsetHeight}px`;
  one.insertAdjacentElement("beforeend", abc);
};
for (let i = 0; i < cart.length; i++) {
  createListItems(i);
}

cartProducts.forEach((el, i) => {
  document.querySelector(`.price${i}`).innerHTML = `$${calculateTotal(
    el.quantity,
    el.price
  ).toFixed(2)}`;
});
document.querySelectorAll(".delete").forEach((el, i) => {
  el.addEventListener("click", e => {
    const item = e.target.parentNode.parentNode;
    cart.splice(+item.id, 1);
    item.remove();
    localStorage.setItem("cart", JSON.stringify(cart));
    const priceArray = Array.from(document.getElementById("one").children);
    const itemPrice = priceArray.find(el => el.id === `item${item.id}`);
    itemPrice.remove();
  });
});
