mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot',
    zoom: 15,
    center: [-105.122176, 39.564758]
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
    map.addSource('golfcourse', {
        type: 'raster',
        url: 'mapbox://iconeng.DeerCreekCC',
        tileSize: 256
    });
    map.addLayer({
        'id': 'DeerCreekCC',
        'type': 'raster',
        'source': 'golfcourse',
        'layout': {
          'visibility': 'visible'
        }
    });

    map.addSource('contours', {
        type: 'vector',
        url: 'mapbox://iconeng.d0a984c5'
    });
    map.addLayer({
        'id': '1ftContours',
        'type': 'line',
        'source': 'contours',
        'source-layer': 'deercreek_1ft_contours_CLIP',
        'filter': ['all', ['==', 'Index', 1]],
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 0], [17, .5], [19, 1]]
          },
            'line-color': '#333'
        }
    });
    map.addLayer({
        'id': '5ftContours',
        'type': 'line',
        'source': 'contours',
        'source-layer': 'deercreek_1ft_contours_CLIP',
        'filter': ['all', ['>=', 'Index', 5],['<=', 'Index', 10]],
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 1.75], [19, 2.5]]
          },
            'line-color': '#111'
        }
    });
    map.addLayer({
        'id': '5ftLabels',
        'type': 'symbol',
        'source': 'contours',
        'source-layer': 'deercreek_1ft_contours_CLIP',
        'filter': ['all', ['>=', 'Index', 5],['<=', 'Index', 10]],
        'layout': {
            'visibility': 'visible',
          'symbol-placement': 'line',
          'text-field': '{Label}',
          'text-size': {
            "stops": [[15,12],[17,14],[19,16]]
          }
        },
        'paint': {
          'text-color': '#000',
          'text-halo-color': 'rgba(255,255,255,0.9)',
          'text-halo-width': 1,
          'text-halo-blur': 1
        }
    });

    map.addSource('flowDepth', {
    type: 'vector',
    url: 'mapbox://iconeng.b4sgml1t'
    });
    map.addLayer({
        'id': 'flowDepth',
        'type': 'fill',
        'source': 'flowDepth',
        'source-layer': 'Massey_Flow_Depth',
        'filter': ['>=', 'Var', 0.25],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': {
              property: 'Var',
              type: 'interval',
              stops: [
                  [.25, '#feebe2'],
                  [.5, '#fcc5c0'],
                  [1, '#fa9fb5'],
                  [1.5, '#f768a1'],
                  [3, '#dd3497'],
                  [4.5, '#ae017e'],
                  [6, '#7a0177']
                  ]
          },
            'fill-opacity': 0.8
        }
    });

    map.addSource('xs', {
        type: 'vector',
        url: 'mapbox://iconeng.4hxy1qre'
    });
    map.addLayer({
        'id': 'xs19',
        'type': 'line',
        'source': 'xs',
        'source-layer': 'Massey_2D_XS',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': 'none'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#7a0177'
        }
    });
    map.addLayer({
        'id': 'xs19Labels',
        'type': 'symbol',
        'source': 'xs',
        'source-layer': 'Massey_2D_XS',
        'layout': {
          'visibility': 'none',
          'symbol-placement': 'line',
          'text-field': '{FLO_2D_19} cfs',
          'text-size': {
            "stops": [[15,12],[17,14],[19,16]]
          }
        },
        'paint': {
          'text-color': '#fff',
          'text-halo-color': 'rgba(122,1,119,0.9)',
          'text-halo-width': 1,
          'text-halo-blur': 1
        }
    });

    map.addSource('effectivesfha', {
    type: 'vector',
    url: 'mapbox://iconeng.cqw5w4o1'
    });
    map.addLayer({
        'id': 'effectivesfha',
        'type': 'fill',
        'source': 'effectivesfha',
        'source-layer': 'Massey_Effective_Floodplain',
        'layout': {
            'visibility': 'visible'
          },
        'paint': {
            'fill-opacity': 0.4,
            'fill-color': '#EDE04B',
            'fill-outline-color': '#EADA24'
        }
    });

    map.addSource('proposedsfha', {
    type: 'vector',
    url: 'mapbox://iconeng.84cky19r'
    });
    map.addLayer({
        'id': 'proposed500',
        'type': 'fill',
        'source': 'proposedsfha',
        'source-layer': 'massey_proposed_floodplain',
        'filter': ['all', ['==', 'Id', 500]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-opacity': 0.4,
            'fill-color': '#ffa600',
            'fill-outline-color': '#E68D00'
        }
    });
    map.addLayer({
        'id': 'proposed100',
        'type': 'fill',
        'source': 'proposedsfha',
        'source-layer': 'massey_proposed_floodplain',
        'filter': ['all', ['==', 'Id', 100]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-opacity': 0.4,
            'fill-color': '#00d7ff',
            'fill-outline-color': '#00aaff'
        }
    });
    map.addLayer({
        'id': 'proposedfw',
        'type': 'fill',
        'source': 'proposedsfha',
        'source-layer': 'massey_proposed_floodplain',
        'filter': ['all', ['==', 'Id', 0]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-opacity': 0.4,
            'fill-color': '#0088ff',
            'fill-outline-color': '#006FE6'
        }
    });

    map.addSource('parcels', {
        type: 'vector',
        url: 'mapbox://iconeng.cbdm8e4y'
    });
    map.addLayer({
        "id": "parcels",
        "type": "line",
        "source": "parcels",
        'source-layer': 'massey_parcels_impacted',
        "layout": {'visibility': 'none'},
        "paint": {
            "line-color": "#dc0714",
            "line-width": 2
        }
    });

    map.addSource('grading', {
    type: 'vector',
    url: 'mapbox://iconeng.11y0xexv'
    });

    map.addSource('culvert', {
    type: 'vector',
    url: 'mapbox://iconeng.37fpj0m8'
    });
    map.addLayer({
        'id': 'culvert-case',
        'type': 'line',
        'source': 'culvert',
        'source-layer': 'Massey_Proposed_Culvert',
        'layout': {
            'line-join': 'round',
            'line-cap': 'butt',
            'visibility': 'none'
        },
        'paint': {
            'line-width': {
                "stops": [[15, 3], [17, 5],[19,30], [21, 85]]
            },
            'line-color': '#fff',
            "line-offset": {
                   "base": 1,
                   "stops": [
                       [
                           19,
                           0
                       ],
                       [
                           22,
                           -10
                       ]
                   ]
               }
        }
    });
    map.addLayer({
        'id': 'culvert',
        'type': 'line',
        'source': 'culvert',
        'source-layer': 'Massey_Proposed_Culvert',
        'layout': {
            'line-join': 'round',
            'line-cap': 'butt',
            'visibility': 'none'
        },
        'paint': {
            'line-width': {
                "stops": [[15, 2], [17, 3],[19,20], [21, 60]]
            },
            'line-dasharray': [4,3],
            'line-color': '#0047BB',
            "line-offset": {
                   "base": 1,
                   "stops": [
                       [
                           19,
                           0
                       ],
                       [
                           22,
                           -10
                       ]
                   ]
               }
        }
    });
    map.addLayer({
        'id': 'grading',
        'type': 'line',
        'source': 'grading',
        'source-layer': 'Massey_Proposed_Grading',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': 'none'
        },
        'paint': {
          'line-width': {
              "stops": [[15, .25], [17, 1], [19, 2]]
          },
            'line-color': '#dc0714'
        }
    });

    map.addSource('bridges', {
    type: 'vector',
    url: 'mapbox://iconeng.5kvuedhc'
    });
    map.addLayer({
        'id': 'bridges',
        'type': 'line',
        'source': 'bridges',
        'source-layer': 'Massey_Proposed_Bridges',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': 'none'
        },
        'paint': {
            'line-width': {
                "stops": [[15, 2], [17, 3], [19, 5]]
            },
            'line-color': '#ffd700'
        }
    });

});

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {layer: ['flowDepth']}, function (err, features) {
      if (err) throw err;
      var feature = features[0];
        //  document.getElementById('features').innerHTML = 'Elevation: ' + feature.properties.ELEVATION;

        var tooltip = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('Depth: ' + feature.properties.Var + ' ft')
            .addTo(map);
    });
});

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, {layer: ['flowDepth']}, function (err, features) {
        map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';
    });
});
