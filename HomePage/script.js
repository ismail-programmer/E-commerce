//
let rowId = 0;
let rowIdHtml = 0;
// geting older products created  by users
let products =
  JSON.parse(localStorage.getItem("products")) === null
    ? []
    : JSON.parse(localStorage.getItem("products"));

const allProducts = [
  {
    title: `A macro step change inferred`,
    catagory: `computer`,
    price: `129.50$`
  },
  {
    title: `AI CHIPS WITH MILITARY PRECISION`,
    catagory: `computer`,
    price: `100.00$`
  },
  {
    title: `Qualcomm, Nvidia with new AI chips`,
    catagory: `computer`,
    price: `99.99$`
  },
  { title: `Earbuds for smartphones`, catagory: `mobile`, price: `10.00$` },
  {
    title: `Precision Crafted for Sound and Beauty`,
    catagory: `mobile`,
    price: `200.00$`
  },
  {
    title: `White & Decker Microwave Oven 20Ltr (MZ2010P)`,
    catagory: `home`,
    price: `499.99$`
  },
  {
    title: `23 Ltr Burger Microwave Oven Grill Black`,
    catagory: `home`,
    price: `799.99$`
  },
  {
    title: `Electrolux SEM-130ESL-B6 Microwave Oven`,
    catagory: `home`,
    price: `999.99$`
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
  `We operate under an advanced corporate governance structure that comprises of a Board of Directors.`
];

const ids = JSON.parse(localStorage.getItem("productID")) || [];
for (let i = 0; i <= 10; i++) {
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
  const product = `../Product/images/p${i}.jfif`;
  allProducts[i].image = product;
  allProducts[i].description = descriptions[i];
  allProducts[i].date = new Date(`june 28, 2000`);
  allProducts[i].id = ids[i];
  allProducts[i].index = products.length + i;
}
//? Saving the id in localstorage
localStorage.setItem("productID", JSON.stringify(ids));

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
if (bigArray.length > 10) {
  let newArray = bigArray.slice(0, 9);
  bigArray = newArray;
}
for (let i = 0; i < bigArray.length; i++) {
  if (i % 3 === 2) createHtml();
}

bigArray.forEach((el, i) => {
  let title = el.title;
  let description = el.description;

  let template = `
  <div class="col s12 m3" id="product" >
    <div class="card">
      <div style="position:relative;" class="card-image">
        <img src="${el.image}" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)" />
        <span class="card-title">${title}</span>
        <a  class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">Edit</i></a>
      </div>
      <div class="card-content">
        <p>${description}</p>
      </div>
    </div>
  </div>`;

  const a = el.index % 3;
  let htmlElement = document.getElementById(`row-${rowIdHtml}`);
  if (a === 2) {
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
