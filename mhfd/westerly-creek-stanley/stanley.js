mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
  zoom: 15.75,
  center: [-104.8773, 39.7509],
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

  map.addSource('reaches', {
    type: 'geojson',
    "data": 'geojson/reaches.geojson'
  });

  map.addLayer({
    'id': 'reaches',
    'type': 'line',
    'source': 'reaches',
    'layout': {
      "visibility": 'visible'
    },
    'paint': {
      'line-width': 3,
      'line-color': {
        property: 'Reach_Name',
        type: 'categorical',
        stops: [
          ['Reach1', '#FF5733'],
          ['Reach2', '#FF5733'],
          ['Reach3', '#FF5733'],
          ['Reach4', '#FF5733'],
          ['Reach5', '#FF5733']
        ]
      }
    }
  });

  map.addLayer({
    'id': 'reaches-label',
    'type': 'symbol',
    'source': 'reaches',
    'layout': {
      'visibility': 'visible',
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{Reach_Name}',
      'text-size': {
        "stops": [
          [15, 12],
          [17, 14],
          [19, 16]
        ]
      },
      "text-padding": 100,
    },
    'paint': {
      'text-color': 'rgba(0,77,168,1)',
      'text-halo-color': '#ffffff',
      'text-halo-width': 2,
      'text-halo-blur': 1
    }
  });


  map.addSource('mhfd-streams', {
    type: 'vector',
    url: 'mapbox://iconeng.d9coogno'
  });

  map.addLayer({
    'id': 'mhfd-streams',
    'type': 'line',
    'source': 'mhfd-streams',
    'source-layer': 'mhfd_streams-dbmy0f',
    'paint': {
      'line-width': 2,
      'line-opacity': 1,
      'line-color': 'rgba(0,77,168,1)'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  //Drainageway Centerline LABEL
  map.addLayer({
    'id': 'mhfd-stream-labels',
    'type': 'symbol',
    'source': 'mhfd-streams',
    'source-layer': 'mhfd_streams-dbmy0f',
    'layout': {
      'visibility': 'none',
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{Str_Name}',
      'text-size': {
        "stops": [
          [15, 12],
          [17, 14],
          [19, 16]
        ]
      },
      "text-padding": 100,
    },
    'paint': {
      'text-color': 'rgba(0,77,168,1)',
      'text-halo-color': '#ffffff',
      'text-halo-width': 2,
      'text-halo-blur': 1
    }
  });


  map.addSource('drone_pano', {
    type: 'geojson',
    "data": 'geojson/drone_pano.geojson'
  });

  map.addLayer({
    'id': 'drone_pano',
    'type': 'circle',
    'source': 'drone_pano',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'circle-radius': 7,
      'circle-color': '#f7945d'
    }
  });


  //DESIGN LINEWORK
  //LINEWORK- 
  map.addSource('CP-SITE-GRID-LINEWORK', {
    type: 'geojson',
    "data": 'geojson/CP-SITE-GRID-LINEWORK.geojson'
  });

  map.addLayer({
    'id': 'CP-SITE-GRID-LINEWORK',
    'type': 'line',
    'source': 'CP-SITE-GRID-LINEWORK',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 1.5,
      'line-color': '#CC3333'
    }
  });

  //revegetation hatch ground linework 
  map.addSource('CP-SITE-REVEG-HATCH', {
    type: 'geojson',
    "data": 'geojson/CP-SITE-REVEG-HATCH.geojson'
  });

  map.addLayer({
    'id': 'CP-SITE-REVEG-HATCH',
    'type': 'line',
    'source': 'CP-SITE-REVEG-HATCH',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 1.5,
      'line-color': '#006400'
    }
  });
  
   //revegetation grid linework 
   map.addSource('CP-SITE-REVEG-GRID', {
    type: 'geojson',
    "data": 'geojson/CP-SITE-REVEG-GRID.geojson'
  });

  map.addLayer({
    'id': 'CP-SITE-REVEG-GRID',
    'type': 'line',
    'source': 'CP-SITE-REVEG-GRID',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 1.5,
      'line-color': '#00008B'
    }
  });
  //Topo 
  map.addSource('CP-TOPO-GROUND', {
    type: 'geojson',
    "data": 'geojson/CP-TOPO-GROUND.geojson'
  });

  map.addLayer({
    'id': 'CP-TOPO-GROUND',
    'type': 'line',
    'source': 'CP-TOPO-GROUND',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 1.5,
      'line-color': '#353839'
    }
  });

 //VEGETATION POINTS 
 map.addSource('CP-SITE-REVEG-POINTS', {
  type: 'geojson',
  "data": 'geojson/CP-SITE-REVEG-POINTS.geojson'
});

map.addLayer({
  'id': 'CP-SITE-REVEG-POINTS',
  'type': 'circle',
  'source': 'CP-SITE-REVEG-POINTS',
  'layout': {
    "visibility": 'none'
  },
 'paint': {
      'circle-radius': 3,
      'circle-color': '#93DC5C'
  }
});

map.addSource('20220805', {
  type: 'raster',
  url: 'mapbox://iconeng.Stan_2022-08-05'
});

map.addLayer({
  'id': '20220805',
  'source': '20220805',
  'type': 'raster',
  'layout': {
    'visibility': 'none',
  }
});

map.addSource('20240405', {
  type: 'raster',
  url: 'mapbox://iconeng.Stan_2024-04-05'
});

map.addLayer({
  'id': '202404050',
  'source': '20240405',
  'type': 'raster',
  'layout': {
    'visibility': 'none',
  }
});

});





// Drone Panoramic Popup

map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['drone_pano']
  });
  if (!features.length) {
    return;
  }

  var feature = features[0];
  // var photoPath = path.join("images/"+feature.properties.Photo+".jpg");

  var popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('<h8><b style="color:black;">' + feature.properties.Descr + '</b>' +
      '<br> Open in new tab: <br>' + '<a href="' + feature.properties.URL + '" target="_blank">' + feature.properties.Descr + '</a>' +
      '<br>' + '<iframe width="5000" height="300" src=' + feature.properties.URL + '" allowfullscreen>' +

      // '</h8> <br>' + '<img src= "images/' + feature.properties.Photo + '.jpg" height=240px>' +
      '<br> Videos: <br>' + '<a href="' + feature.properties.Youtube1 + '" target="_blank">' + 'Reach 1 Comparison Video' + '</a>'

    )
    .addTo(map);
});




// .setHTML('<h3><a href="' + feature.properties.URL + '">' + feature.properties.Company + '</a></h3>')

map.on('mousemove', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['drone_pano'] });

  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

