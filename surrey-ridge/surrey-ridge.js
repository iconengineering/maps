//This will not change
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';



//Satellite Steets
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cixrrcbd1000r2ro6dj7z1fot',
    zoom: 14.25,
    hash: true,
    center: [-104.8874, 39.5003]
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

  //local
  map.addSource('contours', {
      type: 'geojson',
      'data': 'SYR_Contours_2.geojson'
  });


  map.addSource('parcels', {
      'type': 'vector',
      'url': 'mapbox://iconeng.2304dari'
  });


  map.addSource('parcelOutline', {
      'type': 'vector',
      'url': 'mapbox://iconeng.bn2rfkaa'
  });

 
  map.addSource('estTrailLines', {
      'type': 'vector',
      'url': 'mapbox://iconeng.a5wz1jiu'
  });






  map.addLayer({
        'id': '5ftContours',
        'type': 'line',
        'source': 'contours',
        'filter': ['==', 'Index', 5],
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': { 
            'line-width': 0.7,
            'line-color': '#484848',
            'line-opacity':.2
        }
    },'road-label-small');

    map.addLayer({
        'id': '10ftContours',
        'type': 'line',
        'source': 'contours',
        'filter': ['==', 'Index', 10],
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': { 
            'line-width': 0.7,
            'line-color': '#484848',
            'line-opacity':.2
        }
    },'road-label-small');
    

    map.addLayer({
        'id': '20ftContours',
        'type': 'line',
        'source': 'contours',
        'filter': ['==', 'Index', 20],
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-width': 0.7,
            'line-color': '#484848',
            'line-opacity':.2
        }
    },'road-label-small');
   
   
    map.addLayer({
        'id': '20ftLabels',
        'type': 'symbol',
        'source': 'contours',
        'filter': ['==', 'Index', 20],
        'layout': {
          'visibility': 'none',
          'symbol-placement': 'line',
          'text-field': '{CONTOUR}',
          'text-size': 11
        },
        'paint': {
          'text-color': '#000',
          'text-halo-color': 'rgba(255,255,255,0.9)',
          'text-halo-width': 1,
          'text-halo-blur': 1
        }
    },'road-label-small');
    
    map.addLayer({
      'id': 'PropertyLines',                               
      'source': 'parcels',
      'source-layer': 'SYR_Parcel_Adrs-52e608',     
      'type': 'line',        
      'paint': {
         'line-color': '#3D5C85', 
         'line-width': 0.8
       },
      'layout': {'visibility': 'visible'}
    },'road-label-small');


      
    map.addLayer({
      'id': 'TrailLines',
      'type': 'line',
      'source': 'estTrailLines',
      'source-layer': 'SYR_TrailLines-dmyz56',
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
          'line-width': 3.0,
          'line-color': '#E60019',
          'line-dasharray': [2, 1, 1, 1]
      }
    },'road-label-small');

    map.addLayer({
      'id': 'TrailNames',
       'type': 'symbol',                                
       'source': 'estTrailLines',
       'source-layer': 'SYR_TrailLines-dmyz56',
       'layout': {
         'visibility': 'visible',
         'symbol-placement': 'line',
         'text-field': '{Name}',
         'text-font': ['Open Sans Bold','Arial Unicode MS Regular'],
         'text-size': 11
          },
       'paint': {
         'text-color': 'rgb(255,255,255)',
         'text-halo-color': 'rgb(0,0,0)',
         'text-halo-width': 1.5
        }
   },'road-label-small');


    map.addLayer({
      'id': 'Address',
       'type': 'symbol',                                
       'source': 'parcels',
       'source-layer': 'SYR_Parcel_Adrs-52e608',
       'layout': {
         'visibility': 'none',
         //'symbol-placement': 'line',
         'text-field': '{STREET_N_1}',
         'text-font': ['Open Sans Bold','Arial Unicode MS Regular'],
         'text-size': 10
          },
       'paint': {
         'text-color': 'rgb(0,0,0)',
         'text-halo-color': 'rgb(0255,255,255)',
         'text-halo-width': 0.7
        }
   },'road-label-small');






});



map.addControl(new mapboxgl.NavigationControl(), 'top-right');
