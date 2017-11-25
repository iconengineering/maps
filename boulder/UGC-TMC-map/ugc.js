  //This will not change
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';


//Dark Canvas
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cihxv74vo00oynpm48wsujwo3',
    zoom: 14.45,
    //minZoom:11,
   // maxZoom:19.5,
    hash: true,
    center: [-105.2780,40.0329] 
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

    map.addSource('flood_extents', {          //2014 Flood Extents (FMC and UGC)
      'type': 'vector',
      'url': 'mapbox://iconeng.2a24k4y2'      //COB_Urban_Flood_Extents_2014_-02yrb6
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

    
    //Daylight Opp
    map.addSource('dayLightOpp', {
      'type': 'vector',
      'url': 'mapbox://iconeng.6sgvzcya'   //SBK2_DaylightOpp-bdr7do    
    }); 

    //Prop Trial
    map.addSource('propTrails', {
      'type': 'vector',
      'url': 'mapbox://iconeng.cszraife'   //SBK2_ProposedTrails-88pol2  
    }); 

    //Envir Restoration Area
    map.addSource('restorArea', {
      'type': 'vector',
      'url': 'mapbox://iconeng.45j481w2'  //SBK2_EnviroRestorationArea-ae49du     
    });  




//++++++++++++++++++++++++++++++++ ADD LAYER +++++++++++++++++++++++++++++++++++++


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
            "stops": [[15, 1.3], [17, 2.2], [19, 3]]
        },
     // 'line-opacity': {
     //"stops": [[16, 0.7],[19, 1]] },
        
          'line-color': '#C8F2C8'
      }
    }, 'road-label-small');

        //5- ft  
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
     //  'line-opacity': {
    //        "stops": [[16, 0.7],[19, 1]] },
       
          'line-color': '#C8F2C8'
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
          'fill-color': '#C457E0',
          'fill-outline-color': '#C457E0',
         'fill-opacity': 0.5
      }
    }, 'road-label-small');


    //Parcels
    map.addLayer({
      'id': 'parcels',                               
      'source': 'parcel',
      'source-layer': 'UGC_parcel-04pgif',     
      'type': 'line',        
      'paint': {
         'line-color': '#FFE29D', 
         'line-width': 0.85,
         'line-opacity': 0.9
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
         'line-color': '#96D400', 
         'line-width': 2.6,
         'line-opacity': 0.7,
         'line-dasharray': [3, 1.5],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');


  map.addLayer({
       'id': 'sanLabels',
       'type': 'symbol',                                
       'source': 'san',
       'source-layer': 'UGC_SAN-6zo1fw',
       'layout': {
         'visibility': 'none',
         'symbol-placement': 'line',
         'text-field': 'SAN',
         'text-font': ['Open Sans Bold','Arial Unicode MS Regular'],
         'text-size': 12,
          },
       'paint': {
         'text-opacity': 0.75,
         'text-color': '#96D400',
         'text-halo-color': 'rgb(250,250,250 )',
         'text-halo-width': 0.7
        }
    },'road-label-small');


//Green Restoration Area
    map.addLayer({
    id: 'restorArea',
    source: 'restorArea',
    'source-layer': 'SBK2_EnviroRestorationArea-ae49du', 
    type: 'fill',
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.6,
        'fill-color': '#22BA61',
        'fill-outline-color': '#22BA61'
    }
  }, 'road-label-small');

    

    //Prop trails
    map.addLayer({
      'id': 'propTrails',                               
      'source': 'propTrails',
      'source-layer': 'SBK2_ProposedTrails-88pol2',     
      'type': 'line',        
      'paint': {
         'line-width': 3,
         'line-color': '#22BA61', 
         'line-opacity': 0.9,
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');


    //Daylight Opp
    map.addLayer({
      'id': 'dayLightOpp',                               
      'source': 'dayLightOpp',
      'source-layer': 'SBK2_DaylightOpp-bdr7do',     
      'type': 'line',        
      'paint': {
         'line-width': 3,
         'line-color': '#22BA61', 
         'line-opacity': 0.9,
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
         'line-color': '#00FDD9', 
         'line-opacity': 0.7,
         'line-dasharray': [3, 1.5],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');

  map.addLayer({
       'id': 'wtrLabels',
       'type': 'symbol',                                
       'source': 'wtr',
       'source-layer': 'UGC_water-aqbp8r',
       'layout': {
         'visibility': 'none',
         'symbol-placement': 'line',
         'text-field': 'WTR',
         'text-font': ['Open Sans Bold','Arial Unicode MS Regular'],
         'text-size': 12,
          },
       'paint': {
         'text-opacity': 0.75,
         'text-color': '#00FDD9',
         'text-halo-color': 'rgb(250,250,250 )',
         'text-halo-width': 0.7
        }
    },'road-label-small');


    //Storm
    map.addLayer({
      'id': 'storm',                               
      'source': 'storm',
      'source-layer': 'UGC_storm-916fqn',     
      'type': 'line',        
      'paint': {
         'line-color': '#004AFD', 
         'line-width': 2.6,
        'line-opacity': 0.7,
        'line-dasharray': [3, 1.5],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');


    map.addLayer({
       'id': 'stormLabels',
       'type': 'symbol',                                
       'source': 'storm',
       'source-layer': 'UGC_storm-916fqn',
       'layout': {
         'visibility': 'none',
         'symbol-placement': 'line',
         'text-field': 'STORM',
         'text-font': ['Open Sans Bold','Arial Unicode MS Regular'],
         'text-size': 12,
          },
       'paint': {
         'text-opacity': 0.75,
         'text-color': '#004AFD',
         'text-halo-color': 'rgb(250,250,250 )',
         'text-halo-width': 0.7
        }
    },'road-label-small');

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------------Upper Goose Creek-------------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// ---- UGC PROPOSED GRADING
    map.addLayer({
    id: 'ugc_grading1',
    source: 'ugc_grading_alipine', 
    type: 'line',
    filter: ['!=', 'Type', 'Alpine Detention'],
       layout: {
        'visibility': 'none',
         'line-join': 'round',
         'line-cap': 'round'
       },
        'paint': {
          'line-width': {
               "stops": [[15, 0.25], [17, 0.6], [19, 1]]
          },
          'line-opacity': {
              "stops": [[16, 0.7],[19, 1]]
          },
        'line-color': '#FF0072',
         
      }
   
  }, 'road-label-small');


    map.addLayer({
    id: 'ugc_grading_alpine_det',
    source: 'ugc_grading_alipine', 
    type: 'line',
    filter: ['==', 'Type', 'Alpine Detention'],
    layout: {
      'visibility': 'none',
      'line-join': 'round',
      'line-cap': 'round'
    },
      'paint': {
        'line-width': {
            "stops": [[15, 0.25], [17, 0.75], [19, 1 ]]
        },
        'line-opacity': {
            "stops": [[16, 0.7],[19, 1]]
        },
        'line-color': '#FF00C3',
          
      }
   
  }, 'road-label-small');

    map.addLayer({
    id: 'ugc_grading2',
    source: 'ugc_detention_nBoulderPark',
    type: 'line',
    layout: {
        'visibility': 'none',
         'line-join': 'round',
         'line-cap': 'round'
       },
        'paint': {
          'line-width': {
               "stops": [[15, 0.25], [17, 0.6], [19, 1]]
          },
          'line-opacity': {
              "stops": [[16, 0.7],[19, 1]]
          },
        'line-color': '#FF00C3',
         
      }
   
  }, 'road-label-small');

    map.addLayer({
    id: 'ugc_grading3',
    source: 'ugc_grading',
    type: 'line',
    'layout': {
      'visibility': 'none',
      'line-join': 'round',
      'line-cap': 'round'
    },
      'paint': {
        'line-width': {
            "stops": [[15, 0.25], [17, 0.75], [19, 1 ]]
        },
        'line-opacity': {
            "stops": [[16, 0.7],[19, 1]]
        },
        'line-color': '#FF0072',
          
      }
   
  }, 'road-label-small');





// ----UGC HAZARD ZONES

    //Hi Haz
    map.addLayer({
    id: 'ugc_hiHaz',
    source: 'ugc_high_haz',
    'source-layer': 'UGC_EC_High_Hazard_GooseCreek-4v9vgk',
    type: 'fill',
    layout: {
        'visibility': 'visible'
      },
    paint: {
        'fill-opacity': 0.5,
        'fill-color': '#DC0714',
        'fill-outline-color': '#DC0714'
    }
  }, 'road-label-small');

    //Zone X
    map.addLayer({
    id: 'ugc_zone_x',
    source: 'ugc_zone_x',
    'source-layer': 'UGC_EC_Zone_X_GooseCreek-0sirpr',
    type: 'fill',
    layout: {
        'visibility': 'visible'
      },
    paint: {
        'fill-opacity': 0.5,
        'fill-color': '#FFA540',
        'fill-outline-color': '#FFA540'
    }
  }, 'road-label-small');


    //Conveyence - outline
    map.addLayer({
    id: 'ugc_fw',
    source: 'ugc_fw',
    'source-layer': 'UGC_EC_Conveyance_Zone_GooseC-6icxv5',
    type: 'line',
    layout: {
        'visibility': 'visible',
        'line-join': 'miter',
        'line-cap': 'butt'
      },
    paint: {
        'line-color': '#FFE642',
        'line-width': {
              "stops": [[15, 1.3], [17, 2.5], [19, 4]]
        },

    }
  }, 'road-label-small');


    //100-Yr - outline
    map.addLayer({
    id: 'ugc_100yr',
    source: 'ugc_100yr',
    'source-layer': 'UGC_EC_1_PCT_ANNUAL_CHANCE_FL-3ouelt',
    type: 'line',
    layout: {
        'visibility': 'visible',
        'line-join': 'miter',
        'line-cap': 'butt'
      },
    paint: {
        'line-color': '#0034D9',
        'line-width': {
              "stops": [[15, 1.1], [17, 2], [19, 4]]
        },

    }
  }, 'road-label-small');


    //2013 Flood Extents (TMC and UGC)
    map.addLayer({
    id: 'flood_extents',
    source: 'flood_extents',
    'source-layer': 'COB_Urban_Flood_Extents_2014_-02yrb6',
    type: 'fill',
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 1,
        'fill-pattern': 'bluestripe',
        'fill-outline-color': '#00BCD4'
    }
  }, 'road-label-small'); 




// ----UGC Hydrology     
    
    //Flow Path
    map.addLayer({
    id: 'ugc_centerline',
    source: 'ugc_centerline',
    'source-layer': 'UGC_EC_Centerline_GooseCreek-bdao6q',
    type: 'line',
    layout: {
        'visibility': 'none',
        'line-join': 'miter',
        'line-cap': 'butt'
      },
    paint: {
        'line-color': '#08D6FF',
        'line-width': {
              "stops": [[15, 1.3], [17, 2.5], [19, 4]]
        },

    }
  }, 'road-label-small');


    //XS
    map.addLayer({
    id: 'ugc_xs',
    source: 'ugc_xs',
    'source-layer': 'UGC_EC_Cross_Sections_GooseCr-cm3ba9',
    type: 'line',
    layout: {
        'visibility': 'none',
        'line-join': 'miter',
        'line-cap': 'butt'
      },
    paint: {
        'line-color': '#08FA47',
        'line-width': {
              "stops": [[15, 1.3], [17, 2.5], [19, 4]]
        },

    }
  }, 'road-label-small');



    //XS labels
    map.addLayer({
      'id': 'ugc_xs_labels',
      'type': 'symbol',
      'source': 'ugc_xs',
      'source-layer': 'UGC_EC_Cross_Sections_GooseCr-cm3ba9',
      'layout': {
          'visibility': 'none',
        'symbol-placement': 'line',
        'text-field': '{ProfileM}',
        'text-font': ['Roboto Light Italic','Open Sans Light','Arial Unicode MS Regular'],
        'text-size': {
          "stops": [[15,11],[17,12],[19,14]]
        }
      },
      'paint': {
        'text-color': '#08FA47',
        'text-halo-color': 'rgba(20,20,20,0.9)',
        'text-halo-width': 2,
        'text-halo-blur': 0.5
      }
     }, 'road-label-small');




    //Gutterline
    map.addLayer({
    id: 'ugc_gutter_line',
    source: 'ugc_gutter_line',
    'source-layer': 'UGC_EC_Gutter_Line_GooseCreek-6fpike',
    type: 'line',
    layout: {
        'visibility': 'none',
        'line-join': 'miter',
        'line-cap': 'butt'
      },
    paint: {
        'line-color': '#FF9800',
        'line-width': {
              "stops": [[15, 1.3], [17, 2.5], [19, 4]]
        },

    }
  }, 'road-label-small');


    
 


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------------Twomile Canyon Creek----------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// TMC PROPOSED GRADING

    map.addLayer({
    id: 'tmc_grading1',
    source: 'tmc_grading_mnr',
    type: 'line',
    'layout': {
      'visibility': 'none',
      'line-join': 'round',
      'line-cap': 'round'
    },
      'paint': {
        'line-width': {
            "stops": [[15, 0.25], [17, 0.75], [19, 1 ]]
        },
        'line-opacity': {
            "stops": [[16, 0.7],[19, 1]]
        },
        'line-color': '#FF0072',
          
      }
   
  }, 'road-label-small');

    map.addLayer({
    id: 'tmc_grading2',
    source: 'tmc_grading_mjr',
        type: 'line',
    'layout': {
      'visibility': 'none',
      'line-join': 'round',
      'line-cap': 'round'
    },
      'paint': {
        'line-width': {
            "stops": [[15, 0.3], [17, 0.8], [19, 1.3]]
        },
        'line-opacity': {
            "stops": [[16, 0.7],[19, 1]]
        },
        'line-color': '#FF0072',
          
      }
   
  }, 'road-label-small');



    map.addLayer({
    id: 'tmc_grading3',
    source: 'tmc_detention_springValley',
    type: 'line',
    layout: {
        'visibility': 'none',
         'line-join': 'round',
         'line-cap': 'round'
       },
        'paint': {
          'line-width': {
              "stops": [[15, 0.25], [17, 0.6], [19, 1 ]]
          },
          'line-opacity': {
              "stops": [[16, 0.7],[19, 1]]
          },
        'line-color': '#FF00C3',
         
      }
   
  }, 'road-label-small');



    map.addLayer({
    id: 'tmc_grading4',
    source: 'tmc_grading_Iris',
    type: 'line',
    'layout': {
      'visibility': 'none',
      'line-join': 'round',
      'line-cap': 'round'
    },
      'paint': {
        'line-width': {
            "stops": [[15, 0.25], [17, 0.75], [19, 1 ]]
        },
        'line-opacity': {
            "stops": [[16, 0.7],[19, 1]]
        },
        'line-color': '#FF0072',
          
      }
   
  }, 'road-label-small');



// --- TMC HAZARD ZONES

    //Zone AO - 2ft
    map.addLayer({
    id: 'tmc_zone_ao_2',
    source: 'tmc_zone_ao_2',
    'source-layer': 'UGC_EC_Zone_AO_2_Foot_Twomile-awnxb5',
    type: 'fill',
    layout: {
        'visibility': 'visible'
      },
    paint: {
        'fill-opacity': 0.5,
        'fill-color': '#7FEAFF',
        'fill-outline-color': '#7FEAFF' 
    }
  }, 'road-label-small');


    //Zone AO - 1ft
    map.addLayer({
    id: 'tmc_zone_ao_1',
    source: 'tmc_zone_ao_1',
    'source-layer': 'UGC_EC_Zone_AO_1_Foot_Twomlil-daw5bx',
    type: 'fill',
    layout: {
        'visibility': 'visible'
      },
    paint: {
        'fill-opacity': 0.5,
        'fill-color': '#316873',
        'fill-outline-color': '#316873'
    }
  }, 'road-label-small');


    //Hi Hazard
    map.addLayer({
    id: 'tmc_hiHaz',
    source: 'tmc_high_haz',
    'source-layer': 'UGC_EC_High_Hazard_TwomileCan-9p8plr', 
    type: 'fill',
    layout: {
        'visibility': 'visible'
      },
    paint: {
        'fill-opacity': 0.5,
        'fill-color': '#DC0714',
        'fill-outline-color': '#DC0714'
    }
  }, 'road-label-small');

    //Zone X
    map.addLayer({
    id: 'tmc_zone_x',
    source: 'tmc_zone_x',
    'source-layer': 'UGC_EC_Zone_X_TwomileCanyonCr-a7xaee',
    type: 'fill',
    layout: {
        'visibility': 'visible'
      },
    paint: {
        'fill-opacity': 0.5,
        'fill-color': '#FFA540',
        'fill-outline-color': '#FFA540'
    }
  }, 'road-label-small');


    //Conveyence - outline
    map.addLayer({
    id: 'tmc_fw',
    source: 'tmc_fw',
    'source-layer': 'UGC_EC_Conveyance_Zone_Twomil-3loygh',
    type: 'line',
    layout: {
        'visibility': 'visible',
        'line-join': 'miter',
        'line-cap': 'butt'
      },
    paint: {
        'line-color': '#FFE642',
        'line-width': {
              "stops": [[15, 1.3], [17, 2.5], [19, 4]]
        },

    }
  }, 'road-label-small');


    //100-Yr - outline
    map.addLayer({
    id: 'tmc_100yr',
    source: 'tmc_100yr',
    'source-layer': 'UGC_EC_1_PCT_ANNUAL_CHANCE_FL-854emf',
    type: 'line',
    layout: {
        'visibility': 'visible',
        'line-join': 'miter',
        'line-cap': 'butt'
      },
    paint: {
        'line-color': '#0034D9',
        'line-width': {
              "stops": [[15, 1.1], [17, 2], [19, 4]]
        },

    }
  }, 'road-label-small');

//-----TMC HYDROLICS



 //Flow Path
    map.addLayer({
    id: 'tmc_centerline',
    source: 'tmc_centerline',
    'source-layer': 'UGC_EC_Centerline_TwomileCany-cemj2e',
    type: 'line',
    layout: {
        'visibility': 'none',
        'line-join': 'miter',
        'line-cap': 'butt'
      },
    paint: {
        'line-color': '#08D6FF',
        'line-width': {
              "stops": [[15, 1.3], [17, 2.5], [19, 4]]
        },

    }
  }, 'road-label-small');


    //XS
    map.addLayer({
    id: 'tmc_xs',
    source: 'tmc_xs',
    'source-layer': 'UGC_EC_Cross_Sections_Twomile-1njxgb',
    type: 'line',
    layout: {
        'visibility': 'none',
        'line-join': 'miter',
        'line-cap': 'butt'
      },
    paint: {
        'line-color': '#08FA47',
        'line-width': {
              "stops": [[15, 1.3], [17, 2.5], [19, 4]]
        },

    }
  }, 'road-label-small');



    //XS labels
    map.addLayer({
      'id': 'tmc_xs_labels',
      'type': 'symbol',
      'source': 'tmc_xs',
      'source-layer': 'UGC_EC_Cross_Sections_Twomile-1njxgb',
      'layout': {
          'visibility': 'none',
        'symbol-placement': 'line',
        'text-field': '{ProfileM}',
        'text-font': ['Roboto Light Italic','Open Sans Light','Arial Unicode MS Regular'],
        'text-size': {
          "stops": [[15,11],[17,12],[19,14]]
        }
      },
      'paint': {
        'text-color': '#08FA47',
        'text-halo-color': 'rgba(20,20,20,0.9)',
        'text-halo-width': 2,
        'text-halo-blur': 0.5
      }
     }, 'road-label-small');




    //Gutterline
    map.addLayer({
    id: 'tmc_gutter_line',
    source: 'tmc_gutter_line',
    'source-layer': 'UGC_EC_Gutter_Line_TwomileCan-26swm6',
    type: 'line',
    layout: {
        'visibility': 'none',
        'line-join': 'miter',
        'line-cap': 'butt'
      },
    paint: {
        'line-color': '#FF9800',
        'line-width': {
              "stops": [[15, 1.3], [17, 2.5], [19, 4]]
        },

    }
  }, 'road-label-small');



/* ATLER FEATURE COLOR BASED ON BASE MAP
    var style = map.getStyle();

    if (style.name != 'Light'){
      map.setLayoutProperty('conduitArrows','icon-image','oneway-spaced-white-small');
      map.setLayoutProperty('conduitCompsArrows','icon-image','oneway-spaced-white-small');
    };

   
*/


});

//defeine clear button for flood haz zones
$(document).ready(function() {
    $("#clear").click(function() {
        var checkBoxes = $("#FloodZones input[type=checkbox]");
        
        
        checkBoxes.prop("checked", false);

        map.setLayoutProperty('tmc_fw','visibility', 'none');
        map.setLayoutProperty('ugc_fw','visibility', 'none');
        map.setLayoutProperty('tmc_100yr','visibility', 'none');
        map.setLayoutProperty('ugc_100yr','visibility', 'none');
        map.setLayoutProperty('tmc_hiHaz','visibility', 'none');
        map.setLayoutProperty('ugc_hiHaz','visibility', 'none');
        map.setLayoutProperty('tmc_zone_ao_1','visibility', 'none');
        map.setLayoutProperty('tmc_zone_ao_2','visibility', 'none');
        map.setLayoutProperty('tmc_zone_x','visibility', 'none');
        map.setLayoutProperty('ugc_zone_x','visibility', 'none');
        map.setLayoutProperty('flood_extents','visibility', 'none');
       });
});


// define clear button for hydo
$(document).ready(function() {
    $("#clear2").click(function() {
        var checkBoxes = $("#HydroID input[type=checkbox]");
        checkBoxes.prop("checked", false);
        map.setLayoutProperty('tmc_centerline','visibility', 'none');
        map.setLayoutProperty('ugc_centerline','visibility', 'none');
        map.setLayoutProperty('tmc_xs','visibility', 'none');
        map.setLayoutProperty('ugc_xs','visibility', 'none');
        map.setLayoutProperty('tmc_xs_labels','visibility', 'none');
        map.setLayoutProperty('ugc_xs_labels','visibility', 'none');
        map.setLayoutProperty('tmc_gutter_line','visibility', 'none');
        map.setLayoutProperty('ugc_gutter_line','visibility', 'none');
       });
});



// When a click event occurs near the feature open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (k) {
  var featureList = map.queryRenderedFeatures(k.point, { layers: ['storm'] });
  if (!featureList.length) {
      return;
  }

  var feature = featureList[0];

        var popup = new mapboxgl.Popup()
            .setLngLat(k.lngLat)
            .setHTML('DIAMETER: ' + feature.properties.DIAMETER + ' in'+ '</b> <br />' +
                     'LENGTH: ' + feature.properties.LENGTH + ' ft' + '<br />' +
                     'MATERIAL: ' + feature.properties.MATERIAL)
            .addTo(map);
    });

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (k) {
    var featureList = map.queryRenderedFeatures(k.point, { layers: ['storm'] });
    map.getCanvas().style.cursor = (featureList.length) ? 'pointer' : '';
});



map.addControl(new mapboxgl.NavigationControl(), 'top-right');
