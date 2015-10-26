function RouteController() {
  this.routes = [];
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
  this.DisplayRoutePlanner();
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
  this.DisplayRoutePlanner();
}

function generateLocationsArray() {
  var that = this;
  var locations = [that.routeStart].concat(that.routeMid, that.routeEnd);
  return locations;
}

function DisplayRoutePlanner() {
  var that = this;
  var panelHTML = "";

  if (that.routeStart) panelHTML += generatePanelHTML(that.routeStart, 0, 'start');

  that.routeMid.forEach(function(location, index) {
    panelHTML += generatePanelHTML(location, index, 'mid');
  });

  if (that.routeEnd) panelHTML += generatePanelHTML(that.routeEnd, 0, 'end');

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
  var panelBody = '<div class="panel-body">'+location.NAME+'</div>'
  return panelHTML = '<div class="panel '+panelClass+' plan-panel">'+panelHeader+panelBody+'</div>';
};
