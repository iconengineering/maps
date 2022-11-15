mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
    zoom: 17,
    center: [-104.8974, 39.5721],
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

$(document).ready(function() {
    $("#clear").click(function() {
        var checkBoxes = $("input[type=checkbox]");
        checkBoxes.prop("checked", false);
        map.setPaintProperty('watersheds','fill-opacity', 0);
        map.setPaintProperty('ponds','fill-opacity', 0);
        map.setPaintProperty('flowDepth','fill-opacity', 0);
        map.setPaintProperty('flowDepthOver','fill-opacity', 0);

    });
});



map.on('style.load',function(e){
  
  
  map.addSource('velocity', {
    type: 'vector',
    url: 'mapbox://iconeng.d7wbifcg'
  });
  
  
  map.addLayer({
    'id': 'velocity',
    'type': 'fill',
    'source': 'velocity',
    'source-layer': 'velo_2232_100_vector-ciyu3e',
    'filter': ['>=', 'DN', 0.08],
    'paint': {
      'fill-color': {
        property: 'DN',
        type: 'interval',
        stops: [
          [0, 'rgb(0,104,55)'],
          [150, 'rgb(102,189,99)'],
          [300, 'rgb(254,224,139)'],
          [450, 'rgb(253,174,97)'],
          [600, 'rgb(215,48,39)'],
          [700, 'rgb(165,0,38)']
        ]
      },
      'fill-opacity': 0.5
    },
  }, 'road-label-small');
  
  
  // map.addLayer({
  //   'id': 'mhfd-streams',
  //   'type': 'line',
  //   'source': 'mhfd-streams',
  //   'source-layer':'mhfd_streams-dbmy0f',
  //   'paint': {
  //     'line-width': 2,
  //     'line-opacity': 1,
  //     'line-color': 'rgba(0,77,168,1)'
  //   },
  //   'layout': {
  //     'visibility': 'none'
  //   }
  // });

  // //Drainageway Centerline LABEL
  // map.addLayer({
  //   'id': 'mhfd-stream-labels',
  //   'type': 'symbol',
  //   'source': 'mhfd-streams',
  //   'source-layer':'mhfd_streams-dbmy0f',
  //   'layout': {
  //     'visibility':'none',
  //     'symbol-placement': 'line',
  //     'symbol-spacing': 100,
  //     'text-field': '{Str_Name}',
  //     'text-size': {
  //       "stops": [
  //         [15, 12],
  //         [17, 14],
  //         [19, 16]
  //       ]
  //     },
  //     "text-padding": 100,
  //   },
  //   'paint': {
  //     'text-color': 'rgba(0,77,168,1)',
  //     'text-halo-color': '#ffffff',
  //     'text-halo-width': 2,
  //     'text-halo-blur': 1
  //   }
  // });






});



map.addControl(new mapboxgl.NavigationControl(), 'top-right');


