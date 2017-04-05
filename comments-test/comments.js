$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    var header = document.getElementById('header-links');
    var admin = '<li><a href="#modalAdmin">ADMIN</li>';

    header.insertAdjacentHTML('beforeend',admin);

    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
      }
    );

  });

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB481srlKzeUsISRGwwMk15saZGxbvXa0w",
    authDomain: "community-db.firebaseapp.com",
    databaseURL: "https://community-db.firebaseio.com",
    projectId: "community-db",
    storageBucket: "community-db.appspot.com",
    messagingSenderId: "430372226547"
  };
  firebase.initializeApp(config);

document.querySelector('#adminSubmit').addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var email = document.querySelector('#adminEmail').value;
      var password = document.querySelector('#adminPassword').value
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
  });
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var header = document.getElementById('header-links');
    var dropdown = '<li id="download"><a class="dropdown-button" href="#" data-activates="dropdown1"><i class="material-icons white-text">get_app</i></a></li><ul id="dropdown1" class="dropdown-content"><li><a href="#!" onclick="downloadGeojson()">GeoJSON</a></li><li><a href="#!" onclick="downloadShp()">Shapefile</a></li></ul>';

    var adminFooter = document.getElementById('adminFooter');
    var logout = '<a id="adminLogout" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Sign Out</a>';

    header.insertAdjacentHTML('beforeend',dropdown);
    adminFooter.insertAdjacentHTML('beforeend',logout);

    document.querySelector('#adminLogout').addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          firebase.auth().signOut();
        });

    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
      }
    );
  } else {
    var header = document.getElementById('header-links');
    var adminFooter = document.getElementById('adminFooter');
    var download = document.getElementById('download');
    var logout = document.getElementById('adminLogout');

    header.removeChild(download);
    adminFooter.removeChild(logout);

    document.getElementById("adminForm").reset();

  }
});

mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
/* eslint-disable */
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot', //hosted style id
    center: [-105.1522,40.0452], // starting position
    zoom: 12 // starting zoom
});

var draw = new MapboxDraw({
    displayControlsDefault: false
});

map.addControl(draw);
map.addControl(new mapboxgl.GeolocateControl());

var firebaseGeojsonFeatures = [];

function firebaseData() { return firebase.database().ref('testing').once("value").then(function(snapshot) {
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
    filter: ["==", '$type', 'Point'],
    paint: {
      "circle-color":'blue',
      'circle-radius': 5,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#fff'
    }
  });

});

map.on('draw.create', function() {

  var card = document.getElementById('input-card');

  var form = '<div class="card-content white-text"><span class="card-title">Enter Your Comment</span><div class="row"><form class="col s12"><div class="input-field col s6"><input id="name" type="text" class="validate"><label for="name">Name</label></div><div class="input-field col s6"><input id="email" type="email" class="validate"><label for="email">Email</label></div><div class="input-field col s12"><textarea id="description" class="materialize-textarea"></textarea><label for="description">Message</label></div></form></div></div>';

  card.innerHTML = form;

  var action = document.createElement('div');
  action.className = 'card-action';
  action.id = 'cardAction';
  var actionA = document.createElement('a');
  actionA.className = 'btn';
  actionA.href = '#';
  actionA.text = 'Submit';
  var actionButton = action.insertAdjacentElement('beforeend', actionA);
  var cancelA = document.createElement('a');
  cancelA.className = 'btn red accent-2';
  cancelA.href = '#';
  cancelA.text = 'Cancel';
  var cancelButton = action.insertAdjacentElement('beforeend', cancelA);
  card.insertAdjacentElement('beforeend', action);

  actionButton.addEventListener('click', function(){

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var description = document.getElementById('description').value;

    var n = draw.getAll().features.length - 1;
    var id = draw.getAll().features[n].id;

    draw.setFeatureProperty(id,"name",name);
    draw.setFeatureProperty(id,"email",email);
    draw.setFeatureProperty(id,"description",description);

    firebase.database().ref('testing').push(draw.getAll().features[n]);

    draw
      .deleteAll()
      .getAll();

    var thanks = '<div class="card-content white-text"><span class="card-title">Place a Marker</span><span>Your comment has been received.</span></div><div id="action" class="card-action"><a class="waves-effect waves-cyan btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a></div>'

    card.innerHTML = thanks;

    var updateGeojsonFeatures = [];

    updateGeojsonFeatures.length = 0;

    firebaseData().then(function(result) {
      for (var key in result) {
      	var f = result[key];
        f.type = "Feature";
        updateGeojsonFeatures.push(f);
      }
    }).then(function(){
      var newData = {type: 'FeatureCollection',
             features: updateGeojsonFeatures
           };

      console.log(newData);

      map.getSource('firebase').setData(newData);
    });

  });

  cancelButton.addEventListener('click', function(){

    draw.deleteAll();
    draw.changeMode('simple_select');

    var card = document.getElementById('input-card');

    var reset = '<div class="card-content white-text"><span class="card-title">Place a Marker</span></div><div id="action" class="card-action"><a class="waves-effect waves-cyan btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a>';

    card.innerHTML = reset;

  });

});

function drawPoint(){
  draw.changeMode("draw_point");

  var action = document.getElementById('action');
  var cancel = '<a id="cancel" class="red accent-2 waves-effect waves-red btn white-text" onclick="simpleSelect()"> <i class="material-icons">cancel</i></a>';

  var cancelButton = document.getElementById('cancel');

  if (typeof(cancelButton) != 'undefined' && cancelButton != null) {
  return;
} else {
  action.insertAdjacentHTML('beforeend', cancel);
}

}

function simpleSelect(){
  draw.changeMode("simple_select");
  document.getElementById("cancel").remove();
}

function downloadShp(){
  var logJson = map.getSource('firebase')._data;
  var options = {
      folder: 'myshapes',
      types: {
          point: 'mypoints',
          polygon: 'mypolygons',
          line: 'mylines'
      }
  };

  shpwrite.download(logJson, options);
}

function downloadGeojson(){
  var logJson = map.getSource('firebase')._data;

  function download(filename, json) {
      var el = document.createElement('a'),
          text = JSON.stringify(json, null, 2);
      el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      el.setAttribute('download', filename);
      el.click();
  }

  download("file.geojson", logJson);
}

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
var popup = new mapboxgl.Popup()
var firePopupTouch = function (e) {
  var bbox = [[e.point.x - 2, e.point.y - 2], [e.point.x + 2, e.point.y + 2]];
  var features = map.queryRenderedFeatures(bbox, { layers: ['firebase'] });

  if (!features.length) {
    return;
  }

  var feature = features[0];

  if (firebase.auth().currentUser){
    var popupContent = '<span>Name: ' + feature.properties.name + '<br />Email: ' + feature.properties.email + '<br />' + feature.properties.description + '</span>';
  } else {
  var popupContent = feature.properties.description;
  }
        popup.remove();
        popup
            .setLngLat(e.lngLat)
            .setHTML(popupContent)
            .addTo(map);
    };

var firePopup = function (e) {
  var bbox = [[e.point.x - 2, e.point.y - 2], [e.point.x + 2, e.point.y + 2]];
  var features = map.queryRenderedFeatures(bbox, { layers: ['firebase'] });

  if (!features.length) {
      return;
  }

  var feature = features[0];

  if (firebase.auth().currentUser){
    var popupContent = '<span>Name: ' + feature.properties.name + '<br />Email: ' + feature.properties.email + '<br />' + feature.properties.description + '</span>';
  } else {
  var popupContent = feature.properties.description;
  }

        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(popupContent)
            .addTo(map);
    };

map.on('touchstart', firePopupTouch);

map.on('click', firePopup);

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['firebase'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

// disable map rotation using right click + drag
map.dragRotate.disable();

// disable map rotation using touch rotation gesture
map.touchZoomRotate.disableRotation();
