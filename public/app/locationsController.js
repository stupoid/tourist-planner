function LocationsController() {
  this.locationCount = 0;
  this.locations = [];
  this.theme = "";

  this.GetTheme = GetTheme;
};

function GetTheme(themeName) {
  homePageUI.Loading();
  homePageUI.Reset();
  var that = this;
  var theme = themeName.charAt(0).toUpperCase() + themeName.substr(1).toLowerCase();
  that.theme = theme;
  var params = {
    token: _OneMapGlobalToken,
    themeName: themeName
  };

  var url = host + "API/services.svc/mashupData?" + $.param(params);
  $.getJSON(url, function (data) {
    var locations = data.SrchResults
    that.locationCount = locations[0].FeatCount;
    locations.shift();
    that.locations = locations;
    homePageUI.DisplayLocations(locations, themeName)
  });
};
