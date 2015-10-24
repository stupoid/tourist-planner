$(function() {
  $("#btn-plan").hide();
  $("#map").hide();
  $("#directions").hide();
});

function loading() {
  var loadingText = "Loading <span class='glyphicon glyphicon-refresh glyphicon-spin'></span>";
  $("#resultHeader").html(loadingText);
  $(".glyphicon-remove").hide();
  $("#btn-plan").attr("disabled", true);
}

function getTheme(themeName) {
    loading();
    mashup = new MashupData();
    mashup.themeName = themeName;
    mashup.GetMashupData(displayData);
    $("#results").show();
    $("#map").hide();
    $("#directions").hide();
    $(".glyphicon-remove").show();
    $("#btn-plan").attr("disabled", false);
}

var results;
var routeStart, routeEnd;
var routeMid = [];
var minLocations = 2;
var routeLocations;
var routes = [];
var response = 0;
var shortestRoute = [];
var OneMap;

function displayData(mashupResults) {
  results = mashupResults.results;
  var mediaHTML = "";
  $.each(mashupResults.results, function(index, location) {
    if (!location.PHOTOURL) {
      location.PHOTOURL = 'http://www.onemap.sg/API/Services.svc/getMap?token=qo/s2TnSUmfLz+32CvLC4RMVkzEFYjxqyti1KhByvEacEdMWBpCuSSQ+IFRT84QjGPBCuz/cBom8PfSm3GjEsGc8PkdEEOEr&bmap=SM&size=140,140&center='+location.XY+'&level=4&points='+location.XY;
    }
    var mediaLeft = '<div class="media-left"><a href="'+location.HYPERLINK+'" target="_blank"><img class="media-object location-img" src="'+location.PHOTOURL+'" alt="'+location.NAME+'"></a></div>';
    var buttons = '<div><div class="btn-group btn-group"><button class="btn btn-success" name="start" onClick="addLocation(this.name, '+index+')">Start</button><button class="btn btn-primary" name="add" onClick="addLocation(this.name, '+index+')">Add</button><button class="btn btn-warning" name="end" onClick="addLocation(this.name, '+index+')">End</button></div></div>';
    var address = '<p>'+location.ADDRESSSTREETNAME + ' Singapore ' + location.ADDRESSPOSTALCODE+'</p>';
    if (location.DESCRIPTION) {
      location.DESCRIPTION = location.DESCRIPTION.replace(/\?/g, "'"); // replace text ? with ' as some of it is formatted like that
      var mediaBody = '<div class="media-body"><h4 class="media-heading">'+location.NAME+'</h4>'+location.DESCRIPTION+address+buttons+'</div>';
    } else {
      var mediaBody = '<div class="media-body"><h4 class="media-heading">'+location.NAME+'</h4>'+address+buttons+'</div>';
    }

    mediaHTML += '<div class="media">'+mediaLeft+mediaBody+'</div>';

  });
  $("#results").html(mediaHTML);
  var headerText = mashupResults.theme.charAt(0).toUpperCase() + mashupResults.theme.substr(1).toLowerCase();
  $("#resultHeader").html(headerText);
}

function addLocation(type, index) {
  switch(type) {
    case "start":
      routeStart = results[index];
      displaySelected();
      break;

    case "end":
      routeEnd = results[index];
      displaySelected();
      break;

    case "add":
    default:
      routeMid.push(results[index]);
      displaySelected();
  }
}

function removeLocation(type, index) {
  switch(type) {
    case "start":
      routeStart = "";
      displaySelected();
      break;

    case "end":
      routeEnd = "";
      displaySelected();
      break;

    case "add":
    default:
      routeMid.splice(index, 1);
      displaySelected();
  }
}

function displaySelected() {
  var panelHeader, panelBody, panelHTML;
  var panelLoop = '';

  resetPlanner();

  if (routeStart) {
    panelHeader = '<div class="panel-heading"><h3 class="panel-title">Start Location<span class="glyphicon glyphicon-remove pull-right" onClick="removeLocation(\'start\', 0)"></span></h3></div>';
    panelBody = '<div class="panel-body">'+routeStart.NAME+'</div>'
    panelHTML = '<div class="panel panel-success plan-panel" onclick="zoomTo('+routeStart.XY+')">'+panelHeader+panelBody+'</div>';
    $("#routeStart").html(panelHTML);
  }

  if (routeMid.length > 0) {
    $.each(routeMid, function(index, location) {
      if (location) {
        panelHeader = '<div class="panel-heading"><h3 class="panel-title">Location '+String.fromCharCode(65 + index)+'<span class="glyphicon glyphicon-remove pull-right" onClick="removeLocation(\'mid\', '+index+')"></span></h3></div>';
        panelBody = '<div class="panel-body">'+location.NAME+'</div>'
        panelHTML = '<div class="panel panel-info plan-panel">'+panelHeader+panelBody+'</div>';
        panelLoop += panelHTML;
      }
    });
    $("#routeMid").html(panelLoop);
  }

  if (routeEnd) {
    panelHeader = '<div class="panel-heading"><h3 class="panel-title">End Location<span class="glyphicon glyphicon-remove pull-right" onClick="removeLocation(\'end\', 0)"></span></h3></div>';
    panelBody = '<div class="panel-body">'+routeEnd.NAME+'</div>'
    panelHTML = '<div class="panel panel-warning plan-panel" onclick="zoomTo('+routeEnd.XY+')">'+panelHeader+panelBody+'</div>';
    $("#routeEnd").html(panelHTML);
  }

  if (routeStart && routeEnd && routeMid.length >= minLocations) {
    $("#btn-plan").show();
    $("#btn-plan").attr("disabled", false);
    routeLocations = routeMid.slice();
    routeLocations.unshift(routeStart);
    routeLocations.push(routeEnd);
  }
}

function resetPlanner() {
  routeLocations = [];
  $("#routeStart").html('');
  $("#routeMid").html('');
  $("#routeEnd").html('');
  $("#btn-plan").hide();
}

function generateRoutes() {
  loading();
  $("#results").html('');
  routes = [];
  var len = routeLocations.length;

  for (i=1; i<len-1; i++) {
		for (j=1; j<len-1; j++) {
			if (i!=j) {
				if (len>4) {
					for (k=1; k<len-1; k++) {
						if (k!=j && k!=i){
              var route = [routeLocations[0], routeLocations[i], routeLocations[j], routeLocations[k], routeLocations[len-1]];
              var coord = [routeLocations[0].XY, routeLocations[i].XY, routeLocations[j].XY, routeLocations[k].XY, routeLocations[len-1].XY];
              route.routeData
              route.routeData = new Route;
              route.routeData.routeStops = coord.join(';');
              route.routeData.routeMode= "DRIVE"
              route.routeData.avoidERP = 0;
              routes.push(route);
						}
					}
				} else {
          var route = [routeLocations[0], routeLocations[i], routeLocations[j], routeLocations[len-1]];
          var coord = [routeLocations[0].XY, routeLocations[i].XY, routeLocations[j].XY, routeLocations[len-1].XY];
          route.routeData = new Route;
          route.routeData.routeStops = coord.join(';');
          route.routeData.routeMode= "DRIVE"
          route.routeData.avoidERP = 0;
					routes.push(route);
				}
			}
		}
	}

  $.each(routes, function(index, route) {
    route.routeData.GetRoute(getRouteData);
  });

}

function getRouteData(routeResults) {
  console.log(response+"/"+(routes.length-1)+" responses received");
  if (routeResults.results == "No results") {
    console.log("No Route found, please try other location.");
    return;
  }

  routes[response].results = routeResults.results;
  response++;
  if (response >= routes.length) {
    headerText = "Results";
    $("#resultHeader").html(headerText);
    console.log('all responses received');
    findShortest();
  }
}

function findShortest() {
  var shortestIndex = 0;
  $.each(routes, function(index, route) {
    var shortestTime = routes[shortestIndex].results.directions[0].summary.totalTime;
    var currentTime = route.results.directions[0].summary.totalTime;
    if (shortestTime > currentTime) shortestIndex = index;
  });
  shortestRoute = routes.slice(shortestIndex, shortestIndex+1)[0];
  displayResults();
}

function displayResults() {
  $("#plannerHeader").html("Shortest Route");
  var routeMid = shortestRoute.slice(1,shortestRoute.length-1);

  var panelLoop = "";
  $.each(routeMid, function(index, location) {
    if (location) {
      panelHeader = '<div class="panel-heading"><h3 class="panel-title">Location '+String.fromCharCode(65 + index)+'<span class="glyphicon glyphicon-remove pull-right" onClick="removeLocation(\'mid\', '+index+')"></span></h3></div>';
      panelBody = '<div class="panel-body">'+location.NAME+'</div>'
      panelHTML = '<div class="panel panel-info plan-panel" onclick="zoomTo('+location.XY+')">'+panelHeader+panelBody+'</div>';
      panelLoop += panelHTML;
    }
  });
  $("#routeMid").html(panelLoop);

  $(".glyphicon-remove").hide();
  $("#btn-plan").hide();
  showMap();
  showResultDetails();
}

function showResultDetails() {
  var totalTime = '<h4>Total Time: '+shortestRoute.results.directions[0].summary.totalTime.toFixed(2)+' min</h4>';
  var totalDist = '<h4>Total Distance: '+shortestRoute.results.directions[0].summary.totalLength.toFixed(3)+' km</h4>';
  var directionsHeader = '<hr><h4>Driving Directions</h4><hr>';

  var directions = directions = shortestRoute.results.directions[0];
  console.log(directions);
  var directionsHTML = "";
  for (i=0; i<directions.features.length; i++) {
    var feature = directions.features[i];
    var panelHeader = '<div class="panel-heading"><h3 class="panel-title">Step '+(i+1)+'</h3></div>';
    var panelBody = '<div class="panel-body">'+feature.attributes.text+'</div>'
    var panelHTML = '<div class="panel panel-default">'+panelHeader+panelBody+'</div>';
    directionsHTML += panelHTML;
  };

  var detailsHTML = totalTime + totalDist + directionsHeader + directionsHTML;

  $("#directions").html(detailsHTML);
}

function showMap() {
  $("#results").hide();
  $("#map").show();
  $("#directions").show();

  OneMap = new GetOneMap("map", "SM", { level: 2 });
  console.log(OneMap);

  var routeSymbol = new OneMap.SimpleLineSymbol().setColor(new dojo.Color([0, 0, 255, 0.5])).setWidth(4);
  var mergedGeometry = new OneMap.Polyline();
  mergedGeometry.addPath(shortestRoute.results.routes.features[0].geometry.paths[0]);
  OneMap.map.graphics.clear();
  OneMap.map.graphics.add(new OneMap.Graphic(mergedGeometry, routeSymbol));
}

function zoomTo(x, y) {
  OneMap.showLocation(x,y);
}
