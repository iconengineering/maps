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
//Map reach colors
  map.addLayer({
    'id': 'reaches',
    'type': 'line',
    'source': 'reaches',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 3,
      'line-color': {
        property: 'Reach_Name',
        type: 'categorical',
        stops: [
          ['Reach 1', '#FF5733'],
          ['Reach 2', '#9e0142'],
          ['Reach 3', '#ffe066'],
          ['Reach 4', '#00bd9d'],
          ['Reach 5', '#e67f0d'],
          ['Reach 6', '#3d314a'],
          ['Reach 7', '#abdda4'],
          ['Reach 8', '#78cdd7'],
          ['Reach 9', '#f79d84'],
          ['Reach 10', '#5e4fa2'],
          ['Reach 11', '#8c510a'],
          ['Reach 12', '#762a83'],  
          ['Reach 13', '#00441b']
        ]
      }
    }
  });

  map.addLayer({
    'id': 'reaches-label',
    'type': 'symbol',
    'source': 'reaches',
    'layout': {
      'visibility': 'none',
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

//MHFD Stream 
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
    'line-color': '#0000ff'
  },
  'layout': {
    'visibility': 'none'
  }
});

  //MHFD Stream Centerline LABEL
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

 //Hydraulic Centerline 
 map.addSource('ras-reaches', {
  type: 'geojson',
  "data": 'geojson/centerline.geojson'
});

map.addLayer({
  'id': 'ras-reaches',
  'type': 'line',
  'source': 'ras-reaches',
  'layout': {
    "visibility": 'visible'
  },
  'paint': {
    'line-width': 3,
    'line-color': '#0000ff'
  }
});

  //Hydraulic Centerline LABEL
  map.addLayer({
    'id': 'ras-reaches-label',
    'type': 'symbol',
    'source': 'ras-reaches',
    'layout': {
      'visibility': 'visible',
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{DWAY_NAME}',
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

//Drone Pano
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

  map.addSource('fp-100yr', {
    type: 'geojson',
    "data": 'geojson/fp_100yr.geojson'
  });

  //100 yr FP Outline
  map.addLayer({
    'id': 'fp-100yr',
    'type': 'line',
    'source': 'fp-100yr',
    // 'filter': ['all', ['==', "FLOOD_TYPE", "100-Year Floodplain"]],
    'paint': {
      'line-width': 1,
      'line-opacity': 0.6,
      'line-color': 'rgb(190,210,255)'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  //100-YR FLOODPLAIN FILL
  map.addLayer({
    'id': 'fp-100yr-fill',
    'type': 'fill',
    'source': 'fp-100yr',
    // 'filter': ['all', ['==', "FLOOD_TYPE", "100-Year Floodplain"]],
    'layout': {
      'visibility': 'none'
    },
    'paint': {
      'fill-color': '#00e6ff',
      'fill-opacity': 0.4
    }
  });
  map.addSource('fp-500yr', {
    type: 'geojson',
    "data": 'geojson/fp_500yr.geojson'
  });

  //500 yr FP Outline
  map.addLayer({
    'id': 'fp-500yr',
    'type': 'line',
    'source': 'fp-500yr',
    // 'filter': ['all', ['==', "FLOOD_TYPE", "500-Year Floodplain"]],
    'paint': {
      'line-width': 1,
      'line-opacity': 0.6,
      'line-color': 'rgb(190,210,255)'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  //500-YR FLOODPLAIN FILL
  map.addLayer({
    'id': 'fp-500yr-fill',
    'type': 'fill',
    'source': 'fp-500yr',
    // 'filter': ['all', ['==', "FLOOD_TYPE", "500-Year Floodplain"]],
    'layout': {
      'visibility': 'none'
    },
    'paint': {
      'fill-color': '#ff8000',
      'fill-opacity': 0.4
    }
  });

  map.addSource('fp-fldwy', {
    type: 'geojson',
    "data": 'geojson/fp_fldwy.geojson'
  });

  //Floodway Outline
  map.addLayer({
    'id': 'fp-fldwy',
    'type': 'line',
    'source': 'fp-fldwy',
    // 'filter': ['all', ['==', "FLOOD_TYPE", "100-Year Floodplain"]],
    'paint': {
      'line-width': 1.5,
      'line-opacity': 0.6,
      'line-color': '#ff8000'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  map.addSource('fp-xs', {
    type: 'geojson',
    "data": 'geojson/fp_xs.geojson'
  });

  //XS
  map.addLayer({
    'id': 'fp-xs',
    'type': 'line',
    'source': 'fp-xs',
    'paint': {
      'line-width': 2,
      'line-opacity': 1,
      'line-color': 'rgba(0,0,0,1)'
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //XS Labels
  map.addLayer({
    'id': 'fp-xsLabels',
    'type': 'symbol',
    'source': 'fp-xs',
    'layout': {
      'visibility': 'visible',
      // 'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{XSEC_ID}',
      'text-size': 12,
      "text-padding": 10,
      'text-anchor': 'right',
    },
    'paint': {
      'text-color': '#000',
      'text-halo-color': '#ffffff',
      'text-halo-width': 2,
      'text-halo-blur': 1
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

//Cross Section Labels
map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['fp-xs']
  });
  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('<b> XS: ' + feature.properties.XSEC_ID + '</b > <br>' + feature.properties.DWAY_NAME + '<br>' + '100-YR WSEL: ' + feature.properties.WSEL.toFixed(2))
    .addTo(map);
});



// .setHTML('<h3><a href="' + feature.properties.URL + '">' + feature.properties.Company + '</a></h3>')

map.on('mousemove', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['reaches', 'drone_pano', 'fp-xs'] });

  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

//Zoom to Reach
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
document.getElementById('Reach5').addEventListener('click', function () {
  var bbox = [[-104.908, 39.778], [-104.893, 39.786]];
  map.fitBounds(bbox, { padding: 50 });
});
document.getElementById('Reach6').addEventListener('click', function () {
  var bbox = [[-104.902, 39.772], [-104.887, 39.779]];
  map.fitBounds(bbox, { padding: 50 });
});
document.getElementById('Reach7').addEventListener('click', function () {
  var bbox = [[-104.890, 39.766], [-104.877, 39.774]];
  map.fitBounds(bbox, { padding: 50 });
});
document.getElementById('Reach8').addEventListener('click', function () {
  var bbox = [[-104.878, 39.762], [-104.865, 39.769]];
  map.fitBounds(bbox, { padding: 50 });
});
document.getElementById('Reach9').addEventListener('click', function () {
  var bbox = [[-104.866, 39.758], [-104.853, 39.765]];
  map.fitBounds(bbox, { padding: 50 });
});
document.getElementById('Reach10').addEventListener('click', function () {
  var bbox = [[-104.854, 39.752], [-104.837, 39.761]];
  map.fitBounds(bbox, { padding: 50 });
});
document.getElementById('Reach11').addEventListener('click', function () {
  var bbox = [[-104.839, 39.751], [-104.816, 39.762]];
  map.fitBounds(bbox, { padding: 50 });
});
document.getElementById('Reach12').addEventListener('click', function () {
  var bbox = [[-104.817, 39.744], [-104.790, 39.759]];
  map.fitBounds(bbox, { padding: 50 });
});
document.getElementById('Reach13').addEventListener('click', function () {
  var bbox = [[-104.792, 39.736], [-104.768, 39.748]];
  map.fitBounds(bbox, { padding: 50 });
});