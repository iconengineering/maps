mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot',
  zoom: 13.2,
  center: [-104.9917,40.6978],
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
    map.setPaintProperty('contours-5ftLabels', 'visibility', 'none');
    map.setPaintProperty('cityFP', 'visibility', 'none');
    map.setPaintProperty('cityFW', 'visibility', 'none');
    map.setPaintProperty('citySF', 'visibility', 'none');
    map.setPaintProperty('wvb-fp-100yr', 'visibility', 'none');
    map.setPaintProperty('wvb-fp-100yr-fill', 'visibility', 'none');
  });
});

map.on('style.load', function(e) {

  map.addSource('cityBoundary', {
    type: 'geojson',
    "data": 'data/cityBoundary.geojson'
  });

  map.addSource('stormAlignment', {
    type: 'geojson',
    "data": 'data/stormAlignment.geojson'
  });

  map.addSource('drainageways', {
    type: 'geojson',
    "data": 'data/drainageways.geojson'
  });

  map.addSource('swmmBasins',{
    type: 'geojson',
    "data":'data/swmm_basins.geojson'
  });

  map.addSource('swmmConduits',{
    type: 'geojson',
    "data":'data/swmm_routing.geojson'
  });

  map.addSource('swmmJunctions',{
    type: 'geojson',
    "data":'data/swmm_junc.geojson'
  });

  map.addSource('swmmDividers',{
    type: 'geojson',
    "data":'data/swmm_dividers.geojson'
  });

  map.addSource('swmmOutfalls',{
    type: 'geojson',
    "data":'data/swmm_outfalls.geojson'
  });

  map.addSource('swmmStorages',{
    type: 'geojson',
    "data":'data/swmm_storages.geojson'
  });

  //
  // map.addSource('cityFP', {
  //   type: 'geojson',
  //   "data": 'data/cityfp.geojson'
  // });
  // map.addSource('wvb-xs', {
  //   type: 'geojson',
  //   "data": 'data/xs.geojson'
  // });
  // map.addSource('contours', {
  //   type: 'vector',
  //   url: 'mapbox://iconeng.aln7flwh'
  //   // Old MP Smoothed iconeng.7b288ff0
  // });
  // map.addSource('fp', {
  //   type: 'geojson',
  //   "data": 'data/fp.geojson'
  // });
  // map.addSource('wvb-hydStructure', {
  //   type: 'geojson',
  //   "data": 'data/roadwaycrossings.geojson'
  // });
  // map.addSource('latStructure', {
  //   type: 'geojson',
  //   "data": 'data/lateralstructure.geojson'
  // });
  // map.addSource('wvb-canals', {
  //   type: 'geojson',
  //   "data": 'data/canals.geojson'
  // });

  //Town Boundary
  map.addLayer({
    'id': 'cityBoundary',
    'type': 'line',
    'source': 'cityBoundary',
    'paint': {
      'line-width': 2,
      'line-color': 'black'
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  // Proposed Storm Improvement Alignments
  map.addLayer({
    'id': 'stormAlignment',
    'type': 'line',
    'source': 'stormAlignment',
    'paint': {
      'line-width': 2,
      'line-color': 'red'
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //Drainageway centerline
  map.addLayer({
    'id': 'drainageways',
    'type': 'line',
    'source': 'drainageways',
    'paint': {
      'line-width': 1.5,
      'line-opacity': 1,
      'line-color': 'rgba(0,77,168,1)'
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //Drainageway Centerline LABEL
  map.addLayer({
    'id': 'drainageway-streamLabels',
    'type': 'symbol',
    'source': 'drainageways',
    'layout': {
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{GNIS_Name}',
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

  // SWMM Basins
  map.addLayer({
      'id': 'swmmBasins',
      'type': 'line',
      'source': 'swmmBasins',
      'paint': {
          'line-width': 1,
          'line-opacity': 1,
          'line-color': 'rgba(0,0,0,1)',
          'line-dasharray': [8,4]
      }
  });

  //SWMM Conduits
  map.addLayer({
    'id': 'conduits',
    'type': 'line',
    'source': 'swmmConduits',
    'layout': {
      "visibility": 'none'
     },
    'paint': {
        'line-width': 4,
        'line-color': '#036180'
    }
});


  //SWMM Conduits Labels
  map.addLayer({
      'id': 'conduitLabels',
      'type': 'symbol',
      'source': 'swmmConduits',
      'layout': {
        "visibility": 'none',
        "text-optional": true,
        'symbol-placement': 'line',
        'symbol-spacing': 200,
        'text-field': '{CE}',
        'text-font': ['Roboto Bold','Open Sans Regular','Arial Unicode MS Regular'],
        'text-size': 14,
        "text-padding": 200,
      },
      'paint': {
        'text-color': '#F8F4F0',
        'text-halo-color': '#036180',
        'text-halo-width': 1
      }
  });


  //SWMM Conduits Arrows
  map.addLayer({
      'id': 'conduitArrows',
      'type': 'symbol',
      'source': 'swmmConduits',
      'layout': {
        "visibility": 'none',
        'symbol-placement': 'line',
        'symbol-spacing': 50,
        "icon-image": "oneway-white-small",
        "icon-allow-overlap": true,
        "text-rotation-alignment": "map",
        "icon-size": 1,
        "text-keep-upright": false,
        "icon-padding": 0,
        "icon-ignore-placement": true
      },
      // 'paint': {
      // }
  });


  //SWMM Junctions
  map.addLayer({
      'id': 'junctions',
      'type': 'circle',
      'source': 'swmmJunctions',
      'layout': {
         "visibility": 'none'
       },
      'paint': {
          'circle-radius': 4,
          'circle-color': '#ee4d5a'
      }
  });

  //SWMM Junction LABEL
  map.addLayer({
    'id': 'junctionLabels',
    'type': 'symbol',
    'source': 'swmmJunctions',
    'layout': {
       "visibility": 'none',
       "text-optional": true,
       "text-line-height": 1,
       "text-size": 12,
       "text-field": "{Node}",
       'text-font': ['Roboto Bold','Open Sans Regular','Arial Unicode MS Regular'],
       "text-offset": [0, 1],
       "text-anchor": "top"
   },
   "paint": {
     "text-color": "#ee4d5a",
     "text-halo-color": "#F8F4F0",
     "text-halo-width": 1,
   }
});

//SWMM Dividers
map.addLayer({
    'id': 'dividers',
    'type': 'circle',
    'source': 'swmmDividers',
    'layout': {
       "visibility": 'none'
     },
    'paint': {
        'circle-radius': 4,
        'circle-color': '#ee4d5a'
    }
});

//SWMM Dividers LABEL
map.addLayer({
  'id': 'dividersLabels',
  'type': 'symbol',
  'source': 'swmmDividers',
  'layout': {
     "visibility": 'none',
     "text-optional": true,
     "text-line-height": 1,
     "text-size": 12,
     "text-field": "{Node}",
     'text-font': ['Roboto Bold','Open Sans Regular','Arial Unicode MS Regular'],
     "text-offset": [0, 1],
     "text-anchor": "top"
 },
 "paint": {
   "text-color": "#ee4d5a",
   "text-halo-color": "#F8F4F0",
   "text-halo-width": 1,
 }
});

//SWMM Storages
map.addLayer({
    'id': 'storages',
    'type': 'circle',
    'source': 'swmmStorages',
    'layout': {
       "visibility": 'none'
     },
    'paint': {
        'circle-radius': 4,
        'circle-color': '#ee4d5a'
    }
});

//SWMM Storages LABEL
map.addLayer({
  'id': 'storagesLabels',
  'type': 'symbol',
  'source': 'swmmStorages',
  'layout': {
     "visibility": 'none',
     "text-optional": true,
     "text-line-height": 1,
     "text-size": 12,
     "text-field": "{Node}",
     'text-font': ['Roboto Bold','Open Sans Regular','Arial Unicode MS Regular'],
     "text-offset": [0, 1],
     "text-anchor": "top"
 },
 "paint": {
   "text-color": "#ee4d5a",
   "text-halo-color": "#F8F4F0",
   "text-halo-width": 1,
 }
});



  // //West Vine 100 yr FP
  // map.addLayer({
  //   'id': 'fp-100yr',
  //   'type': 'line',
  //   'source': 'fp',
  //   'filter': ['all', ['==', "FLOOD_TYPE", "100-Year Floodplain"]],
  //   'paint': {
  //     'line-width': 1,
  //     'line-opacity': 0.6,
  //     'line-color': 'rgb(190,210,255)'
  //   },
  //   'layout': {
  //     'visibility': 'visible'
  //   }
  // });
  //
  // //100-YR FLOODPLAIN FILL
  // map.addLayer({
  //   'id': 'fp-100yr-fill',
  //   'type': 'fill',
  //   'source': 'fp',
  //   'filter': ['all', ['==', "FLOOD_TYPE", "100-Year Floodplain"]],
  //   'layout': {
  //     'visibility': 'visible'
  //   },
  //   'paint': {
  //     'fill-color': 'rgb(190,210,255)',
  //     'fill-opacity': 0.6
  //   }
  // }, 'road_label');
  //
  // //100-YR SHALLOW FLOODING
  // map.addLayer({
  //   'id': 'fp-sf',
  //   'type': 'line',
  //   'source': 'fp',
  //   'filter': ['all', ['==', "FLOOD_TYPE", "100-Year Shallow Flooding (1' Depth)"]],
  //   'paint': {
  //     'line-width': 1,
  //     'line-opacity': 0.6,
  //     'line-color': 'rgb(232,190,255)'
  //   },
  //   'layout': {
  //     'visibility': 'visible'
  //   }
  // });
  //
  // //100-YR SHALLOW FLOODING FLOODPLAIN FILL
  // map.addLayer({
  //   'id': 'fp-sf-fill',
  //   'type': 'fill',
  //   'source': 'fp',
  //   'filter': ['all', ['==', "FLOOD_TYPE", "100-Year Shallow Flooding (1' Depth)"]],
  //   'layout': {
  //     'visibility': 'visible'
  //   },
  //   'paint': {
  //     'fill-color': 'rgb(232,190,255)',
  //     'fill-opacity': 0.6
  //   }
  // }, 'road_label');
  //
  // //100-YR FLOODWAY
  // map.addLayer({
  //   'id': 'fldwy',
  //   'type': 'line',
  //   'source': 'fp',
  //   'filter': ['all', ['==', "FLOOD_TYPE", "0.5' Floodway"]],
  //   'paint': {
  //     'line-width': 1,
  //     'line-opacity': 0.3,
  //     'line-color': 'rgb(163,255,115)'
  //   },
  //   'layout': {
  //     'visibility': 'visible'
  //   }
  // });
  //
  // //100-YR FLOODWAY FILL
  // map.addLayer({
  //   'id': 'fldwy-fill',
  //   'type': 'fill',
  //   'source': 'fp',
  //   'filter': ['all', ['==', "FLOOD_TYPE", "0.5' Floodway"]],
  //   'layout': {
  //     'visibility': 'visible'
  //   },
  //   'paint': {
  //     'fill-color': 'rgb(163,255,115)',
  //     'fill-opacity': 0.5,
  //   }
  // }, 'road_label');



  //West Vine Hydraulic Structures
  // map.addLayer({
  //   'id': 'wvb-hydStructure',
  //   'type': 'line',
  //   'source': 'wvb-hydStructure',
  //   'paint': {
  //     'line-width': 1,
  //     'line-opacity': 1,
  //     'line-color': 'rgba(0,77,68,1)'
  //   },
  //   'layout': {
  //     'visibility': 'visible'
  //   }
  // });

  //West Vine Lateral Structures
  // map.addLayer({
  //   'id': 'latStructure',
  //   'type': 'line',
  //   'source': 'latStructure',
  //   'paint': {
  //     'line-width': 1,
  //     'line-opacity': 1,
  //     'line-color': 'rgba(0,77,68,1)'
  //   },
  //   'layout': {
  //     'visibility': 'visible'
  //   }
  // });

  //City Floodplain - 100-yr
  // map.addLayer({
  //   'id': 'cityFP',
  //   'type': 'line',
  //   'filter': ['all', ['==', "FLOOD_TYPE", "100 YEAR FLOODPLAIN"]],
  //   'source': 'cityFP',
  //   'paint': {
  //     'line-color': "rgb(230,76,0)",
  //     'line-opacity': 1,
  //     'line-dasharray': [8, 4]
  //   },
  //   'layout': {
  //     'visibility': 'none'
  //   }
  // });

  // City Floodplain - Floodway
  // map.addLayer({
  //   'id': 'cityFW',
  //   'type': 'line',
  //   'filter': ['all', ['==', "FLOOD_TYPE", "0.5 FOOT FLOODWAY"]],
  //   'source': 'cityFP',
  //   'paint': {
  //     'line-color': 'rgb(230,76,0)',
  //     'line-opacity': 1
  //   },
  //   'layout': {
  //     'visibility': 'none'
  //   }
  // });

  // City Floodplain - Shallow Flooding
  // map.addLayer({
  //   'id': 'citySF',
  //   'type': 'line',
  //   'filter': ['all', ['==', "FP_NAME", "WEST VINE"],
  //     ['==', "FLOOD_TYPE", "<= 1FT"]
  //   ],
  //   'source': 'cityFP',
  //   'paint': {
  //     'line-color': 'rgb(230,76,0)',
  //     'line-opacity': 1,
  //     'line-dasharray': [4, 2],
  //     'line-width': 0.5
  //   },
  //   'layout': {
  //     'visibility': 'none'
  //   }
  // });

  //Contours - 1FT
  // map.addLayer({
    // 'id': 'contour-1ft',
    // 'type': 'line',
    // 'source': 'contours',
    // 'source-layer': 'contour_100-70zk0h',
    // 'filter': ['all', ['==', 'INDEX', 0]],
    // 'layout': {
    //   'line-join': 'round',
    //   'visibility': 'none',
    //   'line-cap': 'round'
    // },
    // 'paint': {
    //   'line-width': {
    //     "stops": [
    //       [15, 0],
    //       [17, .5],
    //       [19, 1]
    //     ]
    //   },
    //   'line-color': '#bd925a'
    // }
  // }, 'road_label');

  //Contours - 5 ft
  // map.addLayer({
    // 'id': 'contour-5ft',
    // 'type': 'line',
    // 'source': 'contours',
    // 'source-layer': 'contour_100-70zk0h',
    // 'filter': ['all', ['==', 'INDEX', 5]],
    // 'layout': {
    //   'line-join': 'round',
    //   'visibility': 'none',
    //   'line-cap': 'round'
    // },
    // 'paint': {
    //   'line-width': {
    //     "stops": [
    //       [15, 1],
    //       [17, 1.75],
    //       [19, 2.5]
    //     ]
    //   },
    //   'line-color': '#bd925a'
    // }
  // }, 'road_label');

  //Contours - 5 ft Labels
  // map.addLayer({
  //   'id': 'contour-5ftLabels',
  //   'type': 'symbol',
  //   'source': 'contours',
  //   'source-layer': 'contour_100-70zk0h',
  //   'filter': ['all', ['>=', 'INDEX', 5],
  //     ['<=', 'Index', 10]
  //   ],
  //   'layout': {
  //     'symbol-placement': 'line',
  //     'visibility': 'none',
  //     'text-field': '{CONTOUR}',
  //     'text-size': {
  //       "stops": [
  //         [15, 12],
  //         [17, 14],
  //         [19, 16]
  //       ]
  //     }
  //   },
  //   'paint': {
  //     'text-color': '#bd925a',
  //     'text-halo-color': '#F8F4F0',
  //     'text-halo-width': 2,
  //     'text-halo-blur': 0.5
  //   }
  // });

  //WEST VINE XS
  // map.addLayer({
  //   'id': 'wvb-xs',
  //   'type': 'line',
  //   'source': 'wvb-xs',
  //   'paint': {
  //     'line-width': 2,
  //     'line-opacity': 1,
  //     'line-color': 'rgba(0,0,0,1)'
  //   },
  //   'layout': {
  //     'visibility': 'visible'
  //   }
  // });

  //WEST VINE XS Labels
  // map.addLayer({
  //   'id': 'wvb-xsLabels',
  //   'type': 'symbol',
  //   'source': 'wvb-xs',
  //   'layout': {
  //     'visibility': 'visible',
  //     'symbol-placement': 'line',
  //     'symbol-spacing': 100,
  //     'text-field': '{ProfileM}',
  //     'text-size': {
  //       "stops": [
  //         [15, 12],
  //         [17, 14],
  //         [19, 16]
  //       ]
  //     },
  //     "text-padding": 100,
  //   },
  //   'paint': {
  //     'text-color': '#000',
  //     'text-halo-color': '#ffffff',
  //     'text-halo-width': 2,
  //     'text-halo-blur': 1
  //   }
  // });

  //canals
  // map.addLayer({
  //   'id': 'wvb-canals',
  //   'type': 'line',
  //   'source': 'wvb-canals',
  //   'paint': {
  //     'line-width': 1.5,
  //     'line-opacity': 1,
  //     'line-color': 'rgba(0,77,168,1)'
  //   },
  //   'layout': {
  //     'visibility': 'visible'
  //   }
  // });

  //canalLabels
  // map.addLayer({
  //   'id': 'wvb-canalLabels',
  //   'type': 'symbol',
  //   'source': 'wvb-canals',
  //   'layout': {
  //     'symbol-placement': 'line',
  //     'symbol-spacing': 100,
  //     'text-field': '{NAME}',
  //     'text-size': {
  //       "stops": [
  //         [15, 12],
  //         [17, 14],
  //         [19, 16]
  //       ]
  //     },
  //     "text-padding": 100,
  //   },
  //   'paint': {
  //     'text-color': 'rgba(0,77,168,1)',
  //     'text-halo-color': '#ffffff',
  //     'text-halo-width': 2,
  //     'text-halo-blur': 1
  //   }
  // });

  var style = map.getStyle();

      if (style.name != 'Outdoors'){
        map.setLayoutProperty('conduitArrows','icon-image','oneway-spaced-white-small');
      }


}); //end style load

// When a click event occurs near a marker icon, open a popup at the location of

// the feature, with description HTML from its properties.

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.

//Cross Section Labels
// map.on('click', function(e) {
//   var features = map.queryRenderedFeatures(e.point, {
//     layers: ['wvb-xs']
//   });
//   if (!features.length) {
//     return;
//   }
//
//   var feature = features[0];
//
//   var popup = new mapboxgl.Popup()
//     .setLngLat(e.lngLat)
//     .setHTML(feature.properties.RiverCode + ' ' + feature.properties.ReachCode + '<br>' + 'XS: ' + feature.properties.ProfileM + '<br>' + 'WSEL:' + feature.properties.P001.toFixed(2))
//     .addTo(map);
// });

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
// map.on('mousemove', function(e) {
//   var features = map.queryRenderedFeatures(e.point, {
//     layers: ['wvb-xs']
//   });
//   map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
// });



map.addControl(new mapboxgl.NavigationControl(), 'top-right');
