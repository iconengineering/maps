
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
} else {
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cikh67rk8004n9vkouhls14s4',
    zoom: 11,
    center: [-105.09, 39.78]
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.value;
    map.setStyle('mapbox://styles/iconeng/' + layerId);
    document.getElementById('contours').className = 'display';
    document.getElementById('contoursMobile').className = 'link depth-1 display';
    document.getElementById('cities').className = '';
    document.getElementById('citiesMobile').className = 'link depth-1 ';
    document.getElementById('counties').className = '';
    document.getElementById('countiesMobile').className = 'link depth-1 ';
    document.getElementById('ayersXS').className = '';
    document.getElementById('ayersXSMobile').className = 'link depth-1 ';
    document.getElementById('ayersRiver').className = '';
    document.getElementById('ayersRiverMobile').className = 'link depth-1 ';
    document.getElementById('iconXS').className = '';
    document.getElementById('iconXSMobile').className = 'link depth-1';
    document.getElementById('iconRiver').className = '';
    document.getElementById('iconRiverMobile').className = 'link depth-1';
    document.getElementById('newXS').className = '';
    document.getElementById('newXSMobile').className = 'link depth-1';
    document.getElementById('bridges').className = '';
    document.getElementById('bridgesMobile').className = 'link depth-1';
    document.getElementById('100yr').className = 'display';
    document.getElementById('100yrMobile').className = 'link depth-1 display';
    document.getElementById('prerasXS').className = '';
    document.getElementById('prerasXSMobile').className = 'link depth-1';
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

map.on('style.load', function () {
// Sources
    map.addSource('CCF', {
        type: 'vector',
        url: 'mapbox://iconeng.1a26f0f3'
    });

    map.addSource('contours', {
        type: 'vector',
        url: 'mapbox://iconeng.9229dc09'
    });

    map.addSource('bridges', {
        type: 'geojson',
        data: 'CCF_Bridges.geojson'
    });
//100 Year Floodplain
    map.addLayer({
        'id': '100yr',
        'type': 'fill',
        'source': 'CCF',
        'source-layer': 'CCF_100yr',
        'layout': {
        },
        'paint': {
            'fill-color': '#09C2FF',
            'fill-opacity': 0.35
        }
    },'road_label-sm');
// Contours
    map.addLayer({
        'id': '5ftContours',
        'type': 'line',
        'source': 'contours',
        'source-layer': '15066ccf_1ft_contours_smooth',
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
          'line-color': '#222'
        }
    },'road-label-sm');
    map.addLayer({
        'id': '1ftContours',
        'type': 'line',
        'source': 'contours',
        'source-layer': '15066ccf_1ft_contours_smooth',
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
          'line-color': '#222'
        }
    },'road-label-sm');
    map.addLayer({
        'id': '5ftLabels',
        'type': 'symbol',
        'source': 'contours',
        'source-layer': '15066ccf_1ft_contours_smooth',
        'filter': ['all',['==', 'Index', 5]],
        'layout': {
          'symbol-placement': 'line',
          'text-field': '{CONTOUR}',
          'text-font': ['DIN Offc Pro Light','Open Sans Light','Arial Unicode MS Regular'],
          'text-size': {
            "stops": [[15,12],[17,14],[19,18]]
          }
        },
        'paint': {
          'text-color': '#222',
          'text-halo-color': 'rgba(255,255,235,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 0.5
        }
    });
// Counties
    map.addLayer({
        'id': 'counties',
        'type': 'line',
        'source': 'CCF',
        'source-layer': 'Counties',
        'layout': {
          'visibility': 'none',
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[12, 1], [17, 1.75], [19, 2.5]]
          },
          'line-opacity': {
              "stops": [[12, 0.7],[19, 1]]
          },
          'line-dasharray': [4,3],
          'line-color': 'black'
        }
    },'road-label-sm');
// Cities
    map.addLayer({
        'id': 'citiesBounds',
        'type': 'line',
        'source': 'CCF',
        'source-layer': 'Cities',
        'layout': {
          'visibility': 'none',
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[12, 1], [17, 1.75], [19, 2.5]]
          },
          'line-opacity': {
              "stops": [[12, 0.7],[19, 1]]
          },
          'line-dasharray': [2,4],
          'line-color': 'slateblue'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'golden',
        'type': 'fill',
        'source': 'CCF',
        'source-layer': 'Cities',
        'filter': ['all', ['==', 'CITY_NAME', 'GOLDEN']],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#A0DB8E',
            'fill-opacity': 0.25
        }
    },'road_label-sm');
    map.addLayer({
        'id': 'wheatRidge',
        'type': 'fill',
        'source': 'CCF',
        'source-layer': 'Cities',
        'filter': ['all', ['==', 'CITY_NAME', 'WHEAT RIDGE']],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#ffc9a5',
            'fill-opacity': 0.25
        }
    },'road_label-sm');
    map.addLayer({
        'id': 'arvada',
        'type': 'fill',
        'source': 'CCF',
        'source-layer': 'Cities',
        'filter': ['all', ['==', 'CITY_NAME', 'ARVADA']],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#c580b0',
            'fill-opacity': 0.25
        }
    },'road_label-sm');
// Ayers FHAD
    map.addLayer({
        'id': 'ayersXS',
        'type': 'line',
        'source': 'CCF',
        'source-layer': 'AYRES-FHAD-XS',
        'layout': {
          'visibility': 'none',
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[12, 1], [17, 1.75], [19, 2.5]]
          },
          'line-opacity': {
              "stops": [[12, 0.7],[19, 1]]
          },
          'line-color': '#8B0000'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'ayersRiver',
        'type': 'line',
        'source': 'CCF',
        'source-layer': 'OldRiverDS',
        'layout': {
          'visibility': 'none',
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[10, 1.5], [17, 3], [19, 6]]
          },
          'line-opacity': {
              "stops": [[10, 0.7],[19, 1]]
          },
          'line-color': '#B00038'
        }
    },'road-label-sm');
// ICON FHAD
    map.addLayer({
        'id': 'iconXS',
        'type': 'line',
        'source': 'CCF',
        'source-layer': 'ICON-FHAD-XS',
        'layout': {
          'visibility': 'none',
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[12, 1], [17, 1.75], [19, 2.5]]
          },
          'line-opacity': {
              "stops": [[12, 0.7],[19, 1]]
          },
          'line-color': '#C69300'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'iconRiver',
        'type': 'line',
        'source': 'CCF',
        'source-layer': 'OldRiverUS',
        'layout': {
          'visibility': 'none',
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[10, 1.5], [17, 3], [19, 6]]
          },
          'line-opacity': {
              "stops": [[10, 0.7],[19, 1]]
          },
          'line-color': '#FFCA2E'
        }
    },'road-label-sm');
// New FHAD
    map.addLayer({
        'id': 'newXS',
        'type': 'line',
        'source': 'CCF',
        'source-layer': 'ICON-NEW-XS',
        'layout': {
          'visibility': 'none',
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[12, 1], [17, 4], [19, 8]]
          },
          'line-opacity': {
              "stops": [[12, 0.7],[19, 1]]
          },
          'line-color': '#00FFFF'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'newRiver',
        'type': 'line',
        'source': 'CCF',
        'source-layer': 'NewRiver',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[10, 1.5], [17, 3], [19, 6]]
          },
          'line-opacity': {
              "stops": [[10, 0.7],[19, 1]]
          },
          'line-color': '#20b2ac'
        }
    },'road-label-sm');
// PreRas Cross Sections
    map.addLayer({
        'id': 'prerasXS',
        'type': 'line',
        'source': 'CCF',
        'source-layer': 'PrerasXS',
        'interactive': true,
        'layout': {
          'visibility': 'none',
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[12, 1], [17, 4], [19, 8]]
          },
          'line-opacity': {
              "stops": [[12, 0.7],[19, 1]]
          },
          'line-color': '#ff00FF'
        }
    },'road-label-sm');
// Bridges
    map.addLayer({
        'id': 'newBridge',
        'type': 'circle',
        'source': 'bridges',
        'filter': ['all', ['==', 'LAYER', 'New']],
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          "circle-radius": {
              "stops": [[12, 4], [22, 20]]
          },
          'circle-color': '#C908FF',
          'circle-opacity': .8
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'revBridge',
        'type': 'circle',
        'source': 'bridges',
        'filter': ['all', ['==', 'LAYER', 'Revised']],
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          "circle-radius": {
              "stops": [[12, 4], [22, 20]]
          },
          'circle-color': '#09C2FF',
          'circle-opacity': .8
        }
    },'road-label-sm');
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

function toggleSix(id, id2, layer, layer2, layer3, layer4, layer5, layer6, layer7) {

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
        map.featuresAt(e.point, {layer: ['prerasXS'], radius: 10, includeGeometry: true}, function (err, features) {
          if (err) throw err;
          var feature = features[0];

          var tooltip = new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML('Station: ' + feature.properties.ProfileM)
              .addTo(map);
        });
    });

    // Use the same approach as above to indicate that the symbols are clickable
    // by changing the cursor style to 'pointer'.
    map.on('mousemove', function (e) {
        map.featuresAt(e.point, {layer: ['prerasXS'], radius: 10}, function (err, features) {
            map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';
        });
    });

map.addControl(new mapboxgl.Geocoder());
map.addControl(new mapboxgl.Navigation({position: 'top-left'}));

}
