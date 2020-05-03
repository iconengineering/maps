mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot',
  zoom: 13,
  center: [-104.8969, 39.5666],
  hash: true,
  preserveDrawingBuffer: true
});

var layerList = document.getElementById('menu');

$(document).ready(function() {
  $("#clear").click(function() {
    var checkBoxes = $("input[type=checkbox]");
    checkBoxes.prop("checked", false);
    map.setPaintProperty('basinOutlines', 'line-opacity', 0);
    map.setPaintProperty('draingeways', 'line-opacity', 0)
    map.setPaintProperty('flowDepth', 'visibility', 'none');
    map.setPaintProperty('1ftContours', 'line-opacity', 0);
    map.setPaintProperty('5ftContours', 'line-opacity', 0);
    map.setPaintProperty('5ftLabels', 'text-opacity', 0);
    map.setPaintProperty('parcels', 'line-opacity', 0);
    map.setPaintProperty('rasboudnary', 'line-opacity', 0);
  });
});

map.on('style.load', function(e) {

  map.addSource('basinOutlines', {
    type: 'geojson',
    "data": 'basinOutlines.geojson'
  });
  map.addSource('contours', {
    type: 'vector',
    url: 'mapbox://iconeng.d80vvltu'
  });
  map.addSource('drainageways', {
    type: 'vector',
    url: 'mapbox://iconeng.6xshx73b'
  });
  map.addSource('flowDepth', {
    type: 'vector',
    url: 'mapbox://iconeng.7ir8lsql'
  });
  map.addSource('parcels', {
    type: 'geojson',
    "data": 'parcels.geojson'
  });
  map.addSource('rasboundary', {
    type: 'geojson',
    "data": 'rasboundary.geojson'
  });
  map.addSource('studyArea',{
    type: 'geojson',
    "data": 'StudyArea.geojson'
  });

  //Add Study Area
  map.addLayer({
    'id': 'studyArea',
    'type': 'line',
    'source': 'studyArea',
    'paint': {
      'line-width': 3,
      'line-opacity': 1,
      'line-color': 'rgba(0,0,0,1)',
      }
  });

  //Add Basin Outlines
  map.addLayer({
    'id': 'basinOutlines',
    'type': 'line',
    'source': 'basinOutlines',
    'paint': {
      'line-width': 1,
      'line-opacity': 0,
      'line-color': 'rgba(0,0,0,1)',
      'line-dasharray': [8, 4]
    }
  });

  //Add 5 ft Contours
  map.addLayer({
    'id': '5ftContours',
    'type': 'line',
    'source': 'contours',
    'source-layer': 'contours_clipped-c5t1bg',
    'filter': ['all', ['>', 'Index', 1]],
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-width': {
        "stops": [
          [15, 1],
          [17, 1.75],
          [19, 2.5]
        ]
      },
      'line-opacity': 0,
      'line-color': '#bd925a'
    }
  }, 'road-label-small');

  //  Add 1ft contours
  map.addLayer({
    'id': '1ftContours',
    'type': 'line',
    'source': 'contours',
    'source-layer': 'contours_clipped-c5t1bg',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-width': {
        "stops": [
          [15, 0],
          [17, .5],
          [19, 1]
        ]
      },
      'line-opacity': 0,
      'line-color': '#bd925a'
    }
  }, 'road-label-small');

  // 5 ft. Contour Labels
  map.addLayer({
    'id': '5ftLabels',
    'type': 'symbol',
    'source': 'contours',
    'source-layer': 'contours_clipped-c5t1bg',
    'filter': ['all', ['>', 'Index', 1]],
    'layout': {
      'symbol-placement': 'line',
      'text-field': '{CONTOUR}',
      'text-font': ['Roboto Light Italic', 'Open Sans Light', 'Arial Unicode MS Regular'],
      'text-size': {
        "stops": [
          [15, 9],
          [17, 11],
          [19, 13]
        ]
      }
    },
    'paint': {
      'text-color': '#bd925a',
      'text-halo-color': '#F8F4F0',
      'text-halo-width': 2,
      'text-halo-blur': 0.5,
      'text-opacity': 0
    }
  }, 'road-label-small');

  //Add Drainageways
  map.addLayer({
    'id': 'drainageways',
    'type': 'line',
    'source': 'drainageways',
    'source-layer': 'drainageways-cbyi1o',
    'paint': {
      'line-width': 2,
      'line-opacity': 1,
      'line-color': 'rgba(0,77,168,0.9)',
    }
  });

  //Add Drainageway Labels
  map.addLayer({
    'id': 'dwayLabels',
    'type': 'symbol',
    'source': 'drainageways',
    'source-layer': 'drainageways-cbyi1o',
    'layout': {
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{str_name}',
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
      'text-color': '#FFFFFF',
      'text-halo-color': 'rgba(0,77,168,0.9)',
      'text-halo-width': 2,
      'text-halo-blur': 1
    }
  });

  //Add Flow depth
  map.addLayer({
    'id': 'flowDepth',
    'type': 'fill',
    'source': 'flowDepth',
    'source-layer': 'wct_depth_merged-6uujq7',
    'filter': ['>=', 'VALUE', 0.08],
    'paint': {
      'fill-color': {
        property: 'VALUE',
        type: 'interval',
        stops: [
          [.25, 'rgb(252,244,182)'],
          [.5, 'rgb(245,194,152)'],
          [1, 'rgb(227,147,138)'],
          [1.5, 'rgb(199,101,134)'],
          [2, 'rgb(161,59,139)'],
          [3, 'rgb(109,23,143)'],
          [4, 'rgb(14,9,135)']
        ]
      },
      'fill-opacity': 0.8
    },
    'layout': {
      'visibility': 'none'
    }
  }, 'road-label-small');

  //Add parcels to layer
  map.addLayer({
    'id': 'parcels',
    'type': 'line',
    'source': 'parcels',
    'paint': {
      'line-color': '#dc0714',
      'line-width': 1,
      'line-opacity': 0
    },
  });

  // Add RAS Boundary to mapbox
  map.addLayer({
      'id': 'rasboundary',
      'type': 'line',
      'source': 'rasboundary',
      'paint': {
        'line-color': '#008000',
        'line-width': 3,
        'line-opacity': 0
      },
  });
}); //end style load

// When a click event occurs near a marker icon, open a popup at the location of

// the feature, with description HTML from its properties.

map.on('click', function(e) {

  var features = map.queryRenderedFeatures(e.point, {
    layers: ['flowDepth']
  });
  if (!features.length) {
    return;
  }
  var feature = features[0];
  if (feature.layer.id == 'flowDepth') {
    var popup = new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<span>Depth: </span>' + Math.round(feature.properties.VALUE * 100) / 100 + ' ft')
      .addTo(map);

  } else {
    return;
  }
});

// Change cursor over clickable features
map.on('mousemove', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['flowDepth']
  });
  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});


map.addControl(new mapboxgl.NavigationControl(), 'top-left');
