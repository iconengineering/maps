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
    map.setPaintProperty('basinOutlines', 'line-opacity', 0);
    map.setPaintProperty('flowDepth', 'fill-opacity', 0);
    map.setPaintProperty('flowDepthOverview', 'fill-opacity', 0);

  });
});

map.on('style.load', function(e) {

  map.addSource('basinOutlines', {
    type: 'geojson',
    "data": 'basinOutlines.geojson'
  });
  map.addSource('buildingOutlines', {
    type: 'geojson',
    "data": 'buildingOutlines.geojson'
  });
  // map.addSource('contours', {
  //   type: 'vector',
  //   url: 'mapbox://iconeng.5goos4hw'
  // });
  // map.addSource('flowDepth', {
  //   type: 'vector',
  //   url: 'mapbox://iconeng.7ir8lsql'
  // });

  //Add Basin Outlines
  map.addLayer({
    'id': 'basinOutlines',
    'type': 'line',
    'source': 'basinOutlines',
    'paint': {
      'line-width': 1,
      'line-opacity': 1,
      'line-color': 'rgba(0,0,0,1)',
      'line-dasharray': [8, 4]
    }
  });

  //Add contours
  // map.addLayer({
  //   'id': '1ftContours',
  //   'type': 'line',
  //   'source': 'contours',
  //   'source-layer': 'oldtown_1ft_contours_smooth',
  //   'layout': {
  //     'line-join': 'round',
  //     'line-cap': 'round'
  //   },
  //   'paint': {
  //     'line-width': {
  //       "stops": [
  //         [15, 0],
  //         [17, .5],
  //         [19, 1]
  //       ]
  //     },
  //     'line-opacity': 0,
  //     'line-color': '#bd925a'
  //   }
  // }, 'road-label-small');

  //Add Flow depth
  // map.addLayer({
  //   'id': 'flowDepth',
  //   'type': 'fill',
  //   'source': 'flowDepth',
  //   'source-layer': 'wct_depth_merged-6uujq7',
  //   'filter': ["all", ['>', 'VALUE', 0.08]],
  //   'paint': {
  //     'fill-color': {
  //       property: 'VALUE',
  //       type: 'interval',
  //       stops: [
  //         [.25, 'rgb(252,244,182)'],
  //         [.5, 'rgb(245,194,152)'],
  //         [1, 'rgb(227,147,138)'],
  //         [1.5, 'rgb(199,101,134)'],
  //         [2, 'rgb(161,59,139)'],
  //         [3, 'rgb(109,23,143)'],
  //         [4, 'rgb(14,9,135)']
  //       ]
  //     },
  //     'fill-opacity': 0
  //   }
  // }, 'road-label-small');

  //Add Building
  map.addLayer({
    'id': 'buildingOutlines',
    'type': 'line',
    'source-layer': 'buildingOutlines',
    'paint': {
      'line-width': 1,
      'line-opacity': 1,
      'line-color': 'rgba(0,0,0,1)',
    }
  });

  // var style = map.getStyle();
  //
  // if (style.name != 'Light') {
  //   map.setLayoutProperty('conduitArrows', 'icon-image', 'oneway-spaced-white-small');
  // }

});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');
