$(function() {
  locationsController = new LocationsController();
  routeController = new RouteController();
  mapController = new MapController();
  homePageUI = new HomePageUI();
  resultsUI = new ResultsUI();
  homePageUI.Reset();
});

function selectTheme(themeName) {
  locationsController.GetTheme(themeName);
  $("#btn-plan").attr("disabled", false);
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
  if (homePageUI.state == "result") {
    console.log("zoom")
  } else {
    console.log("no zoom")
  }
}
