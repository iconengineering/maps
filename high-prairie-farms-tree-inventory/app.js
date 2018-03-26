// change paths for any line commented 'change per project'

$(document).ready(function(){
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();

  document.querySelector('nav').className = 'red-burnt';

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
  var password = document.querySelector('#adminPassword').value;
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

    // add logout to admin modal and disable login
    var submit = document.getElementById('adminSubmit');
    submit.className = 'disabled modal-action modal-close waves-effect waves-light btn blue';
    var logout = document.getElementById('adminLogout');
    logout.className = 'modal-action modal-close waves-effect waves-blue btn blue';

    // make buttons active for authorized users, change per project
    var displayName = firebase.auth().currentUser.displayName;
    var ref = firebase.database().ref("datacollector/users/" + displayName + "/write/hpfTree");
    ref.once("value")
    .then(function(snapshot) {
      var val = snapshot.val(); // "ada"
      if (val === true) {
        var adminPoint = document.getElementById('adminPoint');
        adminPoint.className = 'waves-effect waves-blue btn blue white-text';
        /*var adminLine = document.getElementById('adminLine');
        adminLine.className = 'waves-effect waves-blue btn blue white-text';
        var adminPoly = document.getElementById('adminPolygon');
        adminPoly.className = 'waves-effect waves-blue btn blue white-text';
        */
        var adminEdit = document.getElementById('adminEdit');
        adminEdit.className = 'deep-orange accent-1 waves-effect waves-deep-orange btn white-text';
      }
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
    /*
    var adminLine = document.getElementById('adminLine');
    adminLine.className = 'disabled waves-effect waves-blue btn blue white-text';
    var adminPoly = document.getElementById('adminPolygon');
    adminPoly.className = 'disabled waves-effect waves-blue btn blue white-text';
    */
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
  center: [-104.731,39.443], // starting position
  zoom: 14.4// starting zoom
});



//Create vectors for menu items
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

//BaseMap Switch
function switchLayer(layer) {
    var layerId = layer.target.value;
    map.setStyle('mapbox://styles/iconeng/' + layerId);
    $('.layer-off').prop('checked', false);
    $('.layer-on').prop('checked', true);
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}



// Init Draw
var draw = new MapboxDraw({
  displayControlsDefault: false,
  userProperties: false
});

map.addControl(draw);


//set blank geojson
var firebaseGeojsonFeatures = [];

// set repository, this needs to change per project
var dataRef = firebase.database().ref('datacollector/hpfTree');
var archiveRef = firebase.database().ref('datacollector/hpfTreeArchive');

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
map.on('style.load', function() {

  //parcels
  map.addSource('parcels', {
      'type': 'vector',
      'url': 'mapbox://iconeng.5mrjqlq0' //TCV_Parcels-b3pbeq
  });


  //Town Limits
  map.addSource('boundary', {
      'type': 'vector',
      'url': 'mapbox://iconeng.ca55ms95' //TCV_Boundary-cbf8pg
  });


  //tree data
  map.addSource('firebase', {
    type: 'geojson',
    data: {type: 'FeatureCollection',
    features: firebaseGeojsonFeatures
  }
  });


callData();

/*
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
*/


    //Parcels
map.addLayer({
 'id': 'parcels',
 'source': 'parcels',
 'source-layer': 'TCV_Parcels-b3pbeq',
 'type': 'line',
 'paint': {
    'line-color': '#fff',
    'line-width': 1,
    'line-opacity': 0.8
  },
 'layout': {'visibility': 'visible'}
},'country-label-lg');

    //Add Address Label
        map.addLayer({
        'id': 'parcelLabels',
        'type': 'symbol',
        'source': 'parcels',
        'source-layer': 'TCV_Parcels-b3pbeq',
        'layout': {
          'visibility': 'none',
        'text-field': '{Situs_Addr}',
        'text-font': ['Open Sans Bold','Arial Unicode MS Regular'],
        'text-size': 10
        },

        'paint': {
        'text-color': 'rgb(255,255,255)',
        'text-halo-color': 'rgb(0,0,0)',
        'text-halo-width': 0.9
      }
    },'country-label-lg');


//Boundary Fill
  map.addLayer({
      'id': 'boundary',
      'source': 'boundary',
      'source-layer': 'TCV_Boundary-cbf8pg',
      'type': 'line',
      'paint': {
         'line-color': '#A9FF41',
         'line-width': 2.5
       },
      'layout': {'visibility': 'visible'}
  },'country-label-lg');


map.addLayer({
  id: 'firebasePoint',
  source: 'firebase',
  type: 'circle',
  filter: ["==", '$type', 'Point'],
  paint: {
    "circle-color":'#FF5E00', //dark yellow ff6e12
    'circle-radius': 5,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#fff'
  },
  'layout': {'visibility': 'visible'}
}, 'country-label-lg');

}); // end map layers

// actions on draw
map.on('draw.create', function() {

  var card = document.getElementById('input-card');


  var form = '<div class="card-content white-text"><span class="card-title"Create Feature</span><div class="row"> <form class="col s12"> <div class="input-field col s6"> <select id="condition" name="condition" class="form-control"> <option value="" disabled selected>Choose</option> <option value="Excellent">Excellent</option> <option value="Moderate">Moderate</option> <option value="Poor">Poor</option> <option value="Severe">Severe</option></select> <label>Condition</label> </div> <div class="input-field col s6"> <select id="ownership" name="ownerhship" class="form-control"> <option value="" disabled selected>Choose</option> <option value="Public">Public</option> <option value="Private">Private</option></select> <label>Ownership</label> </div> <div class="input-field col s12"> <select id="size" name="size" class="form-control"> <option value="" disabled selected>Choose</option> <option value="Large">Large; Diameter > 14"</option> <option value="Medium">Medium; Diameter: 8"-14"</option> <option value="Small">Small; Diameter < 8"</option> </select> <label>Size</label> </div> <div class="input-field col s12"><textarea id="description" class="materialize-textarea"></textarea><label for="description">Description</label></div><div class="file-field input-field col s12"><div class="btn"><i class="material-icons">add_a_photo</i><input id="fileUpload" type="file"></div><div class="file-path-wrapper"><input class="file-path validate" type="text"></div></div></div>';

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
    var condition = document.getElementById('condition').value;
    var ownership = document.getElementById('ownership').value;
    var size = document.getElementById('size').value;
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
    draw.setFeatureProperty(id,"imageUUID",imageUUID);

    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg'
    };

    // change per project
    var storageRef = firebase.storage().ref('hpfTreeUpload/');

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


//________________EDITME



    // set semantic data for point
    draw.setFeatureProperty(id,"createdBy",user);
    draw.setFeatureProperty(id,"createdOn",timestamp);
    draw.setFeatureProperty(id,"condition",condition);
    draw.setFeatureProperty(id,"ownship", ownership);
    draw.setFeatureProperty(id,"size", size);
    draw.setFeatureProperty(id,"description",description);

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
    var thanks = '<div class="card-content white-text"><span class="card-title">Create a Point Feature</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>';

    card.innerHTML = thanks;


  });

  // cancel form/point submittal
  cancelButton.addEventListener('click', function(){

    draw.deleteAll();
    draw.changeMode('simple_select');

    var card = document.getElementById('input-card');
    var reset = '<div class="card-content white-text"><span class="card-title">Create a Point Feature</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>';

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


/*
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
*/

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
   // map.setLayoutProperty('firebaseLine', 'visibility', 'none');
   // map.setLayoutProperty('firebasePoly', 'visibility', 'none');

  } else {
    // set edit button to inactive and remove all draw features
    editButton.className = 'deep-orange accent-1 waves-effect waves-deep-orange btn white-text';
    draw.deleteAll();
    map.setLayoutProperty('firebasePoint', 'visibility', 'visible');
    // map.setLayoutProperty('firebaseLine', 'visibility', 'visible');
    // map.setLayoutProperty('firebasePoly', 'visibility', 'visible');
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
        var photo = feature.val().properties.imageUUID;
        var editedBy = feature.val().properties.editedBy;
        var editedOn = moment(feature.val().properties.editedOn).format("ddd, MMM D YYYY, h:mm:ss a");
        var origDescription = feature.val().properties.description;
        var origCondition = feature.val().properties.condition;
        var origOwnership = feature.val().properties.ownership;
        var origSize = feature.val().properties.size;
        var card = document.getElementById('input-card');

        // Create a reference to the file we want to download, change per project
        var storageRef = firebase.storage().ref('hpfTreeUpload/');
        var photoRef = storageRef.child('images/' + photo);

        if (typeof(photo) != 'undefined') {
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
        }

        var form = '<div class="card-content white-text"><span class="card-title">Edit Feature</span><div class="row"><div class="col s12"><img id="photo" class="responsive-img" src="//placehold.it/350x150"></div><form class="col s12"><div class="input-field col s6"><input disabled id="createdBy" type="text" class="validate" value="' + createdBy + '"><label for="createdBy">Created By</label></div><div class="input-field col s6"><input disabled id="createdOn" type="text" class="validate" value="' + createdOn + '"><label for="createdOn">Created On</label></div><div class="input-field col s6"><input disabled id="editedBy" type="text" class="validate" value="' + editedBy + '"><label for="editedBy">Edited By</label></div><div class="input-field col s6"><input disabled id="editedOn" type="text" class="validate" value="' + editedOn + '"><label for="editedOn">Edited On</label></div><div class="input-field col s6"> <select id="condition" name="condition" class="form-control"> <option value="' + origCondition + '" disabled selected>' + origCondition + '<option value="Excellent">Excellent</option> <option value="Moderate">Moderate</option> <option value="Poor">Poor</option> <option value="Severe">Severe</option></select> <label>Condition</label> </div> <div class="input-field col s6"> <select id="type" name="ownership" class="form-control"> <option value="' + origOwnership + '" disabled selected>' + origOwnership + '<option value="Public">Public</option> <option value="Private">Private</option></select> <label>Ownership</label> </div> <div class="input-field col s12"> <select id="size" name="size" class="form-control"> <option value="' + origSize + '" disabled selected>' + origSize + '</option> <option value="Large">Large; Diameter > 14"</option> <option value="Medium">Medium; Diameter: 8"-14"</option> <option value="Small">Small; Diameter < 8"</option> </select> <label>Size</label> </div> <div class="input-field col s12"><textarea id="description" class="materialize-textarea">' + origDescription + '</textarea><label for="description">Description</label></div></form></div></div>';


        card.innerHTML = form;
        $('select').material_select();
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

          var createdBy = feature.val().properties.createdBy;
          var createdOn = feature.val().properties.createdOn;
          var photo = feature.val().properties.imageUUID;
          var editedBy = firebase.auth().currentUser.displayName;
          var editedOn = firebase.database.ServerValue.TIMESTAMP;
          var description = document.getElementById('description').value;
          var condition = document.getElementById('condition').value;
          var ownership = document.getElementById('ownership').value;
          var size = document.getElementById('size').value;
          var id = draw.getSelected().features[0].id;

          // set semantic data for point
          draw.setFeatureProperty(id,"createdBy",createdBy);
          draw.setFeatureProperty(id,"createdOn",createdOn);
          draw.setFeatureProperty(id,"description",description);
          draw.setFeatureProperty(id,"condition",condition);
          draw.setFeatureProperty(id,"ownership",ownership);
          draw.setFeatureProperty(id,"size",size);
          draw.setFeatureProperty(id,"imageUUID",photo);
          draw.setFeatureProperty(id,"editedBy",editedBy);
          draw.setFeatureProperty(id,"editedOn",editedOn);

          if (typeof(extension) != 'undefined') {
              draw.setFeatureProperty(id,"extension",extension);
          }


          // change per project
          firebase.database().ref('datacollector/hpfTree/' + featureKey).update(draw.getSelected().features[0], function(error) {
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
          var thanks = '<div class="card-content white-text"><span class="card-title">Create a Point Feature</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>';

          card.innerHTML = thanks;

          map.setLayoutProperty('firebasePoint', 'visibility', 'visible');
       //   map.setLayoutProperty('firebaseLine', 'visibility', 'visible');
       //   map.setLayoutProperty('firebasePoly', 'visibility', 'visible');
        });



        // delete feature
        deleteButton.addEventListener('click', function(){

          var user = firebase.auth().currentUser.displayName;
          var timestamp = firebase.database.ServerValue.TIMESTAMP;
          var id = draw.getSelected().features[0].id;
          draw.setFeatureProperty(id,"deleted_by",user);
          draw.setFeatureProperty(id,"deleted_at",timestamp);

          // change per project
          firebase.database().ref('datacollector/hpfTree/' + featureKey).remove(function(error) {
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
          var thanks = '<div class="card-content white-text"><span class="card-title">Create a Point Feature</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>'

          card.innerHTML = thanks;

          map.setLayoutProperty('firebasePoint', 'visibility', 'visible');
      //    map.setLayoutProperty('firebaseLine', 'visibility', 'visible');
       //   map.setLayoutProperty('firebasePoly', 'visibility', 'visible');

        });

        // cancel form/point submittal
        cancelButton.addEventListener('click', function(){

          draw.deleteAll();
          map.setLayoutProperty('firebasePoint', 'visibility', 'visible');
    //      map.setLayoutProperty('firebaseLine', 'visibility', 'visible');
   //       map.setLayoutProperty('firebasePoly', 'visibility', 'visible');
          draw.changeMode('simple_select');

          var card = document.getElementById('input-card');

          var reset = '<div class="card-content white-text"><span class="card-title">Create a Point Feature</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue btn white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>';

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
  var features = map.queryRenderedFeatures(bbox, 'firebasePoint');

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
  card.className = 'red-burnt';
  col.insertAdjacentElement('beforeend', card);
  var content = document.createElement('div');
  content.className = 'card-content white-text';
  card.insertAdjacentElement('beforeend', content);

  // Create a reference to the file we want to download
  var photo = feature.properties.imageUUID;
  // change per project
  var storageRef = firebase.storage().ref('hpfTreeUpload/');
  var photoRef = storageRef.child('images/' + photo);

  if (typeof(photo) != 'undefined') {
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
  }

  var image = document.createElement('span');
  image.className = 'col s12 center';
  image.innerHTML = '<img id="popupPhoto" class="responsive-img" src="//placehold.it/350x150"><br />';
  var createdBy = document.createElement('span');
  createdBy.innerHTML = '<span class="popup-title">Created By:</span> ' + feature.properties.createdBy + '<br />';
  var createdOn = document.createElement('span');
  createdOn.innerHTML = '<span class="popup-title">Created On:</span> ' + moment(feature.properties.createdOn).format("ddd, MMM D YYYY, h:mm:ss a") + '<br />';
  var editedBy = document.createElement('span');
  editedBy.innerHTML = '<div class="divider"></div><span class="popup-title">Edited By:</span> ' + feature.properties.editedBy + '<br />';
  var editedOn = document.createElement('span');
  editedOn.innerHTML = '<span class="popup-title">Edited On:</span> ' + moment(feature.properties.editedOn).format("ddd, MMM D YYYY, h:mm:ss a") + '<br />';
  var condition = document.createElement('span');
  condition.innerHTML = '<span class="popup-title">Condition:</span> ' + feature.properties.condition;
  var ownership = document.createElement('span');
  ownership.innerHTML = '<span class="popup-title">Ownership:</span> ' + feature.properties.ownership;
  var size = document.createElement('span');
  size.innerHTML = '<span class="popup-title">Size:</span> ' + feature.properties.size;
  var description = document.createElement('span');
  description.innerHTML = '<span class="popup-title">Description:</span> ' + feature.properties.description;


  if (feature.properties.imageUUID != null) {
    content.insertAdjacentElement('beforeend', image);
  }
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
  var features = map.queryRenderedFeatures(bbox, { layers:['firebasePoint']} );

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
  card.className = 'card red-burnt';
  col.insertAdjacentElement('beforeend', card);
  var content = document.createElement('div');
  content.className = 'card-content white-text';
  card.insertAdjacentElement('beforeend', content);

  // Create a reference to the file we want to download
  var photo = feature.properties.imageUUID;
  // change per project
  var storageRef = firebase.storage().ref('hpfTreeUpload/');
  var photoRef = storageRef.child('images/' + photo);

  if (typeof(photo) != 'undefined') {
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
  }

  var image = document.createElement('div');
  image.className = 'col s12 center';
  image.innerHTML = '<img id="popupPhoto" style="max-width:250px;" class="responsive-img" src="//placehold.it/250x150">';

  var createdBy = document.createElement('div');
  createdBy.innerHTML = '<span class="popup-title">Created By:</span> ' + feature.properties.createdBy;
  var createdOn = document.createElement('div');
  createdOn.innerHTML = '<span class="popup-title">Created On:</span> ' + moment(feature.properties.createdOn).format("ddd, MMM D YYYY, h:mm:ss a");
  var editedBy = document.createElement('div');
  editedBy.innerHTML = '<div class="divider"></div><span class="popup-title">Edited By:</span> ' + feature.properties.editedBy;
  var editedOn = document.createElement('div');
  editedOn.innerHTML = '<span class="popup-title">Edited On:</span> ' + moment(feature.properties.editedOn).format("ddd, MMM D YYYY, h:mm:ss a");
  var condition = document.createElement('div');
  condition.innerHTML = '<span class="popup-title">Condition:</span> ' + feature.properties.condition;
  var ownership = document.createElement('div');
  ownership.innerHTML = '<span class="popup-title">Ownership:</span> ' + feature.properties.ownership;
  var size = document.createElement('div');
  size.innerHTML = '<span class="popup-title">Size</span> ' + feature.properties.size;
  var description = document.createElement('div');
  description.innerHTML = '<span class="popup-title">Description:</span> ' + feature.properties.description;


  if (feature.properties.imageUUID != null) {
    content.insertAdjacentElement('beforeend', image);
  }
  content.insertAdjacentElement('beforeend', createdBy);
  content.insertAdjacentElement('beforeend', createdOn);
  content.insertAdjacentElement('beforeend', condition);
  content.insertAdjacentElement('beforeend', ownership);
  content.insertAdjacentElement('beforeend', size);
  content.insertAdjacentElement('beforeend', description);
  if (feature.properties.editedBy != null) {
    content.insertAdjacentElement('beforeend', editedBy);
    content.insertAdjacentElement('beforeend', editedOn);
    content.insertAdjacentElement('beforeend', condition);
    content.insertAdjacentElement('beforeend', ownership);
    content.insertAdjacentElement('beforeend', size);
    content.insertAdjacentElement('beforeend', description);
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
  var features = map.queryRenderedFeatures(e.point, { layers: ['firebasePoint']});
  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

// disable map rotation using right click + drag
map.dragRotate.disable();

// disable map rotation using touch rotation gesture
map.touchZoomRotate.disableRotation();

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-right');


var geoLoc = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});
map.addControl(geoLoc, 'bottom-right');
