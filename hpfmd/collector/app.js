$(document).ready(function(){
// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    document.querySelector('nav').className = 'grey darken-3';

// Add admin button to navbar
    var header = document.getElementById('header');
    var headerLinks = document.createElement('ul');
    headerLinks.id = 'header-links';
    headerLinks.className = 'right';
    var admin = '<li><a id="navAdmin" href="#modalAdmin">ADMIN</li>';

    header.insertAdjacentElement('beforeend',headerLinks);
    headerLinks.insertAdjacentHTML('beforeend',admin);

});

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC1ucfyNAcYHPpLjtxul6NPMu5JEI2TiR4",
    authDomain: "iconeng-2cbda.firebaseapp.com",
    databaseURL: "https://iconeng-2cbda.firebaseio.com",
    projectId: "iconeng-2cbda",
    storageBucket: "iconeng-2cbda.appspot.com",
    messagingSenderId: "328083825507"
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
      Materialize.toast('Login failed. ' + error.message, 4000);
  });
});

// reset password
var auth = firebase.auth();
document.querySelector('#reset').addEventListener('click', function(e) {
  var emailAddress = document.getElementById('resetEmail').value;
  auth.sendPasswordResetEmail(emailAddress).then(function() {
  Materialize.toast('An email has been sent to ' + emailAddress, 4000);
  console.log('sent');
}, function(error) {
  Materialize.toast('Something went wrong. Please contact the admin.', 4000);
});
});

// Set states for Admin/anonymous
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    var thisUser = firebase.auth().currentUser;

    // check for display name
    if (thisUser.displayName == null) {
      var email = thisUser.email;
      var username = email.split('@')[0];
      thisUser.updateProfile({
        displayName: username
      }).then(function() {
        // Update successful.
      }, function(error) {
        // An error happened.
      }).then( function() {
        var navAdmin = document.getElementById('navAdmin');
        navAdmin.innerText = 'Hello, ' + firebase.auth().currentUser.displayName;
        callData();

      });
    } else {
      var navAdmin = document.getElementById('navAdmin');
      navAdmin.innerText = 'Hello, ' + firebase.auth().currentUser.displayName;
      callData();
    }

// add downloads for admin
    var header = document.getElementById('header-links');
    var dropdown = '<li id="download"><a class="dropdown-button" href="#" data-activates="dropdown1"><i class="material-icons white-text">get_app</i></a></li><ul id="dropdown1" class="dropdown-content"><li><a href="#!" onclick="downloadGeojson()">GeoJSON</a></li><li><a href="#!" onclick="downloadShp()">Shapefile</a></li></ul>';

    header.insertAdjacentHTML('beforeend',dropdown);

// add logout to admin modal and disable login
    var submit = document.getElementById('adminSubmit');
    submit.className = 'disabled modal-action modal-close waves-effect waves-light btn blue';
    var adminFooter = document.getElementById('adminFooter');
    var logout = '<a id="adminLogout" href="#!" class="modal-action modal-close waves-effect waves-blue btn-flat">Sign Out</a>';

    adminFooter.insertAdjacentHTML('beforeend',logout);

    // make buttons active for authorized users
    var displayName = firebase.auth().currentUser.displayName;
    var ref = firebase.database().ref("datacollector/users/" + displayName + "/hpfmd/write");
        ref.once("value")
          .then(function(snapshot) {
            var val = snapshot.val(); // "ada"
          if (val === true) {
    var adminPoint = document.getElementById('adminPoint');
    adminPoint.className = 'waves-effect waves-blue btn blue white-text';
    var adminLine = document.getElementById('adminLine');
    adminLine.className = 'waves-effect waves-blue btn blue white-text';
    var adminPoly = document.getElementById('adminPolygon');
    adminPoly.className = 'waves-effect waves-blue btn blue white-text';
    var adminEdit = document.getElementById('adminEdit');
    adminEdit.className = 'deep-orange accent-1 waves-effect waves-deep-orange btn white-text';
    }
  });
// add listener for admin logout
    document.querySelector('#adminLogout').addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          firebase.auth().signOut();

           map.getSource('firebase').setData({
                 "type": "FeatureCollection",
                 "features": []
               });

          // make buttons disabled
          var adminPoint = document.getElementById('adminPoint');
          adminPoint.className = 'disabled waves-effect waves-blue btn blue white-text';
          var adminLine = document.getElementById('adminLine');
          adminLine.className = 'disabled waves-effect waves-blue btn blue white-text';
          var adminPoly = document.getElementById('adminPolygon');
          adminPoly.className = 'disabled waves-effect waves-blue btn blue white-text';
          var adminEdit = document.getElementById('adminEdit');
          adminEdit.className = 'disabled deep-orange accent-1 waves-effect waves-deep-orange btn white-text';

          var navAdmin = document.getElementById('navAdmin');
          navAdmin.innerText = 'ADMIN';
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

    if (typeof(download) != 'undefined' && download !== null) {
      var submit = document.getElementById('adminSubmit');
      submit.className = 'modal-action modal-close waves-effect waves-blue btn-flat';
      header.removeChild(download);
      adminFooter.removeChild(logout);
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
    center: [-104.717272818, 39.446576941], // starting position
    zoom: 12 // starting zoom
});

// Init Draw
var draw = new MapboxDraw({
    displayControlsDefault: false,
    userProperties: false
});

map.addControl(draw);

// optional geolocation
map.addControl(new mapboxgl.GeolocateControl());

//set blank geojson
var firebaseGeojsonFeatures = [];

var dataRef = firebase.database().ref('datacollector/hpfmd');

// call firebase database
function callData() {dataRef.on("value", function(snapshot) {
  firebaseGeojsonFeatures.length = 0;
    snapshot.forEach(function(feature) {
  	var f = feature.val();
    f.type = "Feature";
    firebaseGeojsonFeatures.push(f);
  });
  var newData = {type: 'FeatureCollection',
         features: firebaseGeojsonFeatures
       };
if (typeof(map.getSource('firebase')) != 'undefined'){
  map.getSource('firebase').setData(newData);
}
});
}

// map layers
map.on('load', function() {

	map.addSource('firebase', {
	type: 'geojson',
  data: {type: 'FeatureCollection',
         features: firebaseGeojsonFeatures
       }
	});

  callData();

  map.addLayer({
    id: 'firebasePoly',
    source: 'firebase',
    type: 'fill',
    filter: ["==", '$type', 'Polygon'],
    paint: {
        "fill-color": "blue",
        "fill-opacity": .4,

    }
  }, 'country-label-lg');

  map.addLayer({
    id: 'firebaseLine',
    source: 'firebase',
    type: 'line',
    filter: ["==", '$type', 'LineString'],
    layout: {
        "line-join": "round",
        "line-cap": "round"
    },
    paint: {
        "line-color": "blue",
        "line-width": 2
    }
  }, 'country-label-lg');

  map.addLayer({
    id: 'firebasePoint',
    source: 'firebase',
    type: 'circle',
    filter: ["==", '$type', 'Point'],
    paint: {
      "circle-color":{
        "property": "condition",
        "stops": [
          [1, 'red'],
          [5, 'blue']
        ]
      },
      'circle-radius': {
        "property": "condition",
        "stops": [
          [1, 5],
          [5, 3]
        ]
      },
      'circle-stroke-width': {
        "property": "condition",
        "stops": [
          [1, 2],
          [5, 1]
        ]
      },
      'circle-stroke-color': '#fff'
    }
  }, 'country-label-lg');

}); // end map layers

// actions on draw
map.on('draw.create', function() {

  var card = document.getElementById('input-card');

  var form = '<div class="card-content white-text"><span class="card-title">Enter Your Comment</span><div class="row"><form class="col s12"><div class="input-field col s12"><textarea id="description" class="materialize-textarea"></textarea><label for="description">Description</label></div></form></div></div>';

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

    var user = firebase.auth().currentUser.displayName;
    var description = document.getElementById('description').value;
    var timestamp = firebase.database.ServerValue.TIMESTAMP;

    var n = draw.getAll().features.length - 1;
    var id = draw.getAll().features[n].id;

// set semantic data for point
    draw.setFeatureProperty(id,"createdBy",user);
    draw.setFeatureProperty(id,"createdOn",timestamp);
    draw.setFeatureProperty(id,"description",description);

    dataRef.push(draw.getAll().features[n]);

// delete draw point from map
    draw
      .deleteAll()
      .getAll();

// set card content
    var thanks = '<div class="card-content white-text"><span class="card-title">Draw a Feature</span><span id="received">The feature has been submitted.</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminLine" class="waves-effect waves-blue btn white-text" onclick="drawLine()"><i class="material-icons">show_chart</i></a><a id="adminPolygon" class="waves-effect waves-blue btn white-text" onclick="drawPoly()"><i class="material-icons">layers</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>';

    card.innerHTML = thanks;

    var received = document.getElementById('received');
    setTimeout(function() {
      $('#received').fadeOut();
    }, 3000);

// update point features in map
//    updateFeatures();

  });

// cancel form/point submittal
  cancelButton.addEventListener('click', function(){

    draw.deleteAll();
    draw.changeMode('simple_select');

    var card = document.getElementById('input-card');
      var reset = '<div class="card-content white-text"><span class="card-title">Draw a Feature</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminLine" class="waves-effect waves-blue btn white-text" onclick="drawLine()"><i class="material-icons">show_chart</i></a><a id="adminPolygon" class="waves-effect waves-blue btn white-text" onclick="drawPoly()"><i class="material-icons">layers</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>';

    card.innerHTML = reset;

  });

});

function updateFeatures() {
  // update point features in map
      var firebaseGeojsonFeatures = [];
      firebaseGeojsonFeatures.length = 0;

      firebaseData().then(function(result) {
        for (var key in result) {
        	var f = result[key];
          f.type = "Feature";
          firebaseGeojsonFeatures.push(f);
        }
      }).then(function(){
        var newData = {type: 'FeatureCollection',
               features: firebaseGeojsonFeatures
             };

        map.getSource('firebase').setData(newData);
      });
}

function clearFeatures() {
  // update point features in map
      var clearGeojsonFeatures = [];
        var clearData = {type: 'FeatureCollection',
               features: firebaseGeojsonFeatures
             };

        map.getSource('firebase').setData(clearData);
}

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

// start drawing with button click
function drawLine(){
  draw.changeMode("draw_line_string");

  var action = document.getElementById('action');
  var cancel = '<a id="cancel" class="red accent-2 waves-effect waves-red btn white-text" onclick="simpleSelect()"> <i class="material-icons">cancel</i></a>';

  var cancelButton = document.getElementById('cancel');

  if (typeof(cancelButton) != 'undefined' && cancelButton !== null) {
  return;
} else {
  action.insertAdjacentHTML('beforeend', cancel);
}

}

// start drawing with button click
function drawPoly(){
  draw.changeMode("draw_polygon");

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
      map.setLayoutProperty('firebasePoint', 'visibility', 'none');
      map.setLayoutProperty('firebaseLine', 'visibility', 'none');
      map.setLayoutProperty('firebasePoly', 'visibility', 'none');

  } else {
    // set edit button to inactive and remove all draw features
      editButton.className = 'deep-orange accent-1 waves-effect waves-deep-orange btn white-text';
      draw.deleteAll();
      map.setLayoutProperty('firebasePoint', 'visibility', 'visible');
      map.setLayoutProperty('firebaseLine', 'visibility', 'visible');
      map.setLayoutProperty('firebasePoly', 'visibility', 'visible');
  }

}

// on draw feature being selected
map.on('draw.selectionchange', function(){
  var visibility = map.getLayoutProperty('firebasePoint', 'visibility');
  if ( firebase.auth().currentUser && visibility != 'visible' && draw.getSelected().features.length !== 0) {
    var editFeature = draw.getSelected().features[0];
    dataRef.orderByChild('id').equalTo(editFeature.id).once('value', function(snapshot) {
      snapshot.forEach(function(feature) {

        var featureKey = feature.key;
        var createdBy = feature.val().properties.createdBy;
        var createdOn = moment(feature.val().properties.createdOn).format("ddd, MMM D YYYY, h:mm:ss a");
        var editedBy = feature.val().properties.editedBy;
        var editedOn = moment(feature.val().properties.editedOn).format("ddd, MMM D YYYY, h:mm:ss a");
        var origDescription = feature.val().properties.description;
        var origNotes = feature.val().properties.notes;
        var card = document.getElementById('input-card');

        var form = '<div class="card-content white-text"><span class="card-title">Edit Feature</span><div class="row"><form class="col s12"><div class="input-field col s6"><input disabled id="createdBy" type="text" class="validate" value="' + createdBy + '"><label for="createdBy">Created By</label></div><div class="input-field col s6"><input disabled id="createdOn" type="text" class="validate" value="' + createdOn + '"><label for="createdOn">Created On</label></div><div class="input-field col s6"><input disabled id="editedBy" type="text" class="validate" value="' + editedBy + '"><label for="editedBy">Edited By</label></div><div class="input-field col s6"><input disabled id="editedOn" type="text" class="validate" value="' + editedOn + '"><label for="editedOn">Edited On</label></div><div class="input-field col s12"><textarea id="description" class="materialize-textarea">' + origDescription + '</textarea><label for="description">Description</label></div><div class="input-field col s12"><textarea id="notes" class="materialize-textarea">' + origNotes + '</textarea><label for="notes">Notes (not public)</label></div></form></div></div>';

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

            var createdBy = document.getElementById('createdBy').value;
            var createdOn = feature.val().properties.createdOn;
            var editedBy = firebase.auth().currentUser.displayName;
            var editedOn = firebase.database.ServerValue.TIMESTAMP;
            var description = document.getElementById('description').value;
            var notes = document.getElementById('notes').value;
            var id = draw.getSelected().features[0].id;

        // set semantic data for point
            draw.setFeatureProperty(id,"createdBy",createdBy);
            draw.setFeatureProperty(id,"createdOn",createdOn);
            draw.setFeatureProperty(id,"editedBy",editedBy);
            draw.setFeatureProperty(id,"editedOn",editedOn);
            draw.setFeatureProperty(id,"description",description);
            draw.setFeatureProperty(id,"notes",notes);

            firebase.database().ref('datacollector/hpfmd/' + featureKey).update(draw.getSelected().features[0]);

            // delete draw point from map
                draw
                  .deleteAll()
                  .getAll();

            // set card content
                var thanks = '<div class="card-content white-text"><span class="card-title">Draw a Feature</span><span id="received">The feature has been updated.</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminLine" class="waves-effect waves-blue btn white-text" onclick="drawLine()"><i class="material-icons">show_chart</i></a><a id="adminPolygon" class="waves-effect waves-blue btn white-text" onclick="drawPoly()"><i class="material-icons">layers</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>'

                card.innerHTML = thanks;

                var received = document.getElementById('received');
                setTimeout(function() {
                  $('#received').fadeOut();
                }, 3000);

            // update point features in map
            //    updateFeatures();

                map.setLayoutProperty('firebasePoint', 'visibility', 'visible');
                map.setLayoutProperty('firebaseLine', 'visibility', 'visible');
                map.setLayoutProperty('firebasePoly', 'visibility', 'visible');
        });



        // delete feature
          deleteButton.addEventListener('click', function(){

            firebase.database().ref('datacollector/hpfmd/' + featureKey).remove();

            // delete draw point from map
                draw
                  .deleteAll()
                  .getAll();

            // set card content
                var thanks = '<div class="card-content white-text"><span class="card-title">Draw a Feature</span><span id="received">The feature has been deleted.</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminLine" class="waves-effect waves-blue btn white-text" onclick="drawLine()"><i class="material-icons">show_chart</i></a><a id="adminPolygon" class="waves-effect waves-blue btn white-text" onclick="drawPoly()"><i class="material-icons">layers</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>'

                card.innerHTML = thanks;

                var received = document.getElementById('received');
                setTimeout(function() {
                  $('#received').fadeOut();
                }, 3000);

            // update point features in map
            //    updateFeatures();

                map.setLayoutProperty('firebasePoint', 'visibility', 'visible');
                map.setLayoutProperty('firebaseLine', 'visibility', 'visible');
                map.setLayoutProperty('firebasePoly', 'visibility', 'visible');

          });

      // cancel form/point submittal
        cancelButton.addEventListener('click', function(){

          draw.deleteAll();
          map.setLayoutProperty('firebasePoint', 'visibility', 'visible');
          map.setLayoutProperty('firebaseLine', 'visibility', 'visible');
          map.setLayoutProperty('firebasePoly', 'visibility', 'visible');
          draw.changeMode('simple_select');

          var card = document.getElementById('input-card');

          var reset = '<div class="card-content white-text"><span class="card-title">Draw a Feature</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminLine" class="waves-effect waves-blue btn white-text" onclick="drawLine()"><i class="material-icons">show_chart</i></a><a id="adminPolygon" class="waves-effect waves-blue btn white-text" onclick="drawPoly()"><i class="material-icons">layers</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>';

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
  var features = map.queryRenderedFeatures(bbox, { layers: ['firebasePoint','firebaseLine','firebasePoly'] });

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
  card.className = 'card grey darken-1';
  col.insertAdjacentElement('beforeend', card);
  var content = document.createElement('div');
  content.className = 'card-content white-text';
  card.insertAdjacentElement('beforeend', content);

  var createdBy = document.createElement('span');
  createdBy.innerHTML = '<span class="popup-title">Created By:</span> ' + feature.properties.createdBy + '<br />';
  var createdOn = document.createElement('span');
  createdOn.innerHTML = '<span class="popup-title">Created On:</span> ' + moment(feature.properties.createdOn).format("ddd, MMM D YYYY, h:mm:ss a") + '<br />';
  var editedBy = document.createElement('span');
  editedBy.innerHTML = '<div class="divider"></div><span class="popup-title">Edited By:</span> ' + feature.properties.editedBy + '<br />';
  var editedOn = document.createElement('span');
  editedOn.innerHTML = '<span class="popup-title">Edited On:</span> ' + moment(feature.properties.editedOn).format("ddd, MMM D YYYY, h:mm:ss a") + '<br />';
  var description = document.createElement('span');
  description.innerHTML = '<span class="popup-title">Description:</span> ' + feature.properties.description;
  var notes = document.createElement('span');
  notes.innerHTML = '<span class="popup-title">Notes:</span> ' + feature.properties.notes;

    content.insertAdjacentElement('beforeend', createdBy);
    content.insertAdjacentElement('beforeend', createdOn);
    content.insertAdjacentElement('beforeend', description);
    if (feature.properties.editedBy != null) {
      content.insertAdjacentElement('beforeend', editedBy);
      content.insertAdjacentElement('beforeend', editedOn);
      content.insertAdjacentElement('beforeend', notes);
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
  var features = map.queryRenderedFeatures(bbox, { layers: ['firebasePoint','firebaseLine','firebasePoly'] });

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
  card.className = 'card grey darken-1';
  col.insertAdjacentElement('beforeend', card);
  var content = document.createElement('div');
  content.className = 'card-content white-text';
  card.insertAdjacentElement('beforeend', content);

  var createdBy = document.createElement('span');
  createdBy.innerHTML = '<span class="popup-title">Created By:</span> ' + feature.properties.createdBy + '<br />';
  var createdOn = document.createElement('span');
  createdOn.innerHTML = '<span class="popup-title">Created On:</span> ' + moment(feature.properties.createdOn).format("ddd, MMM D YYYY, h:mm:ss a") + '<br />';
  var editedBy = document.createElement('span');
  editedBy.innerHTML = '<div class="divider"></div><span class="popup-title">Edited By:</span> ' + feature.properties.editedBy + '<br />';
  var editedOn = document.createElement('span');
  editedOn.innerHTML = '<span class="popup-title">Edited On:</span> ' + moment(feature.properties.editedOn).format("ddd, MMM D YYYY, h:mm:ss a") + '<br />';
  var description = document.createElement('span');
  description.innerHTML = '<span class="popup-title">Description:</span> ' + feature.properties.description;
  var notes = document.createElement('span');
  notes.innerHTML = '<span class="popup-title">Notes:</span> ' + feature.properties.notes;

    content.insertAdjacentElement('beforeend', createdBy);
    content.insertAdjacentElement('beforeend', createdOn);
    content.insertAdjacentElement('beforeend', description);
    if (feature.properties.editedBy != null) {
      content.insertAdjacentElement('beforeend', editedBy);
      content.insertAdjacentElement('beforeend', editedOn);
      content.insertAdjacentElement('beforeend', notes);
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
    var features = map.queryRenderedFeatures(e.point, { layers: ['firebasePoint','firebaseLine','firebasePoly'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

// disable map rotation using right click + drag
map.dragRotate.disable();

// disable map rotation using touch rotation gesture
map.touchZoomRotate.disableRotation();

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-right');
