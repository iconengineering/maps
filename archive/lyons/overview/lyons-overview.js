mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
} else {
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cihxv74vo00oynpm48wsujwo3',
    zoom: 14,
    center: [-105.27, 40.22]
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.value;
    map.setStyle('mapbox://styles/iconeng/' + layerId);
    document.getElementById('contours').className = 'display';
    document.getElementById('contoursMobile').className = 'link depth-1 display';
    document.getElementById('huc12').className = 'display';
    document.getElementById('huc12Mobile').className = 'link depth-1 display';
    document.getElementById('parcels').className = 'display';
    document.getElementById('parcelsMobile').className = 'link depth-1 display';
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

map.on('style.load', function () {

  map.addSource('huc12', {
  type: 'vector',
  url: 'mapbox://iconeng.cpfr2qks'
  });
  map.addLayer({
      'id': 'huc12-1',
      'type': 'fill',
      'source': 'huc12',
      'source-layer': 'lyo_huc12',
      'filter': ['all',['==', 'HUC_12', '101900050701']],
      'layout': {
          'line-join': 'round',
          'line-cap': 'round'
      },
      'paint': {
          'fill-opacity': 0.15,
          'fill-color': '#ff91ff',
          'fill-outline-color': '#444',
          'fill-outline-width':3
      }
  },'road_label');
  map.addLayer({
      'id': 'huc12-2',
      'type': 'fill',
      'source': 'huc12',
      'source-layer': 'lyo_huc12',
      'filter': ['all',['==', 'HUC_12', '101900050103']],
      'layout': {
          'line-join': 'round',
          'line-cap': 'round'
      },
      'paint': {
          'fill-opacity': 0.15,
          'fill-color': '#dd0000',
          'fill-outline-color': '#444'
      }
  },'road_label');
  map.addLayer({
      'id': 'huc12-3',
      'type': 'fill',
      'source': 'huc12',
      'source-layer': 'lyo_huc12',
      'filter': ['all',['==', 'HUC_12', '101900050204']],
      'layout': {
          'line-join': 'round',
          'line-cap': 'round'
      },
      'paint': {
          'fill-opacity': 0.15,
          'fill-color': '#ffd92f',
          'fill-outline-color': '#444'
      }
    },'road_label');

    map.addSource('contours', {
        type: 'vector',
        url: 'mapbox://iconeng.04934ece'
    });
    map.addLayer({
        'id': '1ftContours',
        'type': 'line',
        'source': 'contours',
        'source-layer': 'LYO_1ft_Contours',
        'filter': ['all', ['<', 'Index', 5]],
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 0], [17, .5], [19, 1]]
          },
            'line-color': '#fff'
        }
    },'road_label');
    map.addLayer({
        'id': '5ftContours',
        'type': 'line',
        'source': 'contours',
        'source-layer': 'LYO_1ft_Contours',
        'filter': ['all', ['>=', 'Index', 5],['<=', 'Index', 10]],
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 1.75], [19, 2.5]]
          },
            'line-color': '#fff'
        }
    },'road_label');
    map.addLayer({
        'id': '5ftLabels',
        'type': 'symbol',
        'source': 'contours',
        'source-layer': 'LYO_1ft_Contours',
        'filter': ['all', ['>=', 'Index', 5],['<=', 'Index', 10]],
        'layout': {
          'symbol-placement': 'line',
          'text-field': '{Contour}',
          'text-size': {
            "stops": [[15,12],[17,14],[19,16]]
          }
        },
        'paint': {
          'text-color': '#fff',
          'text-halo-color': 'rgba(0,0,0,0.9)',
          'text-halo-width': 1,
          'text-halo-blur': 1
        }
    });

        map.addSource('parcels', {
            type: 'vector',
            url: 'mapbox://iconeng.0ng2b0gx'
        });
        map.addLayer({
            'id': 'parcels',
            'type': 'fill',
            'source': 'parcels',
            'source-layer': 'lyo_parcels',
            'interactive': true,
            'paint': {
                'fill-color': '#f47461',
                'fill-opacity': 0.05
            }
        },'road_label');
        map.addLayer({
            'id': 'parcels-line',
            'type': 'line',
            'source': 'parcels',
            'source-layer': 'lyo_parcels',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
              'line-width': {
                  "stops": [[15, 1], [17, 2.5], [19, 5]]
              },
                'line-color': '#f47461'
            }
        },'road_label');
        map.addLayer({
            "id": "parcels-hover",
            "type": "fill",
            "source": "parcels",
            'source-layer': 'lyo_parcels',
            "layout": {},
            "paint": {
                "fill-color": "#f47461",
                "fill-opacity": 0.25
            },
            "filter": ["==", "PARCEL_NUM", ""]
        },'road_label');

});

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

function toggleNine(id, id2, layer, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9) {

            var visibility = map.getLayoutProperty(layer, 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty(layer, 'visibility', 'none');
                map.setLayoutProperty(layer2, 'visibility', 'none');
                map.setLayoutProperty(layer3, 'visibility', 'none');
                map.setLayoutProperty(layer4, 'visibility', 'none');
                map.setLayoutProperty(layer5, 'visibility', 'none');
                map.setLayoutProperty(layer6, 'visibility', 'none');
                map.setLayoutProperty(layer7, 'visibility', 'none');
                map.setLayoutProperty(layer8, 'visibility', 'none');
                map.setLayoutProperty(layer9, 'visibility', 'none');
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
                map.setLayoutProperty(layer7, 'visibility', 'visible');
                map.setLayoutProperty(layer8, 'visibility', 'visible');
                map.setLayoutProperty(layer9, 'visibility', 'visible');
            }
        };

        map.on('click', function (e) {
            map.featuresAt(e.point, {layer: ['parcels'], radius: 0, includeGeometry: true}, function (err, features) {
              if (err) throw err;
              var feature = features[0];

                var tooltip = new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML('<h4 style="margin-bottom:1em;padding-bottom: .5em;">' + feature.properties.Address + '</h4>' +
                              'Owner: ' + feature.properties.Owner)
                    .addTo(map);
            });
        });

        map.on('mousemove', function (e) {
            map.featuresAt(e.point, {layer: ['parcels'], radius: 0}, function (err, features) {
                map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';
            });
        });

        map.on('mousemove', function (e) {
            map.featuresAt(e.point, {layer: ['parcels'], radius: 10}, function (err, features) {
                if (!err && features.length) {
                        map.setFilter("parcels-hover", ["==", "PARCEL_NUM", features[0].properties.PARCEL_NUM]);
                    } else {
                        map.setFilter("parcels-hover", ["==", "PARCEL_NUM", ""]);
                    }
            });
        });

map.addControl(new mapboxgl.Navigation({position: 'top-left'}));

}
