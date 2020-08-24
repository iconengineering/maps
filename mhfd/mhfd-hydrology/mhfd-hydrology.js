mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
  zoom: 12.5,
  center: [-105.1557, 39.833],
  hash: true,
  preserveDrawingBuffer: true
});

  var layerList = document.getElementById('menu');

$(document).ready(function() {
  $("#clear").click(function() {
    var checkBoxes = $("input[type=checkbox]");
    checkBoxes.prop("checked", false);
    map.setPaintProperty('junctions', 'line-opacity', 0);

  });
});

map.on('style.load', function(e) {

    map.addSource('streams',{
      type: 'vector',
      url: 'https://services3.arcgis.com/TCnvslgqrzhT2ZXG/arcgis/rest/services/MHFD_Streams/FeatureServer'
    });



    map.addLayer({
      'id': 'streams',
      'type': 'line',
      'source': 'streams',
      'source-layer':'Streams',
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
        'source': 'streams',
        'source-layer': 'Streams',
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
          'text-halo-blur': 1,
          'text-opacity': 1,
        }
      });

    map.addSource('swmm_conduits', {
      type: 'geojson',
      "data": 'data/mhfd_swmm_conduits.geojson'
    });




  // SWMM Conduits
  map.addLayer({
    'id': 'swmm_conduits',
    'type': 'line',
    'source': 'swmm_conduits',
    'layout': {
      "visibility": 'visible'
    },
    'paint': {
      'line-width': 4,
      'line-color': '#036180'
    }
  });

  map.addLayer({
    'id': 'conduitArrows',
    'type': 'symbol',
    'source': 'swmm_conduits',
    'layout': {
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

  map.addLayer({
    'id': 'conduitLabels',
    'type': 'symbol',
    'source': 'swmm_conduits',
    'layout': {
      "text-optional": true,
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{NAME}',
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      'text-size': 10,
      "text-padding": 100,
    },
    'paint': {
      'text-color': '#F8F4F0',
      'text-halo-color': '#036180',
      'text-halo-width': 1
    }
  });

  map.addSource('junctions', {
    type: 'geojson',
    "data": 'data/mhfd_swmm_junction.geojson'
  });
  //Add Study Area
  map.addLayer({
    'id': 'junctions',
    'type': 'circle',
    'source': 'junctions',
    'layout': {
      "visibility": 'visible'
    },
    'paint': {
      'circle-radius': 4,
      'circle-color': '#ee4d5a'
    }
  });







  //
  // // SWMM Junctions
  // map.addLayer({
  //     'id': 'swmm_junctions',
  //     'type': 'circle',
  //     'source': 'swmm_junctions',
  //     'source-layer': 'swmm_junctions-3gs2y9',
  //     'layout': {
  //        "visibility": 'none'
  //      },
  //     'paint': {
  //         'circle-radius': 4,
  //         'circle-color': '#ee4d5a'
  //     }
  // });
  //
  // map.addLayer({
  //     'id': 'swmm_junctionLabels',
  //     'type': 'symbol',
  //     'source': 'swmm_junctions',
  //     'source-layer': 'swmm_junctions-3gs2y9',
  //     'layout': {
  //        "visibility": 'none',
  //        "text-optional": true,
  //        "text-line-height": 1,
  //        "text-size": 12,
  //        "text-field": "{id}",
  //        'text-font': ['Roboto Bold','Open Sans Regular','Arial Unicode MS Regular'],
  //        "text-offset": [0, 1],
  //        "text-anchor": "top"
  //    },
  //    "paint": {
  //      "text-color": "#ee4d5a",
  //      "text-halo-color": "#F8F4F0",
  //      "text-halo-width": 1,
  //    }
  // });



}); //end style load



map.addControl(new mapboxgl.NavigationControl(), 'top-left');
