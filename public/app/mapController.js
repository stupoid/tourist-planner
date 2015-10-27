function MapController() {
  this.GetOneMap = GetOneMap;
  this.showLocation = showLocation;
  this.DrawRoute = DrawRoute;
};

function DrawRoute(routes) {
  var routeSymbol = new this.SimpleLineSymbol().setColor(new dojo.Color([0, 0, 255, 0.5])).setWidth(4);
  var mergedGeometry = new this.Polyline();
  mergedGeometry.addPath(routes.features[0].geometry.paths[0]);
  this.map.graphics.clear();
  this.map.graphics.add(new this.Graphic(mergedGeometry, routeSymbol));
};
