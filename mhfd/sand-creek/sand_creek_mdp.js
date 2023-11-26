mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
  zoom: 11,
  center: [-104.8821, 39.7684],
  hash: true,
  preserveDrawingBuffer: true
});


var layerList = document.getElementById('menu');
// var inputs = layerList.getElementsByTagName('input');
//
// function switchLayer(layer) {
//     var layerId = layer.target.value;
//     map.setStyle('mapbox://styles/iconeng/' + layerId);
//     $('.layer-off').prop('checked', false);
//     $('.layer-on').prop('checked', true);
// }
//
// for (var i = 0; i < inputs.length; i++) {
//     inputs[i].onclick = switchLayer;
// }

$(document).ready(function () {
  $("#clear").click(function () {
    var checkBoxes = $("input[type=checkbox]");
    checkBoxes.prop("checked", false);
    map.setPaintProperty('watersheds', 'fill-opacity', 0);
    map.setPaintProperty('ponds', 'fill-opacity', 0);
    map.setPaintProperty('flowDepth', 'fill-opacity', 0);
    map.setPaintProperty('flowDepthOver', 'fill-opacity', 0);

  });
});

map.on('style.load', function (e) {

  map.addSource('reaches', {
    type: 'geojson',
    "data": 'geojson/reaches.geojson'
  });

  map.addLayer({
    'id': 'reaches',
    'type': 'line',
    'source': 'reaches',
    'layout': {
      "visibility": 'visible'
    },
    'paint': {
      'line-width': 3,
      'line-color': {
        property: 'Reach_Name',
        type: 'categorical',
        stops: [
          ['Reach1', '#FF5733'],
          ['Reach2', '#FF5733'],
          ['Reach3', '#FF5733'],
          ['Reach4', '#FF5733'],
          ['Reach5', '#FF5733']
        ]
      }
    }
  });

  map.addLayer({
    'id': 'reaches-label',
    'type': 'symbol',
    'source': 'reaches',
    'layout': {
      'visibility': 'visible',
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{Reach_Name}',
      'text-size': {
        "stops": [
          [15, 12],
          [17, 14],
          [19, 16]
        ]
      },
      "text-padding": 100,
    },
    'paint': {
      'text-color': 'rgba(0,77,168,1)',
      'text-halo-color': '#ffffff',
      'text-halo-width': 2,
      'text-halo-blur': 1
    }
  });


  map.addSource('mhfd-streams', {
    type: 'vector',
    url: 'mapbox://iconeng.d9coogno'
  });

  map.addLayer({
    'id': 'mhfd-streams',
    'type': 'line',
    'source': 'mhfd-streams',
    'source-layer': 'mhfd_streams-dbmy0f',
    'paint': {
      'line-width': 2,
      'line-opacity': 1,
      'line-color': 'rgba(0,77,168,1)'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  //Drainageway Centerline LABEL
  map.addLayer({
    'id': 'mhfd-stream-labels',
    'type': 'symbol',
    'source': 'mhfd-streams',
    'source-layer': 'mhfd_streams-dbmy0f',
    'layout': {
      'visibility': 'none',
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{Str_Name}',
      'text-size': {
        "stops": [
          [15, 12],
          [17, 14],
          [19, 16]
        ]
      },
      "text-padding": 100,
    },
    'paint': {
      'text-color': 'rgba(0,77,168,1)',
      'text-halo-color': '#ffffff',
      'text-halo-width': 2,
      'text-halo-blur': 1
    }
  });


  map.addSource('drone_pano', {
    type: 'geojson',
    "data": 'geojson/drone_pano.geojson'
  });

  map.addLayer({
    'id': 'drone_pano',
    'type': 'circle',
    'source': 'drone_pano',
    'layout': {
      "visibility": 'visible'
    },
    'paint': {
      'circle-radius': 5,
      'circle-color': '#f7945d'
    }
  });














});


map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['reaches']
  });
  if (!features.length) {
    return;
  }

  var feature = features[0];
  // var photoPath = path.join("images/"+feature.properties.Photo+".jpg");

  var popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('<h8><b>' + feature.properties.Reach_Name + '</b>' +
      '<br><h8>Confluence to Brighton Blvd ' + feature.properties.color +
      // '</h8> <br>' + '<img src= "images/' + feature.properties.Photo + '.jpg" height=240px>' +
      '<br> Videos: <br>' + '<a href="' + feature.properties.Youtube1 + '" target="_blank">' + 'Reach 1 Comparison Video' + '</a>'

    )
    .addTo(map);
});


// Drone Panoramic Popup


map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['drone_pano']
  });
  if (!features.length) {
    return;
  }

  var feature = features[0];
  // var photoPath = path.join("images/"+feature.properties.Photo+".jpg");

  var popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('<h8><b>' + feature.properties.Descr + '</b>' +
      '<br> Open in new tab: <br>' + '<a href="' + feature.properties.URL + '" target="_blank">' + feature.properties.Descr + '</a>' +
      '<br>' + '<iframe width="5000" height="300" src=' + feature.properties.URL + '" allowfullscreen>' +

      // '</h8> <br>' + '<img src= "images/' + feature.properties.Photo + '.jpg" height=240px>' +
      '<br> Videos: <br>' + '<a href="' + feature.properties.Youtube1 + '" target="_blank">' + 'Reach 1 Comparison Video' + '</a>'

    )
    .addTo(map);
});


// .setHTML('<h3><a href="' + feature.properties.URL + '">' + feature.properties.Company + '</a></h3>')

map.on('mousemove', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['reaches', 'drone_pano'] });

  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');


//Reach buttons use coordinates SW to NE Coordinates

document.getElementById('Reach1').addEventListener('click', function () {
  var bbox = [[-104.960, 39.804], [-104.936, 39.815]];
  map.fitBounds(bbox, { padding: 50 });
});

document.getElementById('Reach2').addEventListener('click', function () {
  var bbox = [[-104.946, 39.796], [-104.926, 39.806]];
  map.fitBounds(bbox, { padding: 50 });
});
document.getElementById('Reach3').addEventListener('click', function () {
  var bbox = [[-104.932, 39.790], [-104.911, 39.797]];
  map.fitBounds(bbox, { padding: 50 });
});
document.getElementById('Reach4').addEventListener('click', function () {
  var bbox = [[-104.919, 39.784], [-104.902, 39.793]];
  map.fitBounds(bbox, { padding: 50 });
});
