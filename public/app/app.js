$(function() {
  SHA256 = new Hashes.SHA256();
  locationsController = new LocationsController();
  routeController = new RouteController();
  mapController = new MapController();
  userController = new UserController();
  authController = new AuthController();
  userController = new UserController();
  mainUI = new MainUI();
  resultsUI = new ResultsUI();
  mainUI.Reset();
});

function selectTheme(themeName) {
  locationsController.GetTheme(themeName);
  $("#btn-plan").attr("disabled", false);
};

function showSignIn() {
  if (authController.state != "signed_in") {
    authController.ShowModal();
  } else {
    console.log("pop");
    $("#btn-login").popover();
  }

};

function authModalSubmit() {
  if (authController.state == "sign_in") {
    var email = $("#inputEmail").val();
    var password = $("#inputPassword").val();
    authController.SignIn(email, password);
  } else if (authController.state == "sign_up") {
    var email = $("#inputEmail").val();
    var name = $("#inputName").val();
    var password = $("#inputPassword").val();
    authController.SignUp(email, name, password);
  }
};

function switchForm() {
  authController.SwitchModalState();
};

function selectLocation(type, index) {
  var location = locationsController.locations[index];
  routeController.AddLocation(type, location);
};

function removeSelected(type, index) {
  routeController.RemoveLocation(type, index);
};

function planRoute() {
  routeController.GenerateRoutes();
};

function zoomTo(x,y) {
  if (mainUI.state == "result") {
    mapController.showLocation(x,y);
  } else {
    console.log("no zoom")
  }
}
