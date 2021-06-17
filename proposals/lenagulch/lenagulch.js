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

  // map.addSource('nfhl', {
  //   type: 'geojson',
  //   "data": 'data/nfhl.geojson'
  // });
  //
  //
  // //  NHFL Floodplain Outline
  // map.addLayer({
  //   'id': 'nfhl-fp-line',
  //   'type': 'line',
  //   'source': 'nfhl',
  //   'paint': {
  //     'line-width': 0.5,
  //     'line-opacity': 0.3,
  //     'line-color': 'black',
  //   },
  //   'layout': {
  //     'visibility': 'visible'
  //   }
  // });
  //
  // //  NFHL Floodplain 100yr Hatch
  // map.addLayer({
  //   'id': 'nfhl-100yr-hatch',
  //   'type': 'fill',
  //   'source': 'nfhl',
  //   'filter': ["all",
  //     ["!in", "ZONE_SUBTY", "FLOODWAY"],
  //     ["in", "FLD_ZONE", 'A', 'AE', 'AO']
  //   ],
  //   'paint': {
  //     'fill-color': 'rgb(0,230,255)',
  //     'fill-opacity': 0.3,
  //   },
  //   'layout': {
  //     'visibility': 'visible',
  //   }
  // });
  //
  // //  CWCB Floodplain 500yr Hatch
  // map.addLayer({
  //   'id': 'nfhl-500yr-hatch',
  //   'type': 'fill',
  //   'source': 'nfhl',
  //   'filter': ['==', "ZONE_SUBTY", "0.2 PCT ANNUAL CHANCE FLOOD HAZARD"],
  //   'paint': {
  //     'fill-color': 'rgb(255,128,0)',
  //     'fill-opacity': 0.3,
  //   },
  //   'layout': {
  //     'visibility': 'visible'
  //   }
  // });
  //
  // map.addSource('crossStructure', {
  //   type: 'geojson',
  //   "data": 'data/crossingstructures.geojson'
  // });
  //
  // //  NHFL Floodplain Outline
  // map.addLayer({
  //   'id': 'crossStructure-outline',
  //   'type': 'line',
  //   'source': 'crossStructure',
  //
  // });

  map.addSource('drainageways', {
    type: 'geojson',
    "data": 'data/drainageways.geojson'
  });

  //Drainageway centerline
  map.addLayer({
    'id': 'drainageways',
    'type': 'line',
    'source': 'drainageways',
    'paint': {
      'line-width': 1,
      'line-opacity': 1,
      'line-color': 'rgba(0,77,168,1)'
    },
    'layout': {
      'visibility': 'visible'
    }
  });


}); //end map load



// When a click event occurs near a marker icon, open a popup at the location of the feature, with description HTML from its properties.


//Cross Section Labels
// map.on('click', function(e) {
//   var features = map.queryRenderedFeatures(e.point, {
//     layers: ['wvb-xs']
//   });
//   if (!features.length) {
//     return;
//   }
//
//   var feature = features[0];
//
//   var popup = new mapboxgl.Popup()
//     .setLngLat(e.lngLat)
//     .setHTML(feature.properties.RiverCode + ' ' + feature.properties.ReachCode + '<br>' + 'XS: ' + feature.properties.ProfileM + '<br>' + 'WSEL:' + feature.properties.P001.toFixed(2))
//     .addTo(map);
// });

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
// map.on('mousemove', function(e) {
//   var features = map.queryRenderedFeatures(e.point, {
//     layers: ['wvb-xs']
//   });
//   map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
// });



map.addControl(new mapboxgl.NavigationControl(), 'top-right');
