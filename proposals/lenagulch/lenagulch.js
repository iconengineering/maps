mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot',
  zoom: 14.5,
  center: [-105.2071, 39.7163],
  hash: true,
  preserveDrawingBuffer: true
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
  var layerId = layer.target.value;
  map.setStyle('mapbox://styles/iconeng/' + layerId);
  $('.layer-off').prop('checked', false);
  $('.layer-on').prop('checked', true);
}

for (var i = 0; i < inputs.length; i++) {
  inputs[i].onclick = switchLayer;
}

$(document).ready(function() {
  $("#clear").click(function() {
    var checkBoxes = $("input[type=checkbox]");
    checkBoxes.prop("checked", false);
  });
});

map.on('style.load', function(e) {

  map.addSource('nfhl', {
    type: 'geojson',
    "data": 'data/nfhl.geojson'
  });


  //  NHFL Floodplain Outline
  map.addLayer({
    'id': 'nfhl-fp-line',
    'type': 'line',
    'source': 'nfhl',
    'paint': {
      'line-width': 0.5,
      'line-opacity': 0.5,
      'line-color': 'black',
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //  NFHL Floodplain 100yr Hatch
  map.addLayer({
    'id': 'nfhl-100yr-hatch',
    'type': 'fill',
    'source': 'nfhl',
    'filter': ["all",
      ["!in", "ZONE_SUBTY", "FLOODWAY"],
      ["in", "FLD_ZONE", 'A', 'AE', 'AO']
    ],
    'paint': {
      'fill-color': 'rgb(0,230,255)',
      'fill-opacity': 0.3,
    },
    'layout': {
      'visibility': 'visible',
    }
  });

  // NFHL Floodplain 500yr Hatch
  map.addLayer({
    'id': 'nfhl-500yr-hatch',
    'type': 'fill',
    'source': 'nfhl',
    'filter': ['==', "ZONE_SUBTY", "0.2 PCT ANNUAL CHANCE FLOOD HAZARD"],
    'paint': {
      'fill-color': 'rgb(255,128,0)',
      'fill-opacity': 0.3,
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //  NFHL Floodplain Floodway Hatch
  map.addLayer({
    'id': 'nfhl-fldwy',
    'type': 'fill',
    'source': 'nfhl',
    'filter': ['in', "ZONE_SUBTY", "FLOODWAY"],
    'paint': {
      'fill-color': 'purple',
      'fill-opacity': 0.3,
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  map.addSource('crossStructure', {
    type: 'geojson',
    "data": 'data/crossingstructures.geojson'
  });

  // Crossing STructures
  map.addLayer({
    'id': 'crossStructure-outline',
    'type': 'line',
    'source': 'crossStructure',
    'layout': {
      'visibility': 'visible'
    }
  });

  map.addLayer({
    'id': 'crossStructure-fill',
    'type': 'fill',
    'source': 'crossStructure',
    'paint': {
      'fill-opacity': 0.5,
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  map.addSource('lena-cl', {
    type: 'geojson',
    "data": 'data/lenagulch-cl.geojson'
  });

  //Drainageway centerline
  map.addLayer({
    'id': 'lena-cl',
    'type': 'line',
    'source': 'lena-cl',
    'paint': {
      'line-width': 1,
      'line-opacity': 1,
      'line-color': 'rgba(0,77,168,1)'
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //Drainageway Centerline LABEL
  map.addLayer({
    'id': 'lena-cl-labels',
    'type': 'symbol',
    'source': 'lena-cl',
    'layout': {
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

  map.addSource('apex-cl', {
    type: 'geojson',
    "data": 'data/apex-cl.geojson'
  });

  //Drainageway centerline
  map.addLayer({
    'id': 'apex-cl',
    'type': 'line',
    'source': 'apex-cl',
    'paint': {
      'line-width': 1,
      'line-opacity': 1,
      'line-color': 'rgba(0,77,168,1)'
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //Drainageway Centerline LABEL
  map.addLayer({
    'id': 'apex-cl-labels',
    'type': 'symbol',
    'source': 'apex-cl',
    'layout': {
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
















  var style = map.getStyle();

  if (style.name != 'Outdoors') {
    map.setLayoutProperty('conduitArrows', 'icon-image', 'oneway-spaced-white-small');
  }


}); //end map load



// When a click event occurs near a marker icon, open a popup at the location of the feature, with description HTML from its properties.


//Structure Labels
map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['crossStructure-fill']
  });
  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(feature.properties.Label)
    .addTo(map);
});

//Use the same approach as above to indicate that the symbols are clickable by changing the cursor style to 'pointer'.
map.on('mousemove', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['crossStructure-fill']
  });
  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});



map.addControl(new mapboxgl.NavigationControl(), 'top-right');
