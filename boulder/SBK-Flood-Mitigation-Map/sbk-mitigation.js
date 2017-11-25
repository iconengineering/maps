  //This will not change
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';


//Dark Canvas
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cihxv74vo00oynpm48wsujwo3',
    zoom: 14.2,
    //minZoom:11,
   // maxZoom:19.5,
    hash: true,
    center: [-105.2577,40.0031] 
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
//-----------------------------------Skunk Mitigation Layers----------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    // channel grading (proposed improvements)
    map.addSource('sbk_grading_alipine', {    //existing? as filler
      type: 'geojson',
      data: 'sbk_Alipine_Channel.geojson'
    });

    map.addSource('sbk_grading', {            //existing? as filler
      type: 'geojson',
      data: 'sbk_Existing_Flow_Channel_5yr.geojson'
    });

    //detention grading (proposed improvements)
    map.addSource('sbk_detention_nBoulderPark', {
      type: 'geojson',
      data: 'sbk_NorthBoulderPark.geojson'
    });




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-----------------------------------Bluebell Mitigation Layers-------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-----------------------------------King Mitigation Layers-----------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-----------------------------------FLOOD ZONE Layers----------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    map.addSource('sbk_zone_x', {           //zone x
      'type': 'vector',
      'url': 'mapbox://iconeng.8dhlixvw'    
    }); 

    map.addSource('sbk_zone_ah', {           //zone ah
      'type': 'vector',
      'url': 'mapbox://iconeng.0tw189ns'    
    }); 

    map.addSource('sbk_high_haz', {         //zone high hazard
      'type': 'vector',
      'url': 'mapbox://iconeng.apcevxze'    
    });

    map.addSource('sbk_fw', {                //zone fw
      'type': 'vector',
      'url': 'mapbox://iconeng.b7vi0g99'     
    }); 

    map.addSource('sbk_100yr', {              //zone 100-yr
      'type': 'vector',
      'url': 'mapbox://iconeng.7rdeogv7'      
    }); 

    map.addSource('flood_extents', {          //2014 Flood Extents CLIPPED
      'type': 'vector',
      'url': 'mapbox://iconeng.6vqt7pp6'      
    }); 
    
    map.addSource('sbk_gutter_line', {      // gutter line  
      'type': 'vector',
      'url': 'mapbox://iconeng.2oas4uc9'    
    }); 

    map.addSource('sbk_xs', {               // Xs
      'type': 'vector',
      'url': 'mapbox://iconeng.4ff1ssf7'
    });      

    map.addSource('sbk_centerline', {        // CL
      'type': 'vector',
      'url': 'mapbox://iconeng.84ffqpe1'    
    });

    map.addSource('sbk_bfe', {               // BFE
      'type': 'vector',
      'url': 'mapbox://iconeng.cq7wzs9r'      //SBK2_BFE-ah1oaf
    });
    




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-----------------------------------Base Layers----------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    map.addSource('5ftContours', {
        type: 'vector',
        url: 'mapbox://iconeng.8e23d2ea'
    });

    map.addSource('1ftContours', {
        type: 'vector',
        url: 'mapbox://iconeng.e1bdc7dc'
    });

    map.addSource('structures', {
        type: 'vector',
        url: 'mapbox://iconeng.4ifywpjt'      
    });
 
    map.addSource('parcel', {
        type: 'vector',
        url: 'mapbox://iconeng.9oi8eiqd'      
    });

    //Utilities
    map.addSource('san', {
      'type': 'vector',
      'url': 'mapbox://iconeng.4cb5wdl9'      
    }); 

    map.addSource('wtr', {
      'type': 'vector',
      'url': 'mapbox://iconeng.au4crcts'
     }); 
   
    map.addSource('storm', {
      'type': 'vector',
      'url': 'mapbox://iconeng.0lva1cj0'     
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

    
 map.addLayer({
        'id': '5ftContours',
        'type': 'line',
        'source': '5ftContours',
        'source-layer': 'SBK_COB_2013_5ft_Contours',
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
              "stops": [[16, 0.7],[19, 1]]
          },
            'line-color': '#b68054'
        }
    });
    map.addLayer({
        'id': '1ftContours',
        'type': 'line',
        'source': '1ftContours',
        'source-layer': 'SBK_COB_2013_1ft_Contours_',
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
              "stops": [[16, 0.7],[19, 1]]
          },
            'line-color': '#b68054'
        }
    });
    map.addLayer({
        'id': '5ftLabels',
        'type': 'symbol',
        'source': '5ftContours',
        'source-layer': 'SBK_COB_2013_5ft_Contours',
        'layout': {
            'visibility': 'none',
          'symbol-placement': 'line',
          'text-field': '{CONTOUR}',
          'text-font': ['DIN Offc Pro Light','Open Sans Light','Arial Unicode MS Regular'],
          'text-size': {
            "stops": [[15,12],[17,14],[19,18]]
          }
        },
        'paint': {
          'text-color': '#b68054',
          'text-halo-color': 'rgba(255,255,235,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 0.5
        }
    });


    //buildings
    map.addLayer({
      'id': 'struct',
      'source': 'structures',
      'source-layer': 'sbk_bldg-3a2hci',  
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
      'source-layer': 'sbk_parcel-04pgif',     
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
      'source-layer': 'SBK2_SAN-6htngq',     
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
       'source-layer': 'SBK2_SAN-6htngq',
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


  
    //Wtr
    map.addLayer({
      'id': 'wtr',                               
      'source': 'wtr',
      'source-layer': 'SDK2_WTR-c1bhji',     
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
       'source-layer': 'SDK2_WTR-c1bhji',
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
      'source-layer': 'SBK2_STORM-40zbe5',     
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
       'source-layer': 'SBK2_STORM-40zbe5',
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
 
// ---- sbk PROPOSED GRADING
    map.addLayer({
    id: 'sbk_grading1',
    source: 'sbk_grading_alipine', 
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
    id: 'sbk_grading_alpine_det',
    source: 'sbk_grading_alipine', 
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
    id: 'sbk_grading2',
    source: 'sbk_detention_nBoulderPark',
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
    id: 'sbk_grading3',
    source: 'sbk_grading',
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



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-----------------------------------Hazard Zones------------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //Zone AH
    map.addLayer({
    id: 'sbk_zone_ah',
    source: 'sbk_zone_ah',
    'source-layer': 'SBK2_Zone_AH-5d5kaw',
    type: 'fill',
    layout: {
        'visibility': 'visible'
      },
    paint: {
        'fill-opacity': 0.5,
        'fill-color': '#7FEAFF',
        'fill-outline-color': '#7FEAFF',
    }
  }, 'road-label-small');



    //Hi Haz
    map.addLayer({
    id: 'sbk_hiHaz',
    source: 'sbk_high_haz',
    'source-layer': 'SBK2_High_Hazard-avxzm5',
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
    id: 'sbk_zone_x',
    source: 'sbk_zone_x',
    'source-layer': 'SBK2_Zone_X-2omvx6',
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
    id: 'sbk_fw',
    source: 'sbk_fw',
    'source-layer': 'SBK2_Conveyance-3265k0',
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
    id: 'sbk_100yr',
    source: 'sbk_100yr',
    'source-layer': 'SBK2_Zone_AE-3tynlt',
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


    //2013 Flood Extents 
    map.addLayer({
    id: 'flood_extents',
    source: 'flood_extents',
    'source-layer': 'SKB2_2013_flood_extents-amrz4u',
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


   
    //Flow Path
    map.addLayer({
    id: 'sbk_centerline',
    source: 'sbk_centerline',
    'source-layer': 'SBK2_Flow_Path-buzjeu',
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
    id: 'sbk_xs',
    source: 'sbk_xs',
    'source-layer': 'SKB2_Cross_Sections-2e1awk',
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
      'id': 'sbk_xs_labels',
      'type': 'symbol',
      'source': 'sbk_xs',
      'source-layer': 'SKB2_Cross_Sections-2e1awk',
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

    map.addLayer({
        'id': 'sbk_bfe',
        'type': 'line',
        'source': 'sbk_bfe',
        'source-layer': 'SBK2_BFE-ah1oaf',
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#333'
        }
    });

    map.addLayer({
        'id': 'sbk_bfeLabels',
        'type': 'symbol',
        'source': 'sbk_bfe',
        'source-layer': 'SBK2_BFE-ah1oaf',
        'layout': {
            'visibility': 'none',
          'symbol-placement': 'line',
          'text-field': '{Contour}',
          'text-font': ['DIN Offc Pro Light','Open Sans Light','Arial Unicode MS Regular'],
          'text-size': {
            "stops": [[15,12],[17,14],[19,16]]
          }
        },
        'paint': {
          'text-color': '#333',
          'text-halo-color': 'rgba(255,255,255,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 1
        }
    });


    //Gutterline
    map.addLayer({
    id: 'sbk_gutter_line',
    source: 'sbk_gutter_line',
    'source-layer': 'SBK2_Gutter_Line-3jt5p3',
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
//------------------------------------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// ugc PROPOSED GRADING

    map.addLayer({
    id: 'ugc_grading1',
    source: 'ugc_grading_mnr',
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
    id: 'ugc_grading2',
    source: 'ugc_grading_mjr',
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
    id: 'ugc_grading3',
    source: 'ugc_detention_springValley',
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
    id: 'ugc_grading4',
    source: 'ugc_grading_Iris',
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






});

//defeine clear button for flood haz zones
$(document).ready(function() {
    $("#clear").click(function() {
        var checkBoxes = $("#FloodZones input[type=checkbox]");
        
        
        checkBoxes.prop("checked", false);
        map.setLayoutProperty('sbk_fw','visibility', 'none');
        map.setLayoutProperty('sbk_100yr','visibility', 'none');
        map.setLayoutProperty('sbk_hiHaz','visibility', 'none');
        map.setLayoutProperty('sbk_zone_ah','visibility', 'none');
        map.setLayoutProperty('sbk_zone_x','visibility', 'none');
        map.setLayoutProperty('flood_extents','visibility', 'none');
        map.setLayoutProperty('sbk_centerline','visibility', 'none');
        map.setLayoutProperty('sbk_xs','visibility', 'none');
        map.setLayoutProperty('sbk_xs_labels','visibility', 'none');
        map.setLayoutProperty('sbk_bfe','visibility', 'none');
        map.setLayoutProperty('sbk_bfeLabels','visibility', 'none');
        map.setLayoutProperty('sbk_gutter_line','visibility', 'none');
       });
});





// When a click event occurs near the feature open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (k) {
  var featureList = map.queryRenderedFeatures(k.point, { layers: ['storm', 'sbk_xs'] });
  if (!featureList.length) {
      return;
  }

  var feature = featureList[0];
  var id = feature.layer.id;
     

     if (id == 'storm'){
        var popup = new mapboxgl.Popup()
            .setLngLat(k.lngLat)
            .setHTML('DIAMETER: ' + feature.properties.DIAMETER + ' in'+ '</b> <br />' +
                     'LENGTH: ' + feature.properties.LENGTH + ' ft' + '<br />' +
                     'MATERIAL: ' + feature.properties.MATERIAL)
            .addTo(map);
          }

      else if (id == 'sbk_xs') {
        var popup = new mapboxgl.Popup()
            .setLngLat(k.lngLat)
            .setHTML('<b>' + feature.properties.RiverCode + ' Cross Section ' + feature.properties.ProfileM + '</b> <br />' +
                     '10-year: ' + feature.properties.P003.toFixed(2) + '<br />' +
                     '25-year: ' + feature.properties.P004.toFixed(2) + '<br />' +
                     '50-year: ' + feature.properties.P005.toFixed(2) + '<br />' +
                     '<b>100-Year: ' + feature.properties.P001.toFixed(2) + '<br />' +
                     'Floodway: ' + feature.properties.P002.toFixed(2) + '</b><br />' +
                     '500-year: ' + feature.properties.P006.toFixed(2) )
            .addTo(map);
      }
    });

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (k) {
    var featureList = map.queryRenderedFeatures(k.point, { layers: ['storm', 'sbk_xs'] });
    map.getCanvas().style.cursor = (featureList.length) ? 'pointer' : '';
});



map.addControl(new mapboxgl.NavigationControl(), 'top-right');
