function UserController() {
  this.user = "";
  this.UserSignIn = UserSignIn;
  this.UserSignOut = UserSignOut;
};

function UserSignIn(name, email) {
  this.user = {
    name: name,
    email: email
  }
  $("#inputEmail").val('');
  $("#inputPassword").val('');
  $("#btn-login").hide();
  $("#btn-user").html(name).show();
};

function UserSignOut() {
  this.user = "";
  $("#btn-login").show();
  $("#btn-user").hide();
  authController.state = "sign_in";
};
