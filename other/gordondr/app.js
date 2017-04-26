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
  map.addSource('catchmentOutline', {
      type: 'geojson',
      "data": 'catchmentOutline.geojson'
  });
  map.addSource('basins', {
      type: 'geojson',
      "data": 'catchments.geojson'
  });
  map.addSource('drainageLine', {
      type: 'geojson',
      "data": 'drainageLine.geojson'
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

  map.addLayer({
      'id': 'basinOutlines',
      'type': 'line',
      'source': 'catchmentOutline',
      'paint': {
          'line-width': 1,
          'line-opacity': 1,
          'line-color': '#d32f2f',
          'line-dasharray': [8,4]
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'drainageLine',
      'type': 'line',
      'source': 'drainageLine',
      'layout': {
        'line-join': 'bevel'
        },
      'paint': {
          'line-width': 2,
          'line-opacity': 1,
          'line-color': '#036180'
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'basinLabels',
      'type': 'symbol',
      'source': 'basins',
      'layout': {
         "text-optional": true,
         "text-line-height": 1,
         "text-size": {
             "stops": [[15, 10], [17, 12], [19, 14]]
         },
         "text-field": "{Area_Acres} Ac. | {Ave_Slope}% Slope",
         'text-font': ['Roboto Bold','Open Sans Regular','Arial Unicode MS Regular'],
         "text-offset": {
             "stops": [[13, [0, 0.25]], [17, [0, 0.75]]]
         },
         "text-anchor": "top"
     },
     "paint": {
       "text-color": "#ee4d5a",
       "text-opacity": 1,
       "text-halo-color": "rgba(255,255,255,.87)",
       "text-halo-width": {"stops": [[15,1],[17,1.25]]}
     }
  });

  map.addLayer({
      'id': 'basinLabels2',
      'type': 'symbol',
      'source': 'basins',
      'layout': {
         "text-optional": true,
         "text-line-height": 1,
         "text-size": {
             "stops": [[15, 10], [17, 12], [19, 14]]
         },
         "text-field": "Catchment {HydroID}",
         "text-offset": {
             "stops": [[13, [0, -1]], [17, [0, -1.5]]]
         },
         'text-font': ['Roboto Bold','Open Sans Regular','Arial Unicode MS Regular'],
         "text-anchor": "top"
     },
     "paint": {
       "text-color": "#ee4d5a",
       "text-opacity": 1,
       "text-halo-color": "rgba(255,255,255,.87)",
       "text-halo-width": {"stops": [[15,1],[17,1.25]]}
     }
  });


});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');
