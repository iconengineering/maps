mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
<<<<<<< HEAD

// // Set bounds to Wellington
// var bounds = [
// [-105.200, 40.520], // SW coordinates
// [-104.900, 40.895] // NE coordinates
// ];

=======
>>>>>>> parent of b8374cd (set max bounds for Wellington SDMBP)
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
  zoom: 13,
  center: [-104.9997, 40.7001],
  hash: true,
  preserveDrawingBuffer: true,
  // maxBounds: bounds // Set max boundaries
});

var layerList = document.getElementById('menu');
// var inputs = layerList.getElementsByTagName('input');

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
    'source': 'BECswmmDividers',
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

  //  Contours - 1ft within Town Limits
  map.addSource('contours-town', {
    type: 'vector',
    url: 'mapbox://iconeng.64fnp3dg'
  });

  map.addLayer({
    'id': 'contours-town',
    'type': 'line',
    'source': 'contours-town',
    'source-layer': 'Well_contours_1ft_town-8f03w2',
    'filter': ['all', ['!=', 'INDEX', 5]],
    'layout': {
      'line-join': 'round',
      'visibility': 'none',
      'line-cap': 'round'
    },
    'paint': {
      'line-width': 1,
      'line-color': '#333'
    }
  }, 'road_label');

  //  Contours - 5 ft
  map.addLayer({
    'id': 'contours-town-5ft',
    'type': 'line',
    'source': 'contours-town',
    'source-layer': 'Well_contours_1ft_town-8f03w2',
    'filter': ['all', ['==', 'INDEX', 5]],
    'layout': {
      'line-join': 'round',
      'visibility': 'none',
      'line-cap': 'round'
    },
    'paint': {
        'line-width': 2,
        'line-color': '#111'
      }
  }, 'road_label');

  //  Contours - 5 ft Labels
  map.addLayer({
    'id': 'contours-5ftLabels',
    'type': 'symbol',
    'source': 'contours-town',
    'source-layer': 'Well_contours_1ft_town-8f03w2',
    'filter': ['all', ['==', 'INDEX', 5]],
    'layout': {
      'symbol-placement': 'line',
      'visibility': 'none',
      'text-field': '{ELEV}',
      'text-size': {
        "stops": [
          [13, 12],
          [17, 14],
          [19, 16]
        ]
      }
    },
    'paint': {
        'text-color': '#000',
        'text-halo-color': 'rgba(255,255,255,0.9)',
        'text-halo-width': 1,
        'text-halo-blur': 1
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
  map.addSource('SWMP_SWMM_Nodes', {
    type: 'geojson',
    "data": 'data/SWMP_SWMM_nodes.geojson'

  });

  //SWMM Junctions
  map.addLayer({
    'id': 'SWMP_SWMM_Nodes',
    'type': 'circle',
    'source': 'SWMP_SWMM_Nodes',
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
    'id': 'SWMP_SWMM_NodeLabels',
    'type': 'symbol',
    'source': 'SWMP_SWMM_Nodes',
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
}); //end style load


map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['SWMP_SWMM_Conduits','SWMP_SWMM_Nodes'] });
  if (!features.length) {
      return;
  }

  var feature = features[0];
  var id = feature.layer.id

// add id == 'SWMP_SWMM_Conduits' ||

    if (id == 'SWMP_SWMM_Nodes'){

      var data = [{name: "2-yr", value: feature.properties.Q_Ex_002},
                  {name: "10-yr", value: feature.properties.Q_Ex_010},
                  {name: "100-yr", value: feature.properties.Q_Ex_100}];

    var	margin = {top: 10, right: 40, bottom: 30, left: 50},
        width = 240 - margin.left - margin.right,
        height = 240 - margin.top - margin.bottom;

        var x = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);

        var y = d3.scaleLinear()
            .range([height, 0]);

        var z = d3.scaleOrdinal()
            .range(['#089099','#00718b','#045275']);

      var div = window.document.createElement('div');
      if (id == 'SWMP_SWMM_Conduits' && feature.properties.Shape1 == 'IRREGULAR') {
        div.innerHTML = '<div class="row"><b>Conduit ' + feature.properties.NAME + '</b><br />Irregular</div>';
      } else if (id == 'SWMP_SWMM_Conduits' && feature.properties.Shape1 == 'CIRCULAR') {
        div.innerHTML = '<div class="row"><b>Conduit ' + feature.properties.NAME + '</b><br />' + feature.properties.Geom1 + 'ft Circular</div>';
      } else if (id == 'SWMP_SWMM_Conduits' && feature.properties.Shape1 == 'RECT_CLOSED') {
        div.innerHTML = '<div class="row"><b>Conduit ' + feature.properties.NAME + '</b><br />' + feature.properties.Geom1 + 'ft x ' + feature.properties.Geom2 + 'ft Box</div>';
      } else {
        div.innerHTML = '<div class="row"><b>SWMM Node ' + '<br>' + feature.properties.id + '</b></div>';
      };

      var	svg = d3.select(div)
        .append("svg")
          .attr("class", "xs")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          d3.select(".xs").selectAll(".bar").remove()

          x.domain(data.map(function(d) { return d.name; }));
          y.domain([0, d3.max(data, function(d) {
            if (d.value <= 25) {return 25}
            else if (d.value <= 50) {return 50}
            else if (d.value <= 75) {return 75}
            else if (d.value <= 250) {return 250}
            else if (d.value <= 500) {return 500}
            else if (d.value <= 1000) {return 1000}
            else if (d.value <= 2500) {return 2500}
            else 	{ return 5000 }
            ;})
          ]);

          svg.selectAll(".bar")
              .data(data)
            .enter().append("rect")
              .attr("x", function(d) { return x(d.name); })
              .attr("width", x.bandwidth())
              .attr("y", function(d) { return height; })
              .attr("height", 0)
              .attr("fill", function(d) { return z(d.name); })
              .transition()
              .delay(function (d, i) { return i*100; })
              .attr("height", function(d) { return height - y(d.value); })
              .attr("y", function(d) { return y(d.value); });

          svg.selectAll("text.bar")
              .data(data)
            .enter().append("text")
              .attr("class", "bar")
              .attr("text-anchor", "middle")
              .attr("x", function(d) { return x(d.name) + 23; })
              .attr("y", function(d) {
                if (height - y(d.value) < 20) { return y(d.value) - 5; }
                else { return y(d.value) + 12; }
                ;})
              .attr("fill", function(d) {
                if (height - y(d.value) < 20) { return '#000' }
                else { return '#fff' }
                ;})
              .attr('font-size', '10px')
              .attr('font-weight', 'bold')
              .text(function(d) { return Math.round(d.value); });

          // Add the X Axis
          svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x).tickSizeOuter(0));

          // Add the Y Axis
          svg.append("g")
              .call(d3.axisLeft(y).ticks(4))
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 3)
              .attr("dy", ".71em")
              .attr("font-size", 8)
              .attr("fill", "#000")
              .style("text-anchor", "end")
              .text("cfs");

        function type(d) {
          d.value = +d.value;
          return d;
        }

      var d3popup = new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setDOMContent(div)
          .addTo(map);
    } else { return; }
    });

map.on('mousemove', function (e) {

// add conduits 'SWMP_SWMM_Conduits',

    var features = map.queryRenderedFeatures(e.point, { layers: ['SWMP_SWMM_Nodes'] });

    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

});


// When a click event occurs near a marker icon, open a popup at the location of

// the feature, with description HTML from its properties.

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.


// map.on('click', function(e) {
//   var features = map.queryRenderedFeatures(e.point, {
//     layers: ['fieldVisit']
//   });
//   if (!features.length) {
//     return;
//   }
//
//   var feature = features[0];
//
//   var popup = new mapboxgl.Popup()
//     .setLngLat(e.lngLat)
//     .setHTML(feature.properties.Number + '<br>' + feature.properties.Descr)
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
