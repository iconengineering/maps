mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';

// Init Map
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot', //hosted style id
    center: [-105.2715,40.0184], // starting position
    zoom: 12.5, // starting zoom,
    hash: true
});

map.on('style.load', function () {

  map.addSource('contours', {
      type: 'vector',
      url: 'mapbox://iconeng.a2w6rq1g'
  });
  map.addSource('floodZones', {
  type: 'geojson',
  data: '../flood-mitigation-comments/floodZones.geojson'
  });
  map.addSource('floodExtents', {
  type: 'geojson',
  data: '../flood-mitigation-comments/floodExtents.geojson'
  });
  map.addSource('centerlines', {
  type: 'geojson',
  data: '../flood-mitigation-comments/centerlines.geojson'
  });
  map.addSource('hazus', {
  type: 'geojson',
  data: 'hazus.min.geojson'
  });
  map.addSource('structures', {
  type: 'geojson',
  data: 'structures.min.geojson'
  });
  map.addSource('improvements', {
  type: 'geojson',
  data: 'proposedImprovements.geojson'
  });
  map.addSource('stormDrains', {
  type: 'geojson',
  data: 'stormDrains.geojson'
  });

  map.addLayer({
      'id': '5ftContours',
      'type': 'line',
      'source': 'contours',
      'source-layer': 'contoursgeojson',
      'filter': ['==', 'Index', '5'],
      'layout': {
          'visibility': 'none',
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
          'line-color': '#424242'
      }
  }, 'road-label-small');
  map.addLayer({
      'id': '1ftContours',
      'type': 'line',
      'source': 'contours',
      'source-layer': 'contoursgeojson',
      'filter': ['==', 'Index', '1'],
      'layout': {
          'visibility': 'none',
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
          'line-color': '#424242'
      }
  }, 'road-label-small');
  map.addLayer({
      'id': '5ftLabels',
      'type': 'symbol',
      'source': 'contours',
      'source-layer': 'contoursgeojson',
      'filter': ['==', 'Index', '5'],
      'layout': {
          'visibility': 'none',
        'symbol-placement': 'line',
        'text-field': '{contour}',
        'text-font': ['Roboto Light Italic','Open Sans Light','Arial Unicode MS Regular'],
        'text-size': {
          "stops": [[15,9],[17,11],[19,12]]
        }
      },
      'paint': {
        'text-color': '#424242',
        'text-halo-color': 'rgba(255,255,235,0.9)',
        'text-halo-width': 2,
        'text-halo-blur': 0.5
      }
  }, 'road-label-small');

  map.addLayer({
    id: '500yr',
    source: 'floodZones',
    type: 'fill',
    filter: ['==', 'FldZone', '500yr'],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#7ebdc5',
        'fill-outline-color': '#61a4b3'
    }
  }, 'road-label-small');

  map.addLayer({
    id: '100yr',
    source: 'floodZones',
    type: 'fill',
    filter: ['==', 'FldZone', '100yr'],
    paint: {
        'fill-opacity': 0.75,
        'fill-color': '#2a5674',
        'fill-outline-color': '#2a5674'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'AO',
    source: 'floodZones',
    type: 'fill',
    filter: ['in', 'FldZone', 'AO1','AO2'],
    paint: {
        'fill-opacity': 0.75,
        'fill-color': '#1976D2',
        'fill-outline-color': '#1976D2'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'HHZ',
    source: 'floodZones',
    type: 'fill',
    filter: ['==', 'FldZone', 'HHZ'],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#FF5252',
        'fill-outline-color': '#FF5252'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'structures2d',
    source: 'structures',
    type: 'fill',
    filter: ['==', 'study', '2D'],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#311B92',
        'fill-outline-color': '#311B92'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'structures1d',
    source: 'structures',
    type: 'fill',
    filter: ['==', 'study', '1D'],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#9C27B0',
        'fill-outline-color': '#9C27B0'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'structuresHHZ',
    source: 'structures',
    type: 'fill',
    filter: ['==', 'study', 'HHZ'],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#000',
        'fill-outline-color': '#000'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'hazus',
    source: 'hazus',
    type: 'circle',
    filter: ['>=','Depth_FT', 0],
    layout: {
      'visibility': 'none'
    },
    paint: {
        "circle-opacity": .75,
        "circle-radius": { "stops": [ [11,.5],[15,2],[19,5] ] },
        "circle-color": "#d50000"
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'conveyance',
    source: 'floodZones',
    type: 'fill',
    filter: ['==', 'FldZone', 'Conveyance'],
    paint: {
        'fill-pattern': 'yellowhatch',
        'fill-opacity': 0
    }
  }, 'road-label-small');

  map.addLayer({
      'id': 'floodExtents',
      'type': 'fill',
      'source': 'floodExtents',
      'paint': {
          'fill-pattern': 'bluestripe',
          'fill-opacity': 0
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'centerlines',
      'type': 'line',
      'source': 'centerlines',
      'paint': {
          'line-width': 1,
          'line-color': '#036180',
          'line-opacity': 1
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'stormDrains',
      'type': 'line',
      'source': 'stormDrains',
      'layout': {
        'visibility': 'none'
      },
      'paint': {
          'line-width': 3,
          'line-color': '#FF9800',
          'line-opacity': 1
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'centerlineLabels',
      'type': 'symbol',
      'source': 'centerlines',
      'layout': {
        "text-optional": true,
        'symbol-placement': 'line',
        'symbol-spacing': 200,
        'text-field': '{RiverCode}',
        'text-font': ['Roboto Italic','Open Sans Regular','Arial Unicode MS Regular'],
        'text-size': 7,
        "text-padding": 100,
      },
      'paint': {
        'text-color': '#F8F4F0',
        'text-halo-color': '#036180',
        'text-halo-width': 1,
        'text-opacity': 1
      }
  });

  map.addLayer({
    id: 'culvert2017',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 2017],['==', 'Improvemen', 'Culvert']],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#333',
        'fill-outline-color': '#333'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'detention2017',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 2017],['==', 'Improvemen', 'Detention']],
    paint: {
        'fill-opacity': 0,
        'fill-color': 'maroon',
        'fill-outline-color': 'maroon'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'openChannel2017',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 2017],['==', 'Improvemen', 'Open Channel']],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#64DD17',
        'fill-outline-color': '#64DD17'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'stormDrain2017',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 2017],['==', 'Improvemen', 'Storm Drain']],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#FF3D00',
        'fill-outline-color': '#FF3D00'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'conveyance2017',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 2017],['==', 'Improvemen', 'Roadway Conveyance']],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#F50057',
        'fill-outline-color': '#F50057'
    }
  }, 'road-label-small');


  map.addLayer({
    id: 'culvert1987',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 1987],['==', 'Improvemen', 'Culvert']],
    layout: {
      'visibility': 'none'
    },
    paint: {
        'fill-color': '#333',
        'fill-outline-color': '#333',
        'fill-opacity': .75
    }
  }, 'road-label-small');


  map.addLayer({
    id: 'openChannel1987',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 1987],['==', 'Improvemen', 'Open Channel']],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#64DD17',
        'fill-outline-color': '#64DD17'
    }
  }, 'road-label-small');


  map.addLayer({
    id: 'culvert1969',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 1969],['==', 'Improvemen', 'Culvert']],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#333',
        'fill-outline-color': '#333'
    }
  }, 'road-label-small');


  map.addLayer({
    id: 'detention1969',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 1969],['==', 'Improvemen', 'Detention']],
    paint: {
        'fill-opacity': 0,
        'fill-color': 'maroon',
        'fill-outline-color': 'maroon'
    }
  }, 'road-label-small');


  map.addLayer({
    id: 'openChannel1969',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 1969],['==', 'Improvemen', 'Open Channel']],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#64DD17',
        'fill-outline-color': '#64DD17'
    }
  }, 'road-label-small');

});

map.on('click', function (e) {
  var bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
  var features = map.queryRenderedFeatures(bbox, { layers: ['hazus','stormDrains','culvert1987','openChannel1987'] });
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

  } else if (id == 'stormDrains') {

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
    var features = map.queryRenderedFeatures(bbox, { layers: ['hazus','stormDrains','culvert1987','openChannel1987'] });

    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');
