const products = JSON.parse(localStorage.getItem("products")) || [];
const pIndex = localStorage.getItem("pIndex");
const active = products[pIndex];

let items = {
  userId: document.getElementById("userId"),
  productId: document.getElementById("productId"),
  username: document.getElementById("username"),
  title: document.getElementById("title"),
  category: document.getElementById("category"),
  price: document.getElementById("price"),
  image: document.getElementById("image"),
  description: document.getElementById("description"),
  date: document.getElementById("date")
};
if (!pIndex) document.body.innerHTML = `<h1>Please Select a Product</h1>`;
else {
  items.userId.innerHTML = active.userId;
  items.productId.innerHTML = active.productId;
  items.username.innerHTML = active.username;
  items.title.innerHTML = active.title;
  items.category.innerHTML = active.category;
  items.price.innerHTML = active.price;
  items.image.src = active.image;
  items.description.innerHTML = active.description;
  items.date.innerHTML = new Date(active.date).toDateString();
}
