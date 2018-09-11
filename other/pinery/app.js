mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot',
    center: [-104.72,39.452],
    zoom: 13,
    hash: true
});

map.on('load', function () {

  map.addSource('project boundary', {
      type: 'vector',
      url: 'mapbox://iconeng.7rcwjlcw'
  });
  map.addSource('parcels', {
      type: 'vector',
      url: 'mapbox://iconeng.cg461vbd'
  });
  map.addSource('priority 1 address points', {
      type: 'vector',
      url: 'mapbox://iconeng.86nopvsx'
  });
  map.addSource('priority 2 address points', {
      type: 'vector',
      url: 'mapbox://iconeng.2upjqqvq'
  });
  map.addSource('priority 3 address points', {
      type: 'vector',
      url: 'mapbox://iconeng.0v23puj1'
  });
  map.addSource('street_clip', {
      type: 'geojson',
      "data": 'street_clip.geojson'
  });

//project boundary
  map.addLayer({
    'id': 'projectBoundary',
    'type': 'line',
    'source': 'project boundary',
	'source-layer':'pinery_project_boundary-75s5xf',
    'paint': {
      'line-width': 2,
	  'line-opacity': 1,
      'line-color': '#d32f2f',
	  'line-dasharray': [4,2]
  },
  'layout': {'visibility': 'visible'}
  }, 'road-label-small');

//parcels
  map.addLayer({
    'id': 'parcels',
    'type': 'line',
    'source': 'parcels',
	'source-layer':'pinery_parcel-bpojro',
    'paint': {
      'line-width': 1,
	  'line-opacity': 1,
      'line-color': '#d32f2f',
  },
  'layout': {'visibility': 'visible'}
  }, 'road-label-small');

//priority 1 address points
  map.addLayer({
    'id': 'priority1AP',
    'type': 'circle',
    'source': 'priority 1 address points',
	'source-layer':'priority_1_AP-0e7cuh',
    'paint': {
     "circle-color":'#00ff00',
    'circle-radius': 3,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#00ff00'
  },
  'layout': {'visibility': 'visible'}
}, 'country-label-lg');

//priority 2 address points
  map.addLayer({
    'id': 'priority2AP',
    'type': 'circle',
    'source': 'priority 2 address points',
	'source-layer':'priority_2_AP-6i50hu',
    'paint': {
     "circle-color":'#ffff00',
    'circle-radius': 3,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffff00'
  },
  'layout': {'visibility': 'visible'}
}, 'country-label-lg');

//priority 3 address points
  map.addLayer({
    'id': 'priority3AP',
    'type': 'circle',
    'source': 'priority 3 address points',
	'source-layer':'priority_3_AP-81f2p5',
    'paint': {
     "circle-color":'#ff0000',
    'circle-radius': 3,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ff0000'
  },
  'layout': {'visibility': 'visible'}
}, 'country-label-lg');

//Add street labels
  map.addLayer({
        'id': 'streetLabels',
        'type': 'symbol',
        'source': 'street_clip',
        'source-layer': 'street_clip.geojson',
        'layout': {
          'visibility': 'none',
        'text-field': '{STREET_N_1}',
        'text-font': ['Open Sans Bold','Arial Unicode MS Regular'],
        'text-size': 12
        },

        'paint': {
        'text-color': 'rgb(255,255,255)',
        'text-halo-color': 'rgb(0,0,0)',
        'text-halo-width': 1
      }
    },'country-label-lg');

});

//When a click event occurs on a feature in the address point layers, open a popup at the location of the click, with description HTML from its properties.
  map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['priority1AP','priority2AP','priority3AP'] // replace this with the name of the layers
  });

  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<h3>' + feature.properties.Name + '</h3><p>' + feature.properties.DRN_COND + '</p><p>' + feature.properties.BASIN_ID + '</p><p>' + feature.properties.PRIORITY + '</p><p>' + feature.properties.5YR_FLOW'</p><p>' + features.properties.10YR_FLOW + '</p><p>' + features.properties.SEVERITY + '</p><p>' + features.properties.COMMENT + '</p>')
    .setLngLat(feature.geometry.coordinates)
    .addTo(map);
});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');
