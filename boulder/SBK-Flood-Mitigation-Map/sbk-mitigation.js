  //This will not change
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';


//Dark Canvas
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
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

//----Skunk 

    // Mitigation Polygon
    map.addSource('snk_mitigation_polygonwork', {           
      'type': 'vector',
      'url': 'mapbox://iconeng.bbnlg1q8'    //ugc_snk_polygon_merge-3mj1ax
    }); 
 
    // Mitigation Polyline
    map.addSource('snk_mitigation_linework', {           
      'type': 'geojson',
      'data': 'ugc_snk_polyline_merge.geojson'    
    }); 


//----Bluebell 

    // Mitigation Polygon
    map.addSource('bcc_mitigation_polygonwork', {           
      'type': 'vector',
      'url': 'mapbox://iconeng.9n1migyb'    //ugc_bcc_polygon_merge-70udhl 
    }); 
 
    // Mitigation Polyline
    map.addSource('bcc_mitigation_linework', {           
      'type': 'geojson',
      'data': 'ugc_bcc_polyline_merge.geojson'    
    }); 

//----King

 
    // Mitigation Polygon
    map.addSource('kng_mitigation_polygonwork', {           
      'type': 'geojson',
       'data': 'kng_polygon3.geojson'  
  });
  
 
    // Mitigation Polyline
    map.addSource('kng_mitigation_linework', {           
      'type': 'geojson',
      'data': 'kng_polyline_update.geojson'  
    });





//----FLOOD ZONE Layers-

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
    


//---Base Layers------
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
        url: 'mapbox://iconeng.61109n3x'      
    });
 
    map.addSource('parcel', {
        type: 'vector',
        url: 'mapbox://iconeng.cy50r48v'      
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


    
    //2016 STMP
    map.addSource('2016_SWMP', {
      'type': 'vector',
      'url': 'mapbox://iconeng.28osgh0c'   //SBK2_2016_MP_Storm_Drains-6i2h1y
    }); 


    //COB Easements
    map.addSource('COB_Easements', {
      'type': 'vector',
      'url': 'mapbox://iconeng.avf9c8rj'   //SBK2_easment-cygu7t
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
      'source-layer': 'SBK2_building-6y6gbs',  
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
      'source-layer': 'SBK2_parcel-7rru7p',     
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

     //Green Restoration Area Green
    map.addLayer({
    id: 'restorAreaFill',
    source: 'restorArea',
    'source-layer': 'SBK2_EnviroRestorationArea-ae49du', 
    type: 'fill',
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.3,
        'fill-color': '#00FF33',
        'fill-outline-color': '#00FF33'
    }
  }, 'road-label-small');


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
        'fill-opacity': 0.9,
        'fill-pattern': 'greenstripe',
        'fill-outline-color': '#00FF33'
    }
  }, 'road-label-small');

    
    
//Green Restoration Area Border

    map.addLayer({
      'id': 'restorAreaBorder',                               
      'source': 'restorArea',
      'source-layer': 'SBK2_EnviroRestorationArea-ae49du',     
      'type': 'line',        
      'paint': {
         'line-width': 2.3,
         'line-color': '#00FF33', 
         'line-opacity': 0.7,
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');




    //Prop trails
    map.addLayer({
      'id': 'propTrails',                               
      'source': 'propTrails',
      'source-layer': 'SBK2_ProposedTrails-88pol2',     
      'type': 'line',        
      'paint': {
         'line-width': 3,
         'line-color': '#8DFFA1', 
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
         'line-color': '#BADB38', 
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
//-----------------------------------Hazard Zones---------------------------------
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
//-----------------------------------Skunk Mitigation Layers----------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//----SNK Reach 00 Alt A Culverts
   
    map.addLayer({
    id: 'snk_r00_altA_Detention_Area',
    source: 'snk_mitigation_polygonwork',
    'source-layer': 'ugc_snk_polygon_merge-3mj1ax',
    type: 'line',
    filter: ['==', 'Reach', '00'],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'line-color': '#BBB917',    //ASR_ID for elevations
        
    }
  }, 'road-label-small');








// ----SNK Reach 01 Alt A Culverts
    map.addLayer({
    id: 'snk_r01_altA_Culvert',
    source: 'snk_mitigation_polygonwork',
    'source-layer': 'ugc_snk_polygon_merge-3mj1ax',
    type: 'fill',
    filter: ['==', 'Reach', '01'],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#00FFEF',
        'fill-outline-color': '#00FFEF'
    }
  }, 'road-label-small');


// ----SNK Reach 01 Alt A Channel
 map.addLayer({
    id: 'snk_r01_altA_Channel',
    source: 'snk_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '01']],
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



   // ----SNK Reach 01 Alt B Culverts
    map.addLayer({
    id: 'snk_r01_altB_Culvert',
    source: 'snk_mitigation_polygonwork',
    'source-layer': 'ugc_snk_polygon_merge-3mj1ax',
    type: 'fill',
    filter: ['==', 'Reach', '01'],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#00FFEF',
        'fill-outline-color': '#00FFEF'
    }
  }, 'road-label-small');










// ----SNK Reach 02 Alt A Channel
 map.addLayer({
    id: 'snk_r02_altA_Channel',
    source: 'snk_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '02']],
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


   // ----SNK Reach 02 Alt A Culverts
    map.addLayer({
    id: 'snk_r02_altA_Culvert',
    source: 'snk_mitigation_polygonwork',
    'source-layer': 'ugc_snk_polygon_merge-3mj1ax',
    type: 'fill',
    filter: ['==', 'Reach', '02'],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#00FFEF',
        'fill-outline-color': '#00FFEF'
    }
  }, 'road-label-small');


   


// ----SNK Reach 02 Alt B Channel
 map.addLayer({
    id: 'snk_r02_altB_Channel',
    source: 'snk_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'B'],['==', 'Reach', '02']],
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



   // ----SNK Reach 02 Alt B Culverts
    map.addLayer({
    id: 'snk_r02_altB_Culvert',
    source: 'snk_mitigation_polygonwork',
    'source-layer': 'ugc_snk_polygon_merge-3mj1ax',
    type: 'fill',
    filter: ['==', 'Reach', '02'],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#00FFEF',
        'fill-outline-color': '#00FFEF'
    }
  }, 'road-label-small');









// ----SNK Reach 03 Alt A Channel
 map.addLayer({
    id: 'snk_r03_altA_Channel',
    source: 'snk_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '03']],
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


   // ----SNK Reach 03 Alt A Culverts
    map.addLayer({
    id: 'snk_r03_altA_Culvert',
    source: 'snk_mitigation_polygonwork',
    'source-layer': 'ugc_snk_polygon_merge-3mj1ax',
    type: 'fill',
    filter: ["all",['==', 'Alt', 'A B'],['==', 'Reach', '03']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#00FFEF',
        'fill-outline-color': '#00FFEF'
    }
  }, 'road-label-small');


// ----SNK Reach 03 Alt B Channel
 map.addLayer({
    id: 'snk_r03_altB_Channel',
    source: 'snk_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'B'],['==', 'Reach', '03']],
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


   // ----SNK Reach 03 Alt B Culverts
    map.addLayer({
    id: 'snk_r03_altB_Culvert',
    source: 'snk_mitigation_polygonwork',
    'source-layer': 'ugc_snk_polygon_merge-3mj1ax',
    type: 'fill',
    filter: ["all",['==', 'Alt', 'A B'],['==', 'Reach', '03']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#00FFEF',
        'fill-outline-color': '#00FFEF'
    }
  }, 'road-label-small');


   // ----SNK Reach 03 Alt C Struc Acquisition		
    map.addLayer({
    id: 'snk_r03_altC_HHStruct',
    source: 'snk_mitigation_polygonwork',
    'source-layer': 'ugc_snk_polygon_merge-3mj1ax',
    type: 'fill',
    filter: ["all",['==', 'Alt', 'C'],['==', 'Reach', '03']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.3,
        'fill-color': '#FF0000',
        'fill-outline-color': '#FF0000'
    }
  }, 'road-label-small');


    map.addLayer({
    id: 'snk_r03_altC_HHStruct2',
    source: 'snk_mitigation_polygonwork',
    'source-layer': 'ugc_snk_polygon_merge-3mj1ax',
    type: 'fill',
    filter: ["all",['==', 'Alt', 'C'],['==', 'Reach', '03']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.9,
        'fill-pattern': 'redstripe',
        'fill-outline-color': '#FF0000'
    }
  }, 'road-label-small');



    map.addLayer({
    id: 'snk_r03_altC_HHStruct3',
    source: 'snk_mitigation_polygonwork',
    'source-layer': 'ugc_snk_polygon_merge-3mj1ax',
    type: 'line',
    filter: ["all",['==', 'Alt', 'C'],['==', 'Reach', '03']],
    layout: {
        'visibility': 'none'
      },
      'paint': {
         'line-width': 2.3,
         'line-color': '#FF0000', 
         'line-opacity': 0.7,
       },
  }, 'road-label-small');











 // ----SNK Reach 04 Alt A Channel
 map.addLayer({
    id: 'snk_r04_altA_Channel',
    source: 'snk_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '04']],
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


   // ----SNK Reach 04 Alt A Culverts
    map.addLayer({
    id: 'snk_r04_altA_Culvert',
    source: 'snk_mitigation_polygonwork',
    'source-layer': 'ugc_snk_polygon_merge-3mj1ax',
    type: 'fill',
    filter: ["all",['==', 'Alt', 'A B'],['==', 'Reach', '04']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#00FFEF',
        'fill-outline-color': '#00FFEF'
    }
  }, 'road-label-small');


   // ----SNK Reach 04 Alt B Culverts
    map.addLayer({
    id: 'snk_r04_altB_Culvert',
    source: 'snk_mitigation_polygonwork',
    'source-layer': 'ugc_snk_polygon_merge-3mj1ax',
    type: 'fill',
    filter: ["all",['==', 'Alt', 'A B'],['==', 'Reach', '04']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#00FFEF',
        'fill-outline-color': '#00FFEF'
    }
  }, 'road-label-small');


   // ----SNK Reach 04 Alt C Struc Acquisition
    map.addLayer({
    id: 'snk_r04_altC_HHStruct',
    source: 'snk_mitigation_polygonwork',
    'source-layer': 'ugc_snk_polygon_merge-3mj1ax',
    type: 'fill',
    filter: ["all",['==', 'Alt', 'C'],['==', 'Reach', '04']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.3,
        'fill-color': '#FF0000',
        'fill-outline-color': '#FF0000'
    }
  }, 'road-label-small');



    map.addLayer({
    id: 'snk_r04_altC_HHStruct2',
    source: 'snk_mitigation_polygonwork',
    'source-layer': 'ugc_snk_polygon_merge-3mj1ax',
    type: 'fill',
    filter: ["all",['==', 'Alt', 'C'],['==', 'Reach', '04']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.9,
        'fill-pattern': 'redstripe',
        'fill-outline-color': '#FF0000'
    }
  }, 'road-label-small');



    map.addLayer({
    id: 'snk_r04_altC_HHStruct3',
    source: 'snk_mitigation_polygonwork',
    'source-layer': 'ugc_snk_polygon_merge-3mj1ax',
    type: 'line',
    filter: ["all",['==', 'Alt', 'C'],['==', 'Reach', '04']],
    layout: {
        'visibility': 'none'
      },
      'paint': {
         'line-width': 2.3,
         'line-color': '#FF0000', 
         'line-opacity': 0.7,
       },
  }, 'road-label-small');


   











//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-----------------------------------Bluebell Mitigation Layers-------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//----BCC Reach 00 Alt A Sediment Capture Facility
   
    map.addLayer({
    id: 'bcc_r00_altA_Detention_Area',
    source: 'bcc_mitigation_polygonwork',
    'source-layer': 'ugc_bcc_polygon_merge-70udhl',
    type: 'line',
    filter: ['==', 'Reach', '00'],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'line-color': '#BBB917',    //ASR_ID for elevations
        
    }
  }, 'road-label-small');






// ----BCC Reach 01 Alt A Channel
 map.addLayer({
    id: 'bcc_r01_altA_Channel',
    source: 'bcc_mitigation_linework', 
    type: 'line',
    filter: ['==', 'Reach', '01'],
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


 // ----BCC Reach 01 Alt B Struc Acquisition    
    map.addLayer({
    id: 'bcc_r01_altB_HHStruct',
    source: 'bcc_mitigation_polygonwork',
    'source-layer': 'ugc_bcc_polygon_merge-70udhl',
    type: 'fill',
    filter: ['==', 'Reach', '01'],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.3,
        'fill-color': '#FF000',
        'fill-outline-color': '#FF0000'
    }
  }, 'road-label-small');


    map.addLayer({
    id: 'bcc_r01_altB_HHStruct2',
    source: 'bcc_mitigation_polygonwork',
    'source-layer': 'ugc_bcc_polygon_merge-70udhl',
    type: 'fill',
    filter: ['==', 'Reach', '01'],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.9,
        'fill-pattern': 'redstripe',
        'fill-outline-color': '#FF0000'
    }
  }, 'road-label-small');



    map.addLayer({
    id: 'bcc_r01_altB_HHStruct3',
    source: 'bcc_mitigation_polygonwork',
    'source-layer': 'ugc_bcc_polygon_merge-70udhl',
    type: 'line',
    filter: ['==', 'Reach', '01'],
    layout: {
        'visibility': 'none'
      },
      'paint': {
         'line-width': 2.3,
         'line-color': '#FF0000', 
         'line-opacity': 0.7,
       },
  }, 'road-label-small');










   
// ---- BCC Reach 02 Alt A Strom Drain 100-Yr
    map.addLayer({
    id: 'bcc_r02_altA_StormDrain',
    source: 'bcc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '02']],
    layout: {
      'visibility': 'none',
      'line-join': 'round',
      'line-cap': 'round'
    },
      'paint': {
        'line-width': 5,
        'line-color': '#00687A',
         }, 
         
  }, 'road-label-small');


// ---- BCC Reach 02 AltB Strom Drain 100-Yr
    map.addLayer({
    id: 'bcc_r02_altB_StormDrain',
    source: 'bcc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'B'],['==', 'Reach', '02']],
    layout: {
      'visibility': 'none',
      'line-join': 'round',
      'line-cap': 'round'
    },
      'paint': {
        'line-width': 5,
        'line-color': '#00687A',
         }, 
         
  }, 'road-label-small');


// ---- TMC Reach 02 Alt C Roadwork
    map.addLayer({
    id: 'bcc_r02_altC_Roadway2',
    source: 'bcc_mitigation_polygonwork',
    'source-layer': 'ugc_bcc_polygon_merge-70udhl', 
    type: 'fill',
    filter: ['==', 'Reach', '02'],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.25,
        'fill-color': '#00FF33',
        'fill-outline-color': '#00FF33'
    }
  }, 'road-label-small');    

    

    map.addLayer({
    id: 'bcc_r02_altC_Roadway',
    source: 'bcc_mitigation_polygonwork',
    'source-layer': 'ugc_bcc_polygon_merge-70udhl', 
    type: 'fill',
    filter: ['==', 'Reach', '02'],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.5,
        'fill-pattern': 'greenstripe',
        'fill-outline-color': '#00FF33'
    }
  }, 'road-label-small');






//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-----------------------------------King Mitigation Layers-----------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//----KNG Reach 00 Alt A Sediment Capture Facility
   
    map.addLayer({
    id: 'kng_r00_altA_Detention_Area',
    source: 'kng_mitigation_polygonwork', 
    type: 'fill',
    filter: ['==', 'Reach', '00'],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.8,
        'fill-color': '#BBB917',
        'fill-outline-color': '#BBB917'
    }
  }, 'road-label-small');







// ----KNG Reach 01 Alt A Channel
 map.addLayer({
    id: 'kng_r01_altA_Channel',
    source: 'kng_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '01']],
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



// ----KNG Reach 01 Alt B Channel
 map.addLayer({
    id: 'kng_r01_altB_Channel',
    source: 'kng_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'C'],['==', 'Reach', '01']],
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



 // ----KNG Reach 01 Alt D Struc Acquisition    
    map.addLayer({
    id: 'kng_r01_altD_HHStruct',
    source: 'kng_mitigation_polygonwork',
    type: 'fill',
    filter: ['==', 'Reach', '01'],
    layout: {
        'visibility': 'none'
      },
    paint: {
        
    	'fill-opacity': 0.3,
        'fill-color': '#FF0000',
        'fill-outline-color': '#FF0000'
    }
  }, 'road-label-small');


	//Struct Stripe
    map.addLayer({
    id: 'kng_r01_altD_HHStruct2',
    source: 'kng_mitigation_polygonwork',
    type: 'fill',
    filter: ['==', 'Reach', '01'],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.9,
        'fill-pattern': 'redstripe',
        'fill-outline-color': '#FF0000'
    }
  }, 'road-label-small');

    
    
	//Struct Area Border
    map.addLayer({
    id: 'kng_r01_altD_HHStruct3',
    source: 'kng_mitigation_polygonwork',
      'type': 'line',        
      'paint': {
         'line-width': 2.3,
         'line-color': '#FF0000', 
         'line-opacity': 0.7,
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');



   
// ---- KNG Reach 01 Alt E Strom Drain 
    map.addLayer({
    id: 'kng_r01_altE_StormDrain',
    source: 'kng_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'E'],['==', 'Reach', '01']],
    layout: {
      'visibility': 'none',
      'line-join': 'round',
      'line-cap': 'round'
    },
      'paint': {
        'line-width': 5,
        'line-color': '#00687A',
         }, 
         
  }, 'road-label-small');


// ---- KNG Reach 01 Alt F Strom Drain 
    map.addLayer({
    id: 'kng_r01_altF_StormDrain',
    source: 'kng_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'F'],['==', 'Reach', '01']],
    layout: {
      'visibility': 'none',
      'line-join': 'round',
      'line-cap': 'round'
    },
      'paint': {
        'line-width': 5,
        'line-color': '#00687A',
         }, 
         
  }, 'road-label-small');








 // ----KNG Reach 02 Alt A Misc Channel Improv    
    map.addLayer({
    id: 'kng_r02_altA_Misc',
    source: 'kng_mitigation_polygonwork',
    type: 'fill',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '02']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.8,
        'fill-color': '#86D123',
        'fill-outline-color': '#86D123'
    }
  }, 'road-label-small');


 // ----KNG Reach 02 Alt A Misc Channel Improv    
    map.addLayer({
    id: 'kng_r02_altB_Misc',
    source: 'kng_mitigation_polygonwork',
    type: 'fill',
    filter: ["all",['==', 'Alt', 'B'],['==', 'Reach', '02']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.8,
        'fill-color': '#86D123',
        'fill-outline-color': '#86D123'
    }
  }, 'road-label-small');



// ---- KNG Reach 03 Alt A Strom Drain 
    map.addLayer({
    id: 'kng_r03_altA_StormDrain',
    source: 'kng_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '03']],
    layout: {
      'visibility': 'none',
      'line-join': 'round',
      'line-cap': 'round'
    },
      'paint': {
        'line-width': 5,
        'line-color': '#00687A',
         }, 
         
  }, 'road-label-small');



// ---- KNG Reach 03 Alt B Strom Drain 
    map.addLayer({
    id: 'kng_r03_altB_StormDrain',
    source: 'kng_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'B'],['==', 'Reach', '03']],
    layout: {
      'visibility': 'none',
      'line-join': 'round',
      'line-cap': 'round'
    },
      'paint': {
        'line-width': 5,
        'line-color': '#00687A',
         }, 
         
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





document.getElementById('SKN_Zoom').addEventListener('click', function() {

  var bbox = [[-105.275,39.9901], [-105.245,40.0089]];
  map.fitBounds(bbox, { padding: 10 });

});

document.getElementById('BCC_Zoom').addEventListener('click', function() {

  var bbox = [[-105.279,39.9975], [-105.262,39.9998]];
  map.fitBounds(bbox, { padding:10 }); 

});

document.getElementById('KNG_Zoom').addEventListener('click', function() {

  var bbox = [[-105.277,39.9932], [-105.264,39.9969]];
  map.fitBounds(bbox, { padding:10 });

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

        else if ((id == 'ugc_snk_polyline_merge')  ||  (id == 'ugc_bcc_polyline_merge') || (id == 'kng_polyline_update'))
	{
        	        var popup = new mapboxgl.Popup()
            .setLngLat(k.lngLat)
            .setHTML('DIAMETER: ' + feature.properties.DIAMETER + ' in'+ '</b> <br />' +
                     'LENGTH: ' + feature.properties.LENGTH + ' ft' + '<br />' +
                     'MATERIAL: ' + feature.properties.MATERIAL)
            .addTo(map);
    };

 });

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (k) {
    var featureList = map.queryRenderedFeatures(k.point, { layers: ['storm', 'sbk_xs'] });
    map.getCanvas().style.cursor = (featureList.length) ? 'pointer' : '';
});



map.addControl(new mapboxgl.NavigationControl(), 'top-right');
