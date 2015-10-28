function UserController() {
  this.user = "";
  this.UserLogin = UserLogin;
};

function UserLogin(name, password) {
  console.log("logging in as " + name);
};
