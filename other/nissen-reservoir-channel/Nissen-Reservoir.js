//This will not change
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';


//Satellite Steets
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cihxv74vo00oynpm48wsujwo3',
    zoom: 16.26,
    hash: true,
    center: [-105.04011, 39.91588]
});


//Create vectors for menu items
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');


//BaseMap Switch
function switchLayer(layer) {
    var layerId = layer.target.value;
    map.setStyle('mapbox://styles/iconeng/' + layerId);
    $('.layer-off').prop('checked', false);
    $('.layer-on').prop('checked', true);
}
for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}


//Create Map
map.on('style.load', function () {

  
  map.addSource('contours', {
      'type': 'geojson',
      'data': 'NRC_contour_web.geojson'
  });


  map.addSource('parcels', {
      'type': 'vector',
      'url': 'mapbox://iconeng.bgjpr18v'
  });


  map.addSource('streams', {
      'type': 'vector',
      'url': 'mapbox://iconeng.at4lisjc'
  });

0
  map.addSource('fldHazAreas', {
      'type': 'vector',
      'url': 'mapbox://iconeng.0t5cy9d9'
  });


  map.addSource('existingWtrLns', {
      'type': 'vector',
      'url': 'mapbox://iconeng.1pd3bkpg'
  });


  map.addSource('existingSanLns', {
      'type': 'vector',
      'url': 'mapbox://iconeng.8pfdfzid'
  });


  map.addSource('boundary', {
      'type': 'vector',
      'url': 'mapbox://iconeng.0dhycpfl'
  });



//-------Contours--------

  map.addLayer({
        'id': 'minorContour',
        'type': 'line',
        'source': 'contours',
        'filter': ['==', 'Index', 0],
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': { 
            'line-width': 0.7,
            'line-color': '#424242',
            'line-opacity': 0.9
        }
    },'road-label-small');

    map.addLayer({
        'id': 'majorContour',
        'type': 'line',
        'source': 'contours',
        'filter': ['==', 'Index', 5],
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': { 
            'line-width': 2,
            'line-color': '#484848',
            'line-opacity': 0.9
        }
    },'road-label-small');
    

  map.addLayer({
      'id': 'contourLabels',
      'type': 'symbol',
      'source': 'contours',
      'filter': ['==', 'Index', 5],
      'layout': {
          'visibility': 'visible',
        'symbol-placement': 'line',
        'text-field': '{CONTOUR}',
        'text-font': ['Roboto Italic','Open Sans Light','Arial Unicode MS Regular'],
        'text-size': {
          "stops": [[15,12],[17,15],[19,17]]
        }
      },
      'paint': {
        'text-color': '#424242',
        'text-halo-color': 'rgb(255,255,255)',
        'text-halo-width': 0.75
      }
  }, 'road-label-small');



    //Existing SAN
    map.addLayer({
      'id': 'SAN',                               
      'source': 'existingSanLns',
      'source-layer': 'NRC_SAN_LINES-0outbg',     
      'type': 'line',        
      'paint': {
         'line-color': '#222222', 
         'line-width': 2,
         'line-dasharray': [2,1]
       },
      'layout': {'visibility': 'visible'}
    },'road-label-small');


    //Existing SAN Labels
    map.addLayer({
      'id': 'SAN_LABELS',
       'type': 'symbol',                                
       'source': 'existingSanLns',
       'source-layer': 'NRC_SAN_LINES-0outbg',
       'layout': {
         'visibility': 'visible',
         'symbol-placement': 'line',
         'text-field': 'SAN',
         'text-font': ['Open Sans Bold','Arial Unicode MS Regular'],
         'text-size': 12,
          },
       'paint': {
         'text-color': 'rgb(1,1,1)',
         'text-halo-color': 'rgb(255,255,255)',
         'text-halo-width': 0.4
        }
    },'road-label-small');


    //Existing WTR
    map.addLayer({
      'id': 'WTR',                               
      'source': 'existingWtrLns',
      'source-layer': 'NRC_WTR_LINES-6p73xr',     
      'type': 'line',        
      'paint': {
         'line-color': '#222222', 
         'line-width': 2,
         'line-dasharray': [2,1],
       },
      'layout': {'visibility': 'visible'}
    },'road-label-small');


    //Existing WTR Labels
    map.addLayer({
      'id': 'WTR_LABELS',
       'type': 'symbol',                                
       'source': 'existingWtrLns',
       'source-layer': 'NRC_WTR_LINES-6p73xr',
       'layout': {
         'visibility': 'visible',
         'symbol-placement': 'line',
         'text-field': 'WTR',
         'text-font': ['Open Sans Bold','Arial Unicode MS Regular'],
         'text-size': 12,
          },
       'paint': {
         'text-color': 'rgb(1,1,1)',
         'text-halo-color': 'rgb(255,255,255)',
         'text-halo-width': 0.4
        }
    },'road-label-small');


    //Parcels
    map.addLayer({
      'id': 'PROP_LINES',                               
      'source': 'parcels',
      'source-layer': 'NRC_Parcels_Brmfld_Co-9rols7',     
      'type': 'line',        
      'paint': {
         'line-color': '#170021', 
         'line-width': 1.5
       },
      'layout': {'visibility': 'visible'}
    },'road-label-small');



    //Floodway
    map.addLayer({
      'id': 'FLOODWAY',
      'source': 'fldHazAreas',
      'source-layer': 'NRC_S_FLD_HAZ_AR_DISSOLVE-45f1x9',
      'layout': {
        'visibility': 'visible'
      },
      'type': 'fill',
      'filter': ['==', 'ZONE_SUBTY', 'FLOODWAY'],
      'paint': {
        'fill-opacity': 0.78,
        'fill-color': '#377ab3',
        'fill-outline-color': '#fff',
      }
    });

    //100-yr
    map.addLayer({
      'id': '100_YR',
      'source': 'fldHazAreas',
      'source-layer': 'NRC_S_FLD_HAZ_AR_DISSOLVE-45f1x9',
      'layout': {
        'visibility': 'visible'
      },
      'type': 'fill',
      'filter': ['==', 'ZONE_SUBTY', '1.0 PCT ANNUAL CHANCE FLOOD HAZARD'],
      'paint': {
        'fill-opacity': 0.78,
        'fill-outline-color': '#fff',
        'fill-color': '#66c1b6',
      }
    });


    //500-yr
    map.addLayer({
      'id': '500_YR',
      'source': 'fldHazAreas',
      'source-layer': 'NRC_S_FLD_HAZ_AR_DISSOLVE-45f1x9',
      'layout': {
        'visibility': 'visible'
      },
      'type': 'fill',
      'filter': ['==', 'ZONE_SUBTY', '0.2 PCT ANNUAL CHANCE FLOOD HAZARD'],
      'paint': {
        'fill-opacity': 0.78,
        'fill-outline-color': '#fff',
        'fill-color': '#edf8b1',
      }
    });


    //Streams  
    map.addLayer({
      'id': 'STREAMS',
      'type': 'line',
      'source': 'streams',
      'source-layer': 'NRC_S_PROFIL_BASLN-5v8tg7',
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
          'line-width': 2.5,
          'line-color': '#253494',
          'line-opacity': 0.9
      }
    },'road-label-small');



    //Boundary Fill
    map.addLayer({
      'id': 'BOUNDARY',                               
      'source': 'boundary',
      'source-layer': 'NRC_Boundary_HARN-4q7dsx',     
      'type': 'fill',        
      'paint': {
         'fill-color': '#161616', 
         'fill-opacity': 0.17
       },
      'layout': {'visibility': 'visible'}
    },'road-label-small');

    //Boundary Outline
    map.addLayer({
      'id': 'BOUNDARY_LINE',                               
      'source': 'boundary',
      'source-layer': 'NRC_Boundary_HARN-4q7dsx',     
      'type': 'line',        
      'paint': {
         'line-color': '#161616', 
         'line-opacity': 0.75,
         'line-width': 4.0
       },
      'layout': {'visibility': 'visible'}
    },'road-label-small');

    


});



/*
// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (k) {
  var featureList = map.queryRenderedFeatures(k.point, { layers: ['lineBuffer'] });
  if (!featureList.length) {
      return;
  }

  var feature = featureList[0];

        var popup = new mapboxgl.Popup()
            .setLngLat(k.lngLat)
            .setHTML('<b>' + feature.properties.Name + '</b> <br />' +
                     'Approx. Length: ' + feature.properties.Length + ' ft' + '<br />' +
                     'No. of Intersecting Residential Properties: ' + feature.properties.Prcl_ct)
            .addTo(map);
    });

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (k) {
    var featureList = map.queryRenderedFeatures(k.point, { layers: ['lineBuffer'] });
    map.getCanvas().style.cursor = (featureList.length) ? 'pointer' : '';
});
*/



map.addControl(new mapboxgl.NavigationControl(), 'top-right');
