$(function() {
  SHA256 = new Hashes.SHA256();
  locationsController = new LocationsController();
  routeController = new RouteController();
  mapController = new MapController();
  userController = new UserController();
  authController = new AuthController();
  userController = new UserController();
  reviewController = new ReviewController();
  mainUI = new MainUI();
  resultsUI = new ResultsUI();
  mainUI.Reset();

  locationsController.GetRecommended();
  // disable form standard action
  $("form").submit(function(e){
    return false;
  });

  $("#searchVal").keyup(function() {
    var searchVal = $("#searchVal").val();
    locationsController.Search(searchVal);
  });
});

function likeLocation(locationName) {
  if (authController.state == "signed_in") {
    locationsController.LikeLocation(userController.user.email, locationName);
  } else {
    mainUI.ShowAlert("Please Sign in first");
  }
};

function reviewLocation(locationName) {
  reviewController.ShowReviewModal(locationName);
};

function submitReview() {
  if (authController.state == "signed_in") {
    var review = $("#inputReview").val();
    reviewController.PostReview(review);
  } else {
    mainUI.ShowAlert("Please Sign in first");
    reviewController.HideReviewModal();
  }
}

function selectTheme(themeName) {
  locationsController.GetTheme(themeName);
  $("#btn-plan").attr("disabled", false);
};

function selectRecommended() {
  locationsController.GetRecommended();
}

function showSignIn() {
  authController.ShowAuthModal();
};

function signOut() {
  userController.UserSignOut();
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
  if (type == "add" && routeController.routeMid.length>2) {
    mainUI.ShowAlert("Maximum amount of locations selected");
  } else {
    var location = locationsController.locations[index];
    routeController.AddLocation(type, location);
  }
};

function removeSelected(type, index) {
  routeController.RemoveLocation(type, index);
};

function planRoute() {
  console.log(routeController);
  mainUI.HideAlert();
  if (!routeController.routeStart) {
    mainUI.ShowAlert("Please select a start location");
  } else if (!routeController.routeEnd) {
    mainUI.ShowAlert("Please select a end location");
  } else if (routeController.routeMid.length < 2) {
    mainUI.ShowAlert("Please add more locations in the middle");
  } else {
    routeController.GenerateRoutes();
  }
};

function hideAlert() {
  mainUI.HideAlert();
};

function zoomTo(x,y) {
  if (mainUI.state == "result") {
    mapController.showLocation(x,y);
  } else {
    console.log("no zoom")
  }
}
