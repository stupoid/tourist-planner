function HomePageUI() {
  this.state = "ready";
  this.header = "#header";
  this.body = "#locations-body";
  this.theme = "";
  this.mediaHTML = "";

  this.SetThemeHeader = SetThemeHeader;
  this.ShowAlert = ShowAlert;
  this.DisplayLocations = DisplayLocations;
  this.Loading = Loading;
  this.StopLoading = StopLoading;
  this.Reset = Reset;
};

function ShowAlert(message) {
  $('#alert-box').fadeIn('fast').delay(10000).fadeOut('slow');
  $("#alert-message").html(message);
};

function Loading() {
  this.state = "loading";

  var loadingText = "Loading <span class='glyphicon glyphicon-refresh glyphicon-spin'></span>";
  $(this.header).html(loadingText);
  $(".glyphicon-remove").hide();
  $("#btn-plan").attr("disabled", true);
};

function StopLoading(newHeaderTitle) {
  this.loading = "ready";
  $(this.header).html(newHeaderTitle);
  $(".glyphicon-remove").show();
  $("#btn-plan").attr("disabled", false);
};

function SetThemeHeader(themeName) {
  var theme = themeName.charAt(0).toUpperCase() + themeName.substr(1).toLowerCase();
  this.theme = theme;
  $(this.header).html(theme);
};

function DisplayLocations(locations, themeName) {
  var that = this;
  var mediaHTML = "";
  locations.forEach(function(location, index) {
    mediaHTML += generateMediaHTML(location, index);
  });

  $(that.body).html(mediaHTML);
  that.SetThemeHeader(themeName);
};

function generateMediaHTML(location, index) {
  if (!location.PHOTOURL)
    location.PHOTOURL = 'http://www.onemap.sg/API/Services.svc/getMap?token=qo/s2TnSUmfLz+32CvLC4RMVkzEFYjxqyti1KhByvEacEdMWBpCuSSQ+IFRT84QjGPBCuz/cBom8PfSm3GjEsGc8PkdEEOEr&bmap=SM&size=140,140&center='+location.XY+'&level=4&points='+location.XY;

  var mediaLeft = '<div class="media-left"><a href="'+location.HYPERLINK+'" target="_blank"><img class="media-object location-img" src="'+location.PHOTOURL+'" alt="'+location.NAME+'"></a></div>';
  var buttons = '<div><div class="btn-group btn-group"><button class="btn btn-success" onClick="selectLocation(\'start\', '+index+')">Start</button><button class="btn btn-primary" onClick="selectLocation(\'add\', '+index+')">Add</button><button class="btn btn-warning" onClick="selectLocation(\'end\', '+index+')">End</button></div></div>';
  var address = '<p>'+location.ADDRESSSTREETNAME + ' Singapore ' + location.ADDRESSPOSTALCODE+'</p>';

  if (location.DESCRIPTION) {
    location.DESCRIPTION = location.DESCRIPTION.replace(/\?/g, "'"); // replace text ? with ' as some of it is formatted like that
    var mediaBody = '<div class="media-body"><h4 class="media-heading">'+location.NAME+'</h4>'+location.DESCRIPTION+address+buttons+'</div>';
  } else {
    var mediaBody = '<div class="media-body"><h4 class="media-heading">'+location.NAME+'</h4>'+address+buttons+'</div>';
  }

  return '<div class="media">'+mediaLeft+mediaBody+'</div>';
}

function Reset() {
  $(this.body).html("").show();
  this.state = "ready";
  $("#results-body").hide();
  $("#alert-box").hide();
  $("#plannerHeader").html("Route Planner");
};
