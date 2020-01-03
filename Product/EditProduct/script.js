let userIndex = localStorage.getItem("userIndex");
// for sourse of image
let src;

let products = JSON.parse(localStorage.getItem("products")) || [];
let previousProducts =
  JSON.parse(localStorage.getItem("previousProducts")) || [];
const pIndex = +localStorage.getItem("pIndex");
const allProducts = [...products, ...previousProducts];
const active = products[pIndex];
//getting feild ids
let values = {
  title: document.getElementById("title"),
  category: document.getElementById("category"),
  price: document.getElementById("price"),
  image: document.getElementById("image"),
  description: document.getElementById("description"),
  form: document.getElementById("form"),
  dlt: document.getElementById("dlt")
};

// restriction
if (userIndex === null) {
  userIndex = +userIndex;
  document.body.innerHTML = `
  <h1>You are not allowed to this page please login</h1>
  <a href="../../Login/index.html">Please log in</b>
  `;
} else {
  if (allProducts[pIndex].username) {
    const Show = () => {
      values.title.value = active.title;
      values.category.value = active.category;
      values.price.value = active.price.split(`$`)[1];
      values.description.value = active.description;
    };

    // for showing previous values
    Show();

    // image function loading
    values.image.addEventListener("change", () => {
      let image = values.image.files[0];
      if (image) {
        src = new FileReader();
        src.readAsDataURL(image);
      }
    });

    //for editing values of user details
    const Edit = e => {
      active.title = values.title.value;
      active.category = values.category.value;
      active.price = `$${values.price.value}`;
      if (src) {
        active.image = src.result;
      }
      active.description = values.description.value;
      localStorage.setItem("products", JSON.stringify(products));
    };
    values.form.addEventListener("submit", Edit);
  } else {
    document.body.innerHTML = `<h1>You can only Edit products that you created</h1>`;
  }
  values.dlt.addEventListener("click", () => {
    products.splice(pIndex, 1);
    products = products;
    console.log(products);
    localStorage.setItem("products", JSON.stringify(products));
  });
}
