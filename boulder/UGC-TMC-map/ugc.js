  //This will not change
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';


//Dark Canvas
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
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


// UPPER GOOSE CREEK

    // Mitigation Polygon
    map.addSource('ugc_mitigation_polygonwork', {           
      'type': 'vector',
      'url': 'mapbox://iconeng.beykh0kc'    //ugc_ugc_polyon_merge-5og7u1 
    }); 
 
    // Mitigation Polyline
    map.addSource('ugc_mitigation_linework', {           
      'type': 'geojson',
      'data': 'ugc_ugc_polyline_merge.geojson'    
    }); 

 // 


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






// TWO MILE CANYON CREEK

    // Mitigation Polygon
    map.addSource('tmc_mitigation_polygonwork', {           
      'type': 'vector',
      'url': 'mapbox://iconeng.c1ykx9hp'    //ugc_tmc_polygon_merge-b4mlf2
    }); 
 
    // Mitigation Polyline
    map.addSource('tmc_mitigation_linework', {           
      'type': 'geojson',
      'data': 'tmc_polyline_merge.geojson'    
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


// BASELAYERS
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

    
    //2016 STMP
    map.addSource('2016_SWMP', {
      'type': 'vector',
      'url': 'mapbox://iconeng.5cb6ycsi'   //UGC_2016_MP_Storm_Drains-bi6jif
    }); 


    //COB Easements
    map.addSource('COB_Easements', {
      'type': 'vector',
      'url': 'mapbox://iconeng.bq3zjosw'   //COB_easements_clipped-5txbl9
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
  
  
  
    //contour labels
    map.addLayer({
      'id': 'contourLabels',
      'type': 'symbol',
      'source': 'contours',
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


  //Easement Fill
    map.addLayer({
    id: 'COB_Easements',
    source: 'COB_Easements',
    'source-layer': 'COB_easements_clipped-5txbl9', 
    type: 'fill',
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.3,
        'fill-color': '#000',
        'fill-outline-color': '#000'
    }
  }, 'road-label-small');

    
    //Ease Outline
    map.addLayer({
      'id': 'COB_EasementsBorder',                               
      'source': 'COB_Easements',
      'source-layer': 'COB_easements_clipped-5txbl9',     
      'type': 'line',        
      'paint': {
         'line-width': 2.3,
         'line-color': '#000', 
         'line-opacity': 0.7,
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');


    //SWMP 2016
    map.addLayer({
      'id': '2016_SWMP',                               
      'source': '2016_SWMP',
      'source-layer': 'UGC_2016_MP_Storm_Drains-bi6jif',     
      'type': 'line',        
      'paint': {
         'line-color': 'rgba(0,0,0,1)', 
         'line-width': 3,
         'line-opacity': 0.95,
         'line-dasharray': [5,2.5],
       },
      'layout': {'visibility': 'none'}
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
//--------------------------Upper Goose Creek Mitigation--------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
// ---- UGC Reach 01 Alt A Detention
    map.addLayer({
    id: 'ugc_r01_altA_detention',
    source: 'ugc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '01'], ['==', 'Type', 'Detention']],
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



// ---- UGC Reach 01 Alt A Outfall
    map.addLayer({
    id: 'ugc_r01_altA_outfall',
    source: 'ugc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '01'], ['==', 'Type', 'Storm Drain']],
    layout: {
      'visibility': 'none',
    },
      'paint': {
        'line-width': 5,
       
        'line-color': '#00687A', 
           },
      
   
  }, 'road-label-small');



    //UGC R01 Alt A Ease
    map.addLayer({
      'id': 'ugc_r01_altA_ease',                               
      source: 'ugc_mitigation_linework',  
       filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '01'], ['==', 'Type', 'Easement']],   
      'type': 'line',        
      'paint': {
         'line-color': '#FF8B2D', 
         'line-width': 3,
         'line-opacity': 0.8,
         'line-dasharray': [6, 3],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');






// ---- UGC Reach 01 Alt B Outfall
    map.addLayer({
    id: 'ugc_r01_altB_outfall',
    source: 'ugc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'B'],['==', 'Reach', '01']],
    layout: {
      'visibility': 'none',
    },
      'paint': {
        'line-width': 5,
      
        'line-color': '#00687A',
            },

  }, 'road-label-small');








// ---- UGC Reach 02 Alt A Open Channel Detained Flow
    map.addLayer({
    id: 'ugc_r02_altA_OpenChannel_Detained',
    source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',
    type: 'fill',
   filter: ["all",['==', 'Reach', '02'],['==', 'Alt', 'A']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.2,
        'fill-color': '#FF2034',
        'fill-outline-color': '#FF2034'
    }
  }, 'road-label-small');

    map.addLayer({
    id: 'ugc_r02_altA_OpenChannel_Detained2',
    source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',
    type: 'line',
    filter: ["all",['==', 'Reach', '02'],['==', 'Alt', 'A']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'line-opacity': 0.9,
        'line-color': '#FF2034',
    }
  }, 'road-label-small');




// ---- UGC Reach 02 Alt B Open Channel FullFlow
    map.addLayer({
    id: 'ugc_r02_altB_OpenChannel_Full',
    source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',
    type: 'fill',
    filter: ["all",['==', 'Reach', '02'],['==', 'Alt', 'B']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.2,
        'fill-color': '#FF2034',
        'fill-outline-color': '#FF2034'
    }
  }, 'road-label-small');


    map.addLayer({
    id: 'ugc_r02_altB_OpenChannel_Full2',
    source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',
    type: 'line',
    filter: ["all",['==', 'Reach', '02'],['==', 'Alt', 'B']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'line-opacity': 0.9,
        'line-color': '#FF2034',
    }
  }, 'road-label-small');



//struct area
    map.addLayer({
    id: 'ugc_r02_altAB_struc1',
    source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',
    filter: ["all",['==', 'Reach', '02'],['==', 'Alt', 'A B']],
    type: 'fill',
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.3,
        'fill-color': '#FFFF4B',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');


//structe pattern
    map.addLayer({
    id: 'ugc_r02_altAB_struc2',
     source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',
    type: 'fill',
    filter: ["all",['==', 'Reach', '02'],['==', 'Alt', 'A B']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.9,
        'fill-pattern': 'yellowstripe',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');

    
    
//struct Border

    map.addLayer({
      'id': 'ugc_r02_altAB_struc3',                               
    source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',   
      'type': 'line',
      filter: ["all",['==', 'Reach', '02'],['==', 'Alt', 'A B']],        
      'paint': {
         'line-width': 2.3,
         'line-color': '#FFFF4B', 
         'line-opacity': 0.7,
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');



    //UGC R02 Alt A B Ease
    map.addLayer({
      'id': 'ugc_r02_altAB_ease',                               
      source: 'ugc_mitigation_linework',  
       filter: ['==', 'Reach', '02'],   
      'type': 'line',        
      'paint': {
         'line-color': '#FF8B2D', 
         'line-width': 3,
         'line-opacity': 0.8,
         'line-dasharray': [6, 3],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');









// ---- UGC Reach 03 Alt A Strom Drain Detained Flow
    map.addLayer({
    id: 'ugc_r03_altA_StormDrain_Detained',
    source: 'ugc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Reach', '03'], ['==', 'Alt', 'A']],
    layout: {
      'visibility': 'none',
    },
      'paint': {
        'line-width': 5,
        'line-color': '#00687A',
         }, 
         
  }, 'road-label-small');


// ---- UGC Reach 03 Alt B Strom Drain Full Flow
    map.addLayer({
    id: 'ugc_r03_altB_StormDrain_Full',
    source: 'ugc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Reach', '03'], ['==', 'Alt', 'B']],
    layout: {
      'visibility': 'none',
    },
      'paint': {
        'line-width': 5,
        'line-color': '#00687A',
        },
  }, 'road-label-small');


//struct area
    map.addLayer({
    id: 'ugc_r03_altAB_struc1',
    source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',
    filter: ["all",['==', 'Reach', '03'],['==', 'Alt', 'A B']],
    type: 'fill',
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.3,
        'fill-color': '#FFFF4B',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');


//structe pattern
    map.addLayer({
    id: 'ugc_r03_altAB_struc2',
     source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',
    type: 'fill',
    filter: ["all",['==', 'Reach', '03'],['==', 'Alt', 'A B']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.9,
        'fill-pattern': 'yellowstripe',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');

    
    
//struct Border

    map.addLayer({
      'id': 'ugc_r03_altAB_struc3',                               
    source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',   
      'type': 'line',
      filter: ["all",['==', 'Reach', '03'],['==', 'Alt', 'A B']],        
      'paint': {
         'line-width': 2.3,
         'line-color': '#FFFF4B', 
         'line-opacity': 0.7,
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');











// ---- UGC Reach 04 Alt A Strom Drain Detained Flow
    map.addLayer({
    id: 'ugc_r04_altA_StormDrain_Detained',
    source: 'ugc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '04']],
    layout: {
      'visibility': 'none',
    },
      'paint': {
        'line-width': 5,
        'line-color': '#00687A',
        },
   
  }, 'road-label-small');


// ---- UGC Reach 04 Alt B Strom Drain Full Flow
    map.addLayer({
    id: 'ugc_r04_altB_StormDrain_Full',
    source: 'ugc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'B'],['==', 'Reach', '04']],
    layout: {
      'visibility': 'none',
    },
      'paint': {
        'line-width': 5,
        'line-color': '#00687A',
        },

  }, 'road-label-small');


// ---- UGC Reach 04 Alt C Open Channel Detained
    map.addLayer({
    id: 'ugc_r04_altC_OpenChannel_Detained',
    source: 'ugc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'C'],['==', 'Reach', '04']],
       layout: {
        'visibility': 'none',
         'line-join': 'round',
         'line-cap': 'round'
       },
        'paint': {
          'line-width': {
               "stops": [[15, 0.5], [17, 0.1], [19, 1.5]]
          },
        //  'line-opacity': {
        //      "stops": [[16, 0.7],[19, 1]]
        //  },
        'line-color': '#FF2034',
         
      }
   
  }, 'road-label-small');



// ---- UGC Reach 04 Alt D Open Channel Full
    map.addLayer({
    id: 'ugc_r04_altD_OpenChannel_Full',
    source: 'ugc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'D'],['==', 'Reach', '04']],
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
        'line-color': '#FF203F',
         
      }
   
  }, 'road-label-small');





    //UGC R04 Alt C D Ease
    map.addLayer({
      'id': 'ugc_r04_altCD_ease',                               
      source: 'ugc_mitigation_linework',  
      filter: ["all",['==', 'Alt', 'C D'],['==', 'Reach', '04'], ['==','Type', 'Easement']],
      'type': 'line',        
      'paint': {
         'line-color': '#FF8B2D', 
         'line-width': 3,
         'line-opacity': 0.8,
         'line-dasharray': [6, 3],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');

    

    //UGC R04 Alt C D Full Aq
    map.addLayer({
      'id': 'ugc_r04_altCD_aq',                               
      source: 'ugc_mitigation_linework',  
      filter: ["all",['==', 'Alt', 'C D'],['==', 'Reach', '04'], ['==','Type', 'Aquisition']],
      'type': 'line',        
      'paint': {
         'line-color': '#00FFCF', 
         'line-width': 3,
         'line-opacity': 0.8,
         'line-dasharray': [6, 3],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');





//struct area
    map.addLayer({
    id: 'ugc_r04_altABCD_struc1',
    source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',
    filter: ["all",['==', 'Reach', '04'],['==', 'Alt', 'A B C D']],
    type: 'fill',
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.3,
        'fill-color': '#FFFF4B',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');


//structe pattern
    map.addLayer({
    id: 'ugc_r04_altABCD_struc2',
     source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',
    type: 'fill',
    filter: ["all",['==', 'Reach', '04'],['==', 'Alt', 'A B C D']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.9,
        'fill-pattern': 'yellowstripe',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');

    
    
//struct Border

    map.addLayer({
      'id': 'ugc_r04_altABCD_struc3',                               
    source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',   
      'type': 'line',
      filter: ["all",['==', 'Reach', '04'],['==', 'Alt', 'A B C D']],        
      'paint': {
         'line-width': 2.3,
         'line-color': '#FFFF4B', 
         'line-opacity': 0.7,
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');














// ---- UGC Reach 05 Alt A Strom Drain Detained Flow
    map.addLayer({
    id: 'ugc_r05_altA_StormDrain_Detained',
    source: 'ugc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '05']],
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


// ---- UGC Reach 05 Alt B Strom Drain Full Flow
    map.addLayer({
    id: 'ugc_r05_altB_StormDrain_Full',
    source: 'ugc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'B'],['==', 'Reach', '05']],
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





    // ---- UGC Reach 05 Alt C  channel
    map.addLayer({
    id: 'ugc_r05_altC_Channel',
    source: 'ugc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'C'],['==', 'Reach', '05']],
       layout: {
        'visibility': 'none',
         'line-join': 'round',
         'line-cap': 'round'
       },
        'paint': {
          'line-width': {
               "stops": [[15, 0.5], [17, 0.1], [19, 1.5]]
          },
        //  'line-opacity': {
        //      "stops": [[16, 0.7],[19, 1]]
        //  },
        'line-color': '#FF2034',
         
      }
   
  }, 'road-label-small');



// ---- UGC Reach 05 Alt C Culvert Detained Flow
    map.addLayer({
    id: 'ugc_r05_altC_Culvert_Detained',
    source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',
    type: 'fill',
    filter: ["all",['==', 'Alt', 'C'],['==', 'Reach', '05']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#b1a200',
        'fill-outline-color': '#635B00'
    }
  }, 'road-label-small');



    // ---- UGC Reach 05 Alt D channel
    map.addLayer({
    id: 'ugc_r05_altD_Channel',
    source: 'ugc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'D'],['==', 'Reach', '05']],
       layout: {
        'visibility': 'none',
         'line-join': 'round',
         'line-cap': 'round'
       },
        'paint': {
          'line-width': {
               "stops": [[15, 0.5], [17, 0.1], [19, 1.5]]
          },
        //  'line-opacity': {
        //      "stops": [[16, 0.7],[19, 1]]
        //  },
        'line-color': '#FF2034',
         
      }
   
  }, 'road-label-small');






// ---- UGC Reach 05 Alt D Culvert Detained Flow
    map.addLayer({
    id: 'ugc_r05_altD_Culvert_Full',
    source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',
    type: 'fill',
    filter: ["all",['==', 'Alt', 'D'],['==', 'Reach', '05']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#b1a200',
        'fill-outline-color': '#635B00'
    }
  }, 'road-label-small');


    //UGC R05 Alt C D Ease
    map.addLayer({
      'id': 'ugc_r05_altCD_ease',                               
      source: 'ugc_mitigation_linework',  
      filter: ["all",['==', 'Alt', 'C D'],['==', 'Reach', '05'], ['==','Type', 'Easement']],
      'type': 'line',        
      'paint': {
         'line-color': '#FF8B2D', 
         'line-width': 3,
         'line-opacity': 0.8,
         'line-dasharray': [6, 3],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');



    //UGC R05 Alt C D Full Aq
    map.addLayer({
      'id': 'ugc_r05_altCD_aq',                               
      source: 'ugc_mitigation_linework',  
      filter: ["all",['==', 'Alt', 'C D'],['==', 'Reach', '05'], ['==','Type', 'Acquisition']],
      'type': 'line',        
      'paint': {
         'line-color': '#00FFCF', 
         'line-width': 3,
         'line-opacity': 0.8,
         'line-dasharray': [6, 3],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');




//struct area
    map.addLayer({
    id: 'ugc_r05_altABCD_struc1',
    source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',
    filter: ["all",['==', 'Reach', '05'],['==', 'Alt', 'A B C D']],
    type: 'fill',
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.3,
        'fill-color': '#FFFF4B',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');


//structe pattern
    map.addLayer({
    id: 'ugc_r05_altABCD_struc2',
     source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',
    type: 'fill',
    filter: ["all",['==', 'Reach', '05'],['==', 'Alt', 'A B C D']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.9,
        'fill-pattern': 'yellowstripe',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');

    
    
//struct Border

    map.addLayer({
      'id': 'ugc_r05_altABCD_struc3',                               
    source: 'ugc_mitigation_polygonwork',
    'source-layer': 'ugc_ugc_polyon_merge-5og7u1',   
      'type': 'line',
      filter: ["all",['==', 'Reach', '05'],['==', 'Alt', 'A B C D']],        
      'paint': {
         'line-width': 2.3,
         'line-color': '#FFFF4B', 
         'line-opacity': 0.7,
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');








// ---- UGC Reach 06 Alt A Outfall (text states open channel)
    map.addLayer({
    id: 'ugc_r06_altA_Outfall',
    source: 'ugc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Reach', '06'],['==','Alt','A']],
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
        'line-color': '#FF203F',
   
 },
   
  }, 'road-label-small');




    map.addLayer({
      'id': 'ugc_r06_altA_ease',                               
      source: 'ugc_mitigation_linework',  
      filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '06'], ['==','Type', 'Easement']],
      'type': 'line',        
      'paint': {
         'line-color': '#FF8B2D', 
         'line-width': 3,
         'line-opacity': 0.8,
         'line-dasharray': [6, 3],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------------Upper Goose Creek Flood Hazard------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
//--------------------------Twomile Canyon Creek Mitigation-----------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 




// ---- TMC Reach 01 Alt A Channel
    map.addLayer({
    id: 'tmc_r01_altA_Channel',
    source: 'tmc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '01'], ['==', 'Type', 'Contour']],
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
        'line-color': '#FF203F',
         
      }
   
  }, 'road-label-small');


    //UGC R01 Alt A Ease
    map.addLayer({
    id: 'tmc_r01_altA_Ease',
    source: 'tmc_mitigation_linework',  
       filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '01'], ['==', 'Type', 'Easement']],   
      'type': 'line',        
      'paint': {
         'line-color': '#FF8B2D', 
         'line-width': 3,
         'line-opacity': 0.8,
         'line-dasharray': [6, 3],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');



    //Culvert
    map.addLayer({
    id: 'tmc_r01_altA_Culvert',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
    type: 'fill',
    filter: ["all",['==', 'Reach', '01'],['==','Alt', 'A'],['==', "Type", 'Culvert']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#b1a200',
        'fill-outline-color': '#635B00'
    }
  }, 'road-label-small');


// ---- TMC Reach 01 Alt A Wall
    map.addLayer({
    id: 'tmc_r01_altA_Wall',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
    type: 'fill',
    filter: ["all",['==', 'Reach', '01'],['==','Alt', 'A'],['==', "Type", 'Wall']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#091A21',
        'fill-outline-color': '#091A21'
    }
  }, 'road-label-small');


//struct area
    map.addLayer({
    id: 'tmc_r01_altA_struc1',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
    filter: ["all",['==', 'Reach', '01'],['==', 'Alt', 'A B']],
    type: 'fill',
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.3,
        'fill-color': '#FFFF4B',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');


//structe pattern
    map.addLayer({
  id: 'tmc_r01_altA_struc2',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
    filter: ["all",['==', 'Reach', '01'],['==', 'Alt', 'A B']],
      type: 'fill',
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.9,
        'fill-pattern': 'yellowstripe',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');

    
    
//struct Border

    map.addLayer({
    id: 'tmc_r01_altA_struc3',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
      'type': 'line',
    filter: ["all",['==', 'Reach', '01'],['==', 'Alt', 'A B']],
      'paint': {
         'line-width': 2.3,
         'line-color': '#FFFF4B', 
         'line-opacity': 0.7,
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');














// ---- TMC Reach 01 Alt B Culverts
    map.addLayer({
    id: 'tmc_r01_altB_Culvert',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
    type: 'fill',
  filter: ["all",['==', 'Reach', '01'],['==','Alt', 'B'],['==', "Type", 'Culvert']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#b1a200',
        'fill-outline-color': '#635B00'
    }
  }, 'road-label-small');



// ---- TMC Reach 01 Alt B Detention "Open Channel"
    map.addLayer({
    id: 'tmc_r01_altB_detention',
    source: 'tmc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Reach', '01'],['==', 'Alt', 'B']],
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














// ---- TMC Reach 02 Alt A Channel 
    map.addLayer({
    id: 'tmc_r02_altA_Channel',
    source: 'tmc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '02'], ['==', 'Type', 'Contour']],
       layout: {
        'visibility': 'none',
         'line-join': 'round',
         'line-cap': 'round'
       },
        'paint': {
          'line-width': {
               "stops": [[15, 0.25], [17, 0.6], [19, 1]]
          },
        'line-color': '#FF203F',
         
      }
   
  }, 'road-label-small');


// ---- TMC Reach 02 Alt A Culvert
    map.addLayer({
    id: 'tmc_r02_altA_Culvert',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2', 
    type: 'fill',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '02'], ['==', 'Type', 'Culvert']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#b1a200',
        'fill-outline-color': '#635B00'
    }
  }, 'road-label-small');




// ---- TMC Reach 02 Alt A Wall
    map.addLayer({
    id: 'tmc_r02_altA_Wall',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
    type: 'fill',
    filter: ["all",['==', 'Reach', '02'],['==','Alt', 'A'],['==', "Type", 'Wall']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#091A21',
        'fill-outline-color': '#091A21'
    }
  }, 'road-label-small');


    //UGC R01 Alt A Ease
    map.addLayer({
    id: 'tmc_r02_altA_Ease',
    source: 'tmc_mitigation_linework',  
       filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '02'], ['==', 'Type', 'Easement']],   
      'type': 'line',        
      'paint': {
         'line-color': '#FF8B2D', 
         'line-width': 3,
         'line-opacity': 0.8,
         'line-dasharray': [6, 3],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');



//struct area
    map.addLayer({
    id: 'tmc_r02_altA_struc1',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
     type: 'fill',
    filter: ["all",['==', 'Reach', '02'],['==', 'Alt', 'A B']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.3,
        'fill-color': '#FFFF4B',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');


//structe pattern
    map.addLayer({
  id: 'tmc_r02_altA_struc2',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
    filter: ["all",['==', 'Reach', '02'],['==', 'Alt', 'A B']],
      type: 'fill',
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.9,
        'fill-pattern': 'yellowstripe',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');

    
    
//struct Border

    map.addLayer({
    id: 'tmc_r02_altA_struc3',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2' ,
      'type': 'line',
  filter: ["all",['==', 'Reach', '02'],['==', 'Alt', 'A B']],     
      'paint': {
         'line-width': 2.3,
         'line-color': '#FFFF4B', 
         'line-opacity': 0.7,
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');





















// ---- TMC Reach 02 Alt B Channel 
    map.addLayer({
    id: 'tmc_r02_altB_Channel',
    source: 'tmc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'B'],['==', 'Reach', '02'], ['==', 'Type', 'Contour']],
       layout: {
        'visibility': 'none',
         'line-join': 'round',
         'line-cap': 'round'
       },
        'paint': {
          'line-width': {
               "stops": [[15, 0.25], [17, 0.6], [19, 1]]
          },
        'line-color': '#FF203F',
         
      }
   
  }, 'road-label-small');


// ---- TMC Reach 02 Alt B Culvert
    map.addLayer({
    id: 'tmc_r02_altB_Culvert',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2', 
    type: 'fill',
    filter: ["all",['==', 'Alt', 'B'],['==', 'Reach', '02'], ['==', "Type", 'Culvert']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#b1a200',
        'fill-outline-color': '#635B00'
    }
  }, 'road-label-small');


// ---- TMC Reach 02 Alt B Wall
    map.addLayer({
    id: 'tmc_r02_altB_Wall',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
    type: 'fill',
    filter: ["all",['==', 'Reach', '02'],['==','Alt', 'B'],['==', "Type", 'Wall']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#091A21',
        'fill-outline-color': '#091A21'
    }
  }, 'road-label-small');


//struct area
    map.addLayer({
    id: 'tmc_r02_altB_struc1',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
     type: 'fill',
    filter: ["all",['==', 'Reach', '02'],['==', 'Alt', 'A B']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.3,
        'fill-color': '#FFFF4B',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');


//structe pattern
    map.addLayer({
  id: 'tmc_r02_altB_struc2',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
    filter: ["all",['==', 'Reach', '02'],['==', 'Alt', 'A B']],
      type: 'fill',
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.9,
        'fill-pattern': 'yellowstripe',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');

    
//struct Border
    map.addLayer({
    id: 'tmc_r02_altB_struc3',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2' ,
      'type': 'line',
  filter: ["all",['==', 'Reach', '02'],['==', 'Alt', 'A B']],     
      'paint': {
         'line-width': 2.3,
         'line-color': '#FFFF4B', 
         'line-opacity': 0.7,
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');












// ---- TMC Reach 03 Alt A Channel 
    map.addLayer({
    id: 'tmc_r03_altA_Channel',
    source: 'tmc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '03'],['==', 'Type', 'Contour']],
       layout: {
        'visibility': 'none',
         'line-join': 'round',
         'line-cap': 'round'
       },
        'paint': {
          'line-width': {
               "stops": [[15, 0.25], [17, 0.6], [19, 1]]
          },
        'line-color': '#FF203F',
         
      }
   
  }, 'road-label-small');


// ---- TMC Reach 03 Alt A Culvert
    map.addLayer({
    id: 'tmc_r03_altA_Culvert',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2', 
    type: 'fill',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '03'], ['==', 'Type', 'Culvert']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#b1a200',
        'fill-outline-color': '#635B00'
    }
  }, 'road-label-small');


// ---- TMC Reach 02 Alt B Wall
    map.addLayer({
    id: 'tmc_r03_altA_Wall',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
    type: 'fill',
    filter: ["all",['==', 'Reach', '03'],['==','Alt', 'A'],['==', "Type", 'Wall']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#091A21',
        'fill-outline-color': '#091A21'
    }
  }, 'road-label-small');


    map.addLayer({
    id: 'tmc_r03_altA_Ease',
    source: 'tmc_mitigation_linework',  
       filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '03'], ['==', 'Type', 'Easement']],   
      'type': 'line',        
      'paint': {
         'line-color': '#FF8B2D', 
         'line-width': 3,
         'line-opacity': 0.8,
         'line-dasharray': [6, 3],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');

//struct area
    map.addLayer({
    id: 'tmc_r03_altA_struc1',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
     type: 'fill',
    filter: ["all",['==', 'Reach', '03'],['==', 'Alt', 'A B']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.3,
        'fill-color': '#FFFF4B',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');


//structe pattern
    map.addLayer({
  id: 'tmc_r03_altA_struc2',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
    filter: ["all",['==', 'Reach', '03'],['==', 'Alt', 'A B']],
      type: 'fill',
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.9,
        'fill-pattern': 'yellowstripe',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');

    
//struct Border
    map.addLayer({
    id: 'tmc_r03_altA_struc3',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2' ,
      'type': 'line',
  filter: ["all",['==', 'Reach', '03'],['==', 'Alt', 'A B']],     
      'paint': {
         'line-width': 2.3,
         'line-color': '#FFFF4B', 
         'line-opacity': 0.7,
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');











// ---- TMC Reach 03 Alt B Channel 
    map.addLayer({
    id: 'tmc_r03_altB_Channel',
    source: 'tmc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'B'],['==', 'Reach', '03'],['==', 'Type', 'Contour']],
       layout: {
        'visibility': 'none',
         'line-join': 'round',
         'line-cap': 'round'
       },
        'paint': {
          'line-width': {
               "stops": [[15, 0.25], [17, 0.6], [19, 1]]
          },
        'line-color': '#FF203F',
         
      }
   
  }, 'road-label-small');


// ---- TMC Reach 03 Alt A Culvert
    map.addLayer({
    id: 'tmc_r03_altB_Culvert',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2', 
    type: 'fill',
    filter: ["all",['==', 'Alt', 'B'],['==', 'Reach', '03'], ['==', 'Type', 'Culvert']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#b1a200',
        'fill-outline-color': '#635B00'
    }
  }, 'road-label-small');



    map.addLayer({
    id: 'tmc_r03_altB_Ease',
    source: 'tmc_mitigation_linework',  
       filter: ["all",['==', 'Alt', 'B'],['==', 'Reach', '03'], ['==', 'Type', 'Easement']],   
      'type': 'line',        
      'paint': {
         'line-color': '#FF8B2D', 
         'line-width': 3,
         'line-opacity': 0.8,
         'line-dasharray': [6, 3],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');




//struct area
    map.addLayer({
    id: 'tmc_r03_altB_struc1',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
     type: 'fill',
    filter: ["all",['==', 'Reach', '03'],['==', 'Alt', 'A B']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.3,
        'fill-color': '#FFFF4B',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');


//structe pattern
    map.addLayer({
  id: 'tmc_r03_altB_struc2',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
    filter: ["all",['==', 'Reach', '03'],['==', 'Alt', 'A B']],
      type: 'fill',
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.9,
        'fill-pattern': 'yellowstripe',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');

    
//struct Border
    map.addLayer({
    id: 'tmc_r03_altB_struc3',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2' ,
      'type': 'line',
  filter: ["all",['==', 'Reach', '03'],['==', 'Alt', 'A B']],     
      'paint': {
         'line-width': 2.3,
         'line-color': '#FFFF4B', 
         'line-opacity': 0.7,
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');









// ---- TMC Reach 03 Alt C Channel 
    map.addLayer({
    id: 'tmc_r03_altC_Channel',
    source: 'tmc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'C'],['==', 'Reach', '03'],['==', 'Type', 'Contour']],
       layout: {
        'visibility': 'none',
         'line-join': 'round',
         'line-cap': 'round'
       },
        'paint': {
          'line-width': {
               "stops": [[15, 0.25], [17, 0.6], [19, 1]]
          },
        'line-color': '#FF203F',
         
      }
   
  }, 'road-label-small');



// ---- TMC Reach 03 Alt C Culvert
    map.addLayer({
    id: 'tmc_r03_altC_Culvert',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2', 
    type: 'fill',
    filter: ["all",['==', 'Alt', 'C'],['==', 'Reach', '03'], ['==', 'Type', 'Culvert']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#b1a200',
        'fill-outline-color': '#635B00'
    }
  }, 'road-label-small');



    map.addLayer({
    id: 'tmc_r03_altC_Ease',
    source: 'tmc_mitigation_linework',  
       filter: ["all",['==', 'Alt', 'C'],['==', 'Reach', '03'], ['==', 'Type', 'Easement']],   
      'type': 'line',        
      'paint': {
         'line-color': '#FF8B2D', 
         'line-width': 3,
         'line-opacity': 0.8,
         'line-dasharray': [6, 3],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');











// ---- TMC Reach 03 Alt D Channel 
    map.addLayer({
    id: 'tmc_r03_altD_Channel',
    source: 'tmc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'D'],['==', 'Reach', '03'],['==', 'Type', 'Contour']],
       layout: {
        'visibility': 'none',
         'line-join': 'round',
         'line-cap': 'round'
       },
        'paint': {
          'line-width': {
               "stops": [[15, 0.25], [17, 0.6], [19, 1]]
          },

        'line-color': '#FF203F',
         
      }
   
  }, 'road-label-small');



// ---- TMC Reach 03 Alt D Culvert
    map.addLayer({
    id: 'tmc_r03_altD_Culvert',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2', 
    type: 'fill',
    filter: ["all",['==', 'Alt', 'D'],['==', 'Reach', '03'], ['==', 'Type', 'Culvert']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#b1a200',
        'fill-outline-color': '#635B00'
    }
  }, 'road-label-small');





// ---- TMC Reach 03 Alt D Detention
    map.addLayer({
    id: 'tmc_r03_altD_detention',
    source: 'tmc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'D'],['==', 'Reach', '03'],['==', 'Type', 'Detention']],
    layout: {
      'visibility': 'none',
      'line-join': 'round',
      'line-cap': 'round'
    },
      'paint': {
        'line-width': {
            "stops": [[15, 0.25], [17, 0.75], [19, 1 ]]
        },
        'line-color': '#FF00C3', 
          
      }
   
  }, 'road-label-small');




// ---- TMC Reach 03 Alt D Outfall 
    map.addLayer({
    id: 'tmc_r03_altD_outfall',
    source: 'tmc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'D'],['==', 'Reach', '03'],['==', 'Type', 'Storm Drain']],
    layout: {
      'visibility': 'none',
    },
      'paint': {
        'line-width': 5,
        'line-color': '#00687A',
          
      }
   
  }, 'road-label-small');




    map.addLayer({
    id: 'tmc_r03_altD_Ease',
    source: 'tmc_mitigation_linework',  
       filter: ["all",['==', 'Alt', 'D'],['==', 'Reach', '03'], ['==', 'Type', 'Easement']],   
      'type': 'line',        
      'paint': {
         'line-color': '#FF8B2D', 
         'line-width': 3,
         'line-opacity': 0.8,
         'line-dasharray': [6, 3],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');















// ---- TMC Reach 04 Alt A Culvert
    map.addLayer({
    id: 'tmc_r04_altA_Culvert',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2', 
    type: 'fill',
    filter: ["all",['==', 'Alt', 'A'],['==', 'Reach', '04'], ['==', 'Type', 'Culvert']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#b1a200',
        'fill-outline-color': '#635B00'
    }
  }, 'road-label-small');













// ---- TMC Reach 04 Alt B Channel 
    map.addLayer({
    id: 'tmc_r04_altB_Channel',
    source: 'tmc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'B'],['==', 'Reach', '04'], ['==', 'Type', 'Contour']],
       layout: {
        'visibility': 'none',
         'line-join': 'round',
         'line-cap': 'round'
       },
        'paint': {
          'line-width': {
               "stops": [[15, 0.25], [17, 0.6], [19, 1]]
          },

        'line-color': '#FF203F',
         
      }
   
  }, 'road-label-small');


// ---- TMC Reach 04 Alt B Culvert
    map.addLayer({
    id: 'tmc_r04_altB_Culvert',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2', 
    type: 'fill',
    filter: ["all",['==', 'Alt', 'B'],['==', 'Reach', '04'], ['==', 'Type', 'Culvert']],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.95,
        'fill-color': '#b1a200',
        'fill-outline-color': '#635B00'
    }
  }, 'road-label-small');


    map.addLayer({
    id: 'tmc_r04_altB_Ease',
    source: 'tmc_mitigation_linework',  
       filter: ["all",['==', 'Alt', 'B'],['==', 'Reach', '04'], ['==', 'Type', 'Easement']],   
      'type': 'line',        
      'paint': {
         'line-color': '#FF8B2D', 
         'line-width': 3,
         'line-opacity': 0.8,
         'line-dasharray': [6, 3],
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');

//struct area
    map.addLayer({
    id: 'tmc_r04_altB_struc1',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
     type: 'fill',
    filter: ["all",['==', 'Reach', '04'],['==', 'Alt', 'B'],['==', 'Type', "Structure Protected"]],
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.3,
        'fill-color': '#FFFF4B',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');


//structe pattern
    map.addLayer({
  id: 'tmc_r04_altB_struc2',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2',
    filter: ["all",['==', 'Reach', '04'],['==', 'Alt', 'B'],['==', 'Type', "Structure Protected"]],
      type: 'fill',
    layout: {
        'visibility': 'none'
      },
    paint: {
        'fill-opacity': 0.9,
        'fill-pattern': 'yellowstripe',
        'fill-outline-color': '#FFFF4B'
    }
  }, 'road-label-small');

    
//struct Border
    map.addLayer({
    id: 'tmc_r04_altB_struc3',
    source: 'tmc_mitigation_polygonwork',
    'source-layer': 'ugc_tmc_polygon_merge-b4mlf2' ,
      'type': 'line',
    filter: ["all",['==', 'Reach', '04'],['==', 'Alt', 'B'],['==', 'Type', "Structure Protected"]],    
      'paint': {
         'line-width': 2.3,
         'line-color': '#FFFF4B', 
         'line-opacity': 0.7,
       },
      'layout': {'visibility': 'none'}
    },'road-label-small');














// ---- TMC Reach 04 Alt C Strom Drain Detained Flow
    map.addLayer({
    id: 'tmc_r04_altC_StormDrain_Detained',
    source: 'tmc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'C'],['==', 'Reach', '04']],
    layout: {
      'visibility': 'none',
      'line-join': 'round',
      'line-cap': 'round'
    },
      'paint': {
        'line-width': 8,
        'line-color': '#00687A',
        },

  }, 'road-label-small');


// ---- TMC Reach 04 Alt D Strom Drain Full Flow
    map.addLayer({
    id: 'tmc_r04_altD_StormDrain_Full',
    source: 'tmc_mitigation_linework', 
    type: 'line',
    filter: ["all",['==', 'Alt', 'D'],['==', 'Reach', '04']],
    layout: {
      'visibility': 'none',
      'line-join': 'round',
      'line-cap': 'round'
    },
      'paint': {
        'line-width': 8,
        'line-color': '#00687A',
        },
   
  }, 'road-label-small');









/*
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
        'line-color': '#FF203F',
          
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
        'line-color': '#FF203F',
          
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
        'line-color': '#FF203F',
          
      }
   
  }, 'road-label-small');
*/




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------------Twomile Canyon Creek Flood Hazard---------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
        'fill-opacity': 0.65,
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
        'fill-color': '#00BBFF',
        'fill-outline-color': '#00BBFF'
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
              "stops": [[15, 1.6], [17, 2.7], [19, 4]]
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



//get extents of a layer
function getBoundingBox (data) {
  var bounds = {}, coords, point, latitude, longitude;

  // We want to use the “features” key of the FeatureCollection (see above)
  data = data.features;

  // Loop through each “feature”
  for (var i = 0; i < data.length; i++) {

    // Pull out the coordinates of this feature
    coords = data[i].geometry.coordinates[0];

    // For each individual coordinate in this feature's coordinates…
    for (var j = 0; j < coords.length; j++) {

      longitude = coords[j][0];
      latitude = coords[j][1];

      // Update the bounds recursively by comparing the current
      // xMin/xMax and yMin/yMax with the coordinate
      // we're currently checking
      bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
      bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
      bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
      bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
    }

  }

  // Returns an object that contains the bounds of this GeoJSON
  // data. The keys of this object describe a box formed by the
  // northwest (xMin, yMin) and southeast (xMax, yMax) coordinates.
  return bounds;
}


//Change map zoom and pov
document.getElementById('UGC_Zoom').addEventListener('click', function() {

  var bbox = [[-105.289,40.0212], [-105.263,40.031]];
  map.fitBounds(bbox, { padding: 10 });


});

document.getElementById('TMC_Zoom').addEventListener('click', function() {

  var bbox = [[-105.295,40.0259], [-105.265,40.0425]];
  map.fitBounds(bbox, { padding:10 });

});







// When a click event occurs near the feature open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (k) {
  var featureList = map.queryRenderedFeatures(k.point, { layers: ['storm', 'ugc_xs','COB_Easements', '2016_SWMP','ugc_r01_altA_detention', 'ugc_r06_altA_Outfall', 'ugc_r05_altC_Channel', 'ugc_r05_altD_Channel'] });
  if (!featureList.length) {
      return;
  }

  var feature = featureList[0];
  var id = feature.layer.id;
     

     if ((id == 'storm') || (id == '2016_SWMP')){
        var popup = new mapboxgl.Popup()
            .setLngLat(k.lngLat)
            .setHTML('DIAMETER: ' + feature.properties.DIAMETER + ' in'+ '<br />' +
                     'LENGTH: ' + feature.properties.LENGTH + ' ft' + '<br />' +
                     'MATERIAL: ' + feature.properties.MATERIAL)
            .addTo(map);
          }

     if ((id == 'ugc_r01_altA_detention') || (id == 'ugc_r06_altA_Outfall') (id == 'ugc_r05_altC_Channel') || (id == 'ugc_r05_altD_Channel')){
        var popup = new mapboxgl.Popup()
            .setLngLat(k.lngLat)
            .setHTML('ELEVATION: ' + feature.properties.ELEVATION + ' ft')
            .addTo(map);
          }

     if (id == 'COB_Easements'){
        var popup = new mapboxgl.Popup()
            .setLngLat(k.lngLat)
            .setHTML('CATEGORY: ' + feature.properties.REG_TYP1 + '<br />' +
                     'TYPE: ' + feature.properties.EAS_TYP1 + '<br />' +
                     'DESCRIPTION: ' + feature.properties.NAM1)
            .addTo(map);
          }


      else if (id == 'ugc_xs') {
        var popup = new mapboxgl.Popup()
            .setLngLat(k.lngLat)
            .setHTML('<b>' + feature.properties.RiverCode + ' Cross Section ' + feature.properties.ProfileM + '</b> <br />' +
                     '<b>100-Year: ' + feature.properties.P001.toFixed(2) + '</b> <br />' +
                     'Floodway: ' + feature.properties.P002.toFixed(2)  )
            .addTo(map);
      }
    });






// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (k) {
    var featureList = map.queryRenderedFeatures(k.point, { layers: ['storm', 'ugc_xs', 'COB_Easements', '2016_SWMP','ugc_r01_altA_detention', 'ugc_r06_altA_Outfall', 'ugc_r05_altC_Channel', 'ugc_r05_altD_Channel'] });
    map.getCanvas().style.cursor = (featureList.length) ? 'pointer' : '';
});


map.addControl(new mapboxgl.NavigationControl(), 'top-right');
