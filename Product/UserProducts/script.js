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
  const previousProducts = JSON.parse(localStorage.getItem("previousProducts")) || []; 

  let allProducts;
  if(products){
    allProducts = [...products,...previousProducts]
  }else{
    allProducts = products
  }

  if (products.length === 0) {
    // products = +products;
    document.body.innerHTML = `
    <h1>You had not create any product</h1>
    <a href="../AddProduct/index.html">Please add product</b>
    `;
  } else {
    let userId = users[userIndex].id;

    allProducts.map((product, i) => {
      if (userId === product.userId) {
        let template = ` <div class="col l3 m4 s6 ${product.catagory}">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img
              src="${product.image}"
              alt="${product.title}"
            />
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${product.title}<i class="material-icons right">more_vert</i></span>
            <p><a class="link" id="${i}" href="../ViewDetails/index.html">View More</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">${product.title}<i class="material-icons right">close</i></span>
            <ul>${product.description}</ul>
          </div>
        </div>
      </div>`;
        document.getElementById("row").innerHTML += template;
      }
    });
  }
  document.querySelectorAll('.link').forEach(el=>{
    el.addEventListener('click',(e)=>{
      localStorage.setItem("pIndex", e.target.id)
      console.log(e.target.id)
    })
  })
}
