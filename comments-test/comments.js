$(document).ready(function(){
// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

// Add admin button to navbar
    var header = document.getElementById('header');
    var headerLinks = document.createElement('ul');
    headerLinks.id = 'header-links';
    headerLinks.className = 'right';
    var admin = '<li><a href="#modalAdmin">ADMIN</li>';

    header.insertAdjacentElement('beforeend',headerLinks);
    headerLinks.insertAdjacentHTML('beforeend',admin);

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

// Add listener for admin login
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

// Set states for Admin/anonymous
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

// add downloads for admin
    var header = document.getElementById('header-links');
    var dropdown = '<li id="download"><a class="dropdown-button" href="#" data-activates="dropdown1"><i class="material-icons white-text">get_app</i></a></li><ul id="dropdown1" class="dropdown-content"><li><a href="#!" onclick="downloadGeojson()">GeoJSON</a></li><li><a href="#!" onclick="downloadShp()">Shapefile</a></li></ul>';

// add logout to admin modal and disable login
    var submit = document.getElementById('adminSubmit');
    submit.className = 'disabled modal-action modal-close waves-effect waves-light btn cyan';
    var adminFooter = document.getElementById('adminFooter');
    var logout = '<a id="adminLogout" href="#!" class="modal-action modal-close waves-effect waves-cyan btn-flat">Sign Out</a>';

    // add edit tool to admin card
    var action = document.getElementById('action');
    var edit = '<a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a>';

    header.insertAdjacentHTML('beforeend',dropdown);
    adminFooter.insertAdjacentHTML('beforeend',logout);
    action.insertAdjacentHTML('beforeend',edit);

// add listener for admin logout
    document.querySelector('#adminLogout').addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          firebase.auth().signOut();
        });

// init dropdown
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

// remove admin tools
    var header = document.getElementById('header-links');
    var adminFooter = document.getElementById('adminFooter');
    var download = document.getElementById('download');
    var logout = document.getElementById('adminLogout');
    var action = document.getElementById('action');
    var edit = document.getElementById('adminEdit');

    if (typeof(download) != 'undefined' && download !== null) {
      var submit = document.getElementById('adminSubmit');
      submit.className = 'modal-action modal-close waves-effect waves-cyan btn-flat';
      header.removeChild(download);
      adminFooter.removeChild(logout);
      action.removeChild(edit);
    } else {
      return;
    }

    document.getElementById("adminForm").reset();

  }
});

mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';

// Init Map
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot', //hosted style id
    center: [-105.1522,40.0452], // starting position
    zoom: 12 // starting zoom
});

// Init Draw
var draw = new MapboxDraw({
    displayControlsDefault: false,
    userProperties: true
});

map.addControl(draw);

// optional geolocation
map.addControl(new mapboxgl.GeolocateControl());

//set blank geojson
var firebaseGeojsonFeatures = [];

var dataRef = firebase.database().ref('testing');

// call firebase database
function firebaseData() { return dataRef.once("value").then(function(snapshot) {
    var data = snapshot.val();
    return data;
  });
}

// iterate through each key, push to geojson
firebaseData().then(function(result) {
  for (var key in result) {
  	var f = result[key];
    f.type = "Feature";
    firebaseGeojsonFeatures.push(f);
  }
});

// map layers
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
  }, 'country-label-lg');

}); // end map layers

// actions on draw
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

// push last point drawn to firebase
  actionButton.addEventListener('click', function(){

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var description = document.getElementById('description').value;

    var n = draw.getAll().features.length - 1;
    var id = draw.getAll().features[n].id;

// set semantic data for point
    draw.setFeatureProperty(id,"name",name);
    draw.setFeatureProperty(id,"email",email);
    draw.setFeatureProperty(id,"description",description);

    dataRef.push(draw.getAll().features[n]);

// delete draw point from map
    draw
      .deleteAll()
      .getAll();

// set card content
  if (firebase.auth().currentUser) {
    var thanks = '<div class="card-content white-text"><span class="card-title">Place a Marker</span><span id="received">Your comment has been received.</span></div><div id="action" class="card-action"><a class="waves-effect waves-cyan btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>';
  } else {
    var thanks = '<div class="card-content white-text"><span class="card-title">Place a Marker</span><span id="received">Your comment has been received.</span></div><div id="action" class="card-action"><a class="waves-effect waves-cyan btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a></div>';
  }

    card.innerHTML = thanks;

    var received = document.getElementById('received');
    setTimeout(function() {
      $('#received').fadeOut();
    }, 3000);

// update point features in map
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

      map.getSource('firebase').setData(newData);
    });

  });

// cancel form/point submittal
  cancelButton.addEventListener('click', function(){

    draw.deleteAll();
    draw.changeMode('simple_select');

    var card = document.getElementById('input-card');

    if (firebase.auth().currentUser) {
      var reset = '<div class="card-content white-text"><span class="card-title">Place a Marker</span></div><div id="action" class="card-action"><a class="waves-effect waves-cyan btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>';
    } else {
      var reset = '<div class="card-content white-text"><span class="card-title">Place a Marker</span></div><div id="action" class="card-action"><a class="waves-effect waves-cyan btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a></div>';
    }

    card.innerHTML = reset;

  });

});

// start drawing with button click
function drawPoint(){
  draw.changeMode("draw_point");

  var action = document.getElementById('action');
  var cancel = '<a id="cancel" class="red accent-2 waves-effect waves-red btn white-text" onclick="simpleSelect()"> <i class="material-icons">cancel</i></a>';

  var cancelButton = document.getElementById('cancel');

  if (typeof(cancelButton) != 'undefined' && cancelButton !== null) {
  return;
} else {
  action.insertAdjacentHTML('beforeend', cancel);
}

}

// cancel drawing with button click
function simpleSelect(){
  draw.changeMode("simple_select");
  document.getElementById("cancel").remove();
}

// admin shapefile download
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

// admin geojson download
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

// admin edit function
function adminEdit() {
  var editButton = document.getElementById('adminEdit');
 // check if edit button is active
   if (editButton.className == 'deep-orange accent-1 waves-effect waves-deep-orange btn white-text') {
     // change edit to active
      editButton.className = 'deep-orange accent-3 waves-effect waves-deep-orange btn white-text';
     // add current data to draw dataset
      var logJson = map.getSource('firebase')._data;
      draw.set(logJson);
      draw.changeMode("simple_select");
      map.setLayoutProperty('firebase', 'visibility', 'none');

  } else {
    // set edit button to inactive and remove all draw features
      editButton.className = 'deep-orange accent-1 waves-effect waves-deep-orange btn white-text';
      draw.deleteAll();
      map.setLayoutProperty('firebase', 'visibility', 'visible');
  }

}

// on draw feature being selected
map.on('draw.selectionchange', function(){
  var visibility = map.getLayoutProperty('firebase', 'visibility');
  if ( firebase.auth().currentUser && visibility === 'visible' || draw.getSelected().features.length === 0) {
    console.log('.');
  } else {
    var editFeature = draw.getSelected().features[0];
    dataRef.orderByChild('id').equalTo(editFeature.id).once('value', function(snapshot) {
      snapshot.forEach(function(feature) {

        var featureKey = feature.key;
        var origName = feature.val().properties.name;
        var origEmail = feature.val().properties.email;
        var origDescription = feature.val().properties.description;
        var origResponse = feature.val().properties.response;
        var origNotes = feature.val().properties.notes;
        var card = document.getElementById('input-card');

        var form = '<div class="card-content white-text"><span class="card-title">Edit Feature</span><div class="row"><form class="col s12"><div class="input-field col s6"><input disabled id="name" type="text" class="validate" value="' + origName + '"><label for="name">Name</label></div><div class="input-field col s6"><input disabled id="email" type="email" class="validate" value="' + origEmail + '"><label for="email">Email</label></div><div class="input-field col s12"><textarea disabled id="description" class="materialize-textarea">' + origDescription + '</textarea><label for="description">Message</label></div><div class="input-field col s12"><textarea id="response" class="materialize-textarea">' + origResponse + '</textarea><label for="response">Response (public)</label></div><div class="input-field col s12"><textarea id="notes" class="materialize-textarea">' + origNotes + '</textarea><label for="notes">Notes (not public)</label></div></form></div></div>';

        card.innerHTML = form;
        Materialize.updateTextFields();

        var action = document.createElement('div');
        action.className = 'card-action';
        action.id = 'cardAction';
        var actionA = document.createElement('a');
        actionA.className = 'btn';
        actionA.href = '#';
        actionA.text = 'Update';
        var actionButton = action.insertAdjacentElement('beforeend', actionA);
        var cancelA = document.createElement('a');
        cancelA.className = 'btn red accent-2';
        cancelA.href = '#';
        cancelA.text = 'Cancel';
        var cancelButton = action.insertAdjacentElement('beforeend', cancelA);
        card.insertAdjacentElement('beforeend', action);
        var deleteA = document.createElement('a');
        deleteA.className = 'btn purple accent-2';
        deleteA.href = '#';
        deleteA.text = 'Delete';
        var deleteButton = action.insertAdjacentElement('beforeend', deleteA);

      // push response and notes to firebase
          actionButton.addEventListener('click', function(){

            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var description = document.getElementById('description').value;
            var response = document.getElementById('response').value;
            var notes = document.getElementById('notes').value;
            var id = draw.getSelected().features[0].id;

        // set semantic data for point
            draw.setFeatureProperty(id,"name",name);
            draw.setFeatureProperty(id,"email",email);
            draw.setFeatureProperty(id,"description",description);
            draw.setFeatureProperty(id,"response",response);
            draw.setFeatureProperty(id,"notes",notes);

            firebase.database().ref('testing/' + featureKey).update(draw.getSelected().features[0]);

            // delete draw point from map
                draw
                  .deleteAll()
                  .getAll();

            // set card content
                var thanks = '<div class="card-content white-text"><span class="card-title">Place a Marker</span><span id="received">The feature has been updated.</span></div><div id="action" class="card-action"><a class="waves-effect waves-cyan btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>'

                card.innerHTML = thanks;

                var received = document.getElementById('received');
                setTimeout(function() {
                  $('#received').fadeOut();
                }, 3000);

            // update point features in map
                var editGeojsonFeatures = [];

                editGeojsonFeatures.length = 0;

                firebaseData().then(function(result) {
                  for (var key in result) {
                  	var f = result[key];
                    f.type = "Feature";
                    editGeojsonFeatures.push(f);
                  }
                }).then(function(){
                  var newData = {type: 'FeatureCollection',
                         features: editGeojsonFeatures
                       };

                  map.getSource('firebase').setData(newData);
                });

                map.setLayoutProperty('firebase', 'visibility', 'visible');
        });



        // delete feature
          deleteButton.addEventListener('click', function(){

            firebase.database().ref('testing/' + featureKey).remove();

            // delete draw point from map
                draw
                  .deleteAll()
                  .getAll();

            // set card content
                var thanks = '<div class="card-content white-text"><span class="card-title">Place a Marker</span><span id="received">The feature has been deleted.</span></div><div id="action" class="card-action"><a class="waves-effect waves-cyan btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>'

                card.innerHTML = thanks;

                var received = document.getElementById('received');
                setTimeout(function() {
                  $('#received').fadeOut();
                }, 3000);

            // update point features in map
                var deleteGeojsonFeatures = [];

                deleteGeojsonFeatures.length = 0;

                firebaseData().then(function(result) {
                  for (var key in result) {
                  	var f = result[key];
                    f.type = "Feature";
                    deleteGeojsonFeatures.push(f);
                  }
                }).then(function(){
                  var newData = {type: 'FeatureCollection',
                         features: deleteGeojsonFeatures
                       };

                  map.getSource('firebase').setData(newData);
                });

                map.setLayoutProperty('firebase', 'visibility', 'visible');

          });

      // cancel form/point submittal
        cancelButton.addEventListener('click', function(){

          draw.deleteAll();
          map.setLayoutProperty('firebase', 'visibility', 'visible');
          draw.changeMode('simple_select');

          var card = document.getElementById('input-card');

          var reset = '<div class="card-content white-text"><span class="card-title">Place a Marker</span></div><div id="action" class="card-action"><a class="waves-effect waves-cyan btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>';

          card.innerHTML = reset;

        });
      });
    });
  }
}); // end of admin edit functions

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
var popup = new mapboxgl.Popup()

// touch workaround
var firePopupTouch = function (e) {
  var bbox = [[e.point.x - 2, e.point.y - 2], [e.point.x + 2, e.point.y + 2]];
  var features = map.queryRenderedFeatures(bbox, { layers: ['firebase'] });

  if (!features.length) {
    return;
  }

  var feature = features[0];

  var div = document.createElement('div');
  div.className = 'row';
  var col = document.createElement('div');
  col.className = "col s12";
  div.insertAdjacentElement('beforeend', col);
  var card = document.createElement('div');
  card.className = 'card blue-grey darken-2';
  col.insertAdjacentElement('beforeend', card);
  var content = document.createElement('div');
  content.className = 'card-content white-text';
  card.insertAdjacentElement('beforeend', content);

  var name = document.createElement('span');
  name.innerHTML = '<span class="popup-title">Name:</span> ' + feature.properties.name + '<br />';
  var email = document.createElement('span');
  email.innerHTML = '<span class="popup-title">Email:</span> ' + feature.properties.email + '<br />';
  var description = document.createElement('span');
  description.innerHTML = '<span class="popup-title">Description:</span> ' + feature.properties.description;
  var response = document.createElement('span');
  response.innerHTML = '<div class="divider"></div><span class="popup-title">Response:</span> ' + feature.properties.response + '<br />';
  var notes = document.createElement('span');
  notes.innerHTML = '<span class="popup-title">Notes:</span> ' + feature.properties.notes;

  if (firebase.auth().currentUser){

    content.insertAdjacentElement('beforeend', name);
    content.insertAdjacentElement('beforeend', email);
    content.insertAdjacentElement('beforeend', description);
    if (feature.properties.response != null) {
      content.insertAdjacentElement('beforeend', response);
      content.insertAdjacentElement('beforeend', notes);
    }

  } else {

    content.insertAdjacentElement('beforeend', description);
    if (feature.properties.response != null) {
      content.insertAdjacentElement('beforeend', response);
    }

  }
        popup.remove();
        popup
            .setLngLat(e.lngLat)
            .setDOMContent(div)
            .addTo(map);
    };

// popup function
var firePopup = function (e) {
  var bbox = [[e.point.x - 2, e.point.y - 2], [e.point.x + 2, e.point.y + 2]];
  var features = map.queryRenderedFeatures(bbox, { layers: ['firebase'] });

  if (!features.length) {
      return;
  }

  var feature = features[0];

  var div = document.createElement('div');
  div.className = 'row';
  var col = document.createElement('div');
  col.className = "col s12";
  div.insertAdjacentElement('beforeend', col);
  var card = document.createElement('div');
  card.className = 'card blue-grey darken-2';
  col.insertAdjacentElement('beforeend', card);
  var content = document.createElement('div');
  content.className = 'card-content white-text';
  card.insertAdjacentElement('beforeend', content);

  var name = document.createElement('span');
  name.innerHTML = '<span class="popup-title">Name:</span> ' + feature.properties.name + '<br />';
  var email = document.createElement('span');
  email.innerHTML = '<span class="popup-title">Email:</span> ' + feature.properties.email + '<br />';
  var description = document.createElement('span');
  description.innerHTML = '<span class="popup-title">Description:</span> ' + feature.properties.description;
  var response = document.createElement('span');
  response.innerHTML = '<div class="divider"></div><span class="popup-title">Response:</span> ' + feature.properties.response + '<br />';
  var notes = document.createElement('span');
  notes.innerHTML = '<span class="popup-title">Notes:</span> ' + feature.properties.notes;

  if (firebase.auth().currentUser){

    content.insertAdjacentElement('beforeend', name);
    content.insertAdjacentElement('beforeend', email);
    content.insertAdjacentElement('beforeend', description);
    if (feature.properties.response != null) {
      content.insertAdjacentElement('beforeend', response);
      content.insertAdjacentElement('beforeend', notes);
    }

  } else {

    content.insertAdjacentElement('beforeend', description);
    if (feature.properties.response != null) {
      content.insertAdjacentElement('beforeend', response);
    }

  }

        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setDOMContent(div)
            .addTo(map);
    };

// fire popup
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
