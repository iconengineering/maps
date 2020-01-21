mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot',
  zoom: 13.75,
  center: [-105.1122, 40.5920],
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
    map.setPaintProperty('contours-1ft', 'visibility', 'none');
    map.setPaintProperty('contours-5ft', 'visibility', 'none');
    map.setPaintProperty('contours-5ftLabels', 'visibility','none');
    map.setPaintProperty('cityFP', 'visibility', 'none');
    map.setPaintProperty('cityFW', 'visibility', 'none');
    map.setPaintProperty('citySF', 'visibility', 'none');
    map.setPaintProperty('wvb-fp-100yr','visibility','none');
    map.setPaintProperty('wvb-fp-100yr-fill','visibility','none');
  });
});

map.on('style.load', function(e) {

  map.addSource('cityFP', {
    type: 'geojson',
    "data": 'data/cityfp.geojson'
  });
  map.addSource('wvb-xs', {
    type: 'geojson',
    "data": 'data/xs.geojson'
  });
  map.addSource('contours', {
    type: 'vector',
    url: 'mapbox://iconeng.7b288ff0'
  });

  map.addSource('wvb-fp-100yr', {
  type: 'geojson',
  "data": 'data/fp-100yr-polygons.geojson'
});


  //WEST VINE XS
  map.addLayer({
    'id': 'wvb-xs',
    'type': 'line',
    'source': 'wvb-xs',
    'paint': {
      'line-width': 2,
      'line-opacity': 1,
      'line-color': 'rgba(0,0,0,1)'
    },
    'layout': {
      'visibility': 'visible'
    }
  });
  //WEST VINE XS Labels
  map.addLayer({
    'id': 'wvb-xsLabels',
    'type': 'symbol',
    'source': 'wvb-xs',
    'layout': {
      'visibility':'visible',
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{XSName}',
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
      'text-color': '#000',
      'text-halo-color': '#ffffff',
      'text-halo-width': 2,
      'text-halo-blur': 1
    }
  });
  //West Vine 100 yr FP
  map.addLayer({
    'id': 'wvb-fp-100yr',
    'type': 'line',
    'source': 'wvb-fp-100yr',
    'paint': {
      'line-width': 1,
      'line-opacity': 0.6,
      'line-color': 'rgba(0,230,255,1)'
    },
    'layout': {
      'visibility': 'visible'
    }
  });
  //100-YR FLOODPLAIN FILL
map.addLayer({
  'id': 'wvb-fp-100yr-fill',
  'type': 'fill',
  'source': 'wvb-fp-100yr',
  'layout': {
    'visibility': 'visible'
  },
  'paint': {
    'fill-color': 'rgba(0,230,255,1)',
    'fill-opacity': 0.3
  }
}, 'road_label');
  //City Floodplain - 100-yr
  map.addLayer({
    'id': 'cityFP',
    'type': 'line',
    'filter': ['all', ['==', "FP_NAME", "WEST VINE"],
      ['==', "FLOOD_TYPE", "100 YEAR"]
    ],
    'source': 'cityFP',
    'paint': {
      'line-color': '#993300',
      'line-opacity': 1
    },
    'layout': {
      'visibility': 'none'
    }
  });
  // City Floodplain - Floodway
  map.addLayer({
    'id': 'cityFW',
    'type': 'line',
    'filter': ['all', ['==', "FP_NAME", "WEST VINE"],
      ['==', "FLOOD_TYPE", "0.5 FOOT FLOODWAY"]
    ],
    'source': 'cityFP',
    'paint': {
      'line-color': '#FF0000',
      'line-opacity': 1
    },
    'layout': {
      'visibility': 'none'
    }
  });
  // City Floodplain - Shallow Flooding
  map.addLayer({
    'id': 'citySF',
    'type': 'line',
    'filter': ['all', ['==', "FP_NAME", "WEST VINE"],
      ['==', "FLOOD_TYPE", "<= 1FT"]
    ],
    'source': 'cityFP',
    'paint': {
      'line-color': '#800000',
      'line-opacity': 1
    },
    'layout': {
      'visibility': 'none'
    }
  });
  //Contours - 1FT
  map.addLayer({
    'id': 'contour-1ft',
    'type': 'line',
    'source': 'contours',
    'source-layer': 'wvb_contours',
    'filter': ['all', ['==', 'Index', 0]],
    'layout': {
      'line-join': 'round',
      'visibility': 'none',
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
      'line-color': '#bd925a'
    }
  }, 'road_label');
  //Contours - 5 ft
  map.addLayer({
    'id': 'contour-5ft',
    'type': 'line',
    'source': 'contours',
    'source-layer': 'wvb_contours',
    'filter': ['all', ['>=', 'Index', 5],
      ['<=', 'Index', 10]
    ],
    'layout': {
      'line-join': 'round',
      'visibility': 'none',
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
      'line-color': '#bd925a'
    }
  }, 'road_label');
  //Contours - 5 ft Labels
  map.addLayer({
    'id': 'contour-5ftLabels',
    'type': 'symbol',
    'source': 'contours',
    'source-layer': 'wvb_contours',
    'filter': ['all', ['>=', 'Index', 5],
      ['<=', 'Index', 10]
    ],
    'layout': {
      'symbol-placement': 'line',
      'visibility': 'none',
      'text-field': '{CONTOUR}',
      'text-size': {
        "stops": [
          [15, 12],
          [17, 14],
          [19, 16]
        ]
      }
    },
    'paint': {
      'text-color': '#bd925a',
      'text-halo-color': '#F8F4F0',
      'text-halo-width': 2,
      'text-halo-blur': 0.5
    }
  });


}); //end style load

// When a click event occurs near a marker icon, open a popup at the location of

// the feature, with description HTML from its properties.

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.

//Cross Section Labels
map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['wvb-xs']
  });
  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(feature.properties.RiverName + ' ' + feature.properties.ReachName + '<br>' + 'XS: ' + feature.properties.XSName + '<br>' + 'WSEL:' + feature.properties.XSWSElev)
    .addTo(map);
});

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['wvb-xs']
  });
  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});



map.addControl(new mapboxgl.NavigationControl(), 'top-right');
