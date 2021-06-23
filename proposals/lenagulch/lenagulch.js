mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
  zoom: 14.5,
  center: [-105.2071, 39.7163],
  hash: true,
  preserveDrawingBuffer: true
});

// var layerList = document.getElementById('menu');
// var inputs = layerList.getElementsByTagName('input');

// function switchLayer(layer) {
//   var layerId = layer.target.value;
//   map.setStyle('mapbox://styles/iconeng/' + layerId);
//   $('.layer-off').prop('checked', false);
//   $('.layer-on').prop('checked', true);
// }

// for (var i = 0; i < inputs.length; i++) {
//   inputs[i].onclick = switchLayer;
// }

$(document).ready(function() {
  $("#clear").click(function() {
    var checkBoxes = $("input[type=checkbox]");
    checkBoxes.prop("checked", false);
  });
});

map.on('style.load', function(e) {

  map.addSource('nfhl', {
    type: 'geojson',
    "data": 'data/nfhl.geojson'
  });

  //  NHFL Floodplain Outline
  map.addLayer({
    'id': 'nfhl-fp-line',
    'type': 'line',
    'source': 'nfhl',
    'paint': {
      'line-width': 0.5,
      'line-opacity': 0.5,
      'line-color': 'black',
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //  NFHL Floodplain 100yr Hatch
  map.addLayer({
    'id': 'nfhl-100yr-hatch',
    'type': 'fill',
    'source': 'nfhl',
    'filter': ["all",
      ["!in", "ZONE_SUBTY", "FLOODWAY"],
      ["in", "FLD_ZONE", 'A', 'AE', 'AO']
    ],
    'paint': {
      'fill-color': 'rgb(0,230,255)',
      'fill-opacity': 0.3,
    },
    'layout': {
      'visibility': 'visible',
    }
  });

  // NFHL Floodplain 500yr Hatch
  map.addLayer({
    'id': 'nfhl-500yr-hatch',
    'type': 'fill',
    'source': 'nfhl',
    'filter': ['==', "ZONE_SUBTY", "0.2 PCT ANNUAL CHANCE FLOOD HAZARD"],
    'paint': {
      'fill-color': 'rgb(255,128,0)',
      'fill-opacity': 0.3,
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //  NFHL Floodplain Floodway Hatch
  map.addLayer({
    'id': 'nfhl-fldwy',
    'type': 'fill',
    'source': 'nfhl',
    'filter': ['in', "ZONE_SUBTY", "FLOODWAY"],
    'paint': {
      'fill-color': 'purple',
      'fill-opacity': 0.3,
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  map.addSource('crossStructure', {
    type: 'geojson',
    "data": 'data/crossingstructures.geojson'
  });


  //Other crossings that aren't yellow from filter below
  map.addLayer({
    'id': 'crossStructure-fill',
    'type': 'fill',
    'source': 'crossStructure',
    'filter': ['!in', "Photo", 'Photo1', 'Photo2'],
    'paint': {
      'fill-opacity': 0.5,
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //Highlight features with yellow fill for Photo 1 and Photo 2
  map.addLayer({
    'id': 'crossStructure-fill-yellow',
    'type': 'fill',
    'source': 'crossStructure',
    'filter': ['in', "Photo", 'Photo1', 'Photo2'],
    'paint': {
      'fill-opacity': 0.5,
      'fill-color': '#FFFF00',
    },
    'layout': {
      'visibility': 'visible'
    }
  });


    // Crossing STructures
    map.addLayer({
      'id': 'crossStructure-outline',
      'type': 'line',
      'source': 'crossStructure',
      'layout': {
        'visibility': 'visible'
      }
    });

  map.addSource('lena-cl', {
    type: 'geojson',
    "data": 'data/lenagulch-cl.geojson'
  });

  //Drainageway centerline
  map.addLayer({
    'id': 'lena-cl',
    'type': 'line',
    'source': 'lena-cl',
    'paint': {
      'line-width': 2,
      'line-opacity': 1,
      'line-color': 'rgba(0,77,168,1)'
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //Drainageway Centerline LABEL
  map.addLayer({
    'id': 'lena-cl-labels',
    'type': 'symbol',
    'source': 'lena-cl',
    'layout': {
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{DWAY_NAME}',
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

  map.addSource('apex-cl', {
    type: 'geojson',
    "data": 'data/apex-cl.geojson'
  });

  //Drainageway centerline
  map.addLayer({
    'id': 'apex-cl',
    'type': 'line',
    'source': 'apex-cl',
    'paint': {
      'line-width': 1,
      'line-opacity': 1,
      'line-color': 'rgba(0,77,168,1)'
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  //Drainageway Centerline LABEL
  map.addLayer({
    'id': 'apex-cl-labels',
    'type': 'symbol',
    'source': 'apex-cl',
    'layout': {
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{DWAY_NAME}',
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

  map.addSource('prj-limits', {
    type: 'geojson',
    "data": 'data/prjlimits.geojson'
  });

  //Project Limits
  map.addLayer({
    'id': 'prj-limits',
    'type': 'line',
    'source': 'prj-limits',
    'paint': {
      'line-width': 3,
      'line-opacity': 1,
      'line-color': '#000000'
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  map.addSource('eff-discharges', {
    type: 'geojson',
    "data": 'data/eff-discharges.geojson'
  });

  //Effective Discharges
  map.addLayer({
    'id': 'eff-discharges',
    'type': 'line',
    'source': 'eff-discharges',
    'paint': {
      'line-width': 7,
      'line-opacity': 1,
      'line-color': 'rgba(0,77,168,1)'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  //Load all parcels

  map.addSource('parcel-golden', {
    type: 'geojson',
    "data": 'data/parcels-golden.geojson'
  });
  map.addSource('parcel-jeffco', {
    type: 'geojson',
    "data": 'data/parcels-jeffco.geojson'
  });
  map.addSource('parcel-mm', {
    type: 'geojson',
    "data": 'data/parcels-mm.geojson'
  });
  map.addSource('parcel-private', {
    type: 'geojson',
    "data": 'data/parcels-private.geojson'
  });
  map.addSource('parcel-row', {
    type: 'geojson',
    "data": 'data/parcels-row.geojson'
  });


  // City of Golden Parcels
  map.addLayer({
    'id': 'parcel-golden',
    'type': 'fill',
    'source': 'parcel-golden',
    'paint': {
      'fill-opacity': 0.5,
      'fill-color': 'rgb(56,168,0)',
    },
    'layout': {
      'visibility': 'none'
    }
  });

  // Jefferson County Parcels
  map.addLayer({
    'id': 'parcel-jeffco',
    'type': 'fill',
    'source': 'parcel-jeffco',
    'paint': {
      'fill-opacity': 0.5,
      'fill-color': 'rgb(38,115,0)'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  // Martin Marietta Parcels
  map.addLayer({
    'id': 'parcel-mm',
    'type': 'fill',
    'source': 'parcel-mm',
    'paint': {
      'fill-opacity': 0.5,
      'fill-color': 'rgb(198,225,245)'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  // Private Parcels
  map.addLayer({
    'id': 'parcel-private',
    'type': 'fill',
    'source': 'parcel-private',
    'paint': {
      'fill-opacity': 0.5,
      'fill-color': 'rgb(247,239,208)'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  // R-O-W Parcels
  map.addLayer({
    'id': 'parcel-row',
    'type': 'fill',
    'source': 'parcel-row',
    'paint': {
      'fill-opacity': 0.5,
      'fill-color': 'rgb(255,190,190)'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  //Jefferson County Label
  map.addSource('parcel-jeffco-cent', {
    type: 'geojson',
    "data": 'data/parcels-jeffco-cent.geojson'
  });

  map.addLayer({
    'id': 'parcel-jeffco-label',
    'type': 'symbol',
    'source': 'parcel-jeffco-cent',
    'layout': {
      "visibility": 'none',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{OWNNAM}",
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-offset": [0, 1],
      "text-anchor": "top"
    },
    "paint": {
      "text-color": 'rgb(38,115,0)',
      "text-halo-color": "#000000",
      "text-halo-width": 1.5,
    }
  });

  //City of Golden Labels
  map.addSource('parcel-golden-cent', {
    type: 'geojson',
    "data": 'data/parcels-golden-cent.geojson'
  });

  map.addLayer({
    'id': 'parcel-golden-label',
    'type': 'symbol',
    'source': 'parcel-golden-cent',
    'layout': {
      "visibility": 'none',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{OWNNAM}",
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-offset": [0, 1],
      "text-anchor": "top"
    },
    "paint": {
      "text-color": 'rgb(56,168,0)',
      "text-halo-color": "#000000",
      "text-halo-width": 1.5,
    }
  });

  //City of Golden Labels
  map.addSource('parcel-mm-cent', {
    type: 'geojson',
    "data": 'data/parcels-mm-cent.geojson'
  });

  map.addLayer({
    'id': 'parcel-mm-label',
    'type': 'symbol',
    'source': 'parcel-mm-cent',
    'layout': {
      "visibility": 'none',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{OWNNAM}",
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-offset": [0, 1],
      "text-anchor": "top"
    },
    "paint": {
      "text-color": 'rgb(198,225,245)',
      "text-halo-color": "#000000",
      "text-halo-width": 1.5,
    }
  });

  //Private Labels
  map.addSource('parcel-private-cent', {
    type: 'geojson',
    "data": 'data/parcels-private-cent.geojson'
  });

  map.addLayer({
    'id': 'parcel-private-label',
    'type': 'symbol',
    'source': 'parcel-private-cent',
    'layout': {
      "visibility": 'none',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{OWNNAM}",
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-offset": [0, 1],
      "text-anchor": "top"
    },
    "paint": {
      "text-color": 'rgb(255,190,190)',
      "text-halo-color": "#000000",
      "text-halo-width": 1.5,
    }
  });

  //Right of way Labels
  map.addSource('parcel-row-cent', {
    type: 'geojson',
    "data": 'data/parcels-row-cent.geojson'
  });

  map.addLayer({
    'id': 'parcel-row-label',
    'type': 'symbol',
    'source': 'parcel-row-cent',
    'layout': {
      "visibility": 'none',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{OWNNAM}",
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-offset": [0, 1],
      "text-anchor": "top"
    },
    "paint": {
      "text-color": 'rgb(255,190,190)',
      "text-halo-color": "#000000",
      "text-halo-width": 1.5,
    }
  });

  //Regional Parks
  map.addSource('regionalparks', {
    type: 'geojson',
    "data": 'data/regionalparks.geojson'
  });

  map.addLayer({
    'id': 'regionalparks',
    'type': 'symbol',
    'source': 'regionalparks',
    'layout': {
      'visibility': 'visible',
      "icon-image": 'park-15',
      "icon-size": 1
    }
  });

  //Regional Park LABEL
  map.addLayer({
    'id': 'regionalparks-labels',
    'type': 'symbol',
    'source': 'regionalparks',
    'layout': {
      'text-field': '{Label}',
      'text-size': 16,
      'text-offset': [0, 2]
    },
    'paint': {
      'text-color': '#355e3b',
      'text-halo-color': '#ffffff',
      'text-halo-width': 2,
      'text-halo-blur': 1
    }
  });

  //WQ
  map.addSource('futWQ', {
    type: 'geojson',
    "data": 'data/futWQ.geojson'
  });

  map.addLayer({
    'id': 'futWQ',
    'type': 'symbol',
    'source': 'futWQ',
    'layout': {
      'visibility': 'visible',
      "icon-image": 'plant-svgrepo-com',
      "icon-size": 0.075
    }
  });

  //Sidewalk Access
  map.addSource('sidewalkAccess', {
    type: 'geojson',
    "data": 'data/sidewalkaccess.geojson'
  });

  map.addLayer({
    'id': 'sidewalkAccess',
    'type': 'circle',
    'source': 'sidewalkAccess',
    'paint': {
      'circle-radius': 5.5,
    },
    'layout': {
      'visibility': 'none'
    }
  });

  //Future Lena CL
  map.addSource('futureLenaCL', {
    type: 'geojson',
    "data": 'data/futureLenaCL.geojson'
  });

  map.addLayer({
    'id': 'futureLenaCL',
    'type': 'line',
    'source': 'futureLenaCL',
    'paint': {
      'line-width': 7,
      'line-opacity': 1,
      'line-color': 'rgba(0,77,168,1)'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  //Future Detention
  map.addSource('futureDetention', {
    type: 'geojson',
    "data": 'data/futureDetention.geojson'
  });

  map.addLayer({
    'id': 'futureDetention',
    'type': 'fill',
    'source': 'futureDetention',
    'paint': {
      'fill-opacity': 0.3,
    },
    'layout': {
      'visibility': 'none'
    }
  });

  //Future Removals
  map.addSource('futRemovals', {
    type: 'geojson',
    "data": 'data/futureRemovals.geojson'
  });

  map.addLayer({
    'id': 'futRemovals',
    'type': 'circle',
    'source': 'futRemovals',
    'paint': {
      'circle-radius': 5.5,
      'circle-color': 'red'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  //Future Trail
  map.addSource('futureTrails', {
    type: 'geojson',
    "data": 'data/futureTrails.geojson'
  });

  map.addLayer({
    'id': 'futureTrails',
    'type': 'line',
    'source': 'futureTrails',
    'paint': {
      'line-width': 3,
      'line-opacity': 1,
      'line-color': 'green',
      'line-dasharray': [4, 2]
    },
    'layout': {
      'visibility': 'none'
    }
  });

  map.addSource('parcel-fut-golden', {
    type: 'geojson',
    "data": 'data/parcels-fut-golden.geojson'
  });

  // Future City of Golden Parcels
  map.addLayer({
    'id': 'parcel-fut-golden',
    'type': 'fill',
    'source': 'parcel-fut-golden',
    'paint': {
      'fill-opacity': 0.5,
      'fill-color': 'rgb(56,168,0)',
    },
    'layout': {
      'visibility': 'none'
    }
  });

  map.addSource('parcel-fut-jeffco', {
    type: 'geojson',
    "data": 'data/parcels-fut-jeffco.geojson'
  });

  // Future Jefferson County Parcels
  map.addLayer({
    'id': 'parcel-fut-jeffco',
    'type': 'fill',
    'source': 'parcel-fut-jeffco',
    'paint': {
      'fill-opacity': 0.5,
      'fill-color': 'rgb(38,115,0)'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  map.addSource('parcel-fut-mm', {
    type: 'geojson',
    "data": 'data/parcels-fut-mm.geojson'
  });

  // Future Martin Marietta Parcels
  map.addLayer({
    'id': 'parcel-fut-mm',
    'type': 'fill',
    'source': 'parcel-fut-mm',
    'paint': {
      'fill-opacity': 0.5,
      'fill-color': 'rgb(198,225,245)'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  map.addSource('parcel-fut-private', {
    type: 'geojson',
    "data": 'data/parcels-fut-private.geojson'
  });

  // Future Private Parcels
  map.addLayer({
    'id': 'parcel-fut-private',
    'type': 'fill',
    'source': 'parcel-fut-private',
    'paint': {
      'fill-opacity': 0.5,
      'fill-color': 'rgb(247,239,208)'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  map.addSource('parcel-fut-row', {
    type: 'geojson',
    "data": 'data/parcels-fut-row.geojson'
  });


  // R-O-W Parcels
  map.addLayer({
    'id': 'parcel-fut-row',
    'type': 'fill',
    'source': 'parcel-fut-row',
    'paint': {
      'fill-opacity': 0.5,
      'fill-color': 'rgb(255,190,190)'
    },
    'layout': {
      'visibility': 'none'
    }
  });


  //Jefferson County Label
  map.addSource('parcel-fut-jeffco-cent', {
    type: 'geojson',
    "data": 'data/parcels-fut-jeffco-cent.geojson'
  });

  map.addLayer({
    'id': 'parcel-fut-jeffco-label',
    'type': 'symbol',
    'source': 'parcel-fut-jeffco-cent',
    'layout': {
      "visibility": 'none',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{OWNNAM}",
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-offset": [0, 1],
      "text-anchor": "top"
    },
    "paint": {
      "text-color": 'rgb(38,115,0)',
      "text-halo-color": "#000000",
      "text-halo-width": 1.5,
    }
  });


  //City of Golden Labels
  map.addSource('parcel-fut-golden-cent', {
    type: 'geojson',
    "data": 'data/parcels-fut-golden-cent.geojson'
  });

  map.addLayer({
    'id': 'parcel-fut-golden-label',
    'type': 'symbol',
    'source': 'parcel-fut-golden-cent',
    'layout': {
      "visibility": 'none',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{OWNNAM}",
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-offset": [0, 1],
      "text-anchor": "top"
    },
    "paint": {
      "text-color": 'rgb(56,168,0)',
      "text-halo-color": "#000000",
      "text-halo-width": 1.5,
    }
  });

  //MM Labels
  map.addSource('parcel-fut-mm-cent', {
    type: 'geojson',
    "data": 'data/parcels-fut-mm-cent.geojson'
  });

  map.addLayer({
    'id': 'parcel-fut-mm-label',
    'type': 'symbol',
    'source': 'parcel-fut-mm-cent',
    'layout': {
      "visibility": 'none',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{OWNNAME}",
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-offset": [0, 1],
      "text-anchor": "top"
    },
    "paint": {
      "text-color": 'rgb(198,225,245)',
      "text-halo-color": "#000000",
      "text-halo-width": 1.5,
    }
  });

  //Private Labels
  map.addSource('parcel-fut-private-cent', {
    type: 'geojson',
    "data": 'data/parcels-fut-private-cent.geojson'
  });

  map.addLayer({
    'id': 'parcel-fut-private-label',
    'type': 'symbol',
    'source': 'parcel-fut-private-cent',
    'layout': {
      "visibility": 'none',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{OWNNAM}",
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-offset": [0, 1],
      "text-anchor": "top"
    },
    "paint": {
      "text-color": 'rgb(255,190,190)',
      "text-halo-color": "#000000",
      "text-halo-width": 1.5,
    }
  });

  //Right of way Labels
  map.addSource('parcel-fut-row-cent', {
    type: 'geojson',
    "data": 'data/parcels-fut-row-cent.geojson'
  });

  map.addLayer({
    'id': 'parcel-fut-row-label',
    'type': 'symbol',
    'source': 'parcel-fut-row-cent',
    'layout': {
      "visibility": 'none',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{OWNNAM}",
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-offset": [0, 1],
      "text-anchor": "top"
    },
    "paint": {
      "text-color": 'rgb(255,190,190)',
      "text-halo-color": "#000000",
      "text-halo-width": 1.5,
    }
  });


  var style = map.getStyle();

  if (style.name != 'Outdoors') {
    map.setLayoutProperty('conduitArrows', 'icon-image', 'oneway-spaced-white-small');
  }


}); //end map load


//Use the same approach as above to indicate that the symbols are clickable by changing the cursor style to 'pointer'.
map.on('mousemove', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['crossStructure-fill', 'crossStructure-fill-yellow', 'eff-discharges', 'prj-limits']
  });
  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

// When a click event occurs near a marker icon, open a popup at the location of the feature, with description HTML from its properties.


//Structure Labels
map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['crossStructure-fill','crossStructure-fill-yellow']
  });
  if (!features.length) {
    return;
  }

  var feature = features[0];
  // var photoPath = path.join("images/"+feature.properties.Photo+".jpg");

  var popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('<h8><b>' + feature.properties.Street + ' Street</b>' + '<br><h8>Size: ' +
      feature.properties.Label + '</h8> <br>' + '<img src= "images/' + feature.properties.Photo + '.jpg" height=240px>')
    .addTo(map);
});

//Effective Discharge click
map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['eff-discharges']
  });
  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('<h8>' + 'Q-100: ' + feature.properties.Q100 + ' cfs</h8>')
    .addTo(map);
});

//Project Limits Label
map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['prj-limits']
  });
  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('<h8>' + feature.properties.Descriptio + '</h8>')
    .addTo(map);
});


map.addControl(new mapboxgl.NavigationControl(), 'top-right');
