function ResultsUI() {
  this.DisplayResults = DisplayResults;
  this.showDirections = showDirections;
  this.generateDirectionsHTML = generateDirectionsHTML;
};

function DisplayResults() {
  mainUI.state = "result";
  $("#locations-body").hide();
  mapController.GetOneMap("map", "SM", { level: 2 });
  $("#results-body").show();
  $("#header").html("Results");
  $("#plannerHeader").html("Shortest Route");
  this.showDirections();
  mapController.DrawRoute(routeController.shortestRoute.routeResults.routes);
};

function showDirections() {
  var that = this;
  var directions = routeController.shortestRoute.routeResults.directions[0];
  var totalTime = directions.summary.totalTime.toFixed(2) + " min";
  var totalDist = directions.summary.totalLength.toFixed(3) + " km";
  var directionsHeader = '<h4>Total Time: '+totalTime+'</h4><h4>Total Distance: '+totalDist+'</h4><hr><h4>Driving Directions</h4><hr>';
  var directionsHTML = "";

  directions.features.forEach(function(direction, index) {
    directionsHTML += that.generateDirectionsHTML(direction.attributes.text, index);
  });
  $("#directions").html(directionsHeader + directionsHTML);
};

function generateDirectionsHTML(text, index) {
  var panelHeader = '<div class="panel-heading"><h3 class="panel-title">Step '+(index+1)+'</h3></div>';
  var panelBody = '<div class="panel-body">'+text+'</div>'
  return '<div class="panel panel-default">'+panelHeader+panelBody+'</div>';
}
