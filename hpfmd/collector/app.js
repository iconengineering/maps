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

    window.addEventListener('keydown', function(e) {
        if(e.keyCode === 46 || e.keyCode === 8) {
          e.preventDefault();
          console.log('delete');
          var vertices = draw.getSelectedPoints();
          draw.trash(vertices);
        }
    });

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

// add listener for admin logout
document.querySelector('#adminLogout').addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  firebase.auth().signOut();
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
        var navAdmin = document.getElementById('navAdmin');
        navAdmin.innerText = 'Hello, ' + firebase.auth().currentUser.displayName;
        callData();
      }, function(error) {
        // An error happened.
      });
    } else {
      var navAdmin = document.getElementById('navAdmin');
      navAdmin.innerText = 'Hello, ' + firebase.auth().currentUser.displayName;
      callData();
    }

// add downloads for admin
    var header = document.getElementById('header-links');
    var dropdown = '<li id="download"><a class="dropdown-button" href="#" data-activates="dropdown1"><i class="material-icons white-text">get_app</i></a></li><ul id="dropdown1" class="dropdown-content"><li><a href="#!" onclick="downloadGeojson()">GeoJSON</a></li><li><a href="#!" onclick="downloadShp()">Shapefile</a></li></ul>';
    var download = document.getElementById('download');
    if (typeof(download) == 'undefined' || download == null) {
    header.insertAdjacentHTML('beforeend',dropdown);
  }

  //   // add logout to admin modal and disable login
  //   var submit = document.getElementById('adminSubmit');
  //   submit.className = 'disabled modal-action modal-close waves-effect waves-light btn blue';
  //   var logout = document.getElementById('adminLogout');
  //   logout.className = 'modal-action modal-close waves-effect waves-blue btn blue';
  //
  //   // make buttons active for authorized users
  //   var displayName = firebase.auth().currentUser.displayName;
  //   var ref = firebase.database().ref("datacollector/users/" + displayName + "/write/hpfmd");
  //       ref.once("value")
  //         .then(function(snapshot) {
  //           var val = snapshot.val(); // "ada"
  //         if (val === true) {
  //   var adminPoint = document.getElementById('adminPoint');
  //   adminPoint.className = 'waves-effect waves-blue btn blue white-text';
  //   var adminLine = document.getElementById('adminLine');
  //   adminLine.className = 'waves-effect waves-blue btn blue white-text';
  //   var adminPoly = document.getElementById('adminPolygon');
  //   adminPoly.className = 'waves-effect waves-blue btn blue white-text';
  //   var adminEdit = document.getElementById('adminEdit');
  //   adminEdit.className = 'deep-orange accent-1 waves-effect waves-deep-orange btn white-text';
  //   }
  // });

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
    var download = document.getElementById('download');

    if (typeof(download) != 'undefined' && download !== null) {
      var submit = document.getElementById('adminSubmit');
      submit.className = 'modal-action modal-close waves-effect waves-blue btn blue';
      header.removeChild(download);

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
      // enable login to admin modal and disable logout
      var submit = document.getElementById('adminSubmit');
      submit.className = 'modal-action modal-close waves-effect waves-light btn blue';
      var logout = document.getElementById('adminLogout');
      logout.className = 'disabled modal-action modal-close waves-effect waves-blue btn blue';

      var navAdmin = document.getElementById('navAdmin');
      navAdmin.innerText = 'ADMIN';
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
    style: 'mapbox://styles/iconeng/cj1qjjocj00112srqxugk16eo', //hosted style id
    center: [-104.717272818, 39.446576941], // starting position
    zoom: 12, // starting zoom
    hash: true
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
var archiveRef = firebase.database().ref('datacollector/hpfmdArchive');

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

  map.addSource('filings', {
	type: 'geojson',
  data: '../hpfmd_filings.geojson'
	});

  callData();

  map.addLayer({
    id: 'filings',
    source: 'filings',
    type: 'line',
    layout: {
        "visibility": "visible",
        "line-join": "round",
        "line-cap": "round"
    },
    paint: {
        "line-color": "black",
        "line-width": 1
    }
  }, 'country-label-lg');

  map.addLayer({
      'id': 'filingLabels',
      'type': 'symbol',
      'source': 'filings',
      'layout': {
         "visibility": "visible",
         "text-optional": true,
         "text-line-height": 1,
         "text-size": 10,
         "text-field": "{title}",
         'text-font': ['Roboto Medium','Open Sans Regular','Arial Unicode MS Regular'],
         "symbol-placement": "point"
     },
     "paint": {
       "text-color": "#F8F4F0",
       "text-halo-color": "rgba(0,0,0,.87)",
       "text-halo-width": 1
     }
  }, 'country-label-lg');

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

  var form = '<div class="card-content white-text"><span class="card-title">Enter Your Comment</span><div class="row"> <form class="col s12"> <div class="input-field col s6"> <select id="generation" name="generation" class="form-control"> <option value="" disabled selected>Choose</option> <option value="Existing">Existing</option> <option value="Proposed">Proposed</option> </select> <label>Generation</label> </div> <div class="input-field col s6"> <select id="type" name="type" class="form-control"> <option value="" disabled selected>Choose</option> <option value="Pond">Pond</option> <option value="Channel">Channel</option> <option value="Pipe">Pipe</option> <option value="Outlet">Outlet</option> <option value="Inlet">Inlet</option> <option value="Other">Other</option> </select> <label>Type</label> </div> <div class="input-field col s12"> <select id="purpose" name="purpose" class="form-control"> <option value="" disabled selected>Choose</option> <option value="Detention">Detention</option> <option value="Retention">Retention</option> <option value="Water Quality">Water Quality</option> <option value="Conveyance">Conveyance</option> <option value="Capture">Capture</option> <option value="Other">Other</option> </select> <label>Purpose</label> </div> <div class="input-field col s6"> <select id="sediment" name="sediment" class="form-control"> <option value="" disabled selected>Choose</option> <option value="High">High</option> <option value="Moderate">Moderate</option> <option value="Low">Low</option> </select> <label>Sediment</label> </div> <div class="input-field col s6"> <select id="debris" name="debris" class="form-control"> <option value="" disabled selected>Choose</option> <option value="High">High</option> <option value="Moderate">Moderate</option> <option value="Low">Low</option> </select> <label>Debris</label> </div> <div class="input-field col s12"> <select id="condition" name="condition" class="form-control"> <option value="" disabled selected>Choose</option> <option value="5">5-Excellent</option> <option value="4">4-Functional</option> <option value="3">3-Maintenance Req\'d</option> <option value="2">2-Marginal</option> <option value="1">1-Disfunctional</option> </select> <label>Condition</label> </div> <div class="input-field col s12"> <select id="recommendation" name="recommendation" class="form-control"> <option value="" disabled selected>Choose</option> <option value="Do Nothing">Do Nothing</option> <option value="Maintenance">Maintenance</option> <option value="Repairs">Repairs</option> <option value="Replace">Replace</option> <option value="Abandon">Abandon</option> <option value="Other">Other</option> </select> <label>Recommendation</label> </div> <div class="input-field col s12"><textarea id="description" class="materialize-textarea"></textarea><label for="description">Description</label></div><div class="file-field input-field col s12"><div class="btn"><i class="material-icons">add_a_photo</i><input id="fileUpload" type="file"></div><div class="file-path-wrapper"><input class="file-path validate" type="text"></div></div></div>';

  card.innerHTML = form;
  $('select').material_select();

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
    var generation = document.getElementById('generation').value;
    var type = document.getElementById('type').value;
    var purpose = document.getElementById('purpose').value;
    var sediment = document.getElementById('sediment').value;
    var debris = document.getElementById('debris').value;
    var condition = document.getElementById('condition').value;
    var recommendation = document.getElementById('recommendation').value;
    var description = document.getElementById('description').value;
    var timestamp = firebase.database.ServerValue.TIMESTAMP;

    var file = document.getElementById('fileUpload').files[0];

    function generateUUID() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
    }

    var n = draw.getAll().features.length - 1;
    var id = draw.getAll().features[n].id;

    if (typeof(file) != 'undefined') {
    var fileName = file.name;
    var fileExt = fileName.split('.')[1];

    var imageUUID = generateUUID() + '.' + fileExt;
    draw.setFeatureProperty(id,"photo",imageUUID);

    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg'
    };

    var storageRef = firebase.storage().ref('hpfmdUpload/');

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('images/' + imageUUID).put(file, metadata);
    Materialize.toast('<span id="counterToast"></span>');
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      var $toastContent = 'Upload is ' + progress + '% done';
      $('#counterToast').text($toastContent);
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
      }
    }, function(error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
        // User doesn't have permission to access the object
        Materialize.toast('User is not authorized to upload images', 4000);
        break;

        case 'storage/canceled':
        // User canceled the upload
        Materialize.toast('Upload has been cancelled', 4000);
        break;

        case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        Materialize.toast('An unknown error occurred', 4000);
        break;
      }
    }, function() {
      // Upload completed successfully, now we can get the download URL
      $('.toast').remove();
      var downloadURL = uploadTask.snapshot.downloadURL;
      Materialize.toast('Image has been uploaded', 4000);
    });
  }

// set semantic data for point
    draw.setFeatureProperty(id,"created_by",user);
    draw.setFeatureProperty(id,"created_at",timestamp);
    draw.setFeatureProperty(id,"generation",generation);
    draw.setFeatureProperty(id,"type",type);
    draw.setFeatureProperty(id,"purpose",purpose);
    draw.setFeatureProperty(id,"sediment",sediment);
    draw.setFeatureProperty(id,"debris",debris);
    draw.setFeatureProperty(id,"condition",condition);
    draw.setFeatureProperty(id,"recommenda",recommendation);
    draw.setFeatureProperty(id,"notes",description);

    dataRef.push(draw.getAll().features[n], function(error) {
      if (error) {
        Materialize.toast('Something went wrong.');
    } else {
        Materialize.toast('Feature has been uploaded.', 4000);
    }
    });

    archiveRef.push(draw.getAll().features[n], function(error) {
      if (error) {
        console.log('Archive Error.');
    } else {
        console.log('Archived.');
    }
    });

// delete draw point from map
    draw
      .deleteAll()
      .getAll();

// set card content
    var thanks = '<div class="card-content white-text"><span class="card-title">Draw a Feature</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminLine" class="waves-effect waves-blue btn white-text" onclick="drawLine()"><i class="material-icons">show_chart</i></a><a id="adminPolygon" class="waves-effect waves-blue btn white-text" onclick="drawPoly()"><i class="material-icons">layers</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>';

    card.innerHTML = thanks;

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
        var createdBy = feature.val().properties.created_by;
        var createdOn = moment(feature.val().properties.created_at).format("ddd, MMM D YYYY, h:mm:ss a");
        var editedBy = feature.val().properties.updated_by;
        var editedOn = moment(feature.val().properties.updated_at).format("ddd, MMM D YYYY, h:mm:ss a");
        var origDescription = feature.val().properties.notes;
        var origNotes = feature.val().properties.editNotes;
        var origGeneration = feature.val().properties.generation;
        var origType = feature.val().properties.type;
        var origPurpose = feature.val().properties.purpose;
        var origSediment = feature.val().properties.sediment;
        var origDebris = feature.val().properties.debris;
        var origCondition = feature.val().properties.condition;
        var origRecommendation = feature.val().properties.recommenda;
        var photo = feature.val().properties.photo;
        var extension = feature.val().properties.extension;
        var card = document.getElementById('input-card');

        var form = '<div class="card-content white-text"><span class="card-title">Edit Feature</span><div class="row"><div class="col s12"><img id="photo" class="responsive-img" src="//placehold.it/350x150"></div><form class="col s12"><div class="input-field col s6"><input disabled id="createdBy" type="text" class="validate" value="' + createdBy + '"><label for="createdBy">Created By</label></div><div class="input-field col s6"><input disabled id="createdOn" type="text" class="validate" value="' + createdOn + '"><label for="createdOn">Created On</label></div><div class="input-field col s6"><input disabled id="editedBy" type="text" class="validate" value="' + editedBy + '"><label for="editedBy">Edited By</label></div><div class="input-field col s6"><input disabled id="editedOn" type="text" class="validate" value="' + editedOn + '"><label for="editedOn">Edited On</label></div><div class="input-field col s6"> <select id="generation" name="generation" class="form-control"> <option value="' + origGeneration + '" disabled selected>' + origGeneration + '</option> <option value="Existing">Existing</option> <option value="Proposed">Proposed</option> </select> <label>Generation</label> </div> <div class="input-field col s6"> <select id="type" name="type" class="form-control"> <option value="' + origType + '" disabled selected>' + origType + '</option> <option value="Pond">Pond</option> <option value="Channel">Channel</option> <option value="Pipe">Pipe</option> <option value="Outlet">Outlet</option> <option value="Inlet">Inlet</option> <option value="Other">Other</option> </select> <label>Type</label> </div> <div class="input-field col s12"> <select id="purpose" name="purpose" class="form-control"> <option value="' + origPurpose + '" disabled selected>' + origPurpose + '</option> <option value="Detention">Detention</option> <option value="Retention">Retention</option> <option value="Water Quality">Water Quality</option> <option value="Conveyance">Conveyance</option> <option value="Capture">Capture</option> <option value="Other">Other</option> </select> <label>Purpose</label> </div> <div class="input-field col s6"> <select id="sediment" name="sediment" class="form-control"> <option value="' + origSediment + '" disabled selected>' + origSediment + '</option> <option value="High">High</option> <option value="Moderate">Moderate</option> <option value="Low">Low</option> </select> <label>Sediment</label> </div> <div class="input-field col s6"> <select id="debris" name="debris" class="form-control"> <option value="' + origDebris + '" disabled selected>' + origDebris + '</option> <option value="High">High</option> <option value="Moderate">Moderate</option> <option value="Low">Low</option> </select> <label>Debris</label> </div> <div class="input-field col s12"> <select id="condition" name="condition" class="form-control"> <option value="' + origCondition + '" disabled selected>' + origCondition + '</option> <option value="5">5-Excellent</option> <option value="4">4-Functional</option> <option value="3">3-Maintenance Req\'d</option> <option value="2">2-Marginal</option> <option value="1">1-Disfunctional</option> </select> <label>Condition</label> </div> <div class="input-field col s12"> <select id="recommendation" name="recommendation" class="form-control"> <option value="' + origRecommendation + '" disabled selected>' + origRecommendation + '</option> <option value="Do Nothing">Do Nothing</option> <option value="Maintenance">Maintenance</option> <option value="Repairs">Repairs</option> <option value="Replace">Replace</option> <option value="Abandon">Abandon</option> <option value="Other">Other</option> </select> <label>Recommendation</label> </div><div class="input-field col s12"><textarea id="description" class="materialize-textarea">' + origDescription + '</textarea><label for="description">Description</label></div><div class="input-field col s12"><textarea id="notes" class="materialize-textarea">' + origNotes + '</textarea><label for="notes">Notes (not public)</label></div></form></div></div>';

        card.innerHTML = form;
        $('select').material_select();
        Materialize.updateTextFields();

        // Create a reference to the file we want to download
        var storageRef = firebase.storage().ref('hpfmdUpload/');
        var photoRef = storageRef.child('images/' + photo);

        if (typeof(extension) == 'undefined') {
          photoRef.getDownloadURL().then(function(url) {
            // Insert url into an <img> tag to "download"
            document.getElementById('photo').src = url;
          }).catch(function(error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/object_not_found':
              // File doesn't exist
              break;

              case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

              case 'storage/canceled':
              // User canceled the upload
              break;

              case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break;
            }
          });
        } else {
          var s3Url = '//s3-us-west-2.amazonaws.com/iconeng/hpfmd-img/thumbs/';
          var photoUrl = s3Url + photo + '.' + extension;
          document.getElementById('photo').src = photoUrl;
        }

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
            var createdOn = feature.val().properties.created_at;
            var editedBy = firebase.auth().currentUser.displayName;
            var editedOn = firebase.database.ServerValue.TIMESTAMP;
            var generation = document.getElementById('generation').value;
            var type = document.getElementById('type').value;
            var purpose = document.getElementById('purpose').value;
            var sediment = document.getElementById('sediment').value;
            var debris = document.getElementById('debris').value;
            var condition = document.getElementById('condition').value;
            var recommendation = document.getElementById('recommendation').value;
            var description = document.getElementById('description').value;
            var notes = document.getElementById('notes').value;
            var extension = feature.val().properties.extension;
            var id = draw.getSelected().features[0].id;

        // set semantic data for point
            draw.setFeatureProperty(id,"created_by",createdBy);
            draw.setFeatureProperty(id,"created_at",createdOn);
            draw.setFeatureProperty(id,"updated_by",editedBy);
            draw.setFeatureProperty(id,"updated_at",editedOn);
            draw.setFeatureProperty(id,"generation",generation);
            draw.setFeatureProperty(id,"type",type);
            draw.setFeatureProperty(id,"purpose",purpose);
            draw.setFeatureProperty(id,"sediment",sediment);
            draw.setFeatureProperty(id,"debris",debris);
            draw.setFeatureProperty(id,"condition",condition);
            draw.setFeatureProperty(id,"recommenda",recommendation);
            draw.setFeatureProperty(id,"notes",description);
            draw.setFeatureProperty(id,"editNotes",notes);
            draw.setFeatureProperty(id,"photo",photo);

            if (typeof(extension) != 'undefined') {
              draw.setFeatureProperty(id,"extension",extension);
            }

            firebase.database().ref('datacollector/hpfmd/' + featureKey).update(draw.getSelected().features[0], function(error) {
              if (error) {
                Materialize.toast('Something went wrong.');
            } else {
                Materialize.toast('Feature has been updated.', 4000);
            }
            });

            archiveRef.push(draw.getSelected().features[0], function(error) {
              if (error) {
                console.log('Archive Error.');
            } else {
                console.log('Archived.');
            }
            });

            // delete draw point from map
                draw
                  .deleteAll()
                  .getAll();

            // set card content
                var thanks = '<div class="card-content white-text"><span class="card-title">Draw a Feature</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminLine" class="waves-effect waves-blue btn white-text" onclick="drawLine()"><i class="material-icons">show_chart</i></a><a id="adminPolygon" class="waves-effect waves-blue btn white-text" onclick="drawPoly()"><i class="material-icons">layers</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>'

                card.innerHTML = thanks;

                map.setLayoutProperty('firebasePoint', 'visibility', 'visible');
                map.setLayoutProperty('firebaseLine', 'visibility', 'visible');
                map.setLayoutProperty('firebasePoly', 'visibility', 'visible');
        });



        // delete feature
          deleteButton.addEventListener('click', function(){

            var user = firebase.auth().currentUser.displayName;
            var timestamp = firebase.database.ServerValue.TIMESTAMP;
            var id = draw.getSelected().features[0].id;
            draw.setFeatureProperty(id,"deleted_by",user);
            draw.setFeatureProperty(id,"deleted_at",timestamp);

            firebase.database().ref('datacollector/hpfmd/' + featureKey).remove(function(error) {
              if (error) {
                Materialize.toast('Something went wrong.');
            } else {
                Materialize.toast('Feature has been deleted.', 4000);
            }
            });

            archiveRef.push(draw.getSelected().features[0], function(error) {
              if (error) {
                console.log('Archive Error.');
            } else {
                console.log('Archived.');
            }
            });

            // delete draw point from map
                draw
                  .deleteAll()
                  .getAll();

            // set card content
                var thanks = '<div class="card-content white-text"><span class="card-title">Draw a Feature</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminLine" class="waves-effect waves-blue btn white-text" onclick="drawLine()"><i class="material-icons">show_chart</i></a><a id="adminPolygon" class="waves-effect waves-blue btn white-text" onclick="drawPoly()"><i class="material-icons">layers</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>'

                card.innerHTML = thanks;

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

  var photo = feature.properties.photo;
  var storageRef = firebase.storage().ref('hpfmdUpload/');
  var photoRef = storageRef.child('images/' + photo);
  var extension = feature.properties.extension;

  if (typeof(extension) == 'undefined' && feature.properties.photo != null) {
    photoRef.getDownloadURL().then(function(url) {
      // Insert url into an <img> tag to "download"
      var image = document.createElement('div');
      image.className = 'col s12 center';
      image.innerHTML = '<img id="popupPhoto" class="responsive-img" src="' + url + '">';
    }).catch(function(error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object_not_found':
        // File doesn't exist
        break;

        case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

        case 'storage/canceled':
        // User canceled the upload
        break;

        case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
      }
    });
  } else {
    var s3Url = '//s3-us-west-2.amazonaws.com/iconeng/hpfmd-img/thumbs/';
    var photoUrl = s3Url + photo + '.' + extension;
    var image = document.createElement('div');
    image.className = 'col s12 center';
    image.innerHTML = '<img id="popupPhoto" class="responsive-img" src="' + photoUrl + '">';
  }

  var createdBy = document.createElement('div');
  createdBy.innerHTML = '<span class="popup-title">Created By:</span> ' + feature.properties.created_by;
  var generation = document.createElement('div');
  generation.innerHTML = '<span class="popup-title">Generation:</span> ' + feature.properties.generation;
  var type = document.createElement('div');
  type.innerHTML = '<span class="popup-title">Type:</span> ' + feature.properties.type;
  var purpose = document.createElement('div');
  purpose.innerHTML = '<span class="popup-title">Purpose:</span> ' + feature.properties.purpose;
  var sediment = document.createElement('div');
  sediment.innerHTML = '<span class="popup-title">Sediment:</span> ' + feature.properties.sediment;
  var debris = document.createElement('div');
  debris.innerHTML = '<span class="popup-title">Debris:</span> ' + feature.properties.debris;
  var condition = document.createElement('div');
  condition.innerHTML = '<span class="popup-title">Condition:</span> ' + feature.properties.condition;
  var recommenda = document.createElement('div');
  recommenda.innerHTML = '<span class="popup-title">Recommendation:</span> ' + feature.properties.recommenda;
  var createdOn = document.createElement('div');
  createdOn.innerHTML = '<span class="popup-title">Created On:</span> ' + moment(feature.properties.created_at).format("ddd, MMM D YYYY, h:mm:ss a");
  var editedBy = document.createElement('div');
  editedBy.innerHTML = '<div class="divider"></div><span class="popup-title">Edited By:</span> ' + feature.properties.updated_by;
  var editedOn = document.createElement('div');
  editedOn.innerHTML = '<span class="popup-title">Edited On:</span> ' + moment(feature.properties.updated_at).format("ddd, MMM D YYYY, h:mm:ss a");
  var description = document.createElement('div');
  description.innerHTML = '<span class="popup-title">Description:</span> ' + feature.properties.notes;
  var notes = document.createElement('div');
  notes.innerHTML = '<span class="popup-title">Notes:</span> ' + feature.properties.editNotes;

  if (feature.properties.photo != null) {
    content.insertAdjacentElement('beforeend', image);
  }
    content.insertAdjacentElement('beforeend', createdBy);
    content.insertAdjacentElement('beforeend', createdOn);
    content.insertAdjacentElement('beforeend', generation);
    content.insertAdjacentElement('beforeend', type);
    content.insertAdjacentElement('beforeend', purpose);
    content.insertAdjacentElement('beforeend', sediment);
    content.insertAdjacentElement('beforeend', debris);
    content.insertAdjacentElement('beforeend', condition);
    content.insertAdjacentElement('beforeend', recommenda);
    content.insertAdjacentElement('beforeend', description);
    if (feature.properties.updated_by != null) {
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

  var photo = feature.properties.photo;
  var storageRef = firebase.storage().ref('hpfmdUpload/');
  var photoRef = storageRef.child('images/' + photo);
  var extension = feature.properties.extension;

  if (typeof(extension) == 'undefined' && feature.properties.photo != null) {

    var image = document.createElement('span');
    image.className = 'col s12 center';
    image.innerHTML = '<img id="popupPhoto" class="responsive-img" src="//placehold.it/350x150"><br />';

    photoRef.getDownloadURL().then(function(url) {
      // Insert url into an <img> tag to "download"
      document.getElementById('popupPhoto').src = url;
    }).catch(function(error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object_not_found':
        // File doesn't exist
        break;

        case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

        case 'storage/canceled':
        // User canceled the upload
        break;

        case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
      }
    });
  } else {
    var s3Url = '//s3-us-west-2.amazonaws.com/iconeng/hpfmd-img/thumbs/';
    var photoUrl = s3Url + photo + '.' + extension;
    var image = document.createElement('div');
    image.className = 'col s12 center';
    image.innerHTML = '<img id="popupPhoto" class="responsive-img" src="' + photoUrl + '">';
  }


  var createdBy = document.createElement('div');
  createdBy.innerHTML = '<span class="popup-title">Created By:</span> ' + feature.properties.created_by;
  var generation = document.createElement('div');
  generation.innerHTML = '<span class="popup-title">Generation:</span> ' + feature.properties.generation;
  var type = document.createElement('div');
  type.innerHTML = '<span class="popup-title">Type:</span> ' + feature.properties.type;
  var purpose = document.createElement('div');
  purpose.innerHTML = '<span class="popup-title">Purpose:</span> ' + feature.properties.purpose;
  var sediment = document.createElement('div');
  sediment.innerHTML = '<span class="popup-title">Sediment:</span> ' + feature.properties.sediment;
  var debris = document.createElement('div');
  debris.innerHTML = '<span class="popup-title">Debris:</span> ' + feature.properties.debris;
  var condition = document.createElement('div');
  condition.innerHTML = '<span class="popup-title">Condition:</span> ' + feature.properties.condition;
  var recommenda = document.createElement('div');
  recommenda.innerHTML = '<span class="popup-title">Recommendation:</span> ' + feature.properties.recommenda;
  var createdOn = document.createElement('div');
  createdOn.innerHTML = '<span class="popup-title">Created On:</span> ' + moment(feature.properties.created_at).format("ddd, MMM D YYYY, h:mm:ss a");
  var editedBy = document.createElement('div');
  editedBy.innerHTML = '<div class="divider"></div><span class="popup-title">Edited By:</span> ' + feature.properties.updated_by;
  var editedOn = document.createElement('div');
  editedOn.innerHTML = '<span class="popup-title">Edited On:</span> ' + moment(feature.properties.updated_at).format("ddd, MMM D YYYY, h:mm:ss a");
  var description = document.createElement('div');
  description.innerHTML = '<span class="popup-title">Description:</span> ' + feature.properties.notes;
  var notes = document.createElement('div');
  notes.innerHTML = '<span class="popup-title">Notes:</span> ' + feature.properties.editNotes;

  if (feature.properties.photo != null) {
    content.insertAdjacentElement('beforeend', image);
  }
    content.insertAdjacentElement('beforeend', createdBy);
    content.insertAdjacentElement('beforeend', createdOn);
    content.insertAdjacentElement('beforeend', generation);
    content.insertAdjacentElement('beforeend', type);
    content.insertAdjacentElement('beforeend', purpose);
    content.insertAdjacentElement('beforeend', sediment);
    content.insertAdjacentElement('beforeend', debris);
    content.insertAdjacentElement('beforeend', condition);
    content.insertAdjacentElement('beforeend', recommenda);
    content.insertAdjacentElement('beforeend', description);
    if (feature.properties.updated_by != null) {
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
