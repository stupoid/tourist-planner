function LocationsController() {
  this.locationCount = 0;
  this.locations = [];
  this.theme = "";

  this.GetTheme = GetTheme;
  this.GetRecommended = GetRecommended;
  this.LikeLocation = LikeLocation;
};

function GetTheme(themeName) {
  mainUI.Loading();
  mainUI.Reset();
  var that = this;
  that.theme = themeName;

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

function LikeLocation(email, locationName) {
  var that = this;
  var data = {
    email: email,
    location: locationName,
    theme: this.theme
  }
  console.log(data);
  var url = '/api/locations/like';
  $.post(url, data, function(res) {
    if (res.success) GetTheme(that.theme);
  });
}
