function Route(locations) {
    this.token = "";
    this.routeMode = "DRIVE";
    this.avoidERP = 0;
    this.routeOption = "SHORTEST";
    this.barriers = "";
    this.routeResults = "";
    this.locations = locations;

    this.GetRoute = GetRoute;

    var coords = [];
    locations.forEach(function(location, index) {
      coords.push(location.XY);
    });
    this.routeStops = coords.join(';');
};

function GetRoute(callback) {
    var that = this;
    var params = {
      token: _OneMapGlobalToken,
      routeStops: that.routeStops,
      routeMode: that.routeMode,
      avoidERP: that.avoidERP,
      routeOption: that.routeOption,
      barriers: that.barriers
    };

    var url = host + "API/services.svc/route/solve?" + $.param(params);

    $.getJSON(url + "&callback=?", function (data) {
      that.routeResults = data;
      callback();
    });
};
