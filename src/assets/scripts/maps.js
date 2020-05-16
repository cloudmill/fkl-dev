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
const mcOptions = {
  styles: [
    {
      url: "assets/images/icons/marker.svg",
      width: 72,
      height: 72,
      fontFamily: "Roboto Mono",
      textSize: 18,
      textColor: "white"
    }
  ]
};
const locations = [
  [59.91701049, 30.31812429],
  [59.91916157, 30.3251195],
  [59.91756978, 30.31812429],
  [59.92049517, 30.33250093],
  [59.91701049, 30.3276515]
];
const locations1 = [
  [47.4820582, -52.9677822, 16],
  [-34.6156625, -58.5033376, 16],
  [40.1535005, 44.4185278, 16],
  [-35.2812958, 149.124822, 16],
  [48.220778, 16.3100208, 16]
];
const locations2 = [
  [40.3947021, 49.7849203, 16],
  [25.0326342, -77.4421124, 16],
  [26.2266541, 50.5715166, 16],
  [23.7807777, 90.3492863, 16],
  [13.1013529, -59.6140472, 16]
];
const locations3 = [
  [53.8840092, 27.5796488, 16],
  [50.8387874, 4.2933659, 16],
  [17.25488, -88.7825991, 16],
  [6.4959937, 2.6047896, 16],
  [27.4794738, 89.603376, 16]
];
const locations4 = [
  [-19.0205659, -65.2948115, 16],
  [43.8937798, 18.3479722, 16],
  [-24.6091349, 25.8604651, 16],
  [-15.7215857, -48.0073973, 16],
  [4.9062259, 114.903071, 16]
];
const locations5 = [
  [42.6389981, 23.2539075, 16],
  [12.3585737, -1.5718626, 16],
  [-3.3752144, 29.3203635, 16],
  [11.579524, 104.8201472, 16],
  [3.8304736, 11.4404136, 16]
];
const locations6 = [
  [45.2502975, -76.0804292, 16],
  [4.3783071, 18.5421798, 16],
  [-33.4533303, -70.6967031, 16],
  [39.9390628, 116.2573775, 16],
  [4.6484652, -74.1778466, 16]
];

function initMap() {
  const mapOptions = {
    center: new google.maps.LatLng(59.91916157, 30.3251195),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    zoomControl: true,
    scrollwheel: false,
    styles: mapStyle
  };
  map = new google.maps.Map(document.getElementById("googleMaps"), mapOptions);

  for (let i = 0; i < locations.length; i++) {
    markers[i] = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][0], locations[i][1]),
      icon: "assets/images/icons/bubble.svg",
      map: map,
      id: i
    });
  }

  markerCluster = new MarkerClusterer(map, markers, mcOptions);
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
      icon: "assets/images/icons/bubble.svg",
      map: map2,
      id: i
    });
  }

  markerCluster = new MarkerClusterer(map2, markers, mcOptions);
}
function initMap1() {
  const mapOptions = {
    center: new google.maps.LatLng(59.943422, 30.425995),
    zoom: 15,
    mapTypeControl: false,
    zoomControl: true,
    scrollwheel: false,
    styles: mapStyle
  };
  const mapElement = document.getElementById("googleMap");
  map1 = new google.maps.Map(mapElement, mapOptions);
  new google.maps.Marker({
    position: new google.maps.LatLng(59.943422, 30.425995),
    icon: "assets/images/icons/bubble.svg",
    map: map1,
    id: 999
  });
}

$(document).ready($("#googleMaps").length && initMap);
$(document).ready($("#googleMap").length && initMap1);
// $(document).ready($("#googleMapsBlue").length && initMapBlue);

$(document).ready(function() {

  $('.popup-modal').magnificPopup({
    type: 'inline',
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
    callbacks: {
      open: function() {
        if($("#googleMapsBlue").length) initMapBlue();
        $('body').css('overflow', 'hidden');
      },
      close: function() {
        $('body').css('overflow', 'visible');
      }
    }
  });
  function setSettingsToMap(item, map) {
    markerCluster.clearMarkers();
    const num_markers = item.length;
    for (let i = 0; i < num_markers; i++) {
      markers[i] = new google.maps.Marker({
        position: new google.maps.LatLng(item[i][0], item[i][1]),
        icon: "assets/images/icons/bubble.svg",
        map: map,
        id: i
      });
    }
    map.panTo(new google.maps.LatLng(item[0][0], item[0][1]));
    markerCluster.addMarkers(markers);
  }
  function setMarkers() {
    if (markers) {
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];
    }
  }


  $('#districts').on('change', function (e) {
    const data = this.value;
    setMarkers();

    if (data === "central") {
      setSettingsToMap(locations, map);
    }
    if (data === "northwest") {
      setSettingsToMap(locations1, map);
    }
    if (data === "south") {
      setSettingsToMap(locations2, map);
    }
    if (data === "volga") {
      setSettingsToMap(locations3, map);
    }
    if (data === "ural") {
      setSettingsToMap(locations4, map);
    }
    if (data === "siberia") {
      setSettingsToMap(locations5, map);
    }
    if (data === "east") {
      setSettingsToMap(locations6, map);
    }
  });

  $(".city").on("click", function() {
    const data = this.value;
    setMarkers();

    if (data === "central") {
      setSettingsToMap(locations, map2);
    }
    if (data === "northwest") {
      setSettingsToMap(locations1, map2);
    }
    if (data === "south") {
      setSettingsToMap(locations2, map2);
    }
    if (data === "volga") {
      setSettingsToMap(locations3, map2);
    }
    if (data === "ural") {
      setSettingsToMap(locations4, map2);
    }
    if (data === "siberia") {
      setSettingsToMap(locations5, map2);
    }
    if (data === "east") {
      setSettingsToMap(locations6, map2);
    }
  });


  // cityList
  $(".cityList--js").on("click", "a", function(e) {
    e.preventDefault();
    $(this)
      .closest(".cityList--js")
      .find("a")
      .removeClass("active");
    const getTitle = $(this).data("title");
    const getDesc = $(this).data("desc");
    const getStatus = $(this).data("status");
    const getPhone = $(this).data("phone");
    const getMail = $(this).data("mail");
    const getAddress = $(this).data("address");
    const getWork = $(this).data("work");
    const getMapX = $(this).data("mapx");
    const getMapY = $(this).data("mapy");
    $(this).addClass("active");

    $(".cityList-title").text(getTitle);
    $(".cityList-desc").text(getDesc);
    $(".cityList-status").text(getStatus);
    $(".cityList-phone").text(getPhone);
    $(".cityList-mail").text(getMail);
    $(".cityList-address").text(getAddress);
    $(".cityList-work").text(getWork);

    new google.maps.Marker({
      position: new google.maps.LatLng(getMapX, getMapY),
      icon: "assets/images/icons/bubble.svg",
      map: map1,
      id: 99
    });
    map1.panTo(new google.maps.LatLng(getMapX, getMapY));
  });
});
