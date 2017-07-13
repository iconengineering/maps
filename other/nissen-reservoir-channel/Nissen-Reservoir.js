  //This will not change
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';


//Satellite Steets
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot',
    zoom: 15.7,
    minZoom:11,
    maxZoom:19,
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



//Create Map
map.on('style.load', function () {

  
  map.addSource('contours', {
      'type': 'geojson',
      'data': 'NRC_contour_web.geojson'
  });

  /*map.addSource('mapLabels2', {
      'type': 'geojson',
      'data': 'NRC_MapLabels2.geojson'
  });
  */


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

  map.addSource('alt1Pathway',{
      'type': 'vector',
      'url': 'mapbox://iconeng.25bsa1zf'
  });

  map.addSource('alt2Pathway',{
      'type': 'vector',
      'url': 'mapbox://iconeng.85x3283x'
  });

  map.addSource('mapLabelsLine',{
      'type': 'vector', 
      'url': 'mapbox://iconeng.c7ugcugq'
  });

  map.addSource('mapLabelsPoint',{
    'type': 'vector', 
    'url': 'mapbox://iconeng.d6g7r0p4' 
  });


//Boundary Fill
  map.addLayer({
      'id': 'BOUNDARY',                               
      'source': 'boundary',
      'source-layer': 'NRC_Boundary_HARN-4q7dsx',     
      'type': 'fill',        
      'paint': {
         'fill-color': '#161616', 
         'fill-opacity': 0.1
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
          'line-width': {
              "stops": [[15, 0.4], [17, .7], [19, 1.2]]
          },
            'line-color': '#323232',
            'line-opacity':.70
        }
    }, 'road-label-small');

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
          'line-width': {
              "stops": [[15, 1], [17, 1.75], [19, 2.5]]
          },
            'line-color': '#323232',
            'line-opacity':.70
        }
    }, 'road-label-small');

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
          "stops": [[15,9],[17,12],[19,14]]
        }
      },
      'paint': {
        'text-color': '#424242',
        'text-halo-color': 'rgba(255,255,255,0.9)',
        'text-halo-width': 1,
        'text-halo-blur': .2
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
        'fill-opacity': 0.63,
        'fill-color': '#254061',
        'fill-outline-color': '#254061',
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
        'fill-opacity': 0.63,
        'fill-outline-color': '#7ca4b3',
        'fill-color': '#7ca4b3'
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
        'fill-opacity': 0.63,
        'fill-outline-color': '#bad9dd',
        'fill-color': '#bad9dd',
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
          'line-color': '#0A2127',
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
         'line-color': '#00876C', 
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
         'circle-color': '#00876C', 
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
         'text-color': '#00876C',
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
         'line-color': '#fff', 
         'line-width': 1.3,
         'line-opacity': 0.75
       },
      'layout': {'visibility': 'visible'}
    },'road-label-small');



    //Alt 1 Banks
    map.addLayer({
        'id': 'ALT1',
        'source': 'alt1',
        'source-layer': 'NRC_Alt_1-8cnnhc', 
        'filter': ['==', 'OBJECTID', 3],
        'type': 'fill',
        'paint': {
          'fill-color': '#00B00B',
          'fill-opacity': 0.65,
        },
       'layout': {'visibility': 'none'}
    }, 'road-label-small');

        //Alt 1 Channel
    map.addLayer({
        'id': 'ALT1_CHANNEL',
        'source': 'alt1',
        'source-layer': 'NRC_Alt_1-8cnnhc', 
        'filter': ['==', 'OBJECTID', 4],
        'type': 'fill',
        'paint': {
          'fill-color': '#003605',
          'fill-opacity': 0.88
        },
       'layout': {'visibility': 'none'}
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
            'line-cap': 'round',
            'visibility': 'none'
        },
        'paint': { 
            'line-width': 0.5,
            'line-color': '#FFF140',
            'line-opacity': 0.95
        }
    },'road-label-small');
    



    //Alt 2 Banks
    map.addLayer({
        'id': 'ALT2',
        'source': 'alt2',
        'source-layer': 'NRC_Alt_2-39wt3n', 
        'filter': ['==', 'OBJECTID', 1],
        'type': 'fill',
        'paint': {
          'fill-color': '#00B00B',
          'fill-opacity': 0.65,
        },
       'layout': {'visibility': 'none'}
    }, 'road-label-small');

        //Alt 2 Channel
    map.addLayer({
        'id': 'ALT2_CHANNEL',
        'source': 'alt2',
        'source-layer': 'NRC_Alt_2-39wt3n', 
        'filter': ['==', 'OBJECTID', 2],
        'type': 'fill',
        'paint': {
          'fill-color': '#003605',
          'fill-opacity': 0.88
        },
       'layout': {'visibility': 'none'}
    }, 'road-label-small');


    //Alt 2 Pathway
    map.addLayer({
        'id': 'ALT2PATHWAY',
        'type': 'line',
        'source': 'alt2Pathway',
        'source-layer': 'NRC_Alt_2_Pathway-cbfkq8',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': 'none'
        },
        'paint': { 
            'line-width': 5,
            'line-color': '#545454',
            'line-opacity': 0.95
        }
    },'road-label-small');




    //Alt 2 Grading
    map.addLayer({
        'id': 'ALT2GRADING',
        'type': 'line',
        'source': 'alt2Grading',
        'source-layer': 'NRC_Alt_2_Grading-9ee2f1',
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': 'none'
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


/*
  map.addLayer({
      'id': 'propPondLabels',
      'type': 'symbol',
      'source': 'propPond',
      'layout': {
          'visibility': 'visible',
        'text-field': 'Existing Pond',
        'text-font': ['Roboto Italic','Open Sans Light','Arial Unicode MS Regular'],
        'text-size': 20
      },
      'paint': {
        'text-color': '#000',
        'text-halo-color': 'rgb(255,255,255)',
        'text-halo-width': 0.75
      }
  }, 'road-label-small');
*/





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
      'layout': {'visibility': 'none'}
   }, 'road-label-small');


/*
  map.addLayer({
      'id': 'existingPondLabels',
      'type': 'symbol',
      'source': 'existingPond',
      'layout': {
          'visibility': 'visible',
        'text-field': 'Existing Pond',
        'text-font': ['Roboto Italic','Open Sans Light','Arial Unicode MS Regular'],
        'text-size': 20
      },
      'paint': {
        'text-color': '#000',
        'text-halo-color': 'rgb(255,255,255)',
        'text-halo-width': 0.75
      }
  }, 'road-label-small');

*/




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
      'layout': {'visibility': 'none'}
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
      'layout': {'visibility': 'none'}
   }, 'road-label-small');


        //Alt 1 Pathway
    map.addLayer({
        'id': 'ALT1PATHWAY',
        'type': 'line',
        'source': 'alt1Pathway',
        'source-layer': 'NRC_Alt_1_Pathway-96xr8v',
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': { 
            'line-width': 5,
            'line-color': '#545454',
            'line-opacity': 0.95
        }
    },'road-label-small');




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




  map.addLayer({
      'id': 'MAPLABELS_POINT',
      'type': 'symbol',
      'source': 'mapLabelsPoint',
      'source-layer': 'NRC_Map_Labels_Cntrd_txtWrap-c51l0y', 
      'filter': ['==', 'Angle', 0],
      'layout': {
         "visibility": 'visible',
         "text-optional": true,
         "text-line-height": 1,
         "text-size": {
             "stops": [[14, 6],[14.5, 7],[15, 8], [15.5, 9], [16, 13], [19, 18]]
         },
         "text-field": "{Name}",
         'text-font': ['Roboto Medium','Open Sans Regular','Arial Unicode MS Regular'],
         'text-allow-overlap': true,
         'symbol-avoid-edges' : true
        }, 
     "paint": {
       "text-color": "rgba(0,0,0,.87)",
       "text-halo-color": "#F8F4F0",
       "text-halo-width": {"stops": [[15,15],[17,25]]}

     }
  });



/*
    map.addLayer({
      'id': 'MAPLABELS_POINT',
      'type': 'symbol',
      'source': 'mapLabelsPoint',
      'source-layer': 'NRC_Map_Labels_Cntrd_txtWrap-c51l0y', 
      'filter': ['==', 'Angle', 0],
      'layout': {
         "visibility": 'visible',
         "text-optional": true,
         "text-line-height": 1,
         "text-size": {
             "stops": [[14, 6],[14.5, 7],[15, 8], [15.5, 9], [16, 13], [19, 18]]
         },
         "text-field": {
            property: 'txtWrp',
            type: 'categorical',
            stops: [
              ['1','{Name}']
              ]
            },
         'text-font': ['Roboto Medium','Open Sans Regular','Arial Unicode MS Regular'],
         'text-allow-overlap': true,
         'symbol-avoid-edges' : true
        }, 
     "paint": {
       "text-color": "rgba(0,0,0,.87)",
       "text-halo-color": "#F8F4F0",
       "text-halo-width": {"stops": [[15,15],[17,25]]}

     }
  });
*/


  map.addLayer({
      'id': 'MAPLABELS_LINE',
      'type': 'symbol',
      'source': 'mapLabelsLine',
      'source-layer': 'NRC_Map_Labels_Line-4008jb', 
      'filter': ['==', 'Angle', 90], 
      'layout': {
         "visibility": 'visible',
         "symbol-placement": 'line',
         "text-optional": true,
         "text-line-height": 1,
         "text-size": {
             "stops": [[14, 6],[14.5, 7],[15, 8], [15.5, 9], [16, 13], [19, 18]]
         },
         "text-field": '{Name}',
         'text-font': ['Roboto Medium','Open Sans Regular','Arial Unicode MS Regular'],

     },
     "paint": {
       "text-color": "rgba(0,0,0,.87)",
       "text-halo-color": "#F8F4F0",
       "text-halo-width": {"stops": [[15,15],[17,25]]}

     }
  });


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
        map.setLayoutProperty('ALT1_CHANNEL','visibility', 'none');
        map.setLayoutProperty('ALT2_CHANNEL','visibility', 'none');
        map.setLayoutProperty('ALT1GRADING','visibility', 'none');
        map.setLayoutProperty('ALT2GRADING','visibility', 'none');
        map.setLayoutProperty('ALT1PATHWAY','visibility', 'none');
        map.setLayoutProperty('ALT2PATHWAY','visibility', 'none');
        map.setLayoutProperty('EASEMENTS','visibility', 'none');
        map.setLayoutProperty('EASEMENTS_OUTLINE','visibility', 'none');
        map.setLayoutProperty('PROPPOND','visibility', 'none');
        map.setLayoutProperty('EXISTINGPOND','visibility', 'none');
        map.setLayoutProperty('CULVERTS','visibility', 'none');
        //map.setLayoutProperty('MAPLABELS','visibility', 'none');

    });
});


map.addControl(new mapboxgl.NavigationControl(), 'top-right');
