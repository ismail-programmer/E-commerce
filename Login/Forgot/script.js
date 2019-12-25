// geting data from local storage
var loginUsers = JSON.parse(localStorage.getItem("users")) || [];

// errors p
const Restrictions = ["p", "cp"];

// geting  value
let inputs = {
  form: document.getElementById("form"),
  notUser: document.getElementById("notUser"),
  fEmail: document.getElementById("fEmail"),
  Fpassword: document.getElementById("Fpassword"),
  FconfirmPassword: document.getElementById("Fconfirm-password"),
  RestrictionPg: Restrictions.map(el =>
    document.querySelector("." + el + "Res")
  )
};

//forgot Pass getting emali
const Forgot = () => {
  return loginUsers.forEach(user => {
    if (user.email === inputs.fEmail.value) {
      inputs.Fpassword.disabled = false;
      inputs.FconfirmPassword.disabled = false;
      return true;
    } else {
      alert("not exsists");
      inputs.Fpassword.disabled = true;
      inputs.FconfirmPassword.disabled = true;
      return false;
    }
  });
};

//  password changed in local storage

const changingPassword = () => {
  loginUsers.forEach(user => {
    if (user.email === inputs.fEmail.value) {
      let Fpassword = inputs.Fpassword.value;
      let FconfirmPassword = inputs.FconfirmPassword.value;
      if (
        chkPass(Fpassword) && //pasword
        confirmPass(Fpassword, FconfirmPassword) //confirm pass
      ) {
        user.password = Fpassword;
      }
      let password = loginUsers.password;
    }
  });
  localStorage.setItem("users", JSON.stringify(loginUsers));
  location.href = "index.html";
};

// checking for  password
const chkPass = pass => {
  var password = /^[A-Za-z]\w{8,14}$/;
  if (pass.match(password)) {
    inputs.RestrictionPg[0].innerHTML = "";
    return true;
  } else {
    inputs.Fpassword.focus();
    inputs.RestrictionPg[0].innerHTML = "password-incorect";
    return false;
  }
};

//  validation for confirm Pass
const confirmPass = (pass, cPass) => {
  if (pass === cPass) {
    inputs.RestrictionPg[1].innerHTML = ``;
    return true;
  } else {
    inputs.FconfirmPassword.focus();
    inputs.RestrictionPg[1].innerHTML = "Confirm-pssword did not match";
    return false;
  }
};
