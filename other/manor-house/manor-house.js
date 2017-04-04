mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot',
    center: [-105.1690, 39.5891],
    zoom: 15,
    hash: true
});

map.on('load', function () {

  map.addSource('contours', {
      type: 'geojson',
      "data": '//s3-us-west-2.amazonaws.com/iconeng/maps/geojson/manor-house/ManorHouseContours.geojson'
  });
  map.addLayer({
      'id': '1ftContours',
      'type': 'line',
      'source': 'contours',
      'filter': ['==', 'index', 1],
      'layout': {
          'visibility': 'visible',
          'line-join': 'round',
          'line-cap': 'round'
      },
      'paint': {
        'line-width': {
            "stops": [[15, 0], [17, .5], [19, 1]]
        },
          'line-color': '#333',
          'line-opacity':.8
      }
  });
  map.addLayer({
      'id': '5ftContours',
      'type': 'line',
      'source': 'contours',
      'filter': ['==', 'index', 5],
      'layout': {
          'visibility': 'visible',
          'line-join': 'round',
          'line-cap': 'round'
      },
      'paint': {
        'line-width': {
            "stops": [[15, 1], [17, 1.75], [19, 2.5]]
        },
          'line-color': '#111',
          'line-opacity':.8
      }
  });
  map.addLayer({
      'id': '5ftLabels',
      'type': 'symbol',
      'source': 'contours',
      'filter': ['==', 'index', 5],
      'layout': {
          'visibility': 'visible',
        'symbol-placement': 'line',
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


});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');
