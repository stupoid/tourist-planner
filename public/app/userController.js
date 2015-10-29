function UserController() {
  this.user = "";
  this.UserLogin = UserLogin;
};

function UserLogin(name, email) {
  this.user = {
    name: name,
    email: email
  }
  $("#btn-login").html(name);
  
};
