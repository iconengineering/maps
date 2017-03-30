mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
} else {
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot',
    zoom: 14,
    center: [-105.27, 40]
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

    map.addSource('5ftContours', {
        type: 'vector',
        url: 'mapbox://iconeng.8e23d2ea'
    });
    map.addSource('1ftContours', {
        type: 'vector',
        url: 'mapbox://iconeng.e1bdc7dc'
    });
    map.addSource('sbk-hydraulics', {
        type: 'vector',
        url: 'mapbox://iconeng.32d95d2f'
    });
    map.addSource('sbk-hydraulics-101416', {
        type: 'vector',
        url: 'mapbox://iconeng.17f0caf2'
    });
    map.addSource('floodExtents', {
    type: 'vector',
    url: 'mapbox://iconeng.8fvqotm7'
    });

    map.addLayer({
        'id': '5ftContours',
        'type': 'line',
        'source': '5ftContours',
        'source-layer': 'SBK_COB_2013_5ft_Contours',
        'layout': {
            'visibility': 'visible',
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
            'line-color': '#b68054'
        }
    });
    map.addLayer({
        'id': '1ftContours',
        'type': 'line',
        'source': '1ftContours',
        'source-layer': 'SBK_COB_2013_1ft_Contours_',
        'layout': {
            'visibility': 'visible',
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
    });
    map.addLayer({
        'id': '5ftLabels',
        'type': 'symbol',
        'source': '5ftContours',
        'source-layer': 'SBK_COB_2013_5ft_Contours',
        'layout': {
            'visibility': 'visible',
          'symbol-placement': 'line',
          'text-field': '{CONTOUR}',
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
    map.addLayer({
        'id': 'zoneX',
        'type': 'fill',
        'source': 'sbk-hydraulics-101416',
        'source-layer': 'EC_Zone_X',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-opacity': 0.4,
            'fill-color': '#FF8C00'
        }
    });
    map.addLayer({
        'id': 'zoneX100',
        'type': 'fill',
        'source': 'sbk-hydraulics-101416',
        'source-layer': 'EC_Zone_X_100_YR',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-opacity': 0.6,
            'fill-color': '#FFC107'
        }
    });
    map.addLayer({
        'id': 'zoneAO1',
        'type': 'fill',
        'source': 'sbk-hydraulics-101416',
        'source-layer': 'EC_Zone_AO_1_ft',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-opacity': 0.6,
            'fill-color': '#b8f3ff'
        }
    });
    map.addLayer({
        'id': 'zoneAO2',
        'type': 'fill',
        'source': 'sbk-hydraulics-101416',
        'source-layer': 'EC_Zone_AO_2_ft',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-opacity': 0.6,
            'fill-color': '#e980fc'
        }
    });
    map.addLayer({
        'id': 'zoneAO3',
        'type': 'fill',
        'source': 'sbk-hydraulics-101416',
        'source-layer': 'EC_Zone_AO_3_ft',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-opacity': 0.6,
            'fill-color': '#324A5F'
        }
    });
    map.addLayer({
        'id': 'gutter',
        'type': 'line',
        'source': 'sbk-hydraulics-101416',
        'source-layer': 'EC_Gutter_Line',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#92140C'
        }
    });
    map.addLayer({
        'id': 'zoneAE',
        'type': 'line',
        'source': 'sbk-hydraulics-101416',
        'source-layer': 'EC_Zone_AE',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#4056f4'
        }
    });
    map.addLayer({
        'id': 'floodway',
        'type': 'line',
        'source': 'sbk-hydraulics-101416',
        'source-layer': 'EC_Conveyance_Zone',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#DDD92A'
        }
    });
    map.addLayer({
        'id': 'floodExtents',
        'type': 'fill',
        'source': 'floodExtents',
        'source-layer': 'Boulder_Flood2013Extents',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-pattern': 'bluestripe',
            'fill-opacity': 0.9
        }
    });
    map.addLayer({
        'id': 'hhz',
        'type': 'fill',
        'source': 'sbk-hydraulics-101416',
        'source-layer': 'EC_High_Hazard_Zone',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-opacity': 0.75,
            'fill-color': '#dc0714'
        }
    });
    map.addLayer({
        'id': 'flowpath',
        'type': 'line',
        'source': 'sbk-hydraulics-101416',
        'source-layer': 'River_Stationing',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1.5], [17, 3], [19, 4.5]]
          },
            'line-color': '#150578'
        }
    });
    map.addLayer({
        'id': 'bfe',
        'type': 'line',
        'source': 'sbk-hydraulics-101416',
        'source-layer': 'EC_BFE',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#333'
        }
    });

    map.addLayer({
        'id': 'bfeLabels',
        'type': 'symbol',
        'source': 'sbk-hydraulics-101416',
        'source-layer': 'EC_BFE',
        'layout': {
            'visibility': 'visible',
          'symbol-placement': 'line',
          'text-field': '{Contour}',
          'text-font': ['DIN Offc Pro Light','Open Sans Light','Arial Unicode MS Regular'],
          'text-size': {
            "stops": [[15,12],[17,14],[19,16]]
          }
        },
        'paint': {
          'text-color': '#333',
          'text-halo-color': 'rgba(255,255,255,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 1
        }
    });
    map.addLayer({
        'id': 'xs',
        'type': 'line',
        'source': 'sbk-hydraulics-101416',
        'source-layer': 'EC_Cross_Sections',
        'interactive': true,
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#0f0'
        }
    });
    map.addLayer({
        'id': 'xsLabels',
        'type': 'symbol',
        'source': 'sbk-hydraulics-101416',
        'source-layer': 'EC_Cross_Sections',
        'layout': {
            'visibility': 'visible',
          'symbol-placement': 'line',
          'text-field': '{ProfileM}',
          'text-font': ['DIN Offc Pro Light','Open Sans Light','Arial Unicode MS Regular'],
          'text-size': {
            "stops": [[15,12],[17,14],[19,16]]
          }
        },
        'paint': {
          'text-color': '#000',
          'text-halo-color': 'rgba(0,255,0,0.9)',
          'text-halo-width': 1,
          'text-halo-blur': 1
        }
    });

}); //end style load

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['xs'] });
  if (!features.length) {
      return;
  }

  var feature = features[0];

        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<b>' + feature.properties.RiverCode + ' Cross Section ' + feature.properties.ProfileM + '</b> <br />' +
                     '10-year: ' + feature.properties.P003.toFixed(2) + '<br />' +
                     '25-year: ' + feature.properties.P004.toFixed(2) + '<br />' +
                     '50-year: ' + feature.properties.P005.toFixed(2) + '<br />' +
                     '<b>100-Year: ' + feature.properties.P001.toFixed(2) + '<br />' +
                     'Floodway: ' + feature.properties.P002.toFixed(2) + '</b><br />' +
                     '500-year: ' + feature.properties.P006.toFixed(2) )
            .addTo(map);
    });

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['xs'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

map.addControl(new mapboxgl.Navigation({position: 'top-right'}));

// disable map rotation using right click + drag
map.dragRotate.disable();

// disable map rotation using touch rotation gesture
map.touchZoomRotate.disableRotation();

}
