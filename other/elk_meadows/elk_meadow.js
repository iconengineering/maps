mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
  zoom: 17,
  center: [-105.3663, 39.6542],
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


//Aerials
map.on('style.load', function (e) {

  //Pre Project
  map.addSource('PreProject', {
    type: 'raster',
    url: 'mapbox://iconeng.8gredtez'
  });

  map.addLayer({
    'id': 'PreProject',
    'source': 'PreProject',
    'type': 'raster',
    'layout': {
      'visibility': 'none',
    }
  });
  //Jan 7th 2025
  map.addSource('20250107', {
    type: 'raster',
    url: 'mapbox://iconeng.ElkMeadows_2025-01-17'
  });

  map.addLayer({
    'id': '20250107',
    'source': '20250107',
    'type': 'raster',
    'layout': {
      'visibility': 'none',
    }
  });





  // Planimetrics
  map.addSource('PR_linework', {
    type: 'geojson',
    "data": 'geojson/ElkMeadows_linework.geojson'
  });

  map.addLayer({
    'id': 'PR_linework',
    'type': 'line',
    'source': 'PR_linework',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 2,
      'line-color': '#CC3333'
    }
  },);



  //Grading- 
  map.addSource('PR_Grading', {
    type: 'geojson',
    "data": 'geojson/ElkMeadows_grading.geojson'
  });

  map.addLayer(
    {
      'id': 'PR_Grading',
      'type': 'line',
      'source': 'PR_Grading',
      'layout': {
        "visibility": 'none'
      },
      'paint': {
        'line-width': 2,
        'line-color': '#353839'
      }
    }, '12thst_Grading.cold');  // Set 'before' to null to place the layer at the bottom of the stack?






  //Boulder Hatch- HAVENT UPDATED
  map.addSource('12thSt_Boulder_Hatch', {
    type: 'geojson',
    "data": '.geojson/12thSt_Boulder_Hatch.geojson'
  });

  map.addLayer({
    'id': '12thSt_Boulder_Hatch',
    'type': 'fill',
    'source': '12thSt_Boulder_Hatch',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'fill-color': '#B56917',
      'fill-opacity': 0.7
    }

  });

  //Design Shapefiles- HAVENT UPDATED
  //Boulder Line- 
  map.addSource('12thSt_Boulder_Line', {
    type: 'geojson',
    "data": '.geojson/12thSt_Boulder_Line.geojson'
  });

  map.addLayer({
    'id': '12thSt_Boulder_Line',
    'type': 'line',
    'source': '12thSt_Boulder_Line',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 1,
      'line-color': '#242124'
    }
  });


});


map.addControl(new mapboxgl.NavigationControl(), 'top-right');

