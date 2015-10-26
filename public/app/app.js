$(function() {

  /*
  var testRoute = new Route();
  testRoute.GetRoute();
  console.log(testRoute);
  */

  locationsController = new LocationsController();
  routeController = new RouteController();
  homePageUI = new HomePageUI();

});

function selectTheme(themeName) {
  homePageUI.Loading();
  locationsController.GetTheme(themeName, homePageUI.DisplayLocations);
};

function selectLocation(type, index) {
  var location = locationsController.locations[index];
  routeController.AddLocation(type, location);
};

function removeSelected(type, index) {
  routeController.RemoveLocation(type, index);
};
