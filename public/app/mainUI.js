function MainUI() {
  this.state = "ready";
  this.header = "#header";
  this.body = "#locations-body";
  this.theme = "";
  this.mediaHTML = "";

  this.SetThemeHeader = SetThemeHeader;
  this.ShowAlert = ShowAlert;
  this.HideAlert = HideAlert;
  this.DisplayLocations = DisplayLocations;
  this.Loading = Loading;
  this.StopLoading = StopLoading;
  this.Reset = Reset;
  this.DisplayRoutePlanner = DisplayRoutePlanner;
};

function DisplayRoutePlanner(panelHTML) {
  $("#routePlanner").html(panelHTML);
};

function ShowAlert(message) {
  $('#alert-box').show();
  $("#alert-message").html(message);
  $("html, body").animate({ scrollTop: 0 }, "slow");
};

function HideAlert() {
  $('#alert-box').hide();
};

function Loading() {
  this.state = "loading";

  var loadingText = "Loading <span class='glyphicon glyphicon-refresh glyphicon-spin'></span>";
  $(this.header).html(loadingText);
  $(".glyphicon-remove").hide();
  $("#btn-plan").attr("disabled", true);
};

function StopLoading() {
  this.loading = "ready";
  $(this.header).html(this.theme);
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
  $("#searchVal").show();
  $(".glyphicon-remove").show();
};

function generateMediaHTML(location, index) {
  if (!location.PHOTOURL) {
    location.PHOTOURL = 'http://www.onemap.sg/API/Services.svc/getMap?token=qo/s2TnSUmfLz+32CvLC4RMVkzEFYjxqyti1KhByvEacEdMWBpCuSSQ+IFRT84QjGPBCuz/cBom8PfSm3GjEsGc8PkdEEOEr&bmap=SM&size=140,140&center='+location.XY+'&level=4&points='+location.XY;
  }

  var likeCount;

  if (!!location.likes) {
    likeCount = location.likes;
  } else {
    likeCount = 0;
  }

  var mediaLeft = '<div class="media-left"><a href="'+location.HYPERLINK+'" target="_blank"><img class="media-object location-img" src="'+location.PHOTOURL+'" alt="'+location.NAME+'"></a></div>';
  var like = '<div class="btn-group pull-right" role="group"><button type="button" class="btn btn-default" onclick="reviewLocation(\''+location.NAME+'\')">Reviews</button><button type="button" class="btn btn-default" onclick="likeLocation(\''+location.NAME+'\')"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> <span class="badge">'+likeCount+'</span></button></div>';
  //var like = '<button type="button" class="btn btn-default pull-right" onclick="likeLocation(\''+location.NAME+'\')"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> <span class="badge">4</span></button>';
  //var review = '<button type="button" class="btn btn-default pull-right" onclick="reviewLocation(\''+location.NAME+'\')">Reviews</button>';
  var buttons = '<div><div class="btn-group btn-group"><button class="btn btn-success" onClick="selectLocation(\'start\', '+index+')">Start</button><button class="btn btn-primary" onClick="selectLocation(\'add\', '+index+')">Add</button><button class="btn btn-warning" onClick="selectLocation(\'end\', '+index+')">End</button></div>'+like+'</div>';
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
  $("#searchVal").hide();
  $("#searchVal").val('');
};
