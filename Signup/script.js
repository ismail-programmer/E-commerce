// geting users from localstorage
var users = JSON.parse(localStorage.getItem("users")) || [];
// errors p
const Restrictions = ["u", "p", "cp", "e"];
//  constructor
class User {
  constructor(username, password, email, fname, lname, adress, city, country) {
    this.date = new Date();
    this.id = `_ ${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    this.username = username;
    this.password = password;
    this.email = email;
    this.fname = fname;
    this.lname = lname;
    this.adress = adress;
    this.city = city;
    this.country = country;
  }
}

// geting  values
var ids = {
  username: document.getElementById("username"),
  password: document.getElementById("password"),
  confirmPassword: document.getElementById("confirm-password"),
  email: document.getElementById("email"),
  fname: document.getElementById("fname"),
  lname: document.getElementById("lname"),
  adress: document.getElementById("adress"),
  city: document.getElementById("city"),
  country: document.getElementById("country"),
  form: document.getElementById("form"),
  RestrictionPg: Restrictions.map(el =>
    document.querySelector("." + el + "Res")
  )
};

// new  user function
const Signup = () => {
  //grting inputs
  let username = ids.username.value;
  let password = ids.password.value;
  let confirmPassword = ids.confirmPassword.value;
  let email = ids.email.value;
  let fname = ids.fname.value;
  let lname = ids.lname.value;
  let adress = ids.adress.value;
  let city = ids.city.value;
  let country = ids.country.value;

  // geting already values from local storage
  let usernames = users.map(user => user.username);
  let emails = users.map(user => user.email);

  // calling validation functions
  if (
    chkPass(password) && //pasword
    confirmPass(password, confirmPassword) && //confirm pass
    !chkExistance(username, usernames, "Username ", 0) && //chking unique user
    !chkExistance(email, emails, "Email ", 3) // checking unique email
  ) {
    // pushing new user data in array of users
    users.push(
      new User(username, password, email, fname, lname, adress, city, country)
    );
    // pushing new user data in array of users in local storsge
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  }
  return false;
};

// chk for unique emails and usernames
const chkExistance = (input, array, name, index) => {
  if (array.includes(input)) {
    ids.RestrictionPg[index].innerHTML = `${name} is already taken`;
    return array.includes(input);
  }
  ids.RestrictionPg[index].innerHTML = ``;
  return array.includes(input);
};

// checking for  password
const chkPass = pass => {
  var password = /^[A-Za-z]\w{8,14}$/;
  if (pass.match(password)) {
    ids.RestrictionPg[1].innerHTML = "";
    return true;
  } else {
    ids.password.focus();
    ids.RestrictionPg[1].innerHTML = "password-incorect";
    return false;
  }
};
ids.password.addEventListener("blur", e => chkPass(e.target.value));

//  validation for confirm Pass
const confirmPass = (pass, cPass) => {
  if (pass === cPass) {
    ids.RestrictionPg[2].innerHTML = ``;
    return true;
  } else {
    ids.confirmPassword.focus();
    ids.RestrictionPg[2].innerHTML = "Confirm-pssword did not match";
    return false;
  }
};
ids.confirmPassword.addEventListener("blur", e =>
  confirmPass(ids.password.value, e.target.value)
);
