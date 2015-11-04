function LocationsController() {
  this.locationCount = 0;
  this.locations = [];
  this.theme = "";

  this.GetTheme = GetTheme;
  this.GetRecommended = GetRecommended;
  this.LikeLocation = LikeLocation;
  this.Search = Search;
};

function GetTheme(themeName) {
  mainUI.Loading();
  mainUI.Reset();
  var that = this;
  that.theme = themeName;

  var url = "/api/locations/" + themeName;
  $.get(url, function (data) {
    var locations = data.SrchResults;
    that.locationCount = locations[0].FeatCount;
    locations.shift();
    that.locations = locations;

    mainUI.DisplayLocations(locations, themeName)
  });
};

function GetRecommended() {
  var that = this;
  that.theme = "Recommended";
  mainUI.theme = "Recommended";
  var url = "/api/recommended/";
  $.get(url, function (data) {
    var locations = data[0].SrchResults;
    var locationCount = locations[0].FeatCount;
    locations.shift();
    that.locations = locations;

    mainUI.DisplayLocations(locations, "Recommended");
  });
};

function Search(search_term) {
  var theme = this.theme;
  var locations = this.locations;
  var search = new RegExp(search_term , "i");
  var results = $.grep(locations, function(e){ return search.test(e.NAME); });
  mainUI.DisplayLocations(results, theme);
}

function LikeLocation(email, locationName) {
  var that = this;
  var data = {
    email: email,
    location: locationName,
    theme: this.theme
  }

  if (that.theme == "Recommended") {
    url = '/api/recommended/like';
  } else {
    var url = '/api/locations/like';
  }

  $.post(url, data, function(res) {
    if (res.success) {
      if (that.theme == "Recommended") GetRecommended();
      else GetTheme(that.theme);
    }
  });
}
