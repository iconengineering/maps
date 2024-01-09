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


//Aerials
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

  //URL will need to be updated once mapbox is completed
  map.addSource('20231231', {
    type: 'raster',
    url: 'mapbox://iconeng.12thSt_2023-08-19'
  });

  map.addLayer({
    'id': '20231231',
    'source': '20231231',
    'type': 'raster',
    'layout': {
      'visibility': 'none',
    }
  });

//Design Shapefiles
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
    'line-width': 3,
    'line-color': '#242124'
  }
});

//Boulder Hatch- 
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
    'fill-opacity': 0.4
  }
  
});

// Planimetrics
map.addSource('12St_Planimetrics', {
  type: 'geojson',
  "data": '.geojson/12St_Planimetrics.geojson'
});

map.addLayer({
  'id': '12St_Planimetrics',
  'type': 'line',
  'source': '12St_Planimetrics',
  'layout': {
    "visibility": 'none'
  },
  'paint': {
    'line-width': 2,
    'line-color': '#CC3333'
  }
}, ); 


//Grading- 
map.addSource('12thst_Grading', {
  type: 'geojson',
  "data": '.geojson/12thst_Grading.geojson'
});

map.addLayer({
  'id': '12thst_Grading',
  'type': 'line',
  'source': '12thst_Grading',
  'layout': {
    "visibility": 'none'
  },
  'paint': {
    'line-width': 2,
    'line-color': '#353839'
  }
}, null);  // Set 'before' to null to place the layer at the bottom of the stack?

});


map.addControl(new mapboxgl.NavigationControl(), 'top-right');

