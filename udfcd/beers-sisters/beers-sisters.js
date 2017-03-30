
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
} else {
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cikh67rk8004n9vkouhls14s4',
    zoom: 16,
    center: [-105.1228, 39.61525]
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.value;
    map.setStyle('mapbox://styles/iconeng/' + layerId);
    document.getElementById('contours').className = 'display';
    document.getElementById('contoursMobile').className = 'link depth-1 display';
    document.getElementById('100yr').className = 'display';
    document.getElementById('100yrMobile').className = 'link depth-1 display';
    document.getElementById('property-lines').className = 'display';
    document.getElementById('property-linesMobile').className = 'link depth-1 display';
    document.getElementById('proposed-contours').className = 'display';
    document.getElementById('proposed-contoursMobile').className = 'link depth-1 display';
    document.getElementById('proposed-pond').className = 'display';
    document.getElementById('proposed-pondMobile').className = 'link depth-1 display';
    document.getElementById('ex-trail').className = 'display';
    document.getElementById('ex-trailMobile').className = 'link depth-1 display';
    document.getElementById('proposed-trail').className = 'display';
    document.getElementById('proposed-trailMobile').className = 'link depth-1 display';
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

map.on('style.load', function () {
// Sources
    map.addSource('contours', {
        type: 'vector',
        url: 'mapbox://iconeng.269b041a'
    });
    map.addSource('layers', {
        type: 'vector',
        url: 'mapbox://iconeng.f8ae7656'
    });
//100 Year Floodplain
    map.addLayer({
        'id': '100yr',
        'type': 'fill',
        'source': 'layers',
        'source-layer': 'fld_haz_ar',
        'layout': {
        },
        'paint': {
            'fill-color': '#09C2FF',
            'fill-opacity': 0.35
        }
    });
// Property Lines
      map.addLayer({
        'id': 'property-lines',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'EXISTING_PROPERTY_LINES',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1.5], [17, 2], [19, 3]]
          },
          'line-opacity': {
              "stops": [[16, 0.9],[19, 1]]
          },
          'line-color': '#000'
        }
    },'road-label-sm');
// Contours
    map.addLayer({
        'id': '5ftContours',
        'type': 'line',
        'source': 'contours',
        'source-layer': '1ft_contours_COSP',
        'filter': ['==', 'Index', 5],
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[12, .5], [17, 1.75], [19, 2.5]]
          },
          'line-opacity': {
              "stops": [[12, 0.3],[19, 1]]
          },
          'line-color': '#b68054'
        }
    },'road-label-sm');
    map.addLayer({
        'id': '1ftContours',
        'type': 'line',
        'source': 'contours',
        'source-layer': '1ft_contours_COSP',
        'filter': ['all',['!=', 'Index', 5]],
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 0], [17, .5], [19, 1]]
          },
          'line-opacity': {
              "stops": [[16, 0.7],[19, 1]]
          },
          'line-color': '#b68054'
        }
    },'road-label-sm');
// Proposed Contours
    map.addLayer({
        'id': 'proposed-contours',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'PROPOSED_CONTOURS',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 0], [17, .5], [19, 1]]
          },
          'line-opacity': {
              "stops": [[16, 0.7],[19, 1]]
          },
          'line-color': 'crimson'
        }
    });
// Pond Improvements
    map.addLayer({
        'id': 'proposed-pipe',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'PROPOSED_POND_IMPROVEMENTS',
        'filter': ["==", "Type", "Pipe"],
        'layout': {
          'line-join': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4.75], [21, 11.5]]
          },
          'line-opacity': {
              "stops": [[16, 0.7],[19, 1]]
          },
          'line-color': '#ee9900'
        }
    });
    map.addLayer({
        'id': 'proposed-pond',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'PROPOSED_POND_IMPROVEMENTS',
        'filter': ["!=", "Type", "Pipe"],
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 1.75], [19, 2.5]]
          },
          'line-opacity': {
              "stops": [[16, 0.7],[19, 1]]
          },
          'line-color': '#EEC900'
        }
    });
// Existing Trail
    map.addLayer({
        'id': 'ex-trail',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'EXISTING_TRAIL',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 1.75], [19, 2.5]]
          },
          'line-opacity': {
              "stops": [[16, 0.7],[19, 1]]
          },
          'line-color': 'lightseagreen'
        }
    });
// Proposed Trail
    map.addLayer({
        'id': 'proposed-trail',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'PROPOSED_TRAIL',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 1.75], [19, 2.5]]
          },
          'line-opacity': {
              "stops": [[16, 0.7],[19, 1]]
          },
          'line-color': 'darkorchid'
        }
    });
    map.addLayer({
        'id': '5ftLabels',
        'type': 'symbol',
        'source': 'contours',
        'source-layer': '1ft_contours_COSP',
        'filter': ['all',['==', 'Index', 5]],
        'layout': {
          'symbol-placement': 'line',
          'text-field': '{ELEV}',
          'text-font': ['DIN Offc Pro Light','Open Sans Light','Arial Unicode MS Regular'],
          'text-size': {
            "stops": [[15,12],[17,14],[19,18]]
          }
        },
        'paint': {
          'text-color': '#b68054',
          'text-halo-color': 'rgba(255,255,235,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 0.5
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

map.addControl(new mapboxgl.Geocoder());
map.addControl(new mapboxgl.Navigation({position: 'top-left'}));

}
