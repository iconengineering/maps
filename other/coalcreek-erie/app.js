$(document).ready(function(){
// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    document.querySelector('nav').className = 'blue';

    // Add admin button to navbar
    var header = document.getElementById('header');
    var headerLinks = document.createElement('ul');
    headerLinks.id = 'header-links';
    headerLinks.className = 'right';
    var admin = '<li><a id="navAdmin" href="#modalAdmin">ADMIN</li>';

    header.insertAdjacentElement('beforeend',headerLinks);
    headerLinks.insertAdjacentHTML('beforeend',admin);

    window.addEventListener('keydown', function(e) {
        if(e.keyCode === 46) {
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
    location.reload();
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
      var displayName = firebase.auth().currentUser.displayName;

      // check for display name
      if (thisUser.displayName == null) {
        var email = thisUser.email;
        var name = email.split('@')[0];
        var address = email.split('@')[1];
        var domain = address.split('.')[0];
        var username = name + '-' + domain;
        thisUser.updateProfile({
          displayName: username
        }).then(function() {
          // Update successful.
          var thisUser = firebase.auth().currentUser;
          var displayName = firebase.auth().currentUser.displayName;
          var navAdmin = document.getElementById('navAdmin');
          navAdmin.innerText = 'Hello, ' + displayName;
          var email = thisUser.email;
          var address = email.split('@')[1];
          var authRef = firebase.database().ref("datacollector/users/" + displayName + "/read/coalcreek");
          authRef.once("value")
          .then(function(snapshot) {
            var val = snapshot.val(); // "ada"
            console.log(val, address);
            if (val === true || address == 'iconeng.com') {
              loadMap();
              drawAnno();
            } else {
              Materialize.toast('You do not have access to this page. Please contact the admin.', 10000);
            }
          });
        }, function(error) {
          // An error happened.
        });
      } else {
        var navAdmin = document.getElementById('navAdmin');
        navAdmin.innerText = 'Hello, ' + displayName;

        var email = thisUser.email;
        var address = email.split('@')[1];
        var authRef = firebase.database().ref("datacollector/users/" + displayName + "/read/coalcreek");
        authRef.once("value")
        .then(function(snapshot) {
          var val = snapshot.val(); // "ada"
          console.log(val, address);
          if (val === true || address == 'iconeng.com') {
            loadMap();
            drawAnno();
          } else {
            Materialize.toast('You do not have access to this page. Please contact the admin.', 10000);
          }
        });
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

      // make buttons active for authorized users
      var ref = firebase.database().ref("datacollector/users/" + displayName + "/write/coalcreek");
      ref.once("value")
      .then(function(snapshot) {
        var val = snapshot.val(); // "ada"
        if (val === true) {
          var adminPoint = document.getElementById('adminPoint');
          adminPoint.className = 'waves-effect waves-blue btn blue darken-2 white-text';
          var adminLine = document.getElementById('adminLine');
          adminLine.className = 'waves-effect waves-blue btn blue darken-2 white-text';
          var adminPoly = document.getElementById('adminPolygon');
          adminPoly.className = 'waves-effect waves-blue btn blue darken-2 white-text';
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
    style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot', //hosted style id
    center: [-105.0546,40.0614], // starting position
    zoom: 14, // starting zoom,
    hash: true
});

// Init Draw
var draw = new MapboxDraw({
  displayControlsDefault: false,
  userProperties: false
});

map.addControl(draw);

//set blank geojson
var firebaseGeojsonFeatures = [];

var dataRef = firebase.database().ref('datacollector/coalcreek');
var archiveRef = firebase.database().ref('datacollector/coalcreekArchive');

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

function loadMap() {

  map.addSource('proposedImages', {
  type: 'geojson',
  data: 'proposedImages.geojson'
  });
  map.addSource('proposedBank', {
  type: 'geojson',
  data: 'proposedBank.geojson'
  });
  map.addSource('proposedFloodplain', {
  type: 'geojson',
  data: 'proposedFloodplain.geojson'
  });
  map.addSource('proposedCenterline', {
  type: 'geojson',
  data: 'proposedCenterline.geojson'
  });
  map.addSource('ErieBoundary', {
  type: 'geojson',
  data: 'ErieBoundary.geojson'
  });
  map.addSource('ErieParks', {
  type: 'geojson',
  data: 'ErieParks.geojson'
  });
  map.addSource('ErieTrails', {
  type: 'geojson',
  data: 'ErieTrails.geojson'
  });
  map.addSource('UDFCDBoundary', {
  type: 'geojson',
  data: 'UDFCDBoundary.geojson'
  });
  map.addSource('UDFCDStreams', {
  type: 'vector',
  url: 'mapbox://iconeng.6vjvxmlq'
  });
  map.addSource('counties', {
  type: 'geojson',
  data: 'counties_ln.geojson'
  });
  map.addSource('boulderSFHA', {
  type: 'vector',
  url: 'mapbox://iconeng.c8qwcgbh'
  });
  map.addSource('contours', {
  type: 'vector',
  url: 'mapbox://iconeng.2785towm'
  });
  map.addSource('parcels', {
  type: 'vector',
  url: 'mapbox://iconeng.2ufedrsb'
  });
  map.addSource('conceptualDesign', {
    type: "image",
    url: "County-Line-Road-Conceptual-Plans.png",
    coordinates: [
                  [-105.057352293, 40.070016562],
                  [-105.054566655, 40.070016562],
                  [-105.054566655, 40.059036145],
                  [-105.057352293, 40.059036145]
              ]
  });
  map.addSource('levee', {
  type: 'geojson',
  data: {
    "type": "FeatureCollection",
    "features": [{ "type": "Feature", "properties": {}, "geometry": { "type": "LineString", "coordinates": [ [ -105.04470348358153, 40.05178819388865 ], [ -105.04500389099121, 40.05223166898173 ], [ -105.04529356956482, 40.052814752212925 ], [ -105.04554033279419, 40.05308576103072 ], [ -105.04581928253174, 40.05337319344778 ], [ -105.04599094390868, 40.053529227680805 ], [ -105.04631280899048, 40.053668836954955 ], [ -105.04663467407227, 40.05385771963532 ], [ -105.04672050476074, 40.05387414419149 ], [ -105.04687070846558, 40.053808445943076 ], [ -105.0470209121704, 40.05372632304352 ], [ -105.04732131958006, 40.05372632304352 ] ] } }]
  }
  });
  map.addSource('firebase', {
    type: 'geojson',
    data: {type: 'FeatureCollection',
    features: firebaseGeojsonFeatures
  }
});

callData();

  map.addLayer({
      'id': '1ftContours',
      'type': 'line',
      'source': 'contours',
      'source-layer': 'erieContoursgeojson',
      'filter': ['==', 'index', 1],
      'layout': {
          'visibility': 'none',
          'line-join': 'round',
          'line-cap': 'round'
      },
      'paint': {
        'line-width': {
            "stops": [[15, 0], [17, .5], [19, 1]]
        },
          'line-color': '#424242',
          'line-opacity':.8
      }
  }, 'road-label-small');
  map.addLayer({
      'id': '5ftContours',
      'type': 'line',
      'source': 'contours',
      'source-layer': 'erieContoursgeojson',
      'filter': ['==', 'index', 5],
      'layout': {
          'visibility': 'none',
          'line-join': 'round',
          'line-cap': 'round'
      },
      'paint': {
        'line-width': {
            "stops": [[15, 1], [17, 1.75], [19, 2.5]]
        },
          'line-color': '#424242',
          'line-opacity':.8
      }
  }, 'road-label-small');
  map.addLayer({
      'id': '5ftLabels',
      'type': 'symbol',
      'source': 'contours',
      'source-layer': 'erieContoursgeojson',
      'filter': ['==', 'index', 5],
      'layout': {
          'visibility': 'none',
        'symbol-placement': 'line',
        'text-field': '{CONTOUR}',
        'text-font': ['Roboto Italic','Open Sans Light','Arial Unicode MS Regular'],
        'text-size': {
          "stops": [[15,9],[17,12],[19,14]]
        }
      },
      'paint': {
        'text-color': '#424242',
        'text-halo-color': 'rgba(255,255,255,0.9)',
        'text-halo-width': 1,
        'text-halo-blur': .2
      }
  }, 'road-label-small');

  map.addLayer({
    id: '500yr',
    source: 'boulderSFHA',
    'source-layer': 'boulderSFHAgeojson',
    type: 'fill',
    filter: ['==', 'ZONE_SUBTY', '0.2 PCT ANNUAL CHANCE FLOOD HAZARD'],
    paint: {
        'fill-opacity': 0.45,
        'fill-color': '#7ebdc5',
        'fill-outline-color': '#61a4b3'
    }
  }, 'road-label-small');

  map.addLayer({
    id: '100yr',
    source: 'boulderSFHA',
    'source-layer': 'boulderSFHAgeojson',
    type: 'fill',
    filter: ['==', 'SFHA_TF', 'T'],
    paint: {
        'fill-opacity': 0.45,
        'fill-color': '#2a5674',
        'fill-outline-color': '#2a5674'
    }
  }, 'road-label-small');

  map.addLayer({
      'id': 'udfcd',
      'type': 'line',
      'source': 'UDFCDBoundary',
      'paint': {
          'line-width': 4,
          'line-color': '#f44336',
          'line-dasharray': [4,3],
          'line-opacity': 0
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'ErieBoundary',
      'type': 'fill',
      'source': 'ErieBoundary',
      'paint': {
        'fill-opacity': 0,
        'fill-pattern': 'yellowhatch',
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'parcels',
      'type': 'fill',
      'source': 'parcels',
      'source-layer': 'erieParcels-6xu8na',
      'filter': ['==','isPublic','Y'],
      'layout': {
        'visibility': 'none'
      },
      'paint': {
          'fill-pattern': 'bluestripe',
          'fill-opacity': 0.75
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'parcelOutlines',
      'type': 'line',
      'source': 'parcels',
      'source-layer': 'erieParcels-6xu8na',
      'layout': {
        'visibility': 'none'
      },
      'paint': {
          'line-color': '#fff',
          'line-width': 0.5,
          'line-opacity': .75
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'counties',
      'type': 'line',
      'source': 'counties',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-width':  2.5,
        'line-opacity': 0,
        'line-dasharray': [4,3],
        'line-color': 'black'
      }
  },'road-label-small');

  map.addLayer({
      'id': 'conceptualDesign',
      'type': 'raster',
      'source': 'conceptualDesign',
      'layout': {
        'visibility': 'none'
      }
  });

  map.addLayer({
      'id': 'centerlines',
      'type': 'line',
      'source': 'UDFCDStreams',
      'source-layer': 'UDFCDStreams-0rmhkf',
      'filter': ['==', 'Name', 'Coal Creek (BOCO)'],
      'paint': {
          'line-width': 4,
          'line-color': '#036180',
          'line-opacity': 1
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'levee',
      'type': 'line',
      'source': 'levee',
      'paint': {
          'line-width': 6,
          'line-color': '#D500F9',
          'line-opacity': 0
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'trails',
      'type': 'line',
      'source': 'ErieTrails',
      'paint': {
          'line-width': 1.5,
          'line-color': '#C6FF00',
          'line-opacity': 0
      }
  }, 'road-label-small');

  map.addLayer({
    id: 'parks',
    source: 'ErieParks',
    type: 'circle',
    layout: {
      "visibility": "none"
    },
    paint: {
        "circle-opacity": 1,
        "circle-radius": { "stops": [ [11,2],[15,4],[19,5] ] },
        "circle-color": "#00E676",
        "circle-stroke-width": 1.5,
        "circle-stroke-color": "#fff"
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'proposedFloodplain',
    source: 'proposedFloodplain',
    type: 'fill',
    layout: {
      "visibility": "none",
    },
    paint: {
      "fill-color": "#03A9F4",
      "fill-opacity": .4,
    }
  }, 'country-label-lg');

  map.addLayer({
    id: 'proposedBank',
    source: 'proposedBank',
    type: 'fill',
    layout: {
      "visibility": "none",
    },
    paint: {
      "fill-color": "#9C27B0",
      "fill-opacity": .4,
    }
  }, 'country-label-lg');

  map.addLayer({
    id: 'proposedCenterline',
    source: 'proposedCenterline',
    type: 'line',
    layout: {
      "visibility": "none",
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-color": "orange",
      "line-width": 2
    }
  }, 'country-label-lg');

  map.addLayer({
    id: 'proposedImages',
    source: 'proposedImages',
    type: 'circle',
    layout: {
      "visibility": "none",
    },
    paint: {
      "circle-color":'#E91E63',
      'circle-radius': 8,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#222'
    }
  }, 'country-label-lg');

  map.addLayer({
    id: 'firebasePoly',
    source: 'firebase',
    type: 'fill',
    filter: ["==", '$type', 'Polygon'],
    layout: {
      "visibility": "none",
    },
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
      "visibility": "visible",
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
    layout: {
      "visibility": "visible",
    },
    paint: {
      "circle-color":'blue',
      'circle-radius': 5,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#fff'
    }
  }, 'country-label-lg');

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
  var features = map.queryRenderedFeatures(bbox, { layers: ['firebasePoint','firebaseLine','firebasePoly','proposedImages'] });

  if (!features.length) {
    return;
  }

  var feature = features[0];
  var id = feature.layer.id;

  if (id == 'firebasePoint' || id == 'firebaseLine' || id == 'firebasePoly'){

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

  var createdBy = document.createElement('div');
  createdBy.innerHTML = '<span class="popup-title">Created By:</span> ' + feature.properties.createdBy;
  var createdOn = document.createElement('div');
  createdOn.innerHTML = '<span class="popup-title">Created On:</span> ' + moment(feature.properties.createdOn).format("ddd, MMM D YYYY, h:mm:ss a");
  var editedBy = document.createElement('div');
  editedBy.innerHTML = '<div class="divider"></div><span class="popup-title">Edited By:</span> ' + feature.properties.editedBy;
  var editedOn = document.createElement('div');
  editedOn.innerHTML = '<span class="popup-title">Edited On:</span> ' + moment(feature.properties.editedOn).format("ddd, MMM D YYYY, h:mm:ss a");
  var description = document.createElement('div');
  description.innerHTML = '<span class="popup-title">Description:</span> ' + feature.properties.description;
  var notes = document.createElement('div');
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
} else if (id == 'proposedImages') {

  var imageModal = document.getElementById('modalImage');
  while (imageModal.firstChild) {
    imageModal.removeChild(imageModal.firstChild);
}
  var image = document.createElement('img');
  image.src = "//s3-us-west-2.amazonaws.com/iconeng/maps/images/coalcreek-erie/" + feature.properties.image;
  image.className = 'responsive-img';
  imageModal.insertAdjacentElement('beforeend', image);
  $('#image-modal').modal('open');
}
};

// fire popup
map.on('touchstart', firePopupTouch);

map.on('click', firePopup);

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
  var bbox = [[e.point.x - 2, e.point.y - 2], [e.point.x + 2, e.point.y + 2]];
  var features = map.queryRenderedFeatures(bbox, { layers: ['firebasePoint','firebaseLine','firebasePoly'] });
  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

// disable map rotation using right click + drag
map.dragRotate.disable();

// disable map rotation using touch rotation gesture
map.touchZoomRotate.disableRotation();

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-right');
}
