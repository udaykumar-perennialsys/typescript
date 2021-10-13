const loginBtn = document.querySelector(".login-btn") as HTMLButtonElement;
const LoginEmail = document.getElementById("email") as HTMLInputElement;
const loginPassword = document.getElementById("password") as HTMLInputElement;
let data;
loginBtn.addEventListener("click", function () {
  const loginDetail = {
    LoginEmail: LoginEmail.value,
    loginPassword: loginPassword.value,
  };
  //console.log(data);
  data.forEach(function (item) {
    if (
      item.email === loginDetail.LoginEmail &&
      item.password === loginDetail.loginPassword
    ) {
      console.log(item);
      localStorage.setItem("loginId", JSON.stringify(item.id));
      window.location.assign("../Html/dsh.html");
    }
  });
});

async function getUsers() {
  const response = await fetch("http://localhost:4000/users");
  data = await response.json();
  //console.log(data);
}

getUsers();
