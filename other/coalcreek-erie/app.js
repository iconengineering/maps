$(document).ready(function(){
// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    document.querySelector('nav').className = 'blue';

  });

mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';

// Init Map
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot', //hosted style id
    center: [-105.0546,40.0590], // starting position
    zoom: 14.3, // starting zoom,
    hash: true
});

map.on('style.load', function () {

  map.addSource('bounds', {
  type: 'geojson',
  data: 'bounds.geojson'
  });
  map.addSource('ErieBoundary', {
  type: 'geojson',
  data: 'ErieBoundary.geojson'
  });
  map.addSource('ErieParks', {
  type: 'geojson',
  data: 'ErieParks.geojson'
  });
  map.addSource('ErieSubdivisions', {
  type: 'geojson',
  data: 'ErieSubdivisions.geojson'
  });
  map.addSource('ErieTrails', {
  type: 'geojson',
  data: 'ErieTrails.geojson'
  });
  map.addSource('UDFCDBoundary', {
  type: 'geojson',
  data: 'UDFCDBoundary.geojson'
  });
  map.addSource('UDFCDStreams', {
  type: 'geojson',
  data: 'UDFCDStreams.geojson'
  });
  map.addSource('counties', {
  type: 'geojson',
  data: 'counties_ln.geojson'
  });
  map.addSource('boulderSFHA', {
  type: 'vector',
  url: 'mapbox://iconeng.c8qwcgbh'
  });

  map.addLayer({
    id: '500yr',
    source: 'boulderSFHA',
    'source-layer': 'boulderSFHAgeojson',
    type: 'fill',
    filter: ['==', 'ZONE_SUBTY', '0.2 PCT ANNUAL CHANCE FLOOD HAZARD'],
    paint: {
        'fill-opacity': 0.25,
        'fill-color': '#7ebdc5',
        'fill-outline-color': '#61a4b3'
    }
  }, 'road-label-small');

  map.addLayer({
    id: '500yr1',
    source: 'boulderSFHA',
    'source-layer': 'boulderSFHAgeojson',
    type: 'fill',
    filter: ['==', 'ZONE_SUBTY', '0.2 PCT ANNUAL CHANCE FLOOD HAZARD'],
    paint: {
        'fill-opacity': 0.25,
        'fill-color': '#7ebdc5',
        'fill-outline-color': '#61a4b3'
    }
  }, 'road-label-small');

  map.addLayer({
    id: '100yr',
    source: 'boulderSFHA',
    'source-layer': 'boulderSFHAgeojson',
    type: 'fill',
    filter: ['==', 'SFHA_TF', 'T'],
    paint: {
        'fill-opacity': 0.25,
        'fill-color': '#2a5674',
        'fill-outline-color': '#2a5674'
    }
  }, 'road-label-small');

  map.addLayer({
    id: '100yr1',
    source: 'boulderSFHA',
    'source-layer': 'boulderSFHAgeojson',
    type: 'fill',
    filter: ['==', 'SFHA_TF', 'T'],
    paint: {
        'fill-opacity': 0.25,
        'fill-color': '#2a5674',
        'fill-outline-color': '#2a5674'
    }
  }, 'road-label-small');

  map.addLayer({
      'id': 'udfcd',
      'type': 'line',
      'source': 'UDFCDBoundary',
      'paint': {
          'line-width': 4,
          'line-color': '#f44336',
          'line-dasharray': [4,3],
          'line-opacity': 1
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'ErieBoundary',
      'type': 'line',
      'source': 'ErieBoundary',
      'paint': {
          'line-width': 1.5,
          'line-color': '#F57C00',
          'line-dasharray': [4,3],
          'line-opacity': 1
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'counties',
      'type': 'line',
      'source': 'counties',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-width':  2.5,
        'line-opacity': 1,
        'line-dasharray': [4,3],
        'line-color': 'black'
      }
  },'road-label-small');

  map.addLayer({
      id: 'subdivisions',
      source: 'ErieSubdivisions',
      type: 'fill',
      paint: {
          'fill-opacity': 0.5,
          'fill-pattern': 'yellowhatch',
      }
    }, 'road-label-small');

  map.addLayer({
      'id': 'centerlines',
      'type': 'line',
      'source': 'UDFCDStreams',
      'filter': ['==', 'Name', 'Coal Creek (BOCO)'],
      'paint': {
          'line-width': 4,
          'line-color': '#036180',
          'line-opacity': 1
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'trails',
      'type': 'line',
      'source': 'ErieTrails',
      'paint': {
          'line-width': 1.5,
          'line-color': '#C6FF00',
          'line-opacity': 1
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'aoi',
      'type': 'line',
      'source': 'bounds',
      'paint': {
          'line-width': 2.5,
          'line-color': '#1A237E',
          'line-opacity': 1
      }
  }, 'road-label-small');

  map.addLayer({
    id: 'parks',
    source: 'ErieParks',
    type: 'circle',
    layout: {
      "visibility": "visible"
    },
    paint: {
        "circle-opacity": 1,
        "circle-radius": { "stops": [ [11,2],[15,4],[19,5] ] },
        "circle-color": "#00E676",
        "circle-stroke-width": 1.5,
        "circle-stroke-color": "#fff"
    }
  }, 'road-label-small');

});

map.on('click', function (e) {
  var bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
  var features = map.queryRenderedFeatures(bbox, { layers: [] });
  if (!features.length) {
      return;
  }

  var feature = features[0];
  var id = feature.layer.id;

  var div = document.createElement('div');
  div.className = 'row';
  var col = document.createElement('div');
  col.className = "col s12";
  div.insertAdjacentElement('beforeend', col);
  var card = document.createElement('div');
  card.className = 'card blue-grey darken-2';
  col.insertAdjacentElement('beforeend', card);
  var content = document.createElement('div');
  content.className = 'card-content white-text';
  card.insertAdjacentElement('beforeend', content);

  if (id == 'hazus') {

    var loss = feature.properties.BldgLossUS;
    var depth = feature.properties.Depth_FT;

    var div1 = document.createElement('div');
    var div2 = document.createElement('div');

    div1.innerHTML = 'Building Loss: ' + numeral(loss).format('$0,0');
    div2.innerHTML = 'Depth: ' + depth + '\'';

    content.insertAdjacentElement('beforeend', div1);
    content.insertAdjacentElement('beforeend', div2);

  } else if (id == 'stormDrains' || id == 'sdMain') {

    var diam = feature.properties.DIAMETER;
    var diam2 = feature.properties.DIAMETER2;
    var material = feature.properties.MATERIAL;

    if (diam2 === 0) {
      content.innerHTML = diam + '" ' + material;
    } else {
      content.innerHTML = diam + '" x ' + diam2 + '" ' + material;
    }

  } else if (id == 'culvert1987' || id == 'openChannel1987') {

    var size = feature.properties.Size;
    var interval = feature.properties.Return_Int;
    var capacity = feature.properties.Capacity;

    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    var div3 = document.createElement('div');

    div1.innerHTML = size;
    div2.innerHTML = 'Return Interval: ' + interval;
    div3.innerHTML = 'Capacity: ' + capacity + ' cfs';

    content.insertAdjacentElement('beforeend', div1);
    content.insertAdjacentElement('beforeend', div2);
    content.insertAdjacentElement('beforeend', div3);

  } else {
    return;
  }

  var popup = new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setDOMContent(div)
      .addTo(map);

});

map.on('mousemove', function (e) {
    var bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
    var features = map.queryRenderedFeatures(bbox, { layers: [] });

    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');
