function AuthController() {
  this.state = "sign_in";
  this.modal = "#authModal";

  this.ShowModal = ShowModal;
  this.SignIn = SignIn;
  this.SignUp = SignUp;
  this.SwitchModalState = SwitchModalState;

  $("#authModalName").hide();
  $("#alert-modal").hide();
};

function ShowModal() {
  $(this.modal).modal('show');
};

function SignIn(email, password) {
  var user = {
    email: email,
    password: SHA256.hex(password)
  };

  $.post("api/users/auth", user, function(data) {
    if (data.success) console.log("Call userController logged in state");
    else console.log("login failed");
  });
};

function SignUp(email, name, password) {
  var user = {
    email: email,
    name: name,
    password: SHA256.hex(password)
  };

  $.post("api/users/create", user, function(data) {
    console.log(data);
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
