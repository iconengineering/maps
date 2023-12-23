mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
  zoom: 15.5,
  center: [-104.679, 40.4215],
  hash: true,
  preserveDrawingBuffer: true
});


var layerList = document.getElementById('menu');
// var inputs = layerList.getElementsByTagName('input');
//
// function switchLayer(layer) {
//     var layerId = layer.target.value;
//     map.setStyle('mapbox://styles/iconeng/' + layerId);
//     $('.layer-off').prop('checked', false);
//     $('.layer-on').prop('checked', true);
// }
//
// for (var i = 0; i < inputs.length; i++) {
//     inputs[i].onclick = switchLayer;
// }

$(document).ready(function () {
  $("#clear").click(function () {
    var checkBoxes = $("input[type=checkbox]");
    checkBoxes.prop("checked", false);
    map.setPaintProperty('watersheds', 'fill-opacity', 0);
    map.setPaintProperty('ponds', 'fill-opacity', 0);
    map.setPaintProperty('flowDepth', 'fill-opacity', 0);
    map.setPaintProperty('flowDepthOver', 'fill-opacity', 0);

  });
});

map.on('style.load', function (e) {


  map.addSource('20221111', {
    type: 'raster',
    url: 'mapbox://iconeng.12thSt_2022_11_11'
  });

  map.addLayer({
    'id': '20221111',
    'source': '20221111',
    'type': 'raster',
    'layout': {
      'visibility': 'none',
    }
  });

  map.addSource('20230702', {
    type: 'raster',
    url: 'mapbox://iconeng.12thSt_2023_07_02'
  });

  map.addLayer({
    'id': '20230702',
    'source': '20230702',
    'type': 'raster',
    'layout': {
      'visibility': 'none',
    }
  });

  map.addSource('20230819', {
    type: 'raster',
    url: 'mapbox://iconeng.12thSt_2023-08-19'
  });

  map.addLayer({
    'id': '20230819',
    'source': '20230819',
    'type': 'raster',
    'layout': {
      'visibility': 'none',
    }
  });


});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

