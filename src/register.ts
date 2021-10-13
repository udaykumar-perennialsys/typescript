const btn = document.querySelector(".signup-btn") as HTMLButtonElement;
const fullName = document.getElementById("name") as HTMLInputElement;
const dateInc = document.getElementById("dateInc") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const re_password = document.getElementById("Repassword") as HTMLInputElement;

interface UserInterface {
  fullName: string;
  dateInc: string;
  email: string;
  password: string;
  re_password: string;
}

function passWordCheck(): boolean {
  if (password.value == re_password.value) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// strong password check

function CheckPassword(password): boolean {
  var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  if (password.value.match(paswd)) {
    return true;
  } else {
    return false;
  }
}
// strong password check




btn.addEventListener("click", async function () {
  const users: UserInterface = {
    fullName: fullName.value,
    dateInc: dateInc.value,
    email: email.value,
    password: password.value,
    re_password: re_password.value,
  };

  try {
    if (
      users.fullName.length !== 0 &&
      users.email.length !== 0 &&
      users.dateInc.length !== 0 &&
      users.password.length !== 0 &&
      users.re_password.length !== 0
    ) {
      if (passWordCheck() && validateEmail(users.email)) {
        const response = await fetch("http://localhost:4000/users", {
          method: "POST",
          body: JSON.stringify(users),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const userData = await response.json();

        console.log(userData);
      } else if (!validateEmail(users.email)) {
        alert("Please enter valid e-mail");
      } else if (!passWordCheck()) {
        alert("Password do not match");
      } 
    } else {
      alert("Please fill all the necessary detail");
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
});
