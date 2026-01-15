// actions on draw
map.on('draw.create', function() {

  var card = document.getElementById('input-card');

  var form = '<div class="card-content white-text"><span class="card-title">Enter Your Comment</span><div class="row"><form action="#" class="col s12"><div class="input-field col s12"><textarea id="description" class="materialize-textarea"></textarea><label for="description">Description</label></div></form></div></div>';

  card.innerHTML = form;

  var action = document.createElement('div');
  action.className = 'card-action';
  action.id = 'cardAction';
  var actionA = document.createElement('a');
  actionA.className = 'btn blue darken-2';
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
    var thanks = '<div class="card-content white-text"><span class="card-title">Draw a Feature</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue blue btn darken-2 white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminLine" class="waves-effect waves-blue blue btn darken-2 white-text" onclick="drawLine()"><i class="material-icons">show_chart</i></a><a id="adminPolygon" class="waves-effect waves-blue blue btn darken-2 white-text" onclick="drawPoly()"><i class="material-icons">layers</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>';

    card.innerHTML = thanks;

  });

  // cancel form/point submittal
  cancelButton.addEventListener('click', function(){

    draw.deleteAll();
    draw.changeMode('simple_select');

    var card = document.getElementById('input-card');
    var reset = '<div class="card-content white-text"><span class="card-title">Draw a Feature</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue blue btn darken-2 white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminLine" class="waves-effect waves-blue blue btn darken-2 white-text" onclick="drawLine()"><i class="material-icons">show_chart</i></a><a id="adminPolygon" class="waves-effect waves-blue blue btn darken-2 white-text" onclick="drawPoly()"><i class="material-icons">layers</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>';

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
        actionA.className = 'btn blue darken-2';
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
          var editedBy = firebase.auth().currentUser.displayName;
          var editedOn = firebase.database.ServerValue.TIMESTAMP;
          var description = document.getElementById('description').value;
          var notes = document.getElementById('notes').value;
          var id = draw.getSelected().features[0].id;

          // set semantic data for point
          draw.setFeatureProperty(id,"createdBy",createdBy);
          draw.setFeatureProperty(id,"createdOn",createdOn);
          draw.setFeatureProperty(id,"description",description);
          draw.setFeatureProperty(id,"editedBy",editedBy);
          draw.setFeatureProperty(id,"editedOn",editedOn);
          draw.setFeatureProperty(id,"notes",notes);

          firebase.database().ref('datacollector/coalcreek/' + featureKey).update(draw.getSelected().features[0], function(error) {
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
          var thanks = '<div class="card-content white-text"><span class="card-title">Draw a Feature</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue blue btn darken-2 white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminLine" class="waves-effect waves-blue blue btn darken-2 white-text" onclick="drawLine()"><i class="material-icons">show_chart</i></a><a id="adminPolygon" class="waves-effect waves-blue blue btn darken-2 white-text" onclick="drawPoly()"><i class="material-icons">layers</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>';

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

          firebase.database().ref('datacollector/coalcreek/' + featureKey).remove(function(error) {
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
          var thanks = '<div class="card-content white-text"><span class="card-title">Draw a Feature</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue blue btn darken-2 white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminLine" class="waves-effect waves-blue blue btn darken-2 white-text" onclick="drawLine()"><i class="material-icons">show_chart</i></a><a id="adminPolygon" class="waves-effect waves-blue blue btn darken-2 white-text" onclick="drawPoly()"><i class="material-icons">layers</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>'

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

          var reset = '<div class="card-content white-text"><span class="card-title">Draw a Feature</span></div><div id="action" class="card-action"><a id="adminPoint" class="waves-effect waves-blue blue btn darken-2 white-text" onclick="drawPoint()"><i class="material-icons">place</i></a><a id="adminLine" class="waves-effect waves-blue blue btn darken-2 white-text" onclick="drawLine()"><i class="material-icons">show_chart</i></a><a id="adminPolygon" class="waves-effect waves-blue blue btn darken-2 white-text" onclick="drawPoly()"><i class="material-icons">layers</i></a><a id="adminEdit" class="deep-orange accent-1 waves-effect waves-deep-orange btn white-text" onclick="adminEdit()"> <i class="material-icons">create</i></a></div>';

          card.innerHTML = reset;

        });
      });
    });
  }
}); // end of admin edit functions
