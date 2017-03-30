
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
} else {
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cihxv74vo00oynpm48wsujwo3',
    zoom: 12.5,
    center: [-105.15, 40.595]
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.value;
    map.setStyle('mapbox://styles/iconeng/' + layerId);
    document.getElementById('contours').className = '';
    document.getElementById('contoursMobile').className = 'link depth-1';
    document.getElementById('canals').className = '';
    document.getElementById('canalsMobile').className = 'link depth-1';
    document.getElementById('xs').className = '';
    document.getElementById('xsMobile').className = 'link depth-1';
    document.getElementById('wvb-route').className = '';
    document.getElementById('wvb-routeMobile').className = 'link depth-1';
    document.getElementById('mcb-route').className = '';
    document.getElementById('mcb-routeMobile').className = 'link depth-1';
    document.getElementById('wvb-spills').className = '';
    document.getElementById('wvb-spillsMobile').className = 'link depth-1';
    document.getElementById('mcb-spills').className = '';
    document.getElementById('mcb-spillsMobile').className = 'link depth-1';
    document.getElementById('wvb-basins').className = 'display';
    document.getElementById('wvb-basinsMobile').className = 'link depth-1 display';
    document.getElementById('wvb-junctions').className = 'display';
    document.getElementById('wvb-junctionsMobile').className = 'link depth-1 display';
    document.getElementById('mcb-basins').className = 'display';
    document.getElementById('mcb-basinsMobile').className = 'link depth-1 display';
    document.getElementById('mcb-junctions').className = 'display';
    document.getElementById('mcb-junctionsMobile').className = 'link depth-1 display';
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

map.on('style.load', function () {

    map.addSource('wvb-contours', {
        type: 'vector',
        url: 'mapbox://iconeng.7b288ff0'
    });
    map.addLayer({
        'id': 'wvb-1ftContours',
        'type': 'line',
        'source': 'wvb-contours',
        'source-layer': 'wvb_contours',
        'filter': ['all', ['==', 'Index', 0]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 0], [17, .5], [19, 1]]
          },
            'line-color': '#333'
        }
    },'road_label');
    map.addLayer({
        'id': 'wvb-5ftContours',
        'type': 'line',
        'source': 'wvb-contours',
        'source-layer': 'wvb_contours',
        'filter': ['all', ['>=', 'Index', 5],['<=', 'Index', 10]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 1.75], [19, 2.5]]
          },
            'line-color': '#111'
        }
    },'road_label');
    map.addLayer({
        'id': 'wvb-5ftLabels',
        'type': 'symbol',
        'source': 'wvb-contours',
        'source-layer': 'wvb_contours',
        'filter': ['all', ['>=', 'Index', 5],['<=', 'Index', 10]],
        'layout': {
          'symbol-placement': 'line',
          'visibility': 'none',
          'text-field': '{CONTOUR}',
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

    map.addSource('mcb-contours', {
        type: 'vector',
        url: 'mapbox://iconeng.2f2497d6'
    });
    map.addLayer({
        'id': 'mcb-1ftContours',
        'type': 'line',
        'source': 'mcb-contours',
        'source-layer': 'mcb_contours',
        'filter': ['all', ['==', 'Index', 0]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 0], [17, .5], [19, 1]]
          },
            'line-color': '#333'
        }
    },'road_label');
    map.addLayer({
        'id': 'mcb-5ftContours',
        'type': 'line',
        'source': 'mcb-contours',
        'source-layer': 'mcb_contours',
        'filter': ['all', ['>=', 'Index', 5],['<=', 'Index', 10]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 1.75], [19, 2.5]]
          },
            'line-color': '#111'
        }
    },'road_label');
    map.addLayer({
        'id': 'mcb-5ftLabels',
        'type': 'symbol',
        'source': 'mcb-contours',
        'source-layer': 'mcb_contours',
        'filter': ['all', ['>=', 'Index', 5],['<=', 'Index', 10]],
        'layout': {
          'symbol-placement': 'line',
          'visibility': 'none',
          'text-field': '{CONTOUR}',
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
    },'road_label');

    map.addSource('mcb-basins', {
        type: 'vector',
        url: 'mapbox://iconeng.83au2rpu'
    });
    map.addLayer({
        'id': 'mcb-basins',
        'type': 'fill',
        'source': 'mcb-basins',
        'source-layer': 'mcb_basins',
        'layerGroup': 1,
        'interactive': true,
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'fill-color': '#dc0714',
            'fill-opacity': 0.05
        }
    },'road_label');

    map.addLayer({
        "id": "mcb-basins-borders",
        "type": "line",
        "source": "mcb-basins",
        'source-layer': 'mcb_basins',
        "layout": {},
        "paint": {
            "line-color": "#dc0714",
            "line-width": 2
        }
    },'road_label');

    map.addSource('wvb-basins', {
        type: 'vector',
        url: 'mapbox://iconeng.5n8brw3p'
    });
    map.addLayer({
        'id': 'wvb-basins',
        'type': 'fill',
        'source': 'wvb-basins',
        'source-layer': 'wvb_basins',
        'layerGroup': 1,
        'interactive': true,
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'fill-color': '#1407dc',
            'fill-opacity': 0.05
        }
    },'road_label');

    map.addLayer({
        "id": "wvb-basins-borders",
        "type": "line",
        "source": "wvb-basins",
        'source-layer': 'wvb_basins',
        "layout": {},
        "paint": {
            "line-color": "#1407dc",
            "line-width": 2
        }
    },'road_label');

    map.addSource('canals', {
    type: 'vector',
    url: 'mapbox://iconeng.8bkept6e'
    });
    map.addLayer({
        'id': 'canals',
        'type': 'line',
        'source': 'canals',
        'source-layer': 'wvb_canals',
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
            'line-color': '#33ffff'
        }
    });

    map.addLayer({
        'id': 'canalLabels',
        'type': 'symbol',
        'source': 'canals',
        'source-layer': 'wvb_canals',
        'layout': {
          'symbol-placement': 'line',
          'symbol-spacing': 100,
          'visibility': 'none',
          'text-field': '{Name}',
          'text-size': {
            "stops": [[15,12],[17,14],[19,16]]
          },
          "text-padding": 100,
        },
        'paint': {
          'text-color': '#000',
          'text-halo-color': 'rgba(75,255,255,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 1
        }
    });

    map.addSource('xs', {
    type: 'vector',
    url: 'mapbox://iconeng.0n0c8e77'
    });
    map.addLayer({
        'id': 'xs',
        'type': 'line',
        'source': 'xs',
        'source-layer': 'wvb_xs',
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
            'line-color': '#33ffff'
        }
    });
    map.addLayer({
        'id': 'xsLabels',
        'type': 'symbol',
        'source': 'xs',
        'source-layer': 'wvb_xs',
        'layout': {
          'symbol-placement': 'line',
          'symbol-spacing': 100,
          'visibility': 'none',
          'text-field': '{Station}',
          'text-size': {
            "stops": [[15,12],[17,14],[19,16]]
          },
          "text-padding": 100,
        },
        'paint': {
          'text-color': '#000',
          'text-halo-color': 'rgba(75,255,255,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 1
        }
    });

    map.addSource('wvb-routing', {
        type: 'vector',
        url: 'mapbox://iconeng.6jqhw3te'
    });
    map.addLayer({
        'id': 'wvb-routing',
        'type': 'line',
        'source': 'wvb-routing',
        'source-layer': 'wvb_lines',
        'filter': ['all', ['==', 'PINS', 'Y']],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#ffd700'
        }
    },'road-label');
    map.addLayer({
        'id': 'wvb-routing2',
        'type': 'line',
        'source': 'wvb-routing',
        'source-layer': 'wvb_lines',
        'filter': ['all', ['==', 'PINS', 'N']],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#ffd700',
            'line-dasharray': [4,3]
        }
    },'road-label');

    map.addLayer({
        'id': 'wvb-routingLabels',
        'type': 'symbol',
        'source': 'wvb-routing',
        'source-layer': 'wvb_lines',
        'filter': ['all', ['==', 'PINS', 'Y']],
        'layout': {
          'symbol-placement': 'line',
          'symbol-spacing': 100,
          'visibility': 'none',
          'text-field': '{Id}',
          'text-size': {
            "stops": [[15,12],[17,14],[19,16]]
          },
          "text-padding": 100,
        },
        'paint': {
          'text-color': '#000',
          'text-halo-color': 'rgba(255,215,0,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 1
        }
    });

    map.addSource('mcb-routing', {
        type: 'vector',
        url: 'mapbox://iconeng.7ztogkh5'
    });
    map.addLayer({
        'id': 'mcb-routing',
        'type': 'line',
        'source': 'mcb-routing',
        'source-layer': 'mcb_lines',
        'filter': ['all', ['==', 'PINS', 'Y']],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#ffd700'
        }
    },'road-label');
    map.addLayer({
        'id': 'mcb-routing2',
        'type': 'line',
        'source': 'mcb-routing',
        'source-layer': 'mcb_lines',
        'filter': ['all', ['==', 'PINS', 'N']],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#ffd700',
            'line-dasharray': [4,3]
        }
    },'road-label');

    map.addLayer({
        'id': 'mcb-routingLabels',
        'type': 'symbol',
        'source': 'mcb-routing',
        'source-layer': 'mcb_lines',
        'filter': ['all', ['==', 'PINS', 'Y']],
        'layout': {
          'symbol-placement': 'line',
          'symbol-spacing': 100,
          'visibility': 'none',
          'text-field': '{Number}',
          'text-size': {
            "stops": [[15,12],[17,14],[19,16]]
          },
          "text-padding": 100,
        },
        'paint': {
          'text-color': '#000',
          'text-halo-color': 'rgba(255,215,0,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 1
        }
    });

    map.addLayer({
        'id': 'wvb-routingArrows',
        'type': 'symbol',
        'source': 'wvb-routing',
        'source-layer': 'wvb_lines',
        'layout': {
          'symbol-placement': 'line',
          'symbol-spacing': 75,
          'visibility': 'none',
          "icon-image": "oneway-road-black",
          "icon-allow-overlap": true,
          "text-rotation-alignment": "map",
          "icon-size": {
              "base": 1,
              "stops": [
                  [
                      15,
                      0.5
                  ],
                  [
                      22,
                      1
                  ]
              ]
          },
          "text-keep-upright": false,
          "icon-padding": 0,
          "icon-ignore-placement": true
        },
        'paint': {
          'text-color': '#000',
          'text-halo-color': 'rgba(255,215,0,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 1
        }
    },'wvb-routingLabels');

    map.addLayer({
        'id': 'mcb-routingArrows',
        'type': 'symbol',
        'source': 'mcb-routing',
        'source-layer': 'mcb_lines',
        'layout': {
          'symbol-placement': 'line',
          'symbol-spacing': 75,
          'visibility': 'none',
          "icon-image": "oneway-road-black",
          "icon-allow-overlap": true,
          "text-rotation-alignment": "map",
          "icon-size": {
              "base": 1,
              "stops": [
                  [
                      15,
                      0.5
                  ],
                  [
                      22,
                      1
                  ]
              ]
          },
          "text-keep-upright": false,
          "icon-padding": 0,
          "icon-ignore-placement": true
        },
        'paint': {
          'text-color': '#000',
          'text-halo-color': 'rgba(255,215,0,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 1
        }
    },'mcb-routingLabels');

    map.addSource('wvb-spills', {
        type: 'vector',
        url: 'mapbox://iconeng.a90sii2z'
    });
    map.addLayer({
        'id': 'wvb-spills',
        'type': 'line',
        'source': 'wvb-spills',
        'source-layer': 'wvb_spillflows',
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#d700d7'
        }
    });
    map.addLayer({
        'id': 'wvb-spillLabels',
        'type': 'symbol',
        'source': 'wvb-spills',
        'source-layer': 'wvb_spillflows',
        'layout': {
          'symbol-placement': 'line',
          'symbol-spacing': 100,
          'visibility': 'none',
          'text-field': '{100_Spill}cfs',
          'text-size': {
            "stops": [[15,12],[17,14],[19,16]]
          },
          "text-padding": 100,
        },
        'paint': {
          'text-color': '#fff',
          'text-halo-color': 'rgba(215,0,215,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 1
        }
    });

    map.addSource('mcb-spills', {
        type: 'vector',
        url: 'mapbox://iconeng.4iegbxst'
    });
    map.addLayer({
        'id': 'mcb-spills',
        'type': 'line',
        'source': 'mcb-spills',
        'source-layer': 'mcb_spillflows',
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#d700d7'
        }
    });
    map.addLayer({
        'id': 'mcb-spillLabels',
        'type': 'symbol',
        'source': 'mcb-spills',
        'source-layer': 'mcb_spillflows',
        'layout': {
          'symbol-placement': 'line',
          'symbol-spacing': 100,
          'visibility': 'none',
          'text-field': '{100_Spill}cfs',
          'text-size': {
            "stops": [[15,12],[17,14],[19,16]]
          },
          "text-padding": 100,
        },
        'paint': {
          'text-color': '#fff',
          'text-halo-color': 'rgba(215,0,215,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 1
        }
    });

    map.addSource('wvb-junctions', {
        type: 'vector',
        url: 'mapbox://iconeng.ackrtqyc'
    });
    map.addLayer({
        'id': 'wvb-junctions',
        'type': 'symbol',
        'interactive': true,
        'source': 'wvb-junctions',
        'source-layer': 'wvb_junctions',
        'filter': ['all', ['in', 'Class', 'Design', 'Outfall', 'Storage']],
        'layout': {
            "text-optional": true,
            "text-line-height": 1,
            "text-size": {
                "stops": [[8,10],[20,20]],
                "base": 1.5
            },
           "icon-image": "{symbol}-c",
           "icon-halo-color": '#000000',
           "icon-halo-width":1,
           "text-field": "{Id}",
           "text-font": ["Lato Regular", "Arial Unicode MS Bold"],
           "text-offset": [0, 1.2],
           "text-anchor": "top"
       },
       "paint": {
         "text-color": "#504a4c",
         "text-halo-color": "#F8F4F0",
         "text-halo-width": {
             "base": 1.5,
             "stops": [[11,2],[20,3.75]]
         }
       }
    });

    map.addSource('mcb-junctions', {
        type: 'vector',
        url: 'mapbox://iconeng.8v22rol1'
    });
    map.addLayer({
        'id': 'mcb-junctions',
        'type': 'symbol',
        'interactive': true,
        'source': 'mcb-junctions',
        'source-layer': 'mcb_junctions',
        'filter': ['all', ['in', 'Type', 'Design', 'Outfall', 'Storage']],
        'layout': {
            "text-optional": true,
            "text-line-height": 1,
            "text-size": {
                "stops": [[8,10],[20,20]],
                "base": 1.5
            },
           "icon-image": "{symbol}-c",
           "icon-halo-color": '#000000',
           "icon-halo-width":1,
           "text-field": "{Number}",
           "text-font": ["Lato Regular", "Arial Unicode MS Bold"],
           "text-offset": [0, 1.2],
           "text-anchor": "top"
       },
       "paint": {
         "text-color": "#504a4c",
         "text-halo-color": "#F8F4F0",
         "text-halo-width": {
             "base": 1.5,
             "stops": [[11,2],[20,3.75]]
         }
       }
    });
    map.addLayer({
        'id': 'wvb-basinMarker',
        'type': 'circle',
        'source': 'wvb-junctions',
        'source-layer': 'wvb_junctions',
        'filter': ['all', ['==', 'Class', 'Basin']],
       "paint": {
         "circle-color": "#1407dc",
         "circle-radius":{"stops": [[12,8],[20,20]]},
         "circle-blur":0.2,
         "circle-opacity":0.5
       }
    });
    map.addLayer({
        'id': 'wvb-basinLabel',
        'type': 'symbol',
        'source': 'wvb-junctions',
        'source-layer': 'wvb_junctions',
        'filter': ['all', ['==', 'Class', 'Basin']],
        'layout': {
            "text-optional": true,
            "text-line-height": 1,
            "text-size": {
                "stops": [[8,10],[20,20]],
                "base": 1.5
            },
           "text-field": "{Join_ID}",
           "text-font": ["Lato Regular", "Arial Unicode MS Bold"]
       },
       "paint": {
         "text-color": "#fff"
       }
    });
    map.addLayer({
        'id': 'mcb-basinMarker',
        'type': 'circle',
        'source': 'mcb-junctions',
        'source-layer': 'mcb_junctions',
        'filter': ['all', ['==', 'Type', 'Basin']],
       "paint": {
         "circle-color": "#dc0714",
         "circle-radius":{"stops": [[12,8],[20,20]]},
         "circle-blur":0.2,
         "circle-opacity":0.5
       }
    });
    map.addLayer({
        'id': 'mcb-basinLabel',
        'type': 'symbol',
        'source': 'mcb-junctions',
        'source-layer': 'mcb_junctions',
        'filter': ['all', ['==', 'Type', 'Basin']],
        'layout': {
            "text-optional": true,
            "text-line-height": 1,
            "text-size": {
                "stops": [[8,10],[20,20]],
                "base": 1.5
            },
           "text-field": "{Number}",
           "text-font": ["Lato Regular", "Arial Unicode MS Bold"]
       },
       "paint": {
         "text-color": "#fff"
       }
    });

}); //end style load

function toggleLayer(id, id2, layer) {

        var visibility = map.getLayoutProperty(layer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(layer, 'visibility', 'none');
            document.getElementById(id).className = '';
            document.getElementById(id2).className = 'link depth-1';
        } else {
            document.getElementById(id).className = 'display';
            document.getElementById(id2).className = 'link depth-1 display';
            map.setLayoutProperty(layer, 'visibility', 'visible');
        }
    };

function toggleTwo(id, id2, layer, layer2) {

            var visibility = map.getLayoutProperty(layer, 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty(layer, 'visibility', 'none');
                map.setLayoutProperty(layer2, 'visibility', 'none');
                document.getElementById(id).className = '';
                document.getElementById(id2).className = 'link depth-1';
            } else {
                document.getElementById(id).className = 'display';
                document.getElementById(id2).className = 'link depth-1 display';
                map.setLayoutProperty(layer, 'visibility', 'visible');
                map.setLayoutProperty(layer2, 'visibility', 'visible');
            }
        };

function toggleThree(id, id2, layer, layer2, layer3) {

        var visibility = map.getLayoutProperty(layer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(layer, 'visibility', 'none');
            map.setLayoutProperty(layer2, 'visibility', 'none');
            map.setLayoutProperty(layer3, 'visibility', 'none');
            document.getElementById(id).className = '';
            document.getElementById(id2).className = 'link depth-1';
        } else {
            document.getElementById(id).className = 'display';
            document.getElementById(id2).className = 'link depth-1 display';
            map.setLayoutProperty(layer, 'visibility', 'visible');
            map.setLayoutProperty(layer2, 'visibility', 'visible');
            map.setLayoutProperty(layer3, 'visibility', 'visible');
        }
    };

function toggleFour(id, id2, layer, layer2, layer3, layer4) {

            var visibility = map.getLayoutProperty(layer, 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty(layer, 'visibility', 'none');
                map.setLayoutProperty(layer2, 'visibility', 'none');
                map.setLayoutProperty(layer3, 'visibility', 'none');
                map.setLayoutProperty(layer4, 'visibility', 'none');
                document.getElementById(id).className = '';
                document.getElementById(id2).className = 'link depth-1';
            } else {
                document.getElementById(id).className = 'display';
                document.getElementById(id2).className = 'link depth-1 display';
                map.setLayoutProperty(layer, 'visibility', 'visible');
                map.setLayoutProperty(layer2, 'visibility', 'visible');
                map.setLayoutProperty(layer3, 'visibility', 'visible');
                map.setLayoutProperty(layer4, 'visibility', 'visible');
            }
        };

function toggleSix(id, id2, layer, layer2, layer3, layer4, layer5, layer6) {

            var visibility = map.getLayoutProperty(layer, 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty(layer, 'visibility', 'none');
                map.setLayoutProperty(layer2, 'visibility', 'none');
                map.setLayoutProperty(layer3, 'visibility', 'none');
                map.setLayoutProperty(layer4, 'visibility', 'none');
                map.setLayoutProperty(layer5, 'visibility', 'none');
                map.setLayoutProperty(layer6, 'visibility', 'none');
                document.getElementById(id).className = '';
                document.getElementById(id2).className = 'link depth-1';
            } else {
                document.getElementById(id).className = 'display';
                document.getElementById(id2).className = 'link depth-1 display';
                map.setLayoutProperty(layer, 'visibility', 'visible');
                map.setLayoutProperty(layer2, 'visibility', 'visible');
                map.setLayoutProperty(layer3, 'visibility', 'visible');
                map.setLayoutProperty(layer4, 'visibility', 'visible');
                map.setLayoutProperty(layer5, 'visibility', 'visible');
                map.setLayoutProperty(layer6, 'visibility', 'visible');
            }
        };

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (e) {
    map.featuresAt(e.point, {layer: ['mcb-junctions','wvb-junctions'], radius: 10, includeGeometry: true}, function (err, features) {
      if (err) throw err;
      var feature = features[0];

        var tooltip = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('Type: ' + feature.properties.Type)
            .addTo(map);
    });
});

//map.on('click', function (e) {
  //  map.featuresAt(e.point, {layer: ['basins'], radius: 10, includeGeometry: true}, function (err, features) {
    //  if (err) throw err;
      //var feature = features[0];
        //  document.getElementById('features').innerHTML = 'Basin: ' + feature.properties.Basin;
    //});
//});

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
    map.featuresAt(e.point, {layer: ['mcb-junctions','wvb-junctions'], radius: 10}, function (err, features) {
        map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';
    });
});

//map.on('mousemove', function (e) {
//    map.featuresAt(e.point, {layer: ['basins'], radius: 10}, function (err, features) {
//        if (!err && features.length) {
//                map.setFilter("basins-hover", ["==", "Basin", features[0].properties.Basin]);
//            } else {
//                map.setFilter("basins-hover", ["==", "Basin", ""]);
//            }
//    });
//});

map.addControl(new mapboxgl.Geocoder());
map.addControl(new mapboxgl.Navigation({position: 'top-left'}));

}
