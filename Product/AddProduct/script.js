// for sourse of image
let src;

// geting older products created  by users
const products = JSON.parse(localStorage.getItem("products")) || [];

// geting user which is logged in
let userIndex = localStorage.getItem("userIndex");

// restriction
if (userIndex === null) {
  userIndex = +userIndex;
  document.body.innerHTML = `
  <h1>You are not allowed to this page please login</h1>
  <a href="../../Login/index.html">Please log in</b>
  `;
}

const users = JSON.parse(localStorage.getItem("users")) || [];
const loginUser = users[userIndex];
console.log(users)
const loginUserId = loginUser.id;
//  constructor
class Product {
  constructor(title, category, price, image, description,userIndex,i) {
    this.username = loginUser.username;
    this.userId = loginUser.id;
    this.date = new Date();
    this.productId = `_ ${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    this.title = title;
    this.category = category;
    this.price = price;
    this.image = image;
    this.description = description;
    this.userIndex = userIndex;
    this.index = i
  }
}

// getting inputs
let inputs = {
  title: document.getElementById("title"),
  category: document.getElementById("category"),
  price: document.getElementById("price"),
  image: document.getElementById("image"),
  description: document.getElementById("description")
};

// image function loading
inputs.image.addEventListener("change", () => {
  let image = inputs.image.files[0];
  src = new FileReader();
  src.readAsDataURL(image);
});

// adding product function
const Create = () => {
  let title = inputs.title.value;
  let category = inputs.category.value;
  let price = inputs.price.value;
  let description = inputs.description.value;
  // pushing new product data in array of product array
  products.unshift(new Product(title, category, price, src.result, description,userIndex));
  products.forEach((el, i) => (el.index = i));
  // pushing new product data in array of products in local storsge
  localStorage.setItem("products", JSON.stringify(products));
  return true;
};
