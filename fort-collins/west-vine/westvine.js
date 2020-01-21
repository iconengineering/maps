mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
if (!mapboxgl.supported()) {
  alert('Your browser does not support Mapbox GL');
} else {
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
    zoom: 14.5,
    center: [-105.11, 40.59],
  });

  map.on('style.load', function() {

    map.addSource('wvb-contours', {
      type: 'vector',
      url: 'mapbox://iconeng.7b288ff0'
    });
    //WVB 1 FT CONTOURS
    map.addLayer({
      'id': 'wvb-1ftContours',
      'type': 'line',
      'source': 'wvb-contours',
      'source-layer': 'wvb_contours',
      'filter': ['all', ['==', 'Index', 0]],
      'layout': {
        'line-join': 'round',
        'visibility': 'none',
        'line-cap': 'round'
      },
      'paint': {
        'line-width': {
          "stops": [
            [15, 0],
            [17, .5],
            [19, 1]
          ]
        },
        'line-color': '#bd925a'
      }
    }, 'road_label');
    //WVB 5 FT CONTOURS
    map.addLayer({
      'id': 'wvb-5ftContours',
      'type': 'line',
      'source': 'wvb-contours',
      'source-layer': 'wvb_contours',
      'filter': ['all', ['>=', 'Index', 5],
        ['<=', 'Index', 10]
      ],
      'layout': {
        'line-join': 'round',
        'visibility': 'none',
        'line-cap': 'round'
      },
      'paint': {
        'line-width': {
          "stops": [
            [15, 1],
            [17, 1.75],
            [19, 2.5]
          ]
        },
        'line-color': '#bd925a'
      }
    }, 'road_label');
    //WVB 5 FT LABELS
    map.addLayer({
      'id': 'wvb-5ftLabels',
      'type': 'symbol',
      'source': 'wvb-contours',
      'source-layer': 'wvb_contours',
      'filter': ['all', ['>=', 'Index', 5],
        ['<=', 'Index', 10]
      ],
      'layout': {
        'symbol-placement': 'line',
        'visibility': 'none',
        'text-field': '{CONTOUR}',
        'text-size': {
          "stops": [
            [15, 12],
            [17, 14],
            [19, 16]
          ]
        }
      },
      'paint': {
        'text-color': '#bd925a',
        'text-halo-color': '#F8F4F0',
        'text-halo-width': 2,
        'text-halo-blur': 0.5,
      }
    });
    map.addSource('wvb-basins', {
      type: 'vector',
      url: 'mapbox://iconeng.5n8brw3p'
    });

    //WVB BASINS
    map.addLayer({
      'id': 'wvb-basins',
      'type': 'fill',
      'source': 'wvb-basins',
      'source-layer': 'wvb_basins',
      'layerGroup': 1,
      'interactive': true,
      'layout': {
        'visibility': 'none'
      },
      'paint': {
        'fill-color': '#1407dc',
        'fill-opacity': 0.05
      }
    }, 'road_label');
    // WVB BASIN BORDER
    map.addLayer({
      "id": "wvb-basins-borders",
      "type": "line",
      "source": "wvb-basins",
      'source-layer': 'wvb_basins',
      "layout": {
        'visibility': 'none'
      },
      "paint": {
        "line-color": "#1407dc",
        "line-width": 2
      }
    }, 'road_label');

    map.addSource('canals', {
      type: 'vector',
      url: 'mapbox://iconeng.8bkept6e'
    });
    //CANAL
    map.addLayer({
      'id': 'canals',
      'type': 'line',
      'source': 'canals',
      'source-layer': 'wvb_canals',
      'layout': {
        'line-join': 'round',
        'visibility': 'none',
        'line-cap': 'round'
      },
      'paint': {
        'line-width': {
          "stops": [
            [15, 1],
            [17, 2],
            [19, 4]
          ]
        },
        'line-color': '#33ffff'
      }
    });
    //CANAL LABELS
    map.addLayer({
      'id': 'canalLabels',
      'type': 'symbol',
      'source': 'canals',
      'source-layer': 'wvb_canals',
      'layout': {
        'symbol-placement': 'line',
        'symbol-spacing': 100,
        'visibility': 'none',
        'text-field': '{Name}',
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
        'text-color': '#000',
        'text-halo-color': 'rgba(75,255,255,0.9)',
        'text-halo-width': 2,
        'text-halo-blur': 1
      }
    });

    map.addSource('xs', {
      type: 'vector',
      url: 'mapbox://iconeng.0n0c8e77'
    });
    //CANAL XS
    map.addLayer({
      'id': 'xs',
      'type': 'line',
      'source': 'xs',
      'source-layer': 'wvb_xs',
      'layout': {
        'line-join': 'round',
        'visibility': 'none',
        'line-cap': 'round'
      },
      'paint': {
        'line-width': {
          "stops": [
            [15, 1],
            [17, 2],
            [19, 4]
          ]
        },
        'line-color': '#33ffff'
      }
    });
    //CANAL XS LABELES
    map.addLayer({
      'id': 'xsLabels',
      'type': 'symbol',
      'source': 'xs',
      'source-layer': 'wvb_xs',
      'layout': {
        'symbol-placement': 'line',
        'symbol-spacing': 100,
        'visibility': 'none',
        'text-field': '{Station}',
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
        'text-color': '#000',
        'text-halo-color': 'rgba(75,255,255,0.9)',
        'text-halo-width': 2,
        'text-halo-blur': 1
      }
    });

    map.addSource('wvb-routing', {
      type: 'vector',
      url: 'mapbox://iconeng.6jqhw3te'
    });
    //WVB ROUTING
    map.addLayer({
      'id': 'wvb-routing',
      'type': 'line',
      'source': 'wvb-routing',
      'source-layer': 'wvb_lines',
      'filter': ['all', ['==', 'PINS', 'Y']],
      'layout': {
        'line-join': 'round',
        'visibility': 'none',
        'line-cap': 'round'
      },
      'paint': {
        'line-width': {
          "stops": [
            [15, 2],
            [17, 4],
            [19, 6]
          ]
        },
        'line-color': '#ffd700'
      }
    }, 'road-label');
    //WVB ROUTING 2
    map.addLayer({
      'id': 'wvb-routing2',
      'type': 'line',
      'source': 'wvb-routing',
      'source-layer': 'wvb_lines',
      'filter': ['all', ['==', 'PINS', 'N']],
      'layout': {
        'line-join': 'round',
        'visibility': 'none',
        'line-cap': 'round'
      },
      'paint': {
        'line-width': {
          "stops": [
            [15, 2],
            [17, 4],
            [19, 6]
          ]
        },
        'line-color': '#ffd700',
        'line-dasharray': [4, 3]
      }
    }, 'road-label');
    //WVB ROUTING LABELS
    map.addLayer({
      'id': 'wvb-routingLabels',
      'type': 'symbol',
      'source': 'wvb-routing',
      'source-layer': 'wvb_lines',
      'filter': ['all', ['==', 'PINS', 'Y']],
      'layout': {
        'symbol-placement': 'line',
        'symbol-spacing': 100,
        'visibility': 'none',
        'text-field': '{Id}',
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
        'text-color': '#000',
        'text-halo-color': 'rgba(255,215,0,0.9)',
        'text-halo-width': 2,
        'text-halo-blur': 1
      }
    });
    // WVB ROUTING LABELS
    map.addLayer({
      'id': 'wvb-routingArrows',
      'type': 'symbol',
      'source': 'wvb-routing',
      'source-layer': 'wvb_lines',
      'layout': {
        'symbol-placement': 'line',
        'symbol-spacing': 75,
        'visibility': 'none',
        "icon-image": "oneway-road-black",
        "icon-allow-overlap": true,
        "text-rotation-alignment": "map",
        "icon-size": {
          "base": 1,
          "stops": [
            [
              15,
              0.5
            ],
            [
              22,
              1
            ]
          ]
        },
        "text-keep-upright": false,
        "icon-padding": 0,
        "icon-ignore-placement": true
      },
      'paint': {
        'text-color': '#000',
        'text-halo-color': 'rgba(255,215,0,0.9)',
        'text-halo-width': 2,
        'text-halo-blur': 1
      }
    }, 'wvb-routingLabels');

    map.addSource('wvb-spills', {
      type: 'vector',
      url: 'mapbox://iconeng.a90sii2z'
    });
    //WVB SPILLS
    map.addLayer({
      'id': 'wvb-spills',
      'type': 'line',
      'source': 'wvb-spills',
      'source-layer': 'wvb_spillflows',
      'layout': {
        'line-join': 'round',
        'visibility': 'none',
        'line-cap': 'round'
      },
      'paint': {
        'line-width': {
          "stops": [
            [15, 2],
            [17, 4],
            [19, 6]
          ]
        },
        'line-color': '#d700d7'
      }
    });
    //WVB SPILL LABELS
    map.addLayer({
      'id': 'wvb-spillLabels',
      'type': 'symbol',
      'source': 'wvb-spills',
      'source-layer': 'wvb_spillflows',
      'layout': {
        'symbol-placement': 'line',
        'symbol-spacing': 100,
        'visibility': 'none',
        'text-field': '{100_Spill}cfs',
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
        'text-color': '#fff',
        'text-halo-color': 'rgba(215,0,215,0.9)',
        'text-halo-width': 2,
        'text-halo-blur': 1
      }
    });

    map.addSource('wvb-junctions', {
      type: 'vector',
      url: 'mapbox://iconeng.ackrtqyc'
    });
    //WVB JUNCTIONS
    map.addLayer({
      'id': 'wvb-junctions',
      'type': 'symbol',
      'interactive': true,
      'source': 'wvb-junctions',
      'source-layer': 'wvb_junctions',
      'filter': ['all', ['in', 'Class', 'Design', 'Outfall', 'Storage']],
      'layout': {
        'visibility': 'none',
        "text-optional": true,
        "text-line-height": 1,
        "text-size": {
          "stops": [
            [8, 10],
            [20, 20]
          ],
          "base": 1.5
        },
        "icon-image": "{symbol}-c",
        "text-field": "{Id}",
        "text-font": ["Lato Regular", "Arial Unicode MS Bold"],
        "text-offset": [0, 1.2],
        "text-anchor": "top"
      },
      "paint": {
        "text-color": "#504a4c",
        "text-halo-color": "#F8F4F0",
        "text-halo-width": {
          "base": 1.5,
          "stops": [
            [11, 2],
            [20, 3.75]
          ]
        }
      }
    });
    //WVB BASIN MARKERS
    map.addLayer({
      'id': 'wvb-basinMarker',
      'type': 'circle',
      'source': 'wvb-junctions',
      'source-layer': 'wvb_junctions',
      'filter': ['all', ['==', 'Class', 'Basin']],
      'layout': {
        'visibility': 'none'
      },
      "paint": {
        "circle-color": "#1407dc",
        "circle-radius": {
          "stops": [
            [12, 8],
            [20, 20]
          ]
        },
        "circle-blur": 0.2,
        "circle-opacity": 0.5
      }
    });
    //WVB BASIN LABELS
    map.addLayer({
      'id': 'wvb-basinLabel',
      'type': 'symbol',
      'source': 'wvb-junctions',
      'source-layer': 'wvb_junctions',
      'filter': ['all', ['==', 'Class', 'Basin']],
      'layout': {
        'visibility': 'none',
        "text-optional": true,
        "text-line-height": 1,
        "text-size": {
          "stops": [
            [8, 10],
            [20, 20]
          ],
          "base": 1.5
        },
        "text-field": "{Join_ID}",
        "text-font": ["Lato Regular", "Arial Unicode MS Bold"]
      },
      "paint": {
        "text-color": "#fff"
      }
    });
    map.addSource('wvb-xs', {
      type: 'geojson',
      "data": 'data/xs.geojson'
    });
    //WEST VINE XS
    map.addLayer({
      'id': 'wvb-xs',
      'type': 'line',
      'source': 'wvb-xs',
      'paint': {
        'line-width': 2,
        'line-opacity': 1,
        'line-color': 'rgba(0,0,0,1)'
      },
      'layout': {
        'visibility': 'visible'
      }
    });

    //WEST VINE XS LABELS
    map.addLayer({
      'id': 'wvb-xsLabels',
      'type': 'symbol',
      'source': 'wvb-xs',
      'layout': {
        'symbol-placement': 'line',
        'symbol-spacing': 100,
        'text-field': '{XSName}',
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
        'text-color': '#000',
        'text-halo-color': '#ffffff',
        'text-halo-width': 2,
        'text-halo-blur': 1
      }
    });

    map.addSource('wvb-fp-100yr', {
      type: 'geojson',
      "data": 'data/fp-100yr-polygons.geojson'
    });

    //West Vine 100 yr FP
    map.addLayer({
      'id': 'wvb-fp-100yr',
      'type': 'line',
      'source': 'wvb-fp-100yr',
      'paint': {
        'line-width': 1,
        'line-opacity': 0.6,
        'line-color': 'rgba(0,230,255,1)'
      },
      'layout': {
        'visibility': 'visible'
      }
    });

    //100-YR FLOODPLAIN FILL
    map.addLayer({
      'id': 'wvb-fp-100yr-fill',
      'type': 'fill',
      'source': 'wvb-fp-100yr',
      'layerGroup': 1,
      'interactive': true,
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-color': 'rgba(0,230,255,1)',
        'fill-opacity': 0.3
      }
    }, 'road_label');

    map.addSource('wvb-fp-sf', {
      type: 'geojson',
      "data": "data/fp-shallow-flooding-polygons.geojson"
    });

    //Add shallow flooding
    map.addLayer({
      'id': 'wvb-fp-sf',
      'type': 'line',
      'source': 'wvb-fp-sf',
      'paint': {
        'line-width': 1,
        'line-opacity': 0.6,
        'line-color': 'rgb(255,128,0)'
      },
      'layout': {
        'visibility': 'visible'
      }
    });

    //SHALLOW FLOODING FLOODPLAIN FILL
    map.addLayer({
      'id': 'wvb-fp-sf-fill',
      'type': 'fill',
      'source': 'wvb-fp-sf',
      'layerGroup': 1,
      'interactive': true,
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-color': 'rgba(255,128,0,1)',
        'fill-opacity': 0.3
      }
    }, 'road_label');

    map.addSource('wvb-fldwy', {
      type: 'geojson',
      "data": "data/fldwy-polygons.geojson"
    });

    map.addLayer({
      'id': 'wvb-fldwy-fill',
      'type': 'fill',
      'source': 'wvb-fldwy',
      'layerGroup': 1,
      'interactive': true,
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-color': 'rgba(255,128,0,1)',
        'fill-opacity': 1
      }
    }, 'road_label');

    map.addSource('wvb-stream', {
      type: 'geojson',
      "data": 'data/river.geojson'
    });

    //West Vine Stream centerline
    map.addLayer({
      'id': 'wvb-stream',
      'type': 'line',
      'source': 'wvb-stream',
      'paint': {
        'line-width': 1.5,
        'line-opacity': 1,
        'line-color': 'rgba(0,77,168,1)'
      },
      'layout': {
        'visibility': 'visible'
      }
    });

    //West Vine Stream Centerline LABEL
    map.addLayer({
      'id': 'wvb-streamLabels',
      'type': 'symbol',
      'source': 'wvb-stream',
      'layout': {
        'symbol-placement': 'line',
        'symbol-spacing': 100,
        'text-field': '{RiverName}' + ' - ' + '{ReachName}',
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

    map.addSource('wvb-roadway', {
      type: 'geojson',
      "data": 'data/roadwaycrossings.geojson'
    });
    //West Vine Roadway Crossings
    map.addLayer({
      'id': 'wvb-roadway',
      'type': 'line',
      'source': 'wvb-roadway',
      'paint': {
        'line-width': 2,
        'line-opacity': 1,
        'line-color': 'rgba(128,128,128,1)'
      },
      'layout': {
        'visibility': 'visible'
      }
    });

    map.addSource('city-fldwy', {
      type: 'geojson',
      "data": 'data/cityfp-fldwy.geojson'
    });

    map.addLayer({
      'id': 'city-fldwy',
      'type': 'line',
      'source': 'city-fldwy',
      'paint': {
        'line-width': 2,
        'line-opacity': 1,
        'line-color': 'rgba(128,128,128,1)'
      },
      'layout': {
        'visibility': 'visible'
      }
    });

    map.addSource('city-fp', {
      type: 'geojson',
      "data": 'data/cityfp-fp.geojson'
    });

    map.addLayer({
      'id': 'city-fp',
      'type': 'line',
      'source': 'city-fp',
      'paint': {
        'line-width': 2,
        'line-opacity': 1,
        'line-color': 'rgba(128,128,128,1)'
      },
      'layout': {
        'visibility': 'visible'
      }
    });

    map.addSource('city-sf', {
      type: 'geojson',
      "data": 'data/cityfp-sf.geojson'
    });

    map.addLayer({
      'id': 'city-sf',
      'type': 'line',
      'source': 'city-sf',
      'paint': {
        'line-width': 2,
        'line-opacity': 1,
        'line-color': 'rgba(128,128,128,1)'
      },
      'layout': {
        'visibility': 'visible'
      }
    });

  }); //end style load

  // When a click event occurs on a feature in the states layer, open a popup at the
  // location of the click, with description HTML from its properties.
  map.on('click', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['wvb-xs']
    });
    if (!features.length) {
      return;
    }

    var feature = features[0];

    var popup = new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(feature.properties.RiverName + ' ' + feature.properties.ReachName + '<br>' + 'XS: ' + feature.properties.XSName + '<br>' + 'WSEL:' + feature.properties.XSWSElev)
      .addTo(map);
  });

  // Use the same approach as above to indicate that the symbols are clickable
  // by changing the cursor style to 'pointer'.
  map.on('mousemove', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['wvb-xs']
    });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });

  map.addControl(new mapboxgl.NavigationControl(), 'top-right');

}
