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


//Aerials
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
  'id': '20240405',
  'source': '20240405',
  'type': 'raster',
  'layout': {
    'visibility': 'none',
  }
});


  //DESIGN LINEWORK
  //LINEWORK- 
  map.addSource('Site_Linework', {
    type: 'geojson',
    "data": 'geojson/Site_Linework.geojson'
  });

  map.addLayer({
    'id': 'Site_Linework',
    'type': 'line',
    'source': 'Site_Linework',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 1.5,
      'line-color': '#CC3333'
    }
  });

  //HATCHING
  map.addSource('Site_Hatching', {
    type: 'geojson',
    "data": 'geojson/Site_Hatching.geojson'
  });

  map.addLayer({
    'id': 'Site_Hatching',
    'type': 'line',
    'source': 'Site_Hatching',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 1.5,
      'line-color': '#964B00'
    }
  });
  
   //REVEGETATION- Trees
   map.addSource('Trees', {
    type: 'geojson',
    "data": 'geojson/Trees.geojson'
  });

  map.addLayer({
    'id': 'Trees',
    'type': 'symbol',
  'source': 'Trees',
  'layout': {
    "visibility": 'none',
    "icon-image": 'icon-park-outline--tree',
    "icon-size": .9
  }
  });

  //Topo- Site Grading 
  map.addSource('Site_Grading', {
    type: 'geojson',
    "data": 'geojson/Site_Grading.geojson'
  });

  map.addLayer({
    'id': 'Site_Grading',
    'type': 'line',
    'source': 'Site_Grading',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 1.5,
      'line-color': '#4f4f4f'
    }
  });

 //VEGETATION- Shrubs
 map.addSource('Shrubs', {
  type: 'geojson',
  "data": 'geojson/Shrubs.geojson'
});

map.addLayer({
  'id': 'Shrubs',
  'type': 'symbol',
  'source': 'Shrubs',
  'layout': {
    "visibility": 'none', 
    "icon-image": 'streamline--tree-2',
    "icon-size": 1.5
  }
});

//VEGETATION- Shrubs Phase 2
map.addSource('Shrubs_Phase2', {
  type: 'geojson',
  "data": 'geojson/Shrubs_Phase2.geojson'
});

map.addLayer({
  'id': 'Shrubs_Phase2',
  'type': 'symbol',
  'source': 'Shrubs_Phase2',
  'layout': {
    "visibility": 'none', 
    "icon-image": 'streamline--tree-2',
    "icon-size": 1.5
  }
});

//Re-vegetation- Grasses
map.addSource('Grasses', {
  type: 'geojson',
  "data": 'geojson/Grasses.geojson'
});

map.addLayer({
  'id': 'Grasses',
  'type': 'symbol',
'source': 'Grasses',
'layout': {
  "visibility": 'none',
  "icon-image": 'game-icons--high-grass',
  "icon-size": .05
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
      '<br> Click Link Below to Open in New Tab: <br>' + '<a href="' + feature.properties.URL + '" target="_blank">' + feature.properties.Descr + '</a>' +
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

