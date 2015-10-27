function RouteController() {
  this.routes = [];
  this.shortestRoute = "";
  this.routeStart = "";
  this.routeMid = [];
  this.routeEnd = "";
  this.locations = [];
  this.maxLocations = 5;
  this.panelHTML = "";

  this.AddLocation = AddLocation;
  this.RemoveLocation = RemoveLocation;
  this.DisplayRoutePlanner = DisplayRoutePlanner;
  this.generateLocationsArray = generateLocationsArray;
  this.GenerateRoutes = GenerateRoutes;
  this.getRoutes = getRoutes;
  this.findShortest = findShortest;
};

function AddLocation(type, location) {
  switch(type) {
    case "start":
      this.routeStart = location;
      break;

    case "end":
      this.routeEnd = location;
      break;

    case "add":
    default:
      if (this.routeMid.length + 2 < this.maxLocations){
        this.routeMid.push(location);
      }
  };

  this.locations = this.generateLocationsArray();
  this.DisplayRoutePlanner(this.routeStart, this.routeMid, this.routeEnd);
};

function RemoveLocation(type, index) {
  switch(type) {
    case "start":
      this.routeStart = "";
      break;

    case "end":
      this.routeEnd = "";
      break;

    case "mid":
    default:
      this.routeMid.splice(index, 1);
  }
  this.locations = this.generateLocationsArray();
  this.DisplayRoutePlanner(this.routeStart, this.routeMid, this.routeEnd);
}

function generateLocationsArray() {
  var that = this;
  var locations = [that.routeStart].concat(that.routeMid, that.routeEnd);
  return locations;
}

function DisplayRoutePlanner(routeStart, routeMid, routeEnd, clickToZoom) {
  var that = this;
  var panelHTML = "";

  if (routeStart) panelHTML += generatePanelHTML(routeStart, 0, 'start');

  routeMid.forEach(function(location, index) {
    panelHTML += generatePanelHTML(location, index, 'mid');
  });

  if (routeEnd) panelHTML += generatePanelHTML(routeEnd, 0, 'end');

  $("#routePlanner").html(panelHTML);
};

function generatePanelHTML(location, index, type) {
  switch(type) {
    case "start":
      var panelClass = "panel-success";
      var panelTitle = "Start Location";
      break;

    case "end":
      var panelClass = "panel-warning";
      var panelTitle = "End Location";
      break;

    default:
      var panelClass = "panel-info";
      var panelTitle = "Location " + String.fromCharCode(65 + index);
  }

  var panelHeader = '<div class="panel-heading"><h3 class="panel-title">'+panelTitle+'<span class="glyphicon glyphicon-remove pull-right" onClick="removeSelected(\''+type+'\', '+index+')"></span></h3></div>';
  var panelBody = '<div class="panel-body panel-planner" onClick="zoomTo('+location.XY+')">'+location.NAME+'</div>';
  
  return panelHTML = '<div class="panel '+panelClass+'">'+panelHeader+panelBody+'</div>';
};

function GenerateRoutes() {
  homePageUI.Loading();
  var that = this;
  var len = that.locations.length;
  var routes = that.routes;

  var locations = that.locations;

  for (i=1; i<len-1; i++) {
    for (j=1; j<len-1; j++) {
      if (i!=j) {
        if (len>4) {
          for (k=1; k<len-1; k++) {
            if (k!=j && k!=i){
              var locations = [locations[0], locations[i], locations[j], locations[k], locations[len-1]];
              routes.push(new Route(locations));
            }
          }
        } else {
          var locations = [locations[0], locations[i], locations[j], locations[len-1]];
          routes.push(new Route(locations));
        }
      }
    }
  }
  that.getRoutes();
};

function getRoutes() {
  var that = this;
  var routeCount = 0;
  that.routes.forEach(function(route, index) {
    route.GetRoute(function() {
      routeCount++;
      if (routeCount >= that.routes.length) that.findShortest();
    });
  });
};

function findShortest() {
  var that = this;
  var shortestRoute = that.routes[0];
  that.routes.forEach(function(route, index) {
    var shortestTime = shortestRoute.routeResults.directions[0].summary.totalTime;
    var currentTime = route.routeResults.directions[0].summary.totalTime;
    if (shortestTime > currentTime) shortestRoute = route;
  });

  that.shortestRoute = shortestRoute;
  var locations = shortestRoute.locations;
  var len = locations.length;
  that.DisplayRoutePlanner(that.routeStart, locations.slice(1, len-1), that.routeEnd);

  resultsUI.DisplayResults();
};
