let userIndex = localStorage.getItem("userIndex");
// restriction
if (userIndex === null) {
  userIndex = +userIndex;
  document.body.innerHTML = `
  <h1>You are not allowed to this page please login</h1>
  <a href="../Login/index.html">Please log in</b>
  `;
}
else{

  const users = JSON.parse(localStorage.getItem("users")) || [];

  let values = {
    email: document.getElementById("email"),
    username: document.getElementById("username"),
    fName: document.getElementById("fName"),
    lName: document.getElementById("lName"),
    adress: document.getElementById("adress"),
    city: document.getElementById("city"),
    country: document.getElementById("country")
  };
  
  const Show = () => {
    values.email.value = users[userIndex].email;
    values.username.value = users[userIndex].username;
    values.fName.value = users[userIndex].fname;
    values.lName.value = users[userIndex].lname;
    values.adress.value = users[userIndex].adress;
    values.city.value = users[userIndex].city;
    values.country.value = users[userIndex].country;
  };
  
  // for showing previous values
  Show();
  
  //for editing values of user details
  const Edit = () => {
    users[userIndex].email = values.email.value;
    users[userIndex].username = values.username.value;
  
    users[userIndex].fname = values.fName.value;
    users[userIndex].lname = values.lName.value;
    users[userIndex].adress = values.adress.value;
    users[userIndex].city = values.city.value;
    users[userIndex].country = values.country.value;
  
    localStorage.setItem("users", JSON.stringify(users));
  };
  
}
