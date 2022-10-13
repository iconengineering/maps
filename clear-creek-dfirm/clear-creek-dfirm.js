mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
    zoom: 11,
    hash: true,
    center: [-105.4073, 39.7768]
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

map.on('style.load', function () {


  map.addSource('clearCreek', {
      type: 'vector',
      url: 'mapbox://iconeng.1ddf5216'
  });
  map.addSource('jeffco', {
      type: 'vector',
      url: 'mapbox://iconeng.bf1c1994'
  });


// CLEAR CREEK
  map.addLayer({
      'id': 'cc-sfha',
      'type': 'fill',
      'source': 'clearCreek',
      'source-layer': 'CC_SFHA_Intersect',
      'filter': ['any', ['==', 'SFHA_TF_1', 'T'],['==', 'ZONE_SUB_1', '0.2 PCT ANNUAL CHANCE FLOOD HAZARD']],
      'paint': {
          'fill-opacity': 0.75,
          'fill-color': {
            property: 'FLD_ZONE_1',
            type: 'categorical',
            stops: [
                ['A', '#2196F3'],
                ['AE', '#2196F3'],
                ['AH', '#2196F3'],
                ['X', '#ffa726']
                ]
        }
      }
  });
  map.addLayer({
      'id': 'cc-changes',
      'type': 'fill',
      'source': 'clearCreek',
      'source-layer': 'CC_SFHA_Intersect',
      'filter': ['any', ['==', 'change', 'TF'],['==', 'change', 'FT']],
      'paint': {
          'fill-opacity': 0,
          'fill-color': {
            property: 'change',
            type: 'categorical',
            stops: [
                ['FT', '#F57B7B'],
                ['TF', '#A5F57B']
                ]
        }
      }
  });
  map.addLayer({
      'id': 'cc-streams',
      'type': 'line',
      'source': 'clearCreek',
      'source-layer': 'S_Wtr_Ln',
      'layout': {
        'visibility': 'none'
      },
      'paint': {
          'line-width': 1,
          'line-color': '#2a5674'
      }
  });
  map.addLayer({
      'id': 'cc-streamsLabels',
      'type': 'symbol',
      'source': 'clearCreek',
      'source-layer': 'S_Wtr_Ln',
      'layout': {
        'visibility': 'none',
        "text-optional": true,
        'symbol-placement': 'line',
        'symbol-spacing': 100,
        'text-field': '{WTR_NM}',
        'text-font': ['Roboto Italic','Open Sans Italic','Arial Unicode MS Regular'],
        'text-size': 10,
        "text-padding": 100,
      },
      'paint': {
        'text-color': '#F8F4F0',
        'text-halo-color': '#2a5674',
        'text-halo-width': 1
      }
  });
  map.addLayer({
      'id': 'cc-structures',
      'type': 'line',
      'source': 'clearCreek',
      'source-layer': 'S_Gen_Struct',
      'layout': {
        'visibility': 'none'
      },
      'paint': {
          'line-width': 4,
          'line-color': '#222'
      }
  });
  map.addLayer({
      'id': 'cc-bfe',
      'type': 'line',
      'source': 'clearCreek',
      'source-layer': 'S_BFE',
      'layout': {
        'visibility': 'none'
      },
      'paint': {
          'line-width': 2,
          'line-color': '#555'
      }
  });
  map.addLayer({
      'id': 'cc-bfeLabels',
      'type': 'symbol',
      'source': 'clearCreek',
      'source-layer': 'S_BFE',
      'layout': {
        'visibility': 'none',
        "text-optional": true,
        'symbol-placement': 'line',
        'text-field': '{ELEV}',
        'text-font': ['Roboto Bold','Open Sans Regular','Arial Unicode MS Regular'],
        'text-size': 10,
      },
      'paint': {
        'text-color': '#F8F4F0',
        'text-halo-color': '#555',
        'text-halo-width': 1
      }
  });
  map.addLayer({
      'id': 'cc-xs',
      'type': 'line',
      'source': 'clearCreek',
      'source-layer': 'S_XS',
      'layout': {
        'visibility': 'none'
      },
      'paint': {
          'line-width': 2,
          'line-color': '#036180'
      }
  });
  map.addLayer({
      'id': 'cc-xsLabels',
      'type': 'symbol',
      'source': 'clearCreek',
      'source-layer': 'S_XS',
      'layout': {
        'visibility': 'none',
        "text-optional": true,
        'symbol-placement': 'line',
        'text-field': '{WSEL_REG}',
        'text-font': ['Roboto Bold','Open Sans Regular','Arial Unicode MS Regular'],
        'text-size': 10,
      },
      'paint': {
        'text-color': '#F8F4F0',
        'text-halo-color': '#036180',
        'text-halo-width': 1
      }
  });

  // JEFFERSON
    map.addLayer({
        'id': 'jc-sfha',
        'type': 'fill',
        'source': 'jeffco',
        'source-layer': 'Jeffco_SFHA_Intersect',
        'filter': ['any', ['==', 'SFHA_TF_1', 'T'],['==', 'ZONE_SUB_1', '0.2 PCT ANNUAL CHANCE FLOOD HAZARD']],
        'paint': {
            'fill-opacity': 0.75,
            'fill-color': {
              property: 'FLD_ZONE_1',
              type: 'categorical',
              stops: [
                  ['A', '#2196F3'],
                  ['AE', '#2196F3'],
                  ['AH', '#2196F3'],
                  ['AO', '#2196F3'],
                  ['X', '#ffa726']
                  ]
          }
        }
    });
    map.addLayer({
        'id': 'jc-changes',
        'type': 'fill',
        'source': 'jeffco',
        'source-layer': 'Jeffco_SFHA_Intersect',
        'filter': ['any', ['==', 'change', 'TF'],['==', 'change', 'FT']],
        'paint': {
            'fill-opacity': 0,
            'fill-color': {
              property: 'change',
              type: 'categorical',
              stops: [
                  ['FT', '#F57B7B'],
                  ['TF', '#A5F57B']
                  ]
          }
        }
    });
    map.addLayer({
        'id': 'jc-streams',
        'type': 'line',
        'source': 'jeffco',
        'source-layer': 'S_Wtr_Ln',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            'line-width': 1,
            'line-color': '#2a5674'
        }
    });
    map.addLayer({
        'id': 'jc-streamsLabels',
        'type': 'symbol',
        'source': 'jeffco',
        'source-layer': 'S_Wtr_Ln',
        'layout': {
          'visibility': 'none',
          "text-optional": true,
          'symbol-placement': 'line',
          'symbol-spacing': 100,
          'text-field': '{WTR_NM}',
          'text-font': ['Roboto Italic','Open Sans Italic','Arial Unicode MS Regular'],
          'text-size': 10,
          "text-padding": 100,
        },
        'paint': {
          'text-color': '#F8F4F0',
          'text-halo-color': '#2a5674',
          'text-halo-width': 1
        }
    });
    map.addLayer({
        'id': 'jc-structures',
        'type': 'line',
        'source': 'jeffco',
        'source-layer': 'S_Gen_Struct',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            'line-width': 4,
            'line-color': '#222'
        }
    });
    map.addLayer({
        'id': 'jc-bfe',
        'type': 'line',
        'source': 'jeffco',
        'source-layer': 'S_BFE',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            'line-width': 2,
            'line-color': '#555'
        }
    });
    map.addLayer({
        'id': 'jc-bfeLabels',
        'type': 'symbol',
        'source': 'jeffco',
        'source-layer': 'S_BFE',
        'layout': {
          'visibility': 'none',
          "text-optional": true,
          'symbol-placement': 'line',
          'text-field': '{ELEV}',
          'text-font': ['Roboto Bold','Open Sans Regular','Arial Unicode MS Regular'],
          'text-size': 10,
        },
        'paint': {
          'text-color': '#F8F4F0',
          'text-halo-color': '#555',
          'text-halo-width': 1
        }
    });
    map.addLayer({
        'id': 'jc-xs',
        'type': 'line',
        'source': 'jeffco',
        'source-layer': 'S_XS',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            'line-width': 2,
            'line-color': '#036180'
        }
    });
    map.addLayer({
        'id': 'jc-xsLabels',
        'type': 'symbol',
        'source': 'jeffco',
        'source-layer': 'S_XS',
        'layout': {
          'visibility': 'none',
          "text-optional": true,
          'symbol-placement': 'line',
          'text-field': '{WSEL_REG}',
          'text-font': ['Roboto Bold','Open Sans Regular','Arial Unicode MS Regular'],
          'text-size': 10,
        },
        'paint': {
          'text-color': '#F8F4F0',
          'text-halo-color': '#036180',
          'text-halo-width': 1
        }
    });

});

document.getElementById('clearcreek').addEventListener('click', function() {

  var bbox = [[-105.7, 39.7], [-105.47, 39.78]];
  map.fitBounds(bbox, { padding: 10 });

});

document.getElementById('jeffco').addEventListener('click', function() {

  var bbox = [[-105.24, 39.75], [-105.12, 39.87]];
  map.fitBounds(bbox, { padding: 10 });

});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');
