function LocationsController() {
  this.locationCount = 0;
  this.locations = [];
  this.theme = "";

  this.GetTheme = GetTheme;
  this.GetRecommended = GetRecommended;
};

function GetTheme(themeName) {
  mainUI.Loading();
  mainUI.Reset();
  var that = this;
  
  var url = "/api/locations/" + themeName;
  $.get(url, function (data) {
    var locations = data.SrchResults
    that.locationCount = locations[0].FeatCount;
    locations.shift();
    that.locations = locations;
    mainUI.DisplayLocations(locations, themeName)
  });
};

function GetRecommended() {

};
