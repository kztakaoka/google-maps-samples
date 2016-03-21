/* Google Maps Geocoder sample with closure */

var gMap;

$( function () {
    var latlng = new google.maps.LatLng(33.592149, 130.394874); //Fukuoka, Japan
    var opts = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    /* create a map object */
    gMap = new google.maps.Map($("#map")[0], opts);

    /* get customers list */
    var customers = getCustomers();

    /* geocode and add a marker for each customer */
    $(customers).each(function (ind, cust) {
        addMarkerByAddress(cust);
    });
});

/* geocode and add a marker */
function addMarkerByAddress(cust) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode(
        {
            'address': cust.address,
            'region': 'jp'
        },
        /* event handler on the location gotten */
        function (results, status){
            var latlng;

            if (status === google.maps.GeocoderStatus.OK) {
    	        latlng = results[0].geometry.location;
                addMarker(cust, latlng);
            }
        }
    );
}

/* add a marker */
function addMarker(cust, latlng) {
    var marker = new google.maps.Marker({position: latlng, title: cust.name, map: gMap});

    /* event handler on the marker clicked */
    google.maps.event.addListener(marker, "click",
        function() {
            /* I am a closure.
             * When I'm called, the parameter 'cust' (outside of myself) is 
             * still accessible??
             */
            alert(cust.name + "'s marker");
        }
    );
}

/* provide customer list */
function getCustomers() {
    return  [
        { name: 'Fukuokachuo Post Office', address: '〒810-0001 福岡県福岡市中央区天神４−３−１' },
        { name: 'Fukuoka City Hall', address: '〒810-8620 福岡県福岡市中央区中央区天神１丁目８−１' },
        { name: 'Bank of Japan Fukuoka Branch', address: '〒810-0001 福岡県福岡市中央区天神４−２−１' }
    ];
}
