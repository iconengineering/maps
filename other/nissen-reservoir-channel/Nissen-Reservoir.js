//This will not change
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';


//Satellite Steets
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cihxv74vo00oynpm48wsujwo3',
    zoom: 15.8,
    hash: true,
    center: [-105.0403, 39.9158]
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


$(document).ready(function() {
    $("#clear").click(function() {
        var checkBoxes = $("input[type=checkbox]");
        checkBoxes.prop("checked", false);
        map.setLayoutProperty('majorContour','visibility', 'none');
        map.setLayoutProperty('minorContour','visibility', 'none');
        map.setLayoutProperty('PROP_LINES','visibility', 'none');
        map.setLayoutProperty('contourLabels','visibility', 'none');
        map.setLayoutProperty('FLOODWAY','visibility', 'none');
        map.setLayoutProperty('STREAMS','visibility', 'none');
        map.setLayoutProperty('100_YR','visibility', 'none');
        map.setLayoutProperty('500_YR','visibility', 'none');
        map.setLayoutProperty('SAN','visibility', 'none');
        map.setLayoutProperty('SAN_NODES','visibility', 'none');
        map.setLayoutProperty('SAN_LABELS','visibility', 'none');
        map.setLayoutProperty('WTR','visibility', 'none');
        map.setLayoutProperty('WTR_LABELS','visibility', 'none');
        map.setLayoutProperty('PROP_LINES','visibility', 'none');
        map.setLayoutProperty('BOUNDARY','visibility', 'none');
        map.setLayoutProperty('BOUNDARY_LINE','visibility', 'none');
        map.setLayoutProperty('ALT1','visibility', 'none');
        map.setLayoutProperty('ALT2','visibility', 'none');
        map.setLayoutProperty('ALT1GRADING','visibility', 'none');
        map.setLayoutProperty('ALT2GRADING','visibility', 'none');
        map.setLayoutProperty('EASEMENTS','visibility', 'none');
        map.setLayoutProperty('EASEMENTS_OUTLINE','visibility', 'none');
        map.setLayoutProperty('PROPPOND','visibility', 'none');
        map.setLayoutProperty('EXISTINGPOND','visibility', 'none');
        map.setLayoutProperty('CULVERTS','visibility', 'none');

    });
});


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


  map.addSource('existingSanNodes',{
      'type': 'vector',
      'url': 'mapbox://iconeng.3h674jtq'
  });


  map.addSource('propPond',{
      'type': 'vector',
      'url': 'mapbox://iconeng.dcnpevmz'
  });



  map.addSource('existingPond',{
      'type': 'vector',
      'url': 'mapbox://iconeng.4dl5gmch'
  });

  map.addSource('propEasements',{
      'type': 'vector',
      'url': 'mapbox://iconeng.3qdxp8j3'
  });


  map.addSource('culverts',{
      'type': 'vector',
      'url': 'mapbox://iconeng.5oebumwy'
  });


  map.addSource('alt1',{
      'type': 'vector',
      'url': 'mapbox://iconeng.41tl4h5r'
  });

  map.addSource('alt2',{
      'type': 'vector',
      'url': 'mapbox://iconeng.0ohh34jj'
  });


  map.addSource('alt1Grading',{
      'type': 'vector',
      'url': 'mapbox://iconeng.6yo5voab'
  });

  map.addSource('alt2Grading',{
      'type': 'vector',
      'url': 'mapbox://iconeng.1e8j1t4j'
  });


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
        'fill-opacity': 0.23,
        'fill-color': '#21468E',
        'fill-outline-color': '#fff',
      }
  }, 'road-label-small');



   


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
        'fill-opacity': 0.23,
        'fill-outline-color': '#fff',
        'fill-color': '#3DB178'
        ,
      }
  }, 'road-label-small');


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
        'fill-opacity': 0.23,
        'fill-outline-color': '#fff',
        'fill-color': '#FFFD4C',
      }
  }, 'road-label-small');

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
          'line-width': 3.0,
          'line-color': '#0D1178',
          'line-opacity': 0.65
      }
    },'road-label-small');



    //Existing SAN
    map.addLayer({
      'id': 'SAN',                               
      'source': 'existingSanLns',
      'source-layer': 'NRC_SAN_LINES-0outbg',     
      'type': 'line',        
      'paint': {
         'line-color': '#BF2700', 
         'line-width': 2.6,
         'line-opacity': 0.65
       },
      'layout': {'visibility': 'visible'}
    },'road-label-small');


    //Existing SAN Nodes
    map.addLayer({
      'id': 'SAN_NODES',                               
      'source': 'existingSanNodes',
      'source-layer': 'NRC_SAN_NODES-ct9tc7',     
      'type': 'circle',        
      'paint': {
         'circle-color': '#BF2700', 
         'circle-radius': 5.1,
         'circle-opacity': 0.65
       },
      'layout': {'visibility': 'visible'}
    },'road-label-small')

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
         'text-opacity': 0.65,
         'text-color': '#BF2700',
         'text-halo-color': 'rgb(250,250,250 )',
         'text-halo-width': 0.7
        }
    },'road-label-small');


    //Existing WTR
    map.addLayer({
      'id': 'WTR',                               
      'source': 'existingWtrLns',
      'source-layer': 'NRC_WTR_LINES-6p73xr',     
      'type': 'line',        
      'paint': {
         'line-width': 2.6,
         'line-color': {
          property: 'Type',
          type: 'categorical',
          stops: [
            ['Reuse Water', '#7A0050' ],
            ['Domestic Water', '#0007BF']
            ]
          },
          'line-opacity': 0.65
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
         'text-size': 12
          },
       'paint': {
         'text-color': {
            property: 'Type',
            type: 'categorical',
            stops: [
              ['Domestic Water', '#0007BF'],
              ['Reuse Water', '#7A0050'],
              ]
            },
         'text-halo-color': 'rgb(255,255,255)',
         'text-halo-width': 0.7,
         'text-opacity': 0.65
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



    //Alt 1
    map.addLayer({
        'id': 'ALT1',
        'source': 'alt1',
        'source-layer': 'NRC_Alt_1-8cnnhc', 
        'type': 'fill',
        'paint': {
          'fill-color': '#007F25',
          'fill-opacity': 0.88
        },
       'layout': {'visibility': 'visible'}
    }, 'road-label-small');


    //Alt 1 Grading
    map.addLayer({
        'id': 'ALT1GRADING',
        'type': 'line',
        'source': 'alt1Grading',
        'source-layer': 'NRC_Alt_1_Grading-1dvls8',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': { 
            'line-width': 0.5,
            'line-color': '#FFF140',
            'line-opacity': 0.95
        }
    },'road-label-small');
    


    //Alt 2
    map.addLayer({
        'id': 'ALT2',
        'source': 'alt2',
        'source-layer': 'NRC_Alt_2-39wt3n', 
        'type': 'fill',
        'paint': {
          'fill-color': '#007F25',
          'fill-opacity': 0.88
        },
       'layout': {'visibility': 'none'}
    }, 'road-label-small');


    //Alt 2 Grading
    map.addLayer({
        'id': 'ALT2GRADING',
        'type': 'line',
        'source': 'alt2Grading',
        'source-layer': 'NRC_Alt_2_Grading-9ee2f1',
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': { 
            'line-width': 0.5,
            'line-color': '#FFF140',
            'line-opacity': 0.95
        }
    },'road-label-small');
    
    //Propsed Pond
    map.addLayer({
       'id': 'PROPPOND',
       'source': 'propPond',
       'source-layer': 'NRC_Proposed_Pond-ah0ubm', 
       'type': 'fill',
       'paint': {
         'fill-opacity': 0.99,
         'fill-outline-color': '#333',
         'fill-pattern': 'bluestripe',
       },
      'layout': {'visibility': 'none'}
   }, 'road-label-small');


    //Existing Pond
    map.addLayer({
       'id': 'EXISTINGPOND',
       'source': 'existingPond',
       'source-layer': 'NRC_Existing_Pond-dogwem', 
       'type': 'fill',
       'paint': {
         'fill-opacity': 0.99,
         'fill-outline-color': '#333',
         'fill-pattern': 'bluestripe',

       },
      'layout': {'visibility': 'visible'}
   }, 'road-label-small');






    //Easement 
    map.addLayer({
       'id': 'EASEMENTS',
       'source': 'propEasements',
       'source-layer': 'NRC_Proposed_Easement-9ucmur', 
       'type': 'fill',
       'paint': {
         'fill-color':'#E61856',
         'fill-opacity': 0.5
       },
      'layout': {'visibility': 'visible'}
   }, 'road-label-small');

    //Easement Outline
    map.addLayer({
       'id': 'EASEMENTS_OUTLINE',
       'source': 'propEasements',
       'source-layer': 'NRC_Proposed_Easement-9ucmur', 
       'type': 'line',
       'paint': {
         'line-color': '#d3d3d3',
         'line-opacity': 0.3,
         'line-width': 2
       },
      'layout': {'visibility': 'visible'}
   }, 'road-label-small');



    //Culverts
    map.addLayer({
        'id': 'CULVERTS',
        'source': 'culverts',
        'source-layer': 'NRC_Culvert-7flm2b', 
        'type': 'fill',
        'paint': {
          'fill-color': '#111' 
        },
       'layout': {'visibility': 'none'}
    }, 'road-label-small');




    //Boundary Outline
    map.addLayer({
      'id': 'BOUNDARY_LINE',                               
      'source': 'boundary',
      'source-layer': 'NRC_Boundary_HARN-4q7dsx',     
      'type': 'line',        
      'paint': {
         'line-color': '#161616', 
         'line-opacity': 0.75,
         'line-width': 3.0
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
