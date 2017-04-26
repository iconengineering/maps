mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot',
    center: [-104.8325,39.3704],
    zoom: 15,
    hash: true
});

map.on('load', function () {

  map.addSource('contours', {
      type: 'vector',
      url: 'mapbox://iconeng.1eijv7im'
  });
  map.addLayer({
      'id': '1ftContours',
      'type': 'line',
      'source': 'contours',
      'source-layer': 'GordonDrContoursgeojson',
      'filter': ['==', 'Index', 1],
      'layout': {
          'visibility': 'visible',
          'line-join': 'round',
          'line-cap': 'round'
      },
      'paint': {
        'line-width': {
            "stops": [[15, 0], [17, .5], [19, 1]]
        },
          'line-color': '#424242',
          'line-opacity':.8
      }
  }, 'road-label-small');
  map.addLayer({
      'id': '5ftContours',
      'type': 'line',
      'source': 'contours',
      'source-layer': 'GordonDrContoursgeojson',
      'filter': ['==', 'Index', 5],
      'layout': {
          'visibility': 'visible',
          'line-join': 'round',
          'line-cap': 'round'
      },
      'paint': {
        'line-width': {
            "stops": [[15, 1], [17, 1.75], [19, 2.5]]
        },
          'line-color': '#424242',
          'line-opacity':.8
      }
  }, 'road-label-small');
  map.addLayer({
      'id': '5ftLabels',
      'type': 'symbol',
      'source': 'contours',
      'source-layer': 'GordonDrContoursgeojson',
      'filter': ['==', 'Index', 5],
      'layout': {
          'visibility': 'visible',
        'symbol-placement': 'line',
        'text-field': '{CONTOUR}',
        'text-font': ['Roboto Italic','Open Sans Light','Arial Unicode MS Regular'],
        'text-size': {
          "stops": [[15,9],[17,12],[19,14]]
        }
      },
      'paint': {
        'text-color': '#424242',
        'text-halo-color': 'rgba(255,255,255,0.9)',
        'text-halo-width': 1,
        'text-halo-blur': .2
      }
  }, 'road-label-small');


});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');
