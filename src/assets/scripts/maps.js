let markers = [];
let map;
let map1;
let map2;
let markerCluster;
const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5"
      }
    ]
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5"
      }
    ]
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e"
      }
    ]
  }
];
const mapStyleBlue = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
];
const setMarker =
  process.env.NODE_ENV === 'development' ? "assets/images/icons/marker.svg" : "/local/templates/main/assets/images/icons/marker.svg" ;
const setBubble =
  process.env.NODE_ENV === 'development' ? "assets/images/icons/bubble.svg" : "/local/templates/main/assets/images/icons/bubble.svg" ;
const mcOptions = {
  styles: [
    {
      url: setMarker,
      width: 72,
      height: 72,
      fontFamily: "Roboto Mono",
      textSize: 18,
      textColor: "white"
    }
  ]
};
const infoWindow = new google.maps.InfoWindow();

function initMap() {
  const mapOptions = {
    center: new google.maps.LatLng(51.666120, 39.190655),
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    zoomControl: true,
    scrollwheel: false,
    styles: mapStyle
  };
  map = new google.maps.Map(document.getElementById("googleMaps"), mapOptions);


  let locations = [];

  let items = $('.map_list').html();
  items = items && items.split(';');

  items && items.forEach(function(item, i, arr) {
    let coord = item;
    coord = coord.split(',');
    coord['0'] = parseFloat(coord['0']);
    coord['1'] = parseFloat(coord['1']);

    locations[locations.length] = coord;
  });

  locations.forEach(function(item, i, arr) {
    markers[i] = new google.maps.Marker({
      position: new google.maps.LatLng(item[0], item[1]),
      icon: setBubble,
      map: map,
      id: i
    });
  });

  const getDataElem = $(".cityList__block-item");
  const content = [];

  for (let x=0; x < getDataElem.length; x++) {
    const title = getDataElem.eq(x).data("title");
    const name = getDataElem.eq(x).data("name");
    const phone = getDataElem.eq(x).data("phone");
    const mail = getDataElem.eq(x).data("mail");
    const adr = getDataElem.eq(x).data("adr");
    const time = getDataElem.eq(x).data("time");

    content.push(`<h6>${title}</h6> <p>${name} <br /> ${phone}  <br /> ${mail}  <br /> ${adr}  <br /> ${time}</p>`);
  }

  markerCluster = new MarkerClusterer(map, markers, mcOptions);

  for (let i = 0; i < markers.length; i++) {
    const marker = markers[i];

    google.maps.event.addListener(marker, 'click', (function() {
      return function() {
        infoWindow.setContent(content[i]);
        infoWindow.open(map, this);
      }
    })(marker));
  }


  $(document).on('change', 'input[name=map_center]', function(){
    var value = $(this).val();
    if (value) {
      value = value.split(',');
      value['0'] = parseFloat(value['0']);
      value['1'] = parseFloat(value['1']);
      map.setCenter({lat:value['0'], lng:value['1']});
      map.setZoom(10);
    }
  });
}
function initMap1() {
  const mapOptions = {
    center: new google.maps.LatLng(51.666120, 39.190655),
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    zoomControl: true,
    scrollwheel: false,
    styles: mapStyle
  };
  map2 = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

  let locations = [];

  var items = $('.map_list').html();
  items = items && items.split(';');

  items && items.forEach(function(item, i, arr) {
    var coord = item;
    coord = coord.split(',');
    coord['0'] = parseFloat(coord['0']);
    coord['1'] = parseFloat(coord['1']);

    locations[locations.length] = coord;
  });

  locations.forEach(function(item, i, arr) {
    markers[i] = new google.maps.Marker({
      position: new google.maps.LatLng(item[0], item[1]),
      icon: setBubble,
      map: map2,
      id: i
    });
  });

  markerCluster = new MarkerClusterer(map2, markers, mcOptions);

  $(document).on('change', 'input[name=map_center2]', function(){
    var value = $(this).val();
    if (value) {
      value = value.split(',');
      value['0'] = parseFloat(value['0']);
      value['1'] = parseFloat(value['1']);
      map2.setCenter({lat:value['0'], lng:value['1']});
      map2.setZoom(10);
    }
  });
}
function initMapBlue() {
  const mapOptions = {
    center: new google.maps.LatLng(59.91916157, 30.3251195),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    zoomControl: true,
    scrollwheel: false,
    styles: mapStyle
  };
  map2 = new google.maps.Map(document.getElementById("googleMapsBlue"), mapOptions);

  for (let i = 0; i < locations.length; i++) {
    markers[i] = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][0], locations[i][1]),
      icon: setBubble,
      map: map2,
      id: i
    });
  }

  markerCluster = new MarkerClusterer(map2, markers, mcOptions);
}

$(function(){
  if ($("#googleMaps").length) {
    initMap();
  }
  if ($("#googleMap").length) {
    initMap1();
  }
});
// $(document).ready($("#googleMapsBlue").length && initMapBlue);

$(document).ready(function() {
  $('.popup-modal').magnificPopup({
    type: 'inline',
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
    callbacks: {
      open: function() {
        //if($("#googleMapsBlue").length) initMapBlue();
        $('body').css('overflow', 'hidden');
      },
      close: function() {
        $('body').css('overflow', 'visible');
      }
    }
  });
});
