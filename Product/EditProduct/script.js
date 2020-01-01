let userIndex = localStorage.getItem("userIndex");
// for sourse of image
let src;

let products = JSON.parse(localStorage.getItem("products")) || [];
const pIndex = +localStorage.getItem("pIndex");
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
  const Show = () => {
    values.title.value = active.title;
    values.category.value = active.category;
    values.price.value = active.price;
    values.description.value = active.description;
  };

  // for showing previous values
  Show();

  // image function loading
  values.image.addEventListener("change", () => {
    let image = values.image.files[0];
    src = new FileReader();
    src.readAsDataURL(image);
  });
  // console.log(active.image);

  //for editing values of user details
  const Edit = () => {
    active.title = values.title.value;
    active.category = values.category.value;
    active.price = values.price.value;
    active.description = values.description.value;
    if (src) {
      active.image = src.result;
    }

    localStorage.setItem("products", JSON.stringify(products));
  };

  values.form.addEventListener("submit", Edit);
  values.dlt.addEventListener("click", () => {
    products.splice(pIndex, 1);
    products = products;
    console.log(products);
    localStorage.setItem("products", JSON.stringify(products));
  });
}
