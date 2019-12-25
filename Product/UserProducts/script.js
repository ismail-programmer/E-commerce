let userIndex = localStorage.getItem("userIndex");

// restriction
if (userIndex === null) {
  userIndex = +userIndex;
  document.body.innerHTML = `
  <h1>You are not allowed to this page please login</h1>
  <a href="../../Login/index.html">Please log in</b>
  `;
} else {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  let products = JSON.parse(localStorage.getItem("products")) || [];
  if (products.length === 0) {
    products = +products;
    document.body.innerHTML = `
    <h1>You had not create any product</h1>
    <a href="../AddProduct/index.html">Please add product</b>
    `;
  } else {
    let userId = users[userIndex].id;

    products.map((product, i) => {
      if (userId === product.userId) {
        let template = `<div class="col s12 m4" id="product" >
            <div class="card">
            <div class="card-image">
            <a href="../ViewDetails/index.html"
           id=${i} 
           onclick=${localStorage.setItem("pIndex", i)}
           >View Details</a>
            <img src="${product.image}">
            <span class="card-title">${product.title}</span>
            </div>
            <div class="card-content">
            <p>${product.description}</p>
            </div>
            </div>
            </div>`;
        document.getElementById("row").innerHTML += template;
      }
    });
  }
}
