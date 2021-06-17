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
    map.setPaintProperty('contours-1ft', 'visibility', 'none');
    map.setPaintProperty('contours-5ft', 'visibility', 'none');
    map.setPaintProperty('contours-5ftLabels', 'visibility', 'none');
    map.setPaintProperty('cityFP', 'visibility', 'none');
    map.setPaintProperty('cityFW', 'visibility', 'none');
    map.setPaintProperty('citySF', 'visibility', 'none');
    map.setPaintProperty('wvb-fp-100yr', 'visibility', 'none');
    map.setPaintProperty('wvb-fp-100yr-fill', 'visibility', 'none');
  });
});

map.on('style.load', function(e) {

  map.addSource('cityBoundary', {
    type: 'geojson',
    "data": 'data/cityBoundary.geojson'
  });


  map.addSource('velo-ex', {
    type: 'vector',
    url: 'mapbox://iconeng.2i3tfsvz'
  });



}); //end style load

// When a click event occurs near a marker icon, open a popup at the location of

// the feature, with description HTML from its properties.

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.

//Cross Section Labels
map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['wvb-xs']
  });
  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(feature.properties.RiverCode + ' ' + feature.properties.ReachCode + '<br>' + 'XS: ' + feature.properties.ProfileM + '<br>' + 'WSEL:' + feature.properties.P001.toFixed(2))
    .addTo(map);
});

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['wvb-xs']
  });
  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});



map.addControl(new mapboxgl.NavigationControl(), 'top-right');
