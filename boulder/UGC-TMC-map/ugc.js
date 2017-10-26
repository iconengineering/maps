  //This will not change
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';


//Satellite Steets
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot',
    zoom: 13.27,
    //minZoom:11,
   // maxZoom:19.5,
    hash: true,
    center: [-105.2872,40.0328]
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




map.on('style.load', function () {

//++++++++++++++++++++++++++++++ ADD SOURCE +++++++++++++++++++++++++++++++++++++

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------------Upper Goose Creek-------------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // channel grading (proposed improvements)
    map.addSource('ugc_grading_alipine', {    //existing? as filler
      type: 'geojson',
      data: 'UGC_Alipine_Channel.geojson'
    });

    map.addSource('ugc_grading', {            //existing? as filler
      type: 'geojson',
      data: 'UGC_Existing_Flow_Channel_5yr.geojson'
    });

    //detention grading (proposed improvements)
    map.addSource('ugc_detention_nBoulderPark', {
      type: 'geojson',
      data: 'UGC_NorthBoulderPark.geojson'
    });




    // Flood Hazard Zones
    map.addSource('ugc_zone_x', {           //zone x
      'type': 'vector',
      'url': 'mapbox://iconeng.8k4rn7z1'    //UGC_EC_Zone_X_GooseCreek-0sirpr
    }); 

    map.addSource('ugc_high_haz', {         //zone high hazard
      'type': 'vector',
      'url': 'mapbox://iconeng.4b5837g1'    //UGC_EC_High_Hazard_GooseCreek-4v9vgk
    });

    map.addSource('ugc_fw', {                //zone fw
      'type': 'vector',
      'url': 'mapbox://iconeng.a6wvclmi'     //UGC_EC_Conveyance_Zone_GooseC-6icxv5
    }); 

    map.addSource('ugc_100yr', {              //zone 100-yr
      'type': 'vector',
      'url': 'mapbox://iconeng.52y4st9y'      //UGC_EC_1_PCT_ANNUAL_CHANCE_FL-3ouelt
    }); 



    


    //Hyrdo
    map.addSource('ugc_gutter_line', {      // gutter line  
      'type': 'vector',
      'url': 'mapbox://iconeng.ce0eywqp'    //UGC_EC_Gutter_Line_GooseCreek-6fpike
    }); 

    map.addSource('ugc_xs', {               // Xs
      'type': 'vector',
      'url': 'mapbox://iconeng.4maa37la'    //UGC_EC_Cross_Sections_GooseCr-cm3ba9
    }); 
    
    map.addSource('ugc_centerline', {        // CL
      'type': 'vector',
      'url': 'mapbox://iconeng.47q75gvg'     //UGC_EC_Centerline_GooseCreek-bdao6q
    });



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------------Twomile Canyon Creek----------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    // channel grading (proposed improvements)
    map.addSource('tmc_grading_mnr', {
      type: 'geojson',
      data: 'UGC_Twomile_to_Goose_Grading15ft_Index1ft.geojson'
    });

    map.addSource('tmc_grading_mjr', {
      type: 'geojson',
      data: 'UGC_Twomile_to_Goose_Grading15ft_Index5ft.geojson'
    });

    map.addSource('tmc_grading_Iris', {
      type: 'geojson',
      data: 'UGC_Twomile_to_Iris_Grading10ft.geojson'
    });

    //detention grading (proposed improvements)
    map.addSource('tmc_detention_springValley', {
      type: 'geojson',
      data: 'UGC_SpringValleyDrive.geojson'
    });




    // Flood Hazard Zones
    map.addSource('tmc_zone_x', {             //zone X
      'type': 'vector',
      'url': 'mapbox://iconeng.b49xz615'      //UGC_EC_Zone_X_TwomileCanyonCr-a7xaee
    }); 

    map.addSource('tmc_zone_ao_2', {          //zone AO 2ft
      'type': 'vector',
      'url': 'mapbox://iconeng.dk6qydrd'      //UGC_EC_Zone_AO_2_Foot_Twomile-awnxb5
    });     

    map.addSource('tmc_zone_ao_1', {          //zone AO 1ft
      'type': 'vector',
      'url': 'mapbox://iconeng.baz0zb3f'      //UGC_EC_Zone_AO_1_Foot_Twomlil-daw5bx
    }); 

    map.addSource('tmc_high_haz', {           //zone high hazard
      'type': 'vector',
      'url': 'mapbox://iconeng.afag99f9'       //UGC_EC_High_Hazard_TwomileCan-9p8plr
    }); 

    map.addSource('tmc_fw', {                  //zone fw
      'type': 'vector',
      'url': 'mapbox://iconeng.9x2ig90m'       //UGC_EC_Conveyance_Zone_Twomil-3loygh
    }); 

    map.addSource('tmc_100yr', {                //zone 100-yr
      'type': 'vector',
      'url': 'mapbox://iconeng.4lyvpj2e'        //UGC_EC_1_PCT_ANNUAL_CHANCE_FL-854emf
    }); 




    //Hyrdo
    map.addSource('tmc_gutter_line', {      //gutter line   
      'type': 'vector',
      'url': 'mapbox://iconeng.d40memq4'    //UGC_EC_Gutter_Line_TwomileCan-26swm6
    }); 

    map.addSource('tmc_xs', {               // Xs
      'type': 'vector',
      'url': 'mapbox://iconeng.7sgrcy8l'    //UGC_EC_Cross_Sections_Twomile-1njxgb
    }); 

    map.addSource('tmc_centerline', {        //CL
      'type': 'vector',
      'url': 'mapbox://iconeng.2kvztkbd'     //UGC_EC_Centerline_TwomileCany-cemj2e
    });


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-----------------------------------Base Layers----------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    map.addSource('contours', {
        type: 'geojson',
        data: 'contour_index_10.geojson'
    });

    map.addSource('contours5', {
        type: 'geojson',
        data: 'contour_index_5.geojson'
    });

    map.addSource('structures', {
        type: 'vector',
        url: 'mapbox://iconeng.4ifywpjt'      //UGC_bldg-3a2hci 
    });
 
    map.addSource('parcel', {
        type: 'vector',
        url: 'mapbox://iconeng.9oi8eiqd'      //UGC_parcel-04pgif
    });

    //Utilities
    map.addSource('san', {
      'type': 'vector',
      'url': 'mapbox://iconeng.a8ul59gn'      //UGC_SAN-6zo1fw
    }); 

    map.addSource('wtr', {
      'type': 'vector',
      'url': 'mapbox://iconeng.9c7pmyjc'    //UGC_water-aqbp8r
    }); 

    map.addSource('storm', {
      'type': 'vector',
      'url': 'mapbox://iconeng.2txip00n'     //UGC_storm-916fqn
    }); 

    




//++++++++++++++++++++++++++++++++ ADD LAYER +++++++++++++++++++++++++++++++++++++

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------------Upper Goose Creek-------------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 /* map.addLayer({
    id: 'ugc_100yr',
    source: 'ugc_100yr',
    type: 'fill',
    paint: {
        'fill-opacity': 0.75,
        'fill-color': '#2a5674',
        'fill-outline-color': '#2a5674'
    }
  }, 'road-label-small');

*/

    map.addLayer({
    id: 'ugc_grading1',
    source: 'ugc_grading_alipine', 
    type: 'line',
    layout: {'visibility': 'visible'},
         'paint': {
          'line-width': 0.5,
          'line-color': '#0B8074',
          
      }
   
  }, 'road-label-small');

    map.addLayer({
    id: 'ugc_grading2',
    source: 'ugc_detention_nBoulderPark',
    type: 'line',
    layout: {'visibility': 'visible'},
         'paint': {
          'line-width': 0.5,
          'line-color': '#0B8074',
         
      }
   
  }, 'road-label-small');


    map.addLayer({
    id: 'ugc_grading3',
    source: 'ugc_grading',
    type: 'line',
    layout: {'visibility': 'visible'},
         'paint': {
          'line-width': 0.5,
          'line-color': '#0B8074',
         
      }
   
  }, 'road-label-small');









//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------------Twomile Canyon Creek----------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 /* map.addLayer({
    id: 'tmc_100yr',
    source: 'tmc_100yr',
    type: 'fill',
    layout: {'visibility': 'none'},
    paint: {
        'fill-opacity': 0.75,
        'fill-color': '#2a5674',
        'fill-outline-color': '#2a5674'
    }
  }, 'road-label-small');
*/



    map.addLayer({
    id: 'tmc_grading1',
    source: 'tmc_grading_mnr',
    type: 'line',
    layout: {'visibility': 'visible'},
         'paint': {
          'line-width': 0.5,
          'line-color': '#036180',
          
      }
   
  }, 'road-label-small');

    map.addLayer({
    id: 'tmc_grading2',
    source: 'tmc_grading_mjr',
    type: 'line',
    layout: {'visibility': 'visible'},
         'paint': {
          'line-width': 0.5,
          'line-color': '#036180',
         
      }
   
  }, 'road-label-small');


    map.addLayer({
    id: 'tmc_grading3',
    source: 'tmc_detention_springValley',
    type: 'line',
    layout: {'visibility': 'visible'},
         'paint': {
          'line-width': 0.5,
          'line-color': '#036180',
         
      }
   
  }, 'road-label-small');



    map.addLayer({
    id: 'tmc_grading4',
    source: 'tmc_grading_Iris',
    type: 'line',
    layout: {'visibility': 'none'},
         'paint': {
          'line-width': 0.5,
          'line-color': '#036180',
         
      }
   
  }, 'road-label-small');




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-----------------------------------Base Layers----------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    
    //10- ft  
    map.addLayer({
      'id': 'majorContour',
      'type': 'line',
      'source': 'contours',
      'layout': {
          'visibility': 'none',
          'line-join': 'round',
          'line-cap': 'round'   
      },
      'paint': {
        'line-width': {
            "stops": [[15, 1], [17, 1.75], [19, 2.5]]
        },
      'line-opacity': {
     "stops": [[16, 0.7],[19, 1]] },
        
          'line-color': '#424242'
      }
    }, 'road-label-small');

        //10- ft  
    map.addLayer({
      'id': 'minorContour',
      'type': 'line',
      'source': 'contours5',
      'layout': {
          'visibility': 'none',
          'line-join': 'round',
          'line-cap': 'round'   
      },
      'paint': {
        'line-width': {
            "stops": [[15, 1], [17, 1.75], [19, 2.5]]
        },
      'line-opacity': {
     "stops": [[16, 0.7],[19, 1]] },
        
          'line-color': '#424242'
      }
    }, 'road-label-small');
  
  


/*
    //Major contours     
    map.addLayer({
      'id': 'majorContour',
      'type': 'line',
      'source': 'contours',
      'filter': ['==', 'Index', '5'],
      'layout': {
          'visibility': 'none',
          'line-join': 'round',
          'line-cap': 'round'   
      },
      'paint': {
        'line-width': {
            "stops": [[15, 1], [17, 1.75], [19, 2.5]]
        },
      'line-opacity': {
     "stops": [[16, 0.7],[19, 1]] },
        
          'line-color': '#424242'
      }
    }, 'road-label-small');
  
    //Minor contours   
    map.addLayer({
      'id': 'minorContour',
      'type': 'line',
      'source': 'contours',
      'filter': ['==', 'Index', '1'],
      'layout': {
          'visibility': 'none',
          'line-join': 'round',
          'line-cap': 'round'
      },
      'paint': {
        'line-width': {
            "stops": [[15, 0], [17, .5], [19, 1]]
        },
       'line-opacity': {
            "stops": [[16, 0.7],[19, 1]] },
       
          'line-color': '#424242'
      }
    }, 'road-label-small');


*/
  
    //contour labels
    map.addLayer({
      'id': 'contourLabels',
      'type': 'symbol',
      'source': 'contours',
    //  'filter': ['==', 'Index', '5'],
      'layout': {
          'visibility': 'none',
        'symbol-placement': 'line',
        'text-field': '{Label}',
        'text-font': ['Roboto Light Italic','Open Sans Light','Arial Unicode MS Regular'],
        'text-size': {
          "stops": [[15,9],[17,11],[19,12]]
        }
      },
      'paint': {
        'text-color': '#424242',
        'text-halo-color': 'rgba(255,255,235,0.9)',
        'text-halo-width': 2,
        'text-halo-blur': 0.5
      }
     }, 'road-label-small');



    //buildings
    map.addLayer({
      'id': 'struct',
      'source': 'structures',
      'source-layer': 'UGC_bldg-3a2hci',  
      'layout': {'visibility': 'none'},
      'type': 'fill',
      'paint': {
          'fill-color': '#EDE400',
          'fill-outline-color': '#EDE400',
         'fill-opacity': 0.3
      }
    }, 'road-label-small');


    //Parcels
    map.addLayer({
      'id': 'parcels',                               
      'source': 'parcel',
      'source-layer': 'UGC_parcel-04pgif',     
      'type': 'line',        
      'paint': {
         'line-color': '#fff', 
         'line-width': 1.4,
         'line-opacity': 0.5
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');


    //san
    map.addLayer({
      'id': 'san',                               
      'source': 'san',
      'source-layer': 'UGC_SAN-6zo1fw',     
      'type': 'line',        
      'paint': {
         'line-color': '#00876C', 
         'line-width': 2.6,
         'line-opacity': 0.4
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');



    //wtr
    map.addLayer({
      'id': 'wtr',                               
      'source': 'wtr',
      'source-layer': 'UGC_water-aqbp8r',     
      'type': 'line',        
      'paint': {
         'line-width': 2.6,
         'line-color': '#7A0050', 
         'line-opacity': 0.4
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');



    //Storm
    map.addLayer({
      'id': 'storm',                               
      'source': 'storm',
      'source-layer': 'UGC_storm-916fqn',     
      'type': 'line',        
      'paint': {
         'line-color': '#FD6E2C', 
         'line-width': 2.6,
        'line-opacity': 0.4
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');



   


/*

  map.addLayer({
    id: '500yr',
    source: 'floodZones',
    type: 'fill',
    filter: ['==', 'FldZone', '500yr'],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#7ebdc5',
        'fill-outline-color': '#61a4b3'
    }
  }, 'road-label-small');

  map.addLayer({
    id: '100yr',
    source: 'floodZones',
    type: 'fill',
    filter: ['==', 'FldZone', '100yr'],
    paint: {
        'fill-opacity': 0.75,
        'fill-color': '#2a5674',
        'fill-outline-color': '#2a5674'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'AO',
    source: 'floodZones',
    type: 'fill',
    filter: ['in', 'FldZone', 'AO1','AO2'],
    paint: {
        'fill-opacity': 0.75,
        'fill-color': '#1976D2',
        'fill-outline-color': '#1976D2'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'HHZ',
    source: 'floodZones',
    type: 'fill',
    filter: ['==', 'FldZone', 'HHZ'],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#FF5252',
        'fill-outline-color': '#FF5252'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'structures2d',
    source: 'structures',
    type: 'fill',
    filter: ['==', 'study', '2D'],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#311B92',
        'fill-outline-color': '#311B92'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'structures1d',
    source: 'structures',
    type: 'fill',
    filter: ['==', 'study', '1D'],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#9C27B0',
        'fill-outline-color': '#9C27B0'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'structuresHHZ',
    source: 'structures',
    type: 'fill',
    filter: ['==', 'study', 'HHZ'],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#000',
        'fill-outline-color': '#000'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'hazus',
    source: 'hazus',
    type: 'circle',
    filter: ['>=','Depth_FT', 0],
    layout: {
      'visibility': 'none'
    },
    paint: {
        "circle-opacity": .75,
        "circle-radius": { "stops": [ [11,.5],[15,2],[19,5] ] },
        "circle-color": "#d50000"
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'conveyance',
    source: 'floodZones',
    type: 'fill',
    filter: ['==', 'FldZone', 'Conveyance'],
    paint: {
        'fill-pattern': 'yellowhatch',
        'fill-opacity': 0
    }
  }, 'road-label-small');

  map.addLayer({
      'id': 'floodExtents',
      'type': 'fill',
      'source': 'floodExtents',
      'paint': {
          'fill-pattern': 'bluestripe',
          'fill-opacity': 0
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'centerlines',
      'type': 'line',
      'source': 'centerlines',
      'paint': {
          'line-width': 1,
          'line-color': '#036180',
          'line-opacity': 1
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'sdMain',
      'type': 'line',
      'source': 'sdMain',
      'layout': {
        'visibility': 'none'
      },
      'paint': {
          'line-width': 3,
          'line-color': '#C6FF00',
          'line-opacity': 1
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'stormDrains',
      'type': 'line',
      'source': 'stormDrains',
      'layout': {
        'visibility': 'none'
      },
      'paint': {
          'line-width': 3,
          'line-color': '#FF9800',
          'line-opacity': 1
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'centerlineLabels',
      'type': 'symbol',
      'source': 'centerlines',
      'layout': {
        "text-optional": true,
        'symbol-placement': 'line',
        'symbol-spacing': 200,
        'text-field': '{RiverCode}',
        'text-font': ['Roboto Italic','Open Sans Regular','Arial Unicode MS Regular'],
        'text-size': 7,
        "text-padding": 100,
      },
      'paint': {
        'text-color': '#F8F4F0',
        'text-halo-color': '#036180',
        'text-halo-width': 1,
        'text-opacity': 1
      }
  });

  map.addLayer({
    id: 'culvert2017',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 2017],['==', 'Improvemen', 'Culvert']],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#333',
        'fill-outline-color': '#333'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'detention2017',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 2017],['==', 'Improvemen', 'Detention']],
    paint: {
        'fill-opacity': 0,
        'fill-color': 'maroon',
        'fill-outline-color': 'maroon'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'openChannel2017',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 2017],['==', 'Improvemen', 'Open Channel']],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#64DD17',
        'fill-outline-color': '#64DD17'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'stormDrain2017',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 2017],['==', 'Improvemen', 'Storm Drain']],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#FF3D00',
        'fill-outline-color': '#FF3D00'
    }
  }, 'road-label-small');

  map.addLayer({
    id: 'conveyance2017',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 2017],['==', 'Improvemen', 'Roadway Conveyance']],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#F50057',
        'fill-outline-color': '#F50057'
    }
  }, 'road-label-small');


  map.addLayer({
    id: 'culvert1987',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 1987],['==', 'Improvemen', 'Culvert']],
    layout: {
      'visibility': 'none'
    },
    paint: {
        'fill-color': '#333',
        'fill-outline-color': '#333',
        'fill-opacity': .75
    }
  }, 'road-label-small');


  map.addLayer({
    id: 'openChannel1987',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 1987],['==', 'Improvemen', 'Open Channel']],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#64DD17',
        'fill-outline-color': '#64DD17'
    }
  }, 'road-label-small');


  map.addLayer({
    id: 'culvert1969',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 1969],['==', 'Improvemen', 'Culvert']],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#333',
        'fill-outline-color': '#333'
    }
  }, 'road-label-small');


  map.addLayer({
    id: 'detention1969',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 1969],['==', 'Improvemen', 'Detention']],
    paint: {
        'fill-opacity': 0,
        'fill-color': 'maroon',
        'fill-outline-color': 'maroon'
    }
  }, 'road-label-small');


  map.addLayer({
    id: 'openChannel1969',
    source: 'improvements',
    type: 'fill',
    filter: ['all', ['==', 'Id', 1969],['==', 'Improvemen', 'Open Channel']],
    paint: {
        'fill-opacity': 0,
        'fill-color': '#64DD17',
        'fill-outline-color': '#64DD17'
    }
  }, 'road-label-small');

});

map.on('click', function (e) {
  var bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
  var features = map.queryRenderedFeatures(bbox, { layers: ['hazus','stormDrains','sdMain','culvert1987','openChannel1987'] });
  if (!features.length) {
      return;
  }

  var feature = features[0];
  var id = feature.layer.id;

  var div = document.createElement('div');
  div.className = 'row';
  var col = document.createElement('div');
  col.className = "col s12";
  div.insertAdjacentElement('beforeend', col);
  var card = document.createElement('div');
  card.className = 'card blue-grey darken-2';
  col.insertAdjacentElement('beforeend', card);
  var content = document.createElement('div');
  content.className = 'card-content white-text';
  card.insertAdjacentElement('beforeend', content);

  if (id == 'hazus') {

    var loss = feature.properties.BldgLossUS;
    var depth = feature.properties.Depth_FT;

    var div1 = document.createElement('div');
    var div2 = document.createElement('div');

    div1.innerHTML = 'Building Loss: ' + numeral(loss).format('$0,0');
    div2.innerHTML = 'Depth: ' + depth + '\'';

    content.insertAdjacentElement('beforeend', div1);
    content.insertAdjacentElement('beforeend', div2);

  } else if (id == 'stormDrains' || id == 'sdMain') {

    var diam = feature.properties.DIAMETER;
    var diam2 = feature.properties.DIAMETER2;
    var material = feature.properties.MATERIAL;

    if (diam2 === 0) {
      content.innerHTML = diam + '" ' + material;
    } else {
      content.innerHTML = diam + '" x ' + diam2 + '" ' + material;
    }

  } else if (id == 'culvert1987' || id == 'openChannel1987') {

    var size = feature.properties.Size;
    var interval = feature.properties.Return_Int;
    var capacity = feature.properties.Capacity;

    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    var div3 = document.createElement('div');

    div1.innerHTML = size;
    div2.innerHTML = 'Return Interval: ' + interval;
    div3.innerHTML = 'Capacity: ' + capacity + ' cfs';

    content.insertAdjacentElement('beforeend', div1);
    content.insertAdjacentElement('beforeend', div2);
    content.insertAdjacentElement('beforeend', div3);

  } else {
    return;
  }

  var popup = new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setDOMContent(div)
      .addTo(map);

});

map.on('mousemove', function (e) {
    var bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
    var features = map.queryRenderedFeatures(bbox, { layers: ['hazus','stormDrains','sdMain','culvert1987','openChannel1987'] });

    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

});

*/
});


map.addControl(new mapboxgl.NavigationControl(), 'top-right');
