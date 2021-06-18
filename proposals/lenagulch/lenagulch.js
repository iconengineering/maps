mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot',
  zoom: 14.5,
  center: [-105.2071, 39.7163],
  hash: true,
  preserveDrawingBuffer: true
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

$(document).ready(function() {
  $("#clear").click(function() {
    var checkBoxes = $("input[type=checkbox]");
    checkBoxes.prop("checked", false);
  });
});

map.on('style.load', function(e) {

  map.addSource('nfhl', {
    type: 'geojson',
    "data": 'data/nfhl.geojson'
  });


  //  NHFL Floodplain Outline
  map.addLayer({
    'id': 'nfhl-fp-line',
    'type': 'line',
    'source': 'nfhl',
    'paint': {
      'line-width': 0.5,
      'line-opacity': 0.5,
      'line-color': 'black',
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //  NFHL Floodplain 100yr Hatch
  map.addLayer({
    'id': 'nfhl-100yr-hatch',
    'type': 'fill',
    'source': 'nfhl',
    'filter': ["all",
      ["!in", "ZONE_SUBTY", "FLOODWAY"],
      ["in", "FLD_ZONE", 'A', 'AE', 'AO']
    ],
    'paint': {
      'fill-color': 'rgb(0,230,255)',
      'fill-opacity': 0.3,
    },
    'layout': {
      'visibility': 'visible',
    }
  });

  // NFHL Floodplain 500yr Hatch
  map.addLayer({
    'id': 'nfhl-500yr-hatch',
    'type': 'fill',
    'source': 'nfhl',
    'filter': ['==', "ZONE_SUBTY", "0.2 PCT ANNUAL CHANCE FLOOD HAZARD"],
    'paint': {
      'fill-color': 'rgb(255,128,0)',
      'fill-opacity': 0.3,
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //  NFHL Floodplain Floodway Hatch
  map.addLayer({
    'id': 'nfhl-fldwy',
    'type': 'fill',
    'source': 'nfhl',
    'filter': ['in', "ZONE_SUBTY", "FLOODWAY"],
    'paint': {
      'fill-color': 'purple',
      'fill-opacity': 0.3,
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  map.addSource('crossStructure', {
    type: 'geojson',
    "data": 'data/crossingstructures.geojson'
  });

  // Crossing STructures
  map.addLayer({
    'id': 'crossStructure-outline',
    'type': 'line',
    'source': 'crossStructure',
    'layout': {
      'visibility': 'visible'
    }
  });

  map.addLayer({
    'id': 'crossStructure-fill',
    'type': 'fill',
    'source': 'crossStructure',
    'paint': {
      'fill-opacity': 0.5,
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  map.addSource('lena-cl', {
    type: 'geojson',
    "data": 'data/lenagulch-cl.geojson'
  });

  //Drainageway centerline
  map.addLayer({
    'id': 'lena-cl',
    'type': 'line',
    'source': 'lena-cl',
    'paint': {
      'line-width': 2,
      'line-opacity': 1,
      'line-color': 'rgba(0,77,168,1)'
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //Drainageway Centerline LABEL
  map.addLayer({
    'id': 'lena-cl-labels',
    'type': 'symbol',
    'source': 'lena-cl',
    'layout': {
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{DWAY_NAME}',
      'text-size': {
        "stops": [
          [15, 12],
          [17, 14],
          [19, 16]
        ]
      },
      "text-padding": 100,
    },
    'paint': {
      'text-color': 'rgba(0,77,168,1)',
      'text-halo-color': '#ffffff',
      'text-halo-width': 2,
      'text-halo-blur': 1
    }
  });

  map.addSource('apex-cl', {
    type: 'geojson',
    "data": 'data/apex-cl.geojson'
  });

  //Drainageway centerline
  map.addLayer({
    'id': 'apex-cl',
    'type': 'line',
    'source': 'apex-cl',
    'paint': {
      'line-width': 1,
      'line-opacity': 1,
      'line-color': 'rgba(0,77,168,1)'
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //Drainageway Centerline LABEL
  map.addLayer({
    'id': 'apex-cl-labels',
    'type': 'symbol',
    'source': 'apex-cl',
    'layout': {
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{DWAY_NAME}',
      'text-size': {
        "stops": [
          [15, 12],
          [17, 14],
          [19, 16]
        ]
      },
      "text-padding": 100,
    },
    'paint': {
      'text-color': 'rgba(0,77,168,1)',
      'text-halo-color': '#ffffff',
      'text-halo-width': 2,
      'text-halo-blur': 1
    }
  });

  map.addSource('prj-limits', {
    type: 'geojson',
    "data": 'data/prjlimits.geojson'
  });

  //Drainageway centerline
  map.addLayer({
    'id': 'prj-limits',
    'type': 'line',
    'source': 'prj-limits',
    'paint': {
      'line-width': 3,
      'line-opacity': 1,
      'line-color': '#000000'
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  map.addSource('eff-discharges', {
    type: 'geojson',
    "data": 'data/eff-discharges.geojson'
  });

  //Effective Discharges
  map.addLayer({
    'id': 'eff-discharges',
    'type': 'line',
    'source': 'eff-discharges',
    'paint': {
      'line-width': 7,
      'line-opacity': 1,
      'line-color': 'rgba(0,77,168,1)'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  //Load all parcels

  map.addSource('parcel-golden', {
    type: 'geojson',
    "data": 'data/parcels-golden.geojson'
  });
  map.addSource('parcel-jeffco', {
    type: 'geojson',
    "data": 'data/parcels-jeffco.geojson'
  });
  map.addSource('parcel-mm', {
    type: 'geojson',
    "data": 'data/parcels-mm.geojson'
  });
  map.addSource('parcel-private', {
    type: 'geojson',
    "data": 'data/parcels-private.geojson'
  });
  map.addSource('parcel-row', {
    type: 'geojson',
    "data": 'data/parcels-row.geojson'
  });


  // City of Golden Parcels
  map.addLayer({
    'id': 'parcel-golden',
    'type': 'line',
    'source': 'parcel-golden',
    'layout': {
      'visibility': 'none'
    }
  });

  map.addLayer({
    'id': 'parcel-golden',
    'type': 'fill',
    'source': 'parcel-golden',
    'paint': {
      'fill-opacity': 0.5,
    },
    'layout': {
      'visibility': 'none'
    }
  });

  // Jefferson County Parcels
  map.addLayer({
    'id': 'parcel-jeffco',
    'type': 'line',
    'source': 'parcel-jeffco',
    'layout': {
      'visibility': 'none'
    }
  });

  map.addLayer({
    'id': 'parcel-jeffco',
    'type': 'fill',
    'source': 'parcel-jeffco',
    'paint': {
      'fill-opacity': 0.5,
    },
    'layout': {
      'visibility': 'none'
    }
  });

  // Martin Marietta Parcels
  map.addLayer({
    'id': 'parcel-mm',
    'type': 'line',
    'source': 'parcel-mm',
    'layout': {
      'visibility': 'none'
    }
  });

  map.addLayer({
    'id': 'parcel-mm',
    'type': 'fill',
    'source': 'parcel-mm',
    'paint': {
      'fill-opacity': 0.5,
    },
    'layout': {
      'visibility': 'none'
    }
  });

  // Private Parcels
  map.addLayer({
    'id': 'parcel-private',
    'type': 'line',
    'source': 'parcel-private',
    'layout': {
      'visibility': 'none'
    }
  });

  map.addLayer({
    'id': 'parcel-private',
    'type': 'fill',
    'source': 'parcel-private',
    'paint': {
      'fill-opacity': 0.5,
    },
    'layout': {
      'visibility': 'none'
    }
  });

  // Private Parcels
  map.addLayer({
    'id': 'parcel-row',
    'type': 'line',
    'source': 'parcel-row',
    'layout': {
      'visibility': 'none'
    }
  });

  map.addLayer({
    'id': 'parcel-row',
    'type': 'fill',
    'source': 'parcel-row',
    'paint': {
      'fill-opacity': 0.5,
    },
    'layout': {
      'visibility': 'none'
    }
  });


  //Regional Parks
  map.addSource('regionalparks', {
    type: 'geojson',
    "data": 'data/regionalparks.geojson'
  });

  map.addLayer({
    'id': 'regionalparks',
    'type': 'circle',
    'source': 'regionalparks',
    'paint': {
      'circle-radius': 5.5,
    },
    'layout': {
      'visibility': 'none'
    }
  });


  //Drainageway Centerline LABEL
  map.addLayer({
    'id': 'regionalparks-labels',
    'type': 'symbol',
    'source': 'regionalparks',
    'layout': {
      'text-field': '{name}',
    },
    'paint': {
      'text-color': 'rgba(0,77,168,1)',
      'text-halo-color': '#ffffff',
      'text-halo-width': 2,
      'text-halo-blur': 1
    }
  });


  //Regional Parks
  map.addSource('sidewalkAccess', {
    type: 'geojson',
    "data": 'data/sidewalkaccess.geojson'
  });

  map.addLayer({
    'id': 'sidewalkAccess',
    'type': 'circle',
    'source': 'sidewalkAccess',
    'paint': {
      'circle-radius': 5.5,
    },
    'layout': {
      'visibility': 'none'
    }
  });


  var style = map.getStyle();

  if (style.name != 'Outdoors') {
    map.setLayoutProperty('conduitArrows', 'icon-image', 'oneway-spaced-white-small');
  }


}); //end map load


//Use the same approach as above to indicate that the symbols are clickable by changing the cursor style to 'pointer'.
map.on('mousemove', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['crossStructure-fill', 'eff-discharges', 'prj-limits']
  });
  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

// When a click event occurs near a marker icon, open a popup at the location of the feature, with description HTML from its properties.


//Structure Labels
map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['crossStructure-fill']
  });
  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('<h8>Street: ' + feature.properties.Street + '<br>Size: ' + feature.properties.Label + '</h8>')
    .addTo(map);
});

//Effective Discharge click
map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['eff-discharges']
  });
  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('<h8>' + 'Q-100: ' + feature.properties.Q100 + ' cfs</h8>')
    .addTo(map);
});

//Project Limits Label
map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['prj-limits']
  });
  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('<h8>' + feature.properties.Descriptio + '</h8>')
    .addTo(map);
});


map.addControl(new mapboxgl.NavigationControl(), 'top-right');
