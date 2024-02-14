mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
  zoom: 11.25,
  center: [-104.9130, 40.3520],
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


  map.addSource('gma', {
    type: 'geojson',
    "data": 'geojson/gma.geojson'
  });

  //100 yr FP Outline
  map.addLayer({
    'id': 'gma',
    'type': 'line',
    'source': 'gma',
    'paint': {
      'line-width': 3,
      'line-color': '#FF0800'
    },
    'layout': {
      'visibility': 'visible'
    }
  });


  map.addSource('town', {
    type: 'geojson',
    "data": 'geojson/townlimits.geojson'
  });

  //100 yr FP Outline
  map.addLayer({
    'id': 'town',
    'type': 'line',
    'source': 'town',
    'paint': {
      'line-width': 1.5,
      'line-color': '#FFEF00'
    },
    'layout': {
      'visibility': 'visible'
    }
  });


  map.addSource('rom-gma', {
    type: 'vector',
    url: 'mapbox://iconeng.cgsq3i10'
  });


  map.addLayer({
    'id': 'rom-gma',
    'type': 'fill',
    'source': 'rom-gma',
    'source-layer': 'john_100_poly-af1ve9',
    'filter': ['>=', 'DN', 0.08],
    'paint': {
      'fill-color': {
        property: 'DN',
        type: 'interval',
        stops: [
          [0, '#d7dcec'],
          [150, '#99b9d8'],
          [200, '#4f9bc7'],
          [250, '#1773a6'],
          [500, '#045a8d']
        ]
      },
      'fill-opacity': 0.8
    },
  }, 'road-label-small');















 
  //Map reach colors
  map.addLayer({
    'id': 'reaches',
    'type': 'line',
    'source': 'reaches',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 3,
      'line-color': {
        property: 'Reach_Name',
        type: 'categorical',
        stops: [
          ['Reach 1', '#FF5733'],
          ['Reach 2', '#9e0142'],
          ['Reach 3', '#ffe066'],
          ['Reach 4', '#00bd9d'],
          ['Reach 5', '#e67f0d'],
          ['Reach 6', '#3d314a'],
          ['Reach 7', '#abdda4'],
          ['Reach 8', '#78cdd7'],
          ['Reach 9', '#f79d84'],
          ['Reach 10', '#5e4fa2'],
          ['Reach 11', '#8c510a'],
          ['Reach 12', '#762a83'],
          ['Reach 13', '#00441b']
        ]
      }
    }
  });



});


map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['reaches']
  });
  if (!features.length) {
    return;
  }

  var feature = features[0];

 
  var popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(popupContent)
    .addTo(map);



  // var feature = features[0];
  // // var photoPath = path.join("images/"+feature.properties.Photo+".jpg");

  // var popup = new mapboxgl.Popup()
  //   .setLngLat(e.lngLat)
  //   .setHTML('<h8><b>' + feature.properties.Reach_Name + '</b>' + '<br>' +
  //     feature.properties.Description +
  //     // '</h8> <br>' + '<img src= "images/' + feature.properties.Photo + '.jpg" height=240px>' +
  //     '<br> Videos: <br>' + '<a href="' + feature.properties.Youtube1 + '" target="_blank">' + feature.properties.Reach_Name + ' Comparison Video' + '</a>'

  //   )
  //   .addTo(map);
});








map.addControl(new mapboxgl.NavigationControl(), 'top-right');

//Zoom to Reach
//Reach buttons use coordinates SW to NE Coordinates

document.getElementById('Reach1').addEventListener('click', function () {
  var bbox = [[-104.960, 39.804], [-104.936, 39.815]];
  map.fitBounds(bbox, { padding: 50 });
});

document.getElementById('Reach13').addEventListener('click', function () {
  var bbox = [[-104.792, 39.736], [-104.768, 39.748]];
  map.fitBounds(bbox, { padding: 50 });
});


















