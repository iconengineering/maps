mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
} else {
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cihxv74vo00oynpm48wsujwo3',
    zoom: 14,
    center: [-104.96, 39.635]
});

map.on('style.load', function () {
    map.addSource('parcels', {
        type: 'vector',
        url: 'mapbox://iconeng.b8v8nox8'
    });
    map.addLayer({
        'id': 'parcels',
        'type': 'fill',
        'source': 'parcels',
        'source-layer': 'chv_parcels',
        'interactive': true,
        'paint': {
            'fill-color': '#ffd700',
            'fill-opacity': 0.05
        }
    },'road_label');
    map.addLayer({
        'id': 'parcels-line',
        'type': 'line',
        'source': 'parcels',
        'source-layer': 'chv_parcels',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2.5], [19, 5]]
          },
            'line-color': '#ffd700'
        }
    },'road_label');
    map.addLayer({
        "id": "parcels-hover",
        "type": "fill",
        "source": "parcels",
        'source-layer': 'chv_parcels',
        "layout": {},
        "paint": {
            "fill-color": "#ffd700",
            "fill-opacity": 0.25
        },
        "filter": ["==", "PARCEL_ID", ""]
    },'road_label');
    map.addSource('trails', {
        type: 'vector',
        url: 'mapbox://iconeng.c9vtkx5y'
    });
    map.addLayer({
        'id': 'trails-line',
        'type': 'line',
        'source': 'trails',
        'source-layer': 'chv_trail_inventory',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2.5], [19, 5]]
          },
            'line-color': '#dc0714'
        }
    },'road_label');
    map.addLayer({
        'id': 'trails',
        'type': 'fill',
        'source': 'trails',
        'source-layer': 'chv_trail_inventory',
        'interactive': true,
        'paint': {
            'fill-color': '#dc0714',
            'fill-opacity': 0.3
        }
    });
  }); // End style load

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

      map.on('click', function (e) {
          map.featuresAt(e.point, {layer: ['bridlePaths'], radius: 10, includeGeometry: true}, function (err, features) {
            if (err) throw err;
            var feature = features[0];

              var tooltip = new mapboxgl.Popup()
                  .setLngLat(e.lngLat)
                  .setHTML('Width: ' + feature.properties.Width + ' ft<br />' +
                            'Filing: ' + feature.properties.Filing )
                  .addTo(map);
          });
      });

      map.on('click', function (e) {
          map.featuresAt(e.point, {layer: ['parcels'], radius: 0, includeGeometry: true}, function (err, features) {
            if (err) throw err;
            var feature = features[0];

              var tooltip = new mapboxgl.Popup()
                  .setLngLat(e.lngLat)
                  .setHTML('<h4 style="margin-bottom:1em;padding-bottom: .5em;">' + feature.properties.Situs_Addr + '</h4>' +
                            'Owner: ' + feature.properties.Owner + '<br />' +
                            'Neighborhood: ' + feature.properties.Neighbor_1)
                  .addTo(map);
          });
      });

      map.on('mousemove', function (e) {
          map.featuresAt(e.point, {layer: ['bridlePaths','parcels'], radius: 10}, function (err, features) {
              map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';
          });
      });

      map.on('mousemove', function (e) {
          map.featuresAt(e.point, {layer: ['parcels'], radius: 10}, function (err, features) {
              if (!err && features.length) {
                      map.setFilter("parcels-hover", ["==", "PARCEL_ID", features[0].properties.PARCEL_ID]);
                  } else {
                      map.setFilter("parcels-hover", ["==", "PARCEL_ID", ""]);
                  }
          });
      });
}
