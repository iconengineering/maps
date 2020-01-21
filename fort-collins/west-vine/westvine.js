mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/civjrd2la004z2immqynhr4fd',
  zoom: 13.75,
  center: [-105.1122, 40.5920],
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
    map.setPaintProperty('basinOutlines', 'line-opacity', 0);
    map.setPaintProperty('draingeways', 'line-opacity', 0)
    map.setPaintProperty('flowDepth', 'visibility', 'none');
    map.setPaintProperty('1ftContours', 'line-opacity', 0);
    map.setPaintProperty('5ftContours', 'line-opacity', 0);
    map.setPaintProperty('5ftLabels', 'text-opacity', 0);
    map.setPaintProperty('parcels', 'line-opacity', 0);
    map.setPaintProperty('rasboudnary', 'line-opacity', 0);
  });
});

map.on('style.load', function(e) {

  map.addSource('wvb-xs', {
    type: 'geojson',
    "data": 'data/xs.geojson'
  });

  map.addSource('flowDepth', {
    type: 'vector',
    url: 'mapbox://iconeng.7ir8lsql'
  });

  map.addSource('cityFP',{
    type:'geojson',
    "data": 'data/cityfp.geojson'
  })

map.addLayer({
  'id':'cityFP',
  'type':'fill',
  'filter':['all',['==',"FP_NAME","WEST VINE"],['==',"FLOOD_TYPE","100 YEAR"]],
  'source':'cityFP',
  'paint':{
    'fill-opacity':0.5
  }
});

//WEST VINE XS
map.addLayer({
  'id': 'wvb-xs',
  'type': 'line',
  'source': 'wvb-xs',
  'paint': {
    'line-width': 2,
    'line-opacity': 1,
    'line-color': 'rgba(0,0,0,1)'
  },
  'layout': {
    'visibility': 'visible'
  }
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
    .setHTML(feature.properties.RiverName + ' ' + feature.properties.ReachName + '<br>' + 'XS: ' + feature.properties.XSName + '<br>' + 'WSEL:' + feature.properties.XSWSElev)
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
