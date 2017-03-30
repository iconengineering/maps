// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB55UH6jEtG0ES42TM6tSzRbuYyNoLAAqs",
    authDomain: "bouldercrk-community.firebaseapp.com",
    databaseURL: "https://bouldercrk-community.firebaseio.com",
    storageBucket: "bouldercrk-community.appspot.com",
    messagingSenderId: "876598710803"
  };
  firebase.initializeApp(config);

mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
/* eslint-disable */
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/satellite-v9', //hosted style id
    center: [-105.1522,40.0452], // starting position
    zoom: 12 // starting zoom
});

var firebaseGeojsonFeatures = [];

function firebaseData() { return firebase.database().ref().once("value").then(function(snapshot) {
    var data = snapshot.val();
    return data;
  });
}

firebaseData().then(function(result) {
  for (var key in result) {
  	var f = result[key];
    f.type = "Feature";
    firebaseGeojsonFeatures.push(f);
  }
});

// draw.setFeatureProperty("6d595a13a1d9e7dc7d8d704c05e97b63","var","complaint")
// console.log(draw.getAll().features[0]);
// firebase.database().ref().push(draw.getAll());

map.on('load', function() {

	map.addSource('firebase', {
	type: 'geojson',
  data: {type: 'FeatureCollection',
  			 features: firebaseGeojsonFeatures
       }
	});

  map.addLayer({
    id: 'firebase',
    source: 'firebase',
    type: 'circle',
    paint: {
      "circle-color":'blue',
      'circle-radius': 5,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#fff'
    }
  })
})

var draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        point: true,
        trash: true
    }
});

map.addControl(draw);
map.addControl(new mapboxgl.GeolocateControl());

map.on('draw.create', function() {
  console.log("Draw!");
});
