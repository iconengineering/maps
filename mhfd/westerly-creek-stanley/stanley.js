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

  //DRONE PANO DOTS
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
      'circle-radius': 8,
      'circle-color': '#141038'
    }
  });


  //Aerials
  //August
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
  //April
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
  //October
  map.addSource('20241018', {
    type: 'raster',
    url: 'mapbox://iconeng.Stanley_2024-10-18'
  });

  map.addLayer({
    'id': '20241018',
    'source': '20241018',
    'type': 'raster',
    'layout': {
      'visibility': 'none',
    }
  });
  //December
  map.addSource('20241229', {
    type: 'raster',
    url: 'mapbox://iconeng.Stanley_2024-12-29'
  });

  map.addLayer({
    'id': '20241229',
    'source': '20241229',
    'type': 'raster',
    'layout': {
      'visibility': 'none',
    }
  });
  //Jan 8th
  map.addSource('20250108', {
    type: 'raster',
    url: 'mapbox://iconeng.Stanley_2025-01-08'
  });

  map.addLayer({
    'id': '20250108',
    'source': '20250108',
    'type': 'raster',
    'layout': {
      'visibility': 'none',
    }
  });
  //Jan 22
  map.addSource('20250122', {
    type: 'raster',
    url: 'mapbox://iconeng.Stanley_2025-01-22'
  });

  map.addLayer({
    'id': '20250122',
    'source': '20250122',
    'type': 'raster',
    'layout': {
      'visibility': 'none',
    }
  });
  //Feb 5
  map.addSource('20250205', {
    type: 'raster',
    url: 'mapbox://iconeng.Stanley_2025-02-05'
  });

  map.addLayer({
    'id': '20250205',
    'source': '20250205',
    'type': 'raster',
    'layout': {
      'visibility': 'none',
    }
  });
 //Feb 26
 map.addSource('20250226', {
  type: 'raster',
  url: 'mapbox://iconeng.Stanley_2025-02-26'
});

map.addLayer({
  'id': '20250226',
  'source': '20250226',
  'type': 'raster',
  'layout': {
    'visibility': 'none',
  }
});
 //Mar 11
 map.addSource('20250311', {
  type: 'raster',
  url: 'mapbox://iconeng.Stanley_2025-03-11'
});

map.addLayer({
  'id': '20250311',
  'source': '20250311',
  'type': 'raster',
  'layout': {
    'visibility': 'none',
  }
});
 //Mar 26
 map.addSource('20250326', {
  type: 'raster',
  url: 'mapbox://iconeng.Stanley_2025-03-26'
});

map.addLayer({
  'id': '20250326',
  'source': '20250326',
  'type': 'raster',
  'layout': {
    'visibility': 'none',
  }
});
//Apri 23- adjusted 4/29
map.addSource('20250423', {
  type: 'raster',
  url: 'mapbox://iconeng.Stanley_2025-04-23'
});

map.addLayer({
  'id': '20250423',
  'source': '20250423',
  'type': 'raster',
  'layout': {
    'visibility': 'visible',
  }
 });

//4/23 Blur
 map.addSource('Blur', {
  type: 'geojson',
  "data": 'geojson/Blur.geojson'
 });
 map.addLayer({
  'id': 'Blur',
  'type': 'fill',
  'source': 'Blur',
  'layout': {
      'visibility': 'visible'
  },
  'paint':{
    'fill-color':'#909090',
    'fill-opacity':0.95
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

 //Construction Progress
  map.addSource('Construction_Progress', {
    type: 'geojson',
    "data": 'geojson/Construction_Progress.geojson'
   });

   map.addLayer({
    'id': 'Construction_Progress',
    'type': 'line',
    'source': 'Construction_Progress',
    'layout': {
     "visibility": 'none'
    },
   'paint': {
     'line-width': 1.5,
     'line-color': '#ffffff'
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

  //RIPRAP HATCH
  map.addSource('CP-RIPRAP-HATCH', {
    type: 'geojson',
    "data": 'geojson/CP-RIPRAP-HATCH.geojson'
  });

  map.addLayer({
    'id': 'CP-RIPRAP-HATCH',
    'type': 'line',
    'source': 'CP-RIPRAP-HATCH',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 1.5,
      'line-color': '#444C38'
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
      "icon-allow-overlap": true,
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
      'line-color': '#010101'
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
      "icon-allow-overlap": true,
      "icon-size": 1
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
      "icon-allow-overlap": true,
      "icon-size": 1
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
      "icon-allow-overlap": true,
      "icon-size": .05
    }
  });

  //VEGETATION- Wetland FIX 
  map.addSource('Wetland', {
    type: 'geojson',
    "data": 'geojson/Wetland.geojson'
  });

  map.addLayer({
    'id': 'Wetland',
    'type': 'line',
    'source': 'Wetland',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 1.5,
      'line-color': '#363636'
    }
  });

  //VEGETATION- Upland 
  map.addSource('Upland', {
    type: 'geojson',
    "data": 'geojson/Upland.geojson'
  });

  map.addLayer({
    'id': 'Upland',
    'type': 'line',
    'source': 'Upland',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 1.5,
      'line-color': '#0c2d1c'
    }
  });

  //VEGETATION- SOD 
  map.addSource('Sod', {
    type: 'geojson',
    "data": 'geojson/Sod.geojson'
  });

  map.addLayer({
    'id': 'Sod',
    'type': 'line',
    'source': 'Sod',
    'layout': {
      "visibility": 'none',
    },
    'paint': {
      'line-width': 1.5,
      'line-color': '#de5655'
    }
  });

  //VEGETATION- RIPARIAN 
  map.addSource('RIPARIAN', {
    type: 'geojson',
    "data": 'geojson/RIPARIAN.geojson'
  });

  map.addLayer({
    'id': 'RIPARIAN',
    'type': 'line',
    'source': 'RIPARIAN',
    'layout': {
      "visibility": 'none'
    },
    'paint': {
      'line-width': 1.5,
      'line-color': '#003400'
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
      '<br> Click Link Below to Open in New Tab: <br>' + '<a href="' + feature.properties.URL + '" target="_blank" style="color:blue;">' + feature.properties.Descr + '</a>' +
      '<br>' + '<iframe width="5000" height="300" src=' + feature.properties.URL + ' allowfullscreen>'
    )
    .addTo(map);
});




// .setHTML('<h3><a href="' + feature.properties.URL + '">' + feature.properties.Company + '</a></h3>')

map.on('mousemove', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['drone_pano'] });

  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

