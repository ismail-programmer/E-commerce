// //removing previous value
// localStorage.removeItem("userIndex");

const loginUsers =
  JSON.parse(localStorage.getItem("users")) === null
    ? []
    : JSON.parse(localStorage.getItem("users"));

const emails = loginUsers.map(el => el.email);
const passwords = loginUsers.map(el => el.password);

// geting  value
let inputs = {
  email: document.getElementById("emailL"),
  password: document.getElementById("passwordL"),
  form: document.getElementById("form"),
  passRes: document.querySelector(".passRes"),
  emailRes: document.querySelector(".emailRes")
};

// login function
const Login = () => {
  if (emails.includes(inputs.email.value)) {
    let index = emails.indexOf(inputs.email.value);
    localStorage.setItem("userIndex", index);
    return checkPassword(inputs.password.value, index, passwords);
  } else {
    inputs.emailRes.innerHTML = `Email not registered <a href="../Signup/index.html">Signup Now</a>`;
    return false;
  }
};

const checkPassword = (input, i, array) => {
  if (input !== array[i]) {
    inputs.passRes.innerHTML = "Incorrect password";
    return false;
  }
  return true;
};
