let userIndex = localStorage.getItem("userIndex");
//restriction
if (userIndex === null) {
  userIndex = +userIndex;
  document.body.innerHTML = `
  <h1>You are not allowed to this page please login</h1>
  <a href="../Login/index.html">Please log in</b>
  `;
}
const users = JSON.parse(localStorage.getItem("users")) || [];

let items = {
  id: document.getElementById("id"),
  email: document.getElementById("email"),
  username: document.getElementById("username"),
  fName: document.getElementById("fName"),
  lName: document.getElementById("lName"),
  adress: document.getElementById("adress"),
  city: document.getElementById("city"),
  country: document.getElementById("country"),
  date: document.getElementById("date"),
  logout: document.getElementById("logout")
};

items.id.innerHTML = users[userIndex].id;
items.email.innerHTML = users[userIndex].email;
items.username.innerHTML = users[userIndex].username;
items.fName.innerHTML = users[userIndex].fname;
items.lName.innerHTML = users[userIndex].lname;
items.adress.innerHTML = users[userIndex].adress;
items.city.innerHTML = users[userIndex].city;
items.country.innerHTML = users[userIndex].country;
items.date.innerHTML = new Date(users[userIndex].date).toDateString();

// for loggin out
items.logout.addEventListener("click", () => {
  localStorage.removeItem("userIndex");
});
