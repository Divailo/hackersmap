
var oxfordPosition = [];
var socket;

var _username = "Damyan"+ Math.random();
var user;
var pos;

var view;
var map;
var currentPoint;
var others = [];
var pointGraphic;
var markerSymbol;
var markerSymbol2;

$( document ).ready(function() {
  getLocation();
  initSocket();
  initMap();

  // Emit the current position
  user = { username:_username,
           latitude:oxfordPosition[1],
           longitude:oxfordPosition[0]
          }

  socket.emit('login', user);
  _username = user.username;
  setInterval(function() {
     socket.emit('update', { username:_username,
       latitude:oxfordPosition[1],
       longitude:oxfordPosition[0]
      });
  }, 1000);

});

// Initiate the socket
function initSocket(){
  socket = io();
  socket.on('loggedIn', function (currentUsersArray){
    console.log(currentUsersArray); 
    drawPoints(currentUsersArray);
  })

  //when the client receives event of a new message
  socket.on('new_message_received', function(newMessage){

    console.log('new message received');
    //display somewhere

  })
  
  // navigator.geolocation.getCurrentPosition(showPosition);
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
    map = new Map({
      basemap: "nothing"
    });

    view = new MapView({
      container: "viewDiv",  // Reference to the scene div created in step 5
      map: map,  // Reference to the map object created before the scene
      zoom: 20,  // Sets the zoom level based on level of detail (LOD)
      center: [parseFloat(oxfordPosition[0]), parseFloat(oxfordPosition[1])]  // Sets the center point of view in lon/lat
    });

    // Draw position of ourselves
    currentPoint = new Point({
      longitude: oxfordPosition[0],
      latitude:  oxfordPosition[1]
    });

    // Style for markering
    markerSymbol = new SimpleMarkerSymbol({
      color: [226, 239, 10],
      outline: { 
        color: [0, 0, 0],
        width: 1
      }
    });
    markerSymbol2 = new SimpleMarkerSymbol({
      color: [100, 239, 50],
      outline: { 
        color: [0, 0, 0],
        width: 1
      }});

    pointGraphic = new Graphic({
      geometry: currentPoint,
      symbol: markerSymbol
    });

    view.graphics.addMany([pointGraphic, currentPoint]);
    // Map thingy
    var featureLayer = new FeatureLayer({
      url: "http://services.arcgis.com/Qo2anKIAMzIEkIJB/arcgis/rest/services/OxfordHackCampusDraft1/FeatureServer/0"
    });

    map.add(featureLayer);
  });
}


function drawPoints(points) {
  
  require([
      "esri/geometry/Point",
      "esri/Graphic",
      "dojo/domReady!"
    ], function(Point,Graphic){

    for (var i = 0; i < points.length; i = i+1) {
      console.log("looping all day long")
      if(points[i].username === _username){}
      else{
        var newPoint = new Point({
        longitude: points[i].longitude ,
        latitude:  points[i].latitude
      });
        pointGraphic = new Graphic({
          geometry: newPoint,
          symbol: markerSymbol2
        });
        console.log(pointGraphic)
        view.graphics.addMany([pointGraphic, newPoint]); }
      }
    

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