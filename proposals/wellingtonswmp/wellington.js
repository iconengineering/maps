mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot',
  zoom: 11.5,
  center: [-105.0052, 40.7083],
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

  map.addSource('growthBoundary', {
    type: 'geojson',
    "data": 'data/growthboundary.geojson'
  });

  map.addSource('stormAlignment', {
    type: 'geojson',
    "data": 'data/stormAlignment.geojson'
  });

  map.addSource('pond', {
    type: 'geojson',
    "data": 'data/pond.geojson'
  });

  map.addSource('drainageways', {
    type: 'geojson',
    "data": 'data/drainageways.geojson'
  });

  map.addSource('swmmBasins', {
    type: 'geojson',
    "data": 'data/swmm_basins.geojson'
  });

  map.addSource('basinCentroid', {
    type: 'geojson',
    "data": 'data/basinCentroids.geojson'
  });

  map.addSource('swmmConduits', {
    type: 'geojson',
    "data": 'data/swmm_routing.geojson'
  });

  map.addSource('swmmJunctions', {
    type: 'geojson',
    "data": 'data/swmm_junc.geojson'
  });

  map.addSource('swmmDividers', {
    type: 'geojson',
    "data": 'data/swmm_dividers.geojson'
  });

  map.addSource('swmmOutfalls', {
    type: 'geojson',
    "data": 'data/swmm_outfalls.geojson'
  });

  map.addSource('swmmStorages', {
    type: 'geojson',
    "data": 'data/swmm_storages.geojson'
  });

  map.addSource('eff-fp', {
    type: 'geojson',
    "data": 'data/effectiveFloodplain.geojson'
  });

  map.addSource('cwcb-fp', {
    type: 'geojson',
    "data": 'data/cwcbFloodplain.geojson'
  });

  map.addSource('velo-ex', {
    type: 'vector',
    url: 'mapbox://iconeng.2i3tfsvz'
  });

  map.addSource('velo-alt1', {
    type: 'vector',
    url: 'mapbox://iconeng.0ao5at0y'
  });

  map.addSource('velo-alt2', {
    type: 'vector',
    url: 'mapbox://iconeng.3ilu8zzh'
  });

  map.addSource('flo2d-ex', {
    type: 'vector',
    url: 'mapbox://iconeng.4zi0234i'
  });

  map.addSource('flo2d-alt1', {
    type: 'vector',
    url: 'mapbox://iconeng.965d9b50'
  });

  map.addSource('flo2d-alt2', {
    type: 'vector',
    url: 'mapbox://iconeng.6e17ijjd'
  });

  map.addSource('contours', {
    type: 'vector',
    url: 'mapbox://iconeng.3re6dt84'
  });






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
      'line-color': 'yellow',
      'line-dasharray': [4, 2]
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //Growth Boundary
  map.addLayer({
    'id': 'growthBoundary',
    'type': 'line',
    'source': 'growthBoundary',
    'paint': {
      'line-width': 2,
      'line-color': 'green'
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  // SWMM Basins
  map.addLayer({
    'id': 'swmmBasins',
    'type': 'line',
    'source': 'swmmBasins',
    'layout': {
      "visibility": 'none',
    },
    'paint': {
      'line-width': 1,
      'line-opacity': 1,
      'line-color': 'rgba(0,0,0,1)',
      'line-dasharray': [8, 4]
    }
  });

  //Basin Labels
  map.addLayer({
    'id': 'basinLabels',
    'type': 'symbol',
    'source': 'basinCentroid',
    'layout': {
      "visibility": 'none',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": {
        "stops": [
          [15, 10],
          [17, 12],
          [19, 14]
        ]
      },
      "text-field": "{acres} Ac. | {Imper}%",
      'text-font': ['Roboto Medium', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-offset": {
        "stops": [
          [13, [0, 0.25]],
          [17, [0, 0.75]]
        ]
      },
      "text-anchor": "top"
    },
    "paint": {
      "text-color": "#F8F4F0",
      "text-halo-color": "rgba(0,0,0,.87)",
      "text-halo-width": {
        "stops": [
          [15, 1],
          [17, 1.25]
        ]
      }
    }
  });

  //Basins Label 2
  map.addLayer({
    'id': 'basinLabels2',
    'type': 'symbol',
    'source': 'basinCentroid',
    'layout': {
      "visibility": 'none',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": {
        "stops": [
          [15, 10],
          [17, 12],
          [19, 14]
        ]
      },
      "text-field": "{Basin_ID}",
      "text-offset": {
        "stops": [
          [13, [0, -1]],
          [17, [0, -1.5]]
        ]
      },
      'text-font': ['Roboto Medium', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-anchor": "top"
    },
    "paint": {
      "text-color": "#F8F4F0",
      "text-halo-color": "rgba(0,0,0,.87)",
      "text-halo-width": {
        "stops": [
          [15, 1],
          [17, 1.25]
        ]
      }
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
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
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
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
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
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
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
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-offset": [0, 1],
      "text-anchor": "top"
    },
    "paint": {
      "text-color": "#ee4d5a",
      "text-halo-color": "#F8F4F0",
      "text-halo-width": 1,
    }
  });

  //  Effective Floodplain 100yr Hatch
  map.addLayer({
    'id': 'eff-fp-100yr-hatch',
    'type': 'fill',
    'source': 'eff-fp',
    'filter': ['in', "FLD_ZONE", 'A', 'AE'],
    'paint': {
      'fill-color': 'rgb(0,230,255)',
      'fill-opacity': 0.3,
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //  Effective Floodplain 500yr Hatch
  map.addLayer({
    'id': 'eff-fp-500yr-hatch',
    'type': 'fill',
    'source': 'eff-fp',
    'filter': ['==', "ZONE_SUBTY", "0.2 PCT ANNUAL CHANCE FLOOD HAZARD"],
    'paint': {
      'fill-color': 'rgb(255,128,0)',
      'fill-opacity': 0.3,
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //  Effective Floodplain Outline
  map.addLayer({
    'id': 'eff-fp-line',
    'type': 'line',
    'source': 'eff-fp',
    // 'filter': ['all', ['==', "FLOOD_TYPE", "100-Year Floodplain"]],
    'paint': {
      'line-width': 0.5,
      'line-opacity': 0.3,
      'line-color': 'black',
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //  CWCB Floodplain 100yr Hatch
  map.addLayer({
    'id': 'cwcb-100yr-hatch',
    'type': 'fill',
    'source': 'cwcb-fp',
    'filter': ["all",
      ["!in", "ZONE_SUBTY", "FLOODWAY"],
      ["in", "FLD_ZONE", 'A', 'AE', 'AO']
    ],
    'paint': {
      'fill-color': 'rgb(0,230,255)',
      'fill-opacity': 0.3,
    },
    'layout': {
      'visibility': 'none',

    }
  });

  //  CWCB Floodplain 500yr Hatch
  map.addLayer({
    'id': 'cwcb-500yr-hatch',
    'type': 'fill',
    'source': 'cwcb-fp',
    'filter': ['==', "ZONE_SUBTY", "0.2 PCT ANNUAL CHANCE FLOOD HAZARD"],
    'paint': {
      'fill-color': 'rgb(255,128,0)',
      'fill-opacity': 0.3,
    },
    'layout': {
      'visibility': 'none'
    }
  });

  //  CWCB Floodplain Floodway Hatch
  map.addLayer({
    'id': 'cwcb-fldwy-hatch',
    'type': 'fill',
    'source': 'cwcb-fp',
    'filter': ['in', "ZONE_SUBTY", "FLOODWAY"],
    'paint': {
      'fill-color': 'purple',
      'fill-opacity': 0.3,
    },
    'layout': {
      'visibility': 'none'
    }
  });

  //  CWCB Floodplain Outline
  map.addLayer({
    'id': 'cwcb-fp-line',
    'type': 'line',
    'source': 'cwcb-fp',
    // 'filter': ['all', ['==', "FLOOD_TYPE", "100-Year Floodplain"]],
    'paint': {
      'line-width': 0.5,
      'line-opacity': 0.3,
      'line-color': 'black',
    },
    'layout': {
      'visibility': 'none'
    }
  });

  //Drainageway centerline
  map.addLayer({
    'id': 'drainageways',
    'type': 'line',
    'source': 'drainageways',
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
    'id': 'drainageway-streamLabels',
    'type': 'symbol',
    'source': 'drainageways',
    'layout': {
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{NAME}',
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

  // Flow Depth Grids - Existing
  map.addLayer({
    'id': 'flo2d-ex',
    'type': 'fill',
    'source': 'flo2d-ex',
    'source-layer': 'Wellington_001_Existing-8enlus',
    'filter': ["all", ['>', 'Var', 0.1]],
    'paint': {
      'fill-color': {
        property: 'Var',
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
      'fill-opacity': 0.5
    },
    'layout': {
      'visibility': 'none'
    }
  },);

  // Velocity Grid - Existing
  map.addLayer({
    'id': 'velo-ex',
    'type': 'line',
    'source': 'velo-ex',
    'source-layer': 'Wellington_001_Existing_Velo-2ywg3y',
    'layout': {
      'visibility': 'none'
    },
    'filter': ["all", ['>', 'Var', 0.25]],
    'paint': {
      'line-width': 1.2,
      'line-opacity': 1,
      'line-color': 'black',
    }
  });

  // Velocity Grid - Alt 1
  map.addLayer({
    'id': 'velo-alt1',
    'type': 'line',
    'source': 'velo-alt1',
    'source-layer': 'Wellington_002_PrStorm_Velo-8t0etl',
    'layout': {
      'visibility': 'none'
    },
    'filter': ["all", ['>', 'Var', 0.25]],
    'paint': {
      'line-width': 1.2,
      'line-opacity': 1,
      'line-color': 'black',
    }
  });


  // Velocity Grid - Alt 2
  map.addLayer({
    'id': 'velo-alt2',
    'type': 'line',
    'source': 'velo-alt2',
    'source-layer': 'Wellington_003_Pond_Velo-7l1y34',
    'layout': {
      'visibility': 'none'
    },
    'filter': ["all", ['>', 'Var', 0.25]],
    'paint': {
      'line-width': 1.2,
      'line-opacity': 1,
      'line-color': 'black',
    }
  });


  // Flow Depth Grids - Alt1
  map.addLayer({
    'id': 'flo2d-alt1',
    'type': 'fill',
    'source': 'flo2d-alt1',
    'source-layer': 'Wellington_002_PrStorm-ae4dow',
    'filter': ["all", ['>', 'Var', 0.1]],
    'paint': {
      'fill-color': {
        property: 'Var',
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
      'fill-opacity': 0.7
    },
    'layout': {
      'visibility': 'none'
    }
  }, );

  // Flow Depth Grids - Alt 2
  map.addLayer({
    'id': 'flo2d-alt2',
    'type': 'fill',
    'source': 'flo2d-alt2',
    'source-layer': 'Well_003_Pond-9ixhpg',
    'filter': ["all", ['>', 'Var', 0.1]],
    'paint': {
      'fill-color': {
        property: 'Var',
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
      'fill-opacity': 0.5
    },
    'layout': {
      'visibility': 'none'
    }
  }, );

  // Proposed Storm Improvement Alignments
  map.addLayer({
    'id': 'stormAlignment',
    'type': 'line',
    'source': 'stormAlignment',
    'paint': {
      'line-width': 5,
      'line-color': 'red'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  // Proposed Storm Improvement Alignments
  map.addLayer({
    'id': 'pond',
    'type': 'line',
    'source': 'pond',
    'paint': {
      'line-width': 3,
      'line-color': 'blue'
    },
    'layout': {
      'visibility': 'none'
    }
  });


  //  Contours - 2FT
  map.addLayer({
    'id': 'contour-2ft',
    'type': 'line',
    'source': 'contours',
    'source-layer': 'clipped_contours-2tvf5k',
    'filter': ['all', ['==', 'INDEX', 0]],
    'layout': {
      'line-join': 'round',
      'visibility': 'none',
      'line-cap': 'round'
    },
    'paint': {
      'line-width': {
        "stops": [
          [13, 1],
          [17, 1.75],
          [19, 2.5]
        ]
      },
      'line-color': 'gray'
    }
  }, 'road_label');

  //  Contours - 5 ft
  map.addLayer({
    'id': 'contour-5ft',
    'type': 'line',
    'source': 'contours',
    'source-layer': 'clipped_contours-2tvf5k',
    'filter': ['all', ['>', 'INDEX', 0]],
    'layout': {
      'line-join': 'round',
      'visibility': 'none',
      'line-cap': 'round'
    },
    'paint': {
      'line-width': {
        "stops": [
          [13, 1],
          [17, 1.75],
          [19, 2.5]
        ]
      },
      'line-color': 'black'
    }
  }, 'road_label');

  //  Contours - 5 ft Labels
  map.addLayer({
    'id': 'contour-5ftLabels',
    'type': 'symbol',
    'source': 'contours',
    'source-layer': 'clipped_contours-2tvf5k',
    'filter': ['all', ['>', 'INDEX', 0], ],
    'layout': {
      'symbol-placement': 'line',
      'visibility': 'none',
      'text-field': '{CONTOUR}',
      'text-size': {
        "stops": [
          [13, 12],
          [17, 14],
          [19, 16]
        ]
      }
    },
    'paint': {
      'text-color': 'black',
      'text-halo-color': '#F8F4F0',
      'text-halo-width': 2,
      'text-halo-blur': 0.5
    }
  });



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

  if (style.name != 'Outdoors') {
    map.setLayoutProperty('conduitArrows', 'icon-image', 'oneway-spaced-white-small');
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
