mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/civjrd2la004z2immqynhr4fd',
    zoom: 13,
    center: [-104.907, 39.58],
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
        map.setPaintProperty('watersheds','fill-opacity', 0);
    });
});

map.on('style.load', function (e) {

  map.addSource('basinOutlines', {
      type: 'geojson',
      data: 'basinOutlines.geojson'
  });


//Add Basin Outlines
  map.addLayer({
      'id': 'basinOutlines',
      'type': 'line',
      'source': 'basinOutlines',
      'paint': {
          'line-width': 1,
          'line-opacity': 1,
          'line-color': 'rgba(0,0,0,1)',
          'line-dasharray': [8,4]
      }
  });

  var style = map.getStyle();

    if (style.name != 'Light'){
      map.setLayoutProperty('conduitArrows','icon-image','oneway-spaced-white-small');
    }

});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');
