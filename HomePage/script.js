//
let rowId = 0;
let rowIdHtml = 0;
// geting older products created  by users
let products =
  JSON.parse(localStorage.getItem("products")) === null
    ? []
    : JSON.parse(localStorage.getItem("products"));
const allProducts = JSON.parse(localStorage.getItem("previousProducts"));
allProducts.forEach(el=>{
  el.image = `../Product/${el.image}`
})

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
    <a id="${i}" class="crt btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
      </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${el.title}<i class="material-icons right">more_vert</i></span>
      <p><a class="link" id="${i}" href="../Product/ViewDetails/index.html">View More</a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${el.title}
      <i class="material-icons right">close</i>
      </span>
      <ul>${el.description}</ul>
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

//for getting index for view details
document.querySelectorAll(".link").forEach(el => {
  el.addEventListener("click", e => {
    localStorage.setItem("pIndex", e.target.id);
  });
});


//adding cart
const cart = [];
document.querySelectorAll(".crt").forEach(el => {
  el.addEventListener("click", e => {
    let id = e.target.id || e.target.parentNode.id;
    cart.push(bigArray[id])
console.log(cart)
    localStorage.setItem("cart", JSON.stringify(cart) );
  });
});