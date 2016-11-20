
var oxfordPosition = [];
var socket;

var username;
var user;
var pos;

$( document ).ready(function() {
  getLocation();
  initMap();
  initSocket();
});

// Initiate the socket
function initSocket(){
  socket = io();
  socket.on('loggedIn', function (currentUsersArray){

    console.log(currentUsersArray);
    // DO 
  })

  //when the client receives event of a new message
  socket.on('new_message_received', function(newMessage){

    console.log('new message received');
    //display somewhere

  })
  
  navigator.geolocation.getCurrentPosition(showPosition);
}

// Initiate the map
function initMap() {
  // Create the stupid thing
  require([
      "esri/Map",
      "esri/Graphic",
      "esri/views/MapView",
      "esri/geometry/Point",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/layers/FeatureLayer",
      "dojo/domReady!"
    ], function(Map, Graphic, MapView, Point, SimpleMarkerSymbol, FeatureLayer){



    // Init map and view
    var map = new Map({
      basemap: "nothing"
    });
    var view = new MapView({
      container: "viewDiv",  // Reference to the scene div created in step 5
      map: map,  // Reference to the map object created before the scene
      zoom: 20,  // Sets the zoom level based on level of detail (LOD)
      center: [parseFloat(oxfordPosition[0]), parseFloat(oxfordPosition[1])]  // Sets the center point of view in lon/lat
    });

    // Draw position of ourselves
    var point = new Point({
      longitude: oxfordPosition[0],
      latitude:  oxfordPosition[1]
    });

    // Style for markering
    var markerSymbol = new SimpleMarkerSymbol({
      color: [226, 239, 10],
      outline: { 
        color: [0, 0, 0],
        width: 1
      }
    });

    var pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol
    });

    view.graphics.addMany([pointGraphic, point]);

    // Map thingy
    var featureLayer = new FeatureLayer({
      url: "http://services.arcgis.com/Qo2anKIAMzIEkIJB/arcgis/rest/services/OxfordHackCampusDraft1/FeatureServer/0"
    });

    map.add(featureLayer);
  });
}

// Get the current position from GPS
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else { 
        alert("Geolocation is not supported.");
    }

    return oxfordPosition;
};

// Set the current position
function setPosition(position) { 
    console.log("current longitude: " + position.coords.longitude);
    console.log("current latitude : " + position.coords.latitude);
    oxfordPosition[0] = position.coords.longitude + 0.00005;
    oxfordPosition[1] = position.coords.latitude + 0.0003;
}