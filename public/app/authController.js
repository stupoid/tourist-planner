function AuthController() {
  this.state = "sign_in";
  this.modal = "#authModal";

  this.ShowModal = ShowModal;
  this.HideModal = HideModal;
  this.SignIn = SignIn;
  this.SignUp = SignUp;
  this.SwitchModalState = SwitchModalState;

  $("#authModalName").hide();
  $("#alert-modal").hide();
  $("#btn-user").hide();
};

function modalAlert(message) {
  $("#alert-modal").show();
  $("#alert-modal-message").html(message);
}

function ShowModal() {
  $(this.modal).modal('show');
};

function HideModal() {
  $(this.modal).modal('hide');
};

function SignIn(email, password) {
  var that = this;
  var user = {
    email: email,
    password: SHA256.hex(password)
  };

  $.post("api/users/auth", user, function(data) {
    if (data.success) {
      that.state = "signed_in";
      that.HideModal();
      ShowAlert("Sign in successful, signed in as " + data.name);
      userController.UserSignIn(data.name, email);
    } else modalAlert("Sign In failed");
  });
};

function SignUp(email, name, password) {
  var that = this;
  var user = {
    email: email,
    name: name,
    password: SHA256.hex(password)
  };

  $.post("api/users/create", user, function(data) {
    if (data.success) {
      that.state = "signed_in";
      that.HideModal();
      ShowAlert("Sign up successful, signed in as " + name);
      userController.UserSignIn(name, email);
    } else modalAlert("Sign Up failed");
  });
};

function SwitchModalState() {
  var label = $("#authModalLabel");
  var small = $("#authModalSmall");
  var button = $("#authModalButton");
  var name = $("#authModalName");

  if (this.state == "sign_in") {
    this.state = "sign_up";
    label.html("Sign Up");
    name.show();
    button.html("Sign Up");
    var text = "Already have an account? <a onclick=\"switchForm()\">Sign in</a> instead";
    small.html(text);

  } else {
    this.state = "sign_in";
    label.html("Sign In");
    name.hide();
    button.html("Sign In");
    var text = "Don't have an account? <a onclick=\"switchForm()\">Sign up</a> instead";
    small.html(text);
  }
};
