mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';

// Set bounds to Wellington
var bounds = [
[-105.083, 40.569], // SW coordinates
[-104.743, 40.908] // NE coordinates
];

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot',
  zoom: 13.0,
  center: [-104.9997, 40.7001],
  hash: true,
  preserveDrawingBuffer: true,
  maxBounds: bounds // Set max boundaries
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

// $(document).ready(function() {
//   $("#clear").click(function() {
//     var checkBoxes = $("input[type=checkbox]");
//     checkBoxes.prop("checked", false);
//     map.setPaintProperty('contours-1ft', 'visibility', 'none');
//     map.setPaintProperty('contours-5ft', 'visibility', 'none');
//     map.setPaintProperty('contours-5ftLabels', 'visibility', 'none');
//     map.setPaintProperty('cityFP', 'visibility', 'none');
//     map.setPaintProperty('cityFW', 'visibility', 'none');
//     map.setPaintProperty('citySF', 'visibility', 'none');
//     map.setPaintProperty('wvb-fp-100yr', 'visibility', 'none');
//     map.setPaintProperty('wvb-fp-100yr-fill', 'visibility', 'none');
//   });
// });

map.on('style.load', function(e) {

  //Town Boundary
  map.addSource('cityBoundary', {
    type: 'geojson',
    "data": 'data/cityBoundary.geojson'
  });
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
  map.addSource('growthBoundary', {
    type: 'geojson',
    "data": 'data/growthboundary.geojson'
  });
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
  map.addSource('swmmBasins', {
    type: 'geojson',
    "data": 'data/swmm_basins.geojson'
  });
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
  map.addSource('BECbasinCentroid', {
    type: 'geojson',
    "data": 'data/basinCentroids.geojson'
  });
  map.addLayer({
    'id': 'basinLabels',
    'type': 'symbol',
    'source': 'BECbasinCentroid',
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
    'source': 'BECbasinCentroid',
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

  //Box Elder SWMM Conduits
  map.addSource('BECswmmConduits', {
    type: 'geojson',
    "data": 'data/swmm_routing.geojson'
  });
  map.addLayer({
    'id': 'conduits',
    'type': 'line',
    'source': 'BECswmmConduits',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 4,
      'line-color': '#036180'
    }
  });

  //Box Elder SWMM Conduits Labels
  map.addLayer({
    'id': 'conduitLabels',
    'type': 'symbol',
    'source': 'BECswmmConduits',
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

  //Box Elder SWMM Conduits Arrows
  map.addLayer({
    'id': 'conduitArrows',
    'type': 'symbol',
    'source': 'BECswmmConduits',
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

  //Box Elder SWMM Junctions
  map.addSource('BECswmmJunctions', {
    type: 'geojson',
    "data": 'data/swmm_junc.geojson'
  });
  map.addLayer({
    'id': 'junctions',
    'type': 'circle',
    'source': 'BECswmmJunctions',
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
    'source': 'BECswmmJunctions',
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
  map.addSource('BECswmmDividers', {
    type: 'geojson',
    "data": 'data/swmm_dividers.geojson'
  });
  map.addLayer({
    'id': 'dividers',
    'type': 'circle',
    'source': 'BECswmmDividers',
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
  map.addSource('swmmStorages', {
    type: 'geojson',
    "data": 'data/swmm_storages.geojson'
  });
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
  map.addSource('eff-fp', {
    type: 'geojson',
    "data": 'data/effectiveFloodplain.geojson'
  });
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
      'visibility': 'none'
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
      'visibility': 'none'
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
      'visibility': 'none'
    }
  });

  //  CWCB Floodplain 100yr Hatch
  map.addSource('cwcb-fp', {
    type: 'geojson',
    "data": 'data/cwcbFloodplain.geojson'
  });
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
  map.addSource('drainageways', {
    type: 'geojson',
    "data": 'data/drainageways.geojson'
  });
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
  map.addSource('flo2d-ex', {
    type: 'vector',
    url: 'mapbox://iconeng.4zi0234i'
  });
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
  }, );

  // Velocity Grid - Existing
  map.addSource('velo-ex', {
    type: 'vector',
    url: 'mapbox://iconeng.2i3tfsvz'
  });
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

  //  Contours - 2FT
  map.addSource('contours', {
    type: 'vector',
    url: 'mapbox://iconeng.3re6dt84'
  });

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

  // ICON ROUTING CONDUITS
  map.addSource('SWMP_SWMM_Conduits', {
    type: 'geojson',
    "data": 'data/SWMP_SWMM_conduits.geojson'
  });

  //ICON SWMM Conduits
  map.addLayer({
    'id': 'SWMP_SWMM_Conduits',
    'type': 'line',
    'source': 'SWMP_SWMM_Conduits',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 4,
      'line-color': '#036180'
    }
  });

  //BEC SWMM Conduits Labels
  map.addLayer({
    'id': 'SWMP_SWMM_ConduitLabels',
    'type': 'symbol',
    'source': 'SWMP_SWMM_Conduits',
    'layout': {
      "visibility": 'none',
      "text-optional": false,
      'symbol-placement': 'line',
      'symbol-spacing': 200,
      'text-field': '{id}',
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

  map.addLayer({
    'id': 'SWMP_SWMM_conduitArrows',
    'type': 'symbol',
    'source': 'SWMP_SWMM_Conduits',
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
    'paint': {}
  });

      // ICON ROUTING CONDUITS
      map.addSource('SWMP_SWMM_Outlets', {
        type: 'geojson',
        "data": 'data/SWMP_SWMM_outlets.geojson'
      });

      //ICON SWMM Outlets
      map.addLayer({
        'id': 'SWMP_SWMM_Outlets',
        'type': 'line',
        'source': 'SWMP_SWMM_Outlets',
        'layout': {
          "visibility": 'none'
        },
        'paint': {
          'line-width': 4,
          'line-color': '#036180'
        }
      });

      //ICON SWMM Outlets
      map.addLayer({
        'id': 'SWMP_SWMM_OutletsLabels',
        'type': 'symbol',
        'source': 'SWMP_SWMM_Outlets',
        'layout': {
          "visibility": 'none',
          "text-optional": false,
          'symbol-placement': 'line',
          'symbol-spacing': 200,
          'text-field': '{id}',
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

  // ICON ROUTING
  map.addSource('SWMP_SWMM_Junctions', {
    type: 'geojson',
    "data": 'data/SWMP_SWMM_junctions.geojson'

  });

  //SWMM Junctions
  map.addLayer({
    'id': 'SWMP_SWMM_junctions',
    'type': 'circle',
    'source': 'SWMP_SWMM_Junctions',
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
    'id': 'SWMP_SWMM_junctionLabels',
    'type': 'symbol',
    'source': 'SWMP_SWMM_Junctions',
    'layout': {
      "visibility": 'none',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{id}",
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

  // ICON ROUTING Dividers
  map.addSource('SWMP_SWMM_Dividers', {
    type: 'geojson',
    "data": 'data/SWMP_SWMM_dividers.geojson'
  });

  //SWMM Dividers
  map.addLayer({
    'id': 'SWMP_SWMM_Dividers',
    'type': 'circle',
    'source': 'SWMP_SWMM_Dividers',
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
    'id': 'SWMP_SWMM_DividersLabels',
    'type': 'symbol',
    'source': 'SWMP_SWMM_Dividers',
    'layout': {
      "visibility": 'none',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{id}",
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

  // ICON ROUTING Outfalls
  map.addSource('SWMP_SWMM_Outfalls', {
    type: 'geojson',
    "data": 'data/SWMP_SWMM_outfalls.geojson'
  });

  //SWMM Outfalls
  map.addLayer({
    'id': 'SWMP_SWMM_Outfalls',
    'type': 'circle',
    'source': 'SWMP_SWMM_Outfalls',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'circle-radius': 4,
      'circle-color': '#ee4d5a'
    }
  });

  //SWMM Outfall LABEL
  map.addLayer({
    'id': 'SWMP_SWMM_OutfallsLabels',
    'type': 'symbol',
    'source': 'SWMP_SWMM_Outfalls',
    'layout': {
      "visibility": 'none',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{id}",
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


  // ICON ROUTING Storage
  map.addSource('SWMP_SWMM_Storage', {
    type: 'geojson',
    "data": 'data/SWMP_SWMM_storages.geojson'
  });

  //SWMM Outfalls
  map.addLayer({
    'id': 'SWMP_SWMM_Storage',
    'type': 'circle',
    'source': 'SWMP_SWMM_Storage',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'circle-radius': 4,
      'circle-color': '#ee4d5a'
    }
  });

  //SWMM Outfall LABEL
  map.addLayer({
    'id': 'SWMP_SWMM_StorageLabels',
    'type': 'symbol',
    'source': 'SWMP_SWMM_Storage',
    'layout': {
      "visibility": 'none',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{id}",
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

  map.addSource('SWMP_Subwatersheds', {
      type: 'geojson',
      data: 'data/SWMP_subwatersheds.geojson'
  });

  map.addLayer({
      'id': 'SWMP_Subwatersheds',
      'type': 'line',
      'source': 'SWMP_Subwatersheds',
      'paint': {
          'line-width': 1,
          'line-opacity': 1,
          'line-color': 'rgba(0,0,0,1)',
          'line-dasharray': [8,4]
      },
      'layout':{
        'visibility':'none'
      }
  });



  var style = map.getStyle();

  if (style.name != 'Outdoors') {
    map.setLayoutProperty('conduitArrows', 'icon-image', 'oneway-spaced-white-small');
  }


}); //end style load

// When a click event occurs near a marker icon, open a popup at the location of

// the feature, with description HTML from its properties.

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.


map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['fieldVisit']
  });
  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(feature.properties.Number + '<br>' + feature.properties.Descr)
    .addTo(map);
});

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
// map.on('mousemove', function(e) {
//   var features = map.queryRenderedFeatures(e.point, {
//     layers: ['wvb-xs']
//   });
//   map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
// });



map.addControl(new mapboxgl.NavigationControl(), 'top-right');
