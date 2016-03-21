$( function () {
    var latlng = new google.maps.LatLng(33.592149, 130.394874); //Fukuoka, Japan
    var opts = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map($("#map")[0], opts);
});
