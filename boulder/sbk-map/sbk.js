
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
} else {
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
    zoom: 14,
    center: [-105.27, 40]
});

map.on('style.load', function () {

    map.addSource('sbk-hydraulics', {
        type: 'vector',
        url: 'mapbox://iconeng.32d95d2f'
    });

    map.addSource('sbk-hydraulics-101416', {
        type: 'vector',
        url: 'mapbox://iconeng.17f0caf2'
    });

    map.addSource('sbk-addition', {
        type: 'vector',
        url: 'mapbox://iconeng.8629ecea'
    });

    map.addSource('5ftContours', {
        type: 'vector',
        url: 'mapbox://iconeng.8e23d2ea'
    });
    map.addLayer({
        'id': '5ftContours',
        'type': 'line',
        'source': '5ftContours',
        'source-layer': 'SBK_COB_2013_5ft_Contours',
        'layout': {
          'visibility': 'visible',
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
            'line-color': '#fff'
        }
    });

    map.addSource('1ftContours', {
        type: 'vector',
        url: 'mapbox://iconeng.e1bdc7dc'
    });
    map.addLayer({
        'id': '1ftContours',
        'type': 'line',
        'source': '1ftContours',
        'source-layer': 'SBK_COB_2013_1ft_Contours_',
        'layout': {
          'visibility': 'visible',
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
            'line-color': '#fff'
        }
    });

    map.addSource('efBasins', {
        type: 'vector',
        url: 'mapbox://iconeng.9kl9nd88'
    });
    map.addSource('efBasinsCentroid', {
        type: 'vector',
        url: 'mapbox://iconeng.78wx6q8u'
    });
    map.addLayer({
        'id': 'efBasins',
        'type': 'fill',
        'source': 'efBasins',
        'source-layer': 'SBK_Effective_Drainage_Basins',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#333',
            'fill-opacity': 0.05
        }
    });

    map.addLayer({
        "id": "efBasins-borders",
        "type": "line",
        "source": "efBasins",
        'source-layer': 'SBK_Effective_Drainage_Basins',
        "layout": {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        "paint": {
            "line-color": "#333",
            "line-width": 4
        }
    });
    map.addLayer({
        "id": "efBasins-label",
        "type": "symbol",
        "source": "efBasinsCentroid",
        'source-layer': 'SBK_Effective_Drainage_Basins_ce',
        "layout": {
          'visibility': 'none',
          "text-size": {
              "stops": [[8,12],[20,20]],
              "base": 1.5
          },
          "text-field": "{FHAD_ID}",
          "text-font": ["Lato Bold", "Arial Unicode MS Bold"]
        },
        "paint": {
          "text-color": "#333",
          "text-halo-color": "#F8F4F0",
          "text-halo-width": {
              "base": 1.5,
              "stops": [[11,2],[20,3.75]]
          }
        }
    });

    map.addSource('exBasins', {
        type: 'vector',
        url: 'mapbox://iconeng.25nlxa1m'
    });
    map.addSource('exBasinsCentroid', {
        type: 'vector',
        url: 'mapbox://iconeng.43nuv4fe'
    });
    map.addLayer({
        'id': 'exBasins',
        'type': 'fill',
        'source': 'exBasins',
        'source-layer': 'sbk_existing_drainage_sub_basins',
        'layout': {
            'visibility': 'none',
        },
        'paint': {
            'fill-color': '#dc0714',
            'fill-opacity': 0.05
        }
    });

    map.addLayer({
        "id": "exBasins-borders",
        "type": "line",
        "source": "exBasins",
        'source-layer': 'sbk_existing_drainage_sub_basins',
        "layout": {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        "paint": {
            "line-color": "#dc0714",
            "line-width": 4
        }
    });
    map.addLayer({
        "id": "exBasins-label",
        "type": "symbol",
        "source": "exBasinsCentroid",
        'source-layer': 'sbk_existing_drainage_sub_basins_centroids',
        "layout": {
          'visibility': 'none',
          "text-size": {
              "stops": [[8,12],[20,20]],
              "base": 1.5
          },
          "text-field": "{SWMM_ID}",
          "text-font": ["Lato Bold", "Arial Unicode MS Bold"]
        },
        "paint": {
          "text-color": "#dc0714",
          "text-halo-color": "#F8F4F0",
          "text-halo-width": {
              "base": 1.5,
              "stops": [[11,2],[20,3.75]]
          }
        }
    });

    map.addLayer({
        'id': '5ftLabels',
        'type': 'symbol',
        'source': '5ftContours',
        'source-layer': 'SBK_COB_2013_5ft_Contours',
        'layout': {
          'visibility': 'visible',
          'symbol-placement': 'line',
          'text-field': '{CONTOUR}',
          'text-size': {
            "stops": [[15,12],[17,14],[19,18]]
          }
        },
        'paint': {
          'text-color': '#000',
          'text-halo-color': 'rgba(255,255,255,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 0.5
        }
    });

    map.addSource('floodExtents', {
    type: 'vector',
    url: 'mapbox://iconeng.8fvqotm7'
    });
    map.addLayer({
        'id': 'floodExtents',
        'type': 'fill',
        'source': 'floodExtents',
        'source-layer': 'Boulder_Flood2013Extents',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-pattern': 'bluestripe',
            'fill-opacity': 0.75
        }
    });

    map.addSource('highHazard', {
    type: 'vector',
    url: 'mapbox://iconeng.03a67729'
    });
    map.addLayer({
        'id': 'highHazard',
        'type': 'fill',
        'source': 'highHazard',
        'source-layer': 'SBK_High_Hazard_Zone',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-opacity': 0.75,
            'fill-color': '#dc0714',
            'fill-outline-color': '#b00510'
        }
    });

    map.addSource('flowDepth', {
    type: 'vector',
    url: 'mapbox://iconeng.9f6rn7l8'
    });
    map.addLayer({
        'id': 'flowDepth2',
        'interactive': true,
        'type': 'fill',
        'source': 'flowDepth',
        'source-layer': 'SBK_Flow_Depth_at_Cell_100_YR',
        'filter': ['all', ['>', 'Var', 0.25],['<=', 'Var', 0.5]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#ffffcc',
            'fill-opacity': 0.6
        }
    });
    map.addLayer({
        'id': 'flowDepth3',
        'interactive': true,
        'type': 'fill',
        'source': 'flowDepth',
        'source-layer': 'SBK_Flow_Depth_at_Cell_100_YR',
        'filter': ['all', ['>', 'Var', 0.5],['<=', 'Var', 1]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#c7e9b4',
            'fill-opacity': 0.6
        }
    });
    map.addLayer({
        'id': 'flowDepth4',
        'interactive': true,
        'type': 'fill',
        'source': 'flowDepth',
        'source-layer': 'SBK_Flow_Depth_at_Cell_100_YR',
        'filter': ['all', ['>', 'Var', 1],['<=', 'Var', 1.5]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#7fcdbb',
            'fill-opacity': 0.6
        }
    });
    map.addLayer({
        'id': 'flowDepth5',
        'interactive': true,
        'type': 'fill',
        'source': 'flowDepth',
        'source-layer': 'SBK_Flow_Depth_at_Cell_100_YR',
        'filter': ['all', ['>', 'Var', 1.5],['<=', 'Var', 3]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#41b6c4',
            'fill-opacity': 0.6
        }
    });
    map.addLayer({
        'id': 'flowDepth6',
        'interactive': true,
        'type': 'fill',
        'source': 'flowDepth',
        'source-layer': 'SBK_Flow_Depth_at_Cell_100_YR',
        'filter': ['all', ['>', 'Var', 3],['<=', 'Var', 4.5]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#1d91c0',
            'fill-opacity': 0.6
        }
    });
    map.addLayer({
        'id': 'flowDepth7',
        'interactive': true,
        'type': 'fill',
        'source': 'flowDepth',
        'source-layer': 'SBK_Flow_Depth_at_Cell_100_YR',
        'filter': ['all', ['>', 'Var', 4.5],['<=', 'Var', 6]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#225ea8',
            'fill-opacity': 0.6
        }
    });
    map.addLayer({
        'id': 'flowDepth8',
        'interactive': true,
        'type': 'fill',
        'source': 'flowDepth',
        'source-layer': 'SBK_Flow_Depth_at_Cell_100_YR',
        'filter': ['all', ['>', 'Var', 6]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#0c2c84',
            'fill-opacity': 0.6
        }
    });

    map.addLayer({
        'id': 'floodDepth',
        'interactive': true,
        'type': 'fill',
        'source': 'flowDepth',
        'source-layer': 'SBK_Flow_Depth_at_Cell_100_YR',
        'filter': ['all', ['>', 'Var', 1]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#0c2c84',
            'fill-opacity': 0.75
        }
    });

    map.addSource('velocity', {
    type: 'vector',
    url: 'mapbox://iconeng.1lg0s33f'
    });
    map.addLayer({
        'id': 'velocity2',
        'interactive': true,
        'type': 'line',
        'source': 'velocity',
        'source-layer': 'SBK_Velocity_at_Cell',
        'filter': ['all', ['>', 'Var', 0.25],['<=', 'Var', 0.5]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 1.2,
            'line-color': '#ffffb2'
        }
    });
    map.addLayer({
        'id': 'velocity3',
        'interactive': true,
        'type': 'line',
        'source': 'velocity',
        'source-layer': 'SBK_Velocity_at_Cell',
        'filter': ['all', ['>', 'Var', 0.5],['<=', 'Var', 1]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 1.4,
            'line-color': '#fed976'
        }
    });
    map.addLayer({
        'id': 'velocity4',
        'interactive': true,
        'type': 'line',
        'source': 'velocity',
        'source-layer': 'SBK_Velocity_at_Cell',
        'filter': ['all', ['>', 'Var', 1],['<=', 'Var', 1.5]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 1.6,
            'line-color': '#feb24c'
        }
    });
    map.addLayer({
        'id': 'velocity5',
        'interactive': true,
        'type': 'line',
        'source': 'velocity',
        'source-layer': 'SBK_Velocity_at_Cell',
        'filter': ['all', ['>', 'Var', 1.5],['<=', 'Var', 3]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 1.8,
            'line-color': '#fd8d3c'
        }
    });
    map.addLayer({
        'id': 'velocity6',
        'interactive': true,
        'type': 'line',
        'source': 'velocity',
        'source-layer': 'SBK_Velocity_at_Cell',
        'filter': ['all', ['>', 'Var', 3],['<=', 'Var', 4.5]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 2,
            'line-color': '#fc4e2a'
        }
    });
    map.addLayer({
        'id': 'velocity7',
        'interactive': true,
        'type': 'line',
        'source': 'velocity',
        'source-layer': 'SBK_Velocity_at_Cell',
        'filter': ['all', ['>', 'Var', 4.5],['<=', 'Var', 6]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 2.2,
            'line-color': '#e31a1c'
        }
    });
    map.addLayer({
        'id': 'velocity8',
        'interactive': true,
        'type': 'line',
        'source': 'velocity',
        'source-layer': 'SBK_Velocity_at_Cell',
        'filter': ['all', ['>', 'Var', 6]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 2.4,
            'line-color': '#b10026'
        }
    });

    map.addSource('routing', {
        type: 'vector',
        url: 'mapbox://iconeng.btei559w'
    });
    map.addLayer({
        'id': 'routing',
        'type': 'line',
        'source': 'routing',
        'source-layer': 'sbk_swmm_routing',
        'layout': {
          'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#ffd700'
        }
    });

    map.addLayer({
        'id': 'routingLabels',
        'type': 'symbol',
        'source': 'routing',
        'source-layer': 'sbk_swmm_routing',
        'layout': {
          'visibility': 'visible',
          'symbol-placement': 'line',
          'text-field': '{SWMM_ID} ({Q_100_YR}cfs)',
          'text-size': {
            "stops": [[15,12],[17,14],[19,16]]
          }
        },
        'paint': {
          'text-color': '#000',
          'text-halo-color': 'rgba(255,215,0,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 1
        }
    });

    map.addSource('xs', {
        type: 'vector',
        url: 'mapbox://iconeng.4bdd71f0'
    });
    map.addLayer({
        'id': 'xs2d',
        'type': 'line',
        'source': 'xs',
        'source-layer': 'SBK_FLO_2D_Cross_Sections',
        'interactive': true,
        'layout': {
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': 'none'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#0f0'
        }
    });
    map.addLayer({
        'id': 'xs2dLabels',
        'type': 'symbol',
        'source': 'xs',
        'source-layer': 'SBK_FLO_2D_Cross_Sections',
        'layout': {
          'visibility': 'none',
          'symbol-placement': 'line',
          'text-field': 'XS{Id}: {INC_100_YR} cfs',
          'text-size': {
            "stops": [[15,12],[17,14],[19,16]]
          }
        },
        'paint': {
          'text-color': '#000',
          'text-halo-color': 'rgba(0,255,0,0.9)',
          'text-halo-width': 1,
          'text-halo-blur': 1
        }
    });

    map.addSource('prevStream', {
    type: 'vector',
    url: 'mapbox://iconeng.16wpiq42'
    });
    map.addLayer({
        'id': 'prevStream',
        'type': 'line',
        'source': 'prevStream',
        'source-layer': 'SBK_Belt_Collins_West_Centerline',
        'layout': {
          'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#ff00ff'
        }
    });

    map.addSource('stream', {
    type: 'vector',
    url: 'mapbox://iconeng.3kyasgxj'
    });
    map.addLayer({
        'id': 'stream',
        'type': 'line',
        'source': 'sbk-hydraulics-101416',
        'source-layer': 'River_Stationing',
        'layout': {
          'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#00ffff'
        }
    });

    map.addSource('junctions', {
        type: 'vector',
        url: 'mapbox://iconeng.2l8oimn7'
    });
    map.addLayer({
        'id': 'designPoints',
        'type': 'symbol',
        'interactive': true,
        'source': 'junctions',
        'source-layer': 'sbk_swmm_node',
        'filter': ['all', ['in', 'Type', 'Design Point']],
        'layout': {
          'visibility': 'visible',
            "text-optional": true,
            "text-line-height": 1,
            "text-size": {
                "stops": [[8,10],[20,20]],
                "base": 1.5
            },
           "icon-image": "triangle-c",
           "text-field": "{SWMM_ID} ({Q_100_Rout}cfs)",
           'text-max-width': 3,
           "text-font": ["Lato Regular", "Arial Unicode MS Bold"],
           "text-offset": [0, 1.2],
           "text-anchor": "top"
       },
       "paint": {
         "text-color": "#333",
         "text-halo-color": "#F8F4F0",
         "text-halo-width": {
             "base": 1.5,
             "stops": [[11,2],[20,3.75]]
         }
       }
    });
    map.addLayer({
        'id': 'diversions',
        'type': 'symbol',
        'interactive': true,
        'source': 'junctions',
        'source-layer': 'sbk_swmm_node',
        'filter': ['all', ['in', 'Type', 'Diversion']],
        'layout': {
          'visibility': 'visible',
            "text-optional": true,
            "text-line-height": 1,
            "text-size": {
                "stops": [[8,10],[20,20]],
                "base": 1.5
            },
           "icon-image": "diamond-c",
           "text-field": "{SWMM_ID} ({Q_100_Rout}cfs)",
           'text-max-width': 3,
           "text-font": ["Lato Regular", "Arial Unicode MS Bold"],
           "text-offset": [0, 1.2],
           "text-anchor": "top"
       },
       "paint": {
         "text-color": "#333",
         "text-halo-color": "#F8F4F0",
         "text-halo-width": {
             "base": 1.5,
             "stops": [[11,2],[20,3.75]]
         }
       }
    });
    map.addLayer({
        'id': 'outfalls',
        'type': 'symbol',
        'interactive': true,
        'source': 'junctions',
        'source-layer': 'sbk_swmm_node',
        'filter': ['all', ['in', 'Type', 'Outfall', 'Pipe Outfall']],
        'layout': {
          'visibility': 'visible',
            "text-optional": true,
            "text-line-height": 1,
            "text-size": {
                "stops": [[8,10],[20,20]],
                "base": 1.5
            },
           "icon-image": "triangle2-c",
           "text-field": "{SWMM_ID} ({Q_100_Rout}cfs)",
           'text-max-width': 3,
           "text-font": ["Lato Regular", "Arial Unicode MS Bold"],
           "text-offset": [0, 1.2],
           "text-anchor": "top"
       },
       "paint": {
         "text-color": "#333",
         "text-halo-color": "#F8F4F0",
         "text-halo-width": {
             "base": 1.5,
             "stops": [[11,2],[20,3.75]]
         }
       }
    });

}); //end style load

map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['designPoints','diversions','outfalls','flowDepth2','flowDepth3', 'flowDepth4', 'flowDepth5', 'flowDepth6', 'flowDepth7', 'flowDepth8','xsExtended','shallowFlood','xs2d'] });
  if (!features.length) {
      return;
  }

  var feature = features[0];
  var id = feature.layer.id

  if (id == 'designPoints' || id == 'diversions' || id == 'outfalls'){

        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('Type: ' + feature.properties.Type + '<br />' +
                      feature.properties.Q_100_Rout + ' cfs')
            .addTo(map);

  } else if (id == 'flowDepth2' || id == 'flowDepth3' || id == 'flowDepth4' || id == 'flowDepth5' || id == 'flowDepth6' || id == 'flowDepth7' || id == 'flowDepth8'){

        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('Depth: ' + feature.properties.Var + ' ft')
            .addTo(map);

  } else if (id == 'xsExtended'){

        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('Vert Left: ' + feature.properties.Vert_Left + ' ft<br />' +
                    'Vert Right: ' + feature.properties.Vert_Right + ' ft<br />')
            .addTo(map);

  } else if (id == 'shallowFlood'){

        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('ID: ' + feature.properties.Id + '<br />' +
                    '2D Depth: ' + feature.properties.Depth + ' ft<br />')
            .addTo(map);

  } else if (id == "xs2d"){

      var data = [{name: "10yr", value: feature.properties.INC_010_YR},
                  {name: "25yr", value: feature.properties.INC_025_YR},
                  {name: "50yr", value: feature.properties.INC_050_YR},
                  {name: "100yr", value: feature.properties.INC_100_YR},
                  {name: "500yr", value: feature.properties.INC_500_YR}];


              var margin = {top: 20, right: 20, bottom: 30, left: 40},
                  width = 200 - margin.left - margin.right,
                  height = 200 - margin.top - margin.bottom;

              var div = window.document.createElement('div');

              var x = d3.scale.ordinal()
                  .rangeRoundBands([0, width], .1);

              var y = d3.scale.linear()
                  .range([height, 0]);

              var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom");

              var yAxis = d3.svg.axis()
                  .scale(y)
                  .orient("left")
                  .ticks(5);

              var tip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function(d) {
                    return "<span style='color:#1B55C0'>" + d.value + "</span><strong> cfs</strong> ";
                  })

              var svg = d3.select(div).append("svg")
                  .attr("class", "xs")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                svg.call(tip);

                d3.select(".xs").selectAll(".bar").remove()

                x.domain(data.map(function(d) { return d.name; }));
                y.domain([0, d3.max(data, function(d) {
                  if (d.value <= 500) {return 500}
                  else if (d.value <= 1000) {return 1000}
                  else 	{ return 2500 }
                  ;})
                ]);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                  .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 3)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("cfs");

                svg.selectAll(".bar")
                    .data(data)
                  .enter().append("rect")
                    .attr("class", d3.max(data, function(d) {
                      if (d.value <= 500) {return "bar"}
                      else if (d.value <= 1000) {return "bar2"}
                      else 	{ return "bar3" }
                      ;}))
                    .attr("x", function(d) { return x(d.name); })
                    .attr("width", x.rangeBand())
                    .attr("y", function(d) { return height; })
                    .attr("height", 0)
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide)
                    .transition()
                    .delay(function (d, i) { return i*100; })
                    .attr("height", function(d) { return height - y(d.value); })
                    .attr("y", function(d) { return y(d.value); });

                svg.append("text")
                    .attr("x", 0)
                    .attr("y", 0 - (margin.top / 2))
                    .attr("text-anchor", "left")
                    .style("font-size", "12px")
                    .style("font-weight", "bold")
                    .text("Cross Section " + feature.properties.Id);

              function type(d) {
                d.value = +d.value;
                return d;
              }

              var d3popup = new mapboxgl.Popup()
                  .setLngLat(e.lngLat)
                  .setDOMContent(div)
                  .addTo(map);

    }
});

map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['xs2d','designPoints','diversions','outfalls','shallowFlood','xsExtended','flowDepth2','flowDepth3', 'flowDepth4', 'flowDepth5', 'flowDepth6', 'flowDepth7', 'flowDepth8'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

map.addControl(new mapboxgl.Navigation({position: 'top-right'}));

}
