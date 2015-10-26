function Route() {
    this.token = "";
    this.routeStops = "";
    this.routeMode = "DRIVE";
    this.avoidERP = 0;
    this.routeOption = "SHORTEST";
    this.barriers = "";
    this.routeResults = "";

    this.GetRoute = GetRoute;
};

function GetRoute() {
    var that = this;
    var params = {
      token: _OneMapGlobalToken,
      routeStops: that.routestops,
      routeMode: that.routeMode,
      avoidERP: that.avoidERP,
      routeOption: that.routeOption,
      barriers: that.barriers
    };

    var url = host + "API/services.svc/route/solve?" + $.param(params);

    $.getJSON(url + "&callback=?", function (data) {
      that.routeResults = data;
    });
};
