mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
  zoom: 11,
  center: [-104.8821, 39.7684],
  hash: true,
  preserveDrawingBuffer: true
});


var layerList = document.getElementById('menu');
// var inputs = layerList.getElementsByTagName('input');
//
// function switchLayer(layer) {
//     var layerId = layer.target.value;
//     map.setStyle('mapbox://styles/iconeng/' + layerId);
//     $('.layer-off').prop('checked', false);
//     $('.layer-on').prop('checked', true);
// }
//
// for (var i = 0; i < inputs.length; i++) {
//     inputs[i].onclick = switchLayer;
// }

$(document).ready(function () {
  $("#clear").click(function () {
    var checkBoxes = $("input[type=checkbox]");
    checkBoxes.prop("checked", false);
    map.setPaintProperty('watersheds', 'fill-opacity', 0);
    map.setPaintProperty('ponds', 'fill-opacity', 0);
    map.setPaintProperty('flowDepth', 'fill-opacity', 0);
    map.setPaintProperty('flowDepthOver', 'fill-opacity', 0);

  });
});

map.on('style.load', function (e) {
  map.addSource('conveyance', {
    type: 'geojson',
    "data": 'geojson/mdp_swmm_conduits.geojson'
  });
  map.addSource('outlets', {
    type: 'geojson',
    "data": 'geojson/mdp_swmm_outlets.geojson'
  });
  map.addSource('dividers', {
    type: 'geojson',
    "data": 'geojson/mdp_swmm_dividers.geojson'
  });
  map.addSource('junctions', {
    type: 'geojson',
    "data": 'geojson/mdp_swmm_junctions.geojson'
  });
  map.addSource('outfalls', {
    type: 'geojson',
    "data": 'geojson/mdp_swmm_outfalls.geojson'
  });
  map.addSource('storages', {
    type: 'geojson',
    "data": 'geojson/mdp_swmm_storage.geojson'
  });
  map.addSource('basins', {
    type: 'vector',
    url: 'mapbox://iconeng.cm3pqji3'
  });

  map.addSource('zoneXshallowFlooding', {
    type: 'geojson',
    "data": 'geojson/fhad_zoneX.geojson'
  });





  'zoneXshallowFlooding'



  // map.addSource('basins_pts', {
  //     type: 'vector',
  //     url: 'mapbox://iconeng.9jscoexe'
  // });
  map.addSource('mhfd-streams', {
    type: 'vector',
    url: 'mapbox://iconeng.d9coogno'
  });



  map.addLayer({
    'id': 'conduits',
    'type': 'line',
    'source': 'conveyance',
    'layout': {
      "visibility": 'visible'
    },
    'paint': {
      'line-width': 3,
      'line-color': '#089099'
    }
  });

  // map.addLayer({
  //     'id': 'conduitArrows',
  //     'type': 'symbol',
  //     'source': 'conveyance',
  //     'layout': {
  //       "visibility": 'none',
  //       'symbol-placement': 'line',
  //       'symbol-spacing': 50,
  //       "icon-image": "oneway-white-small",
  //       "icon-allow-overlap": true,
  //       "text-rotation-alignment": "map",
  //       "icon-size": 1,
  //       "text-keep-upright": false,
  //       "icon-padding": 0,
  //       "icon-ignore-placement": true
  //     },
  //     'paint': {
  //     }
  // });

  map.addLayer({
    'id': 'conduitLabels',
    'type': 'symbol',
    'source': 'conveyance',
    'layout': {
      "visibility": 'visible',
      "text-optional": true,
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{id}',
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      'text-size': 10,
      "text-padding": 100,
    },
    'paint': {
      'text-color': '#F8F4F0',
      'text-halo-color': '#089099',
      'text-halo-width': 1
    }
  });

  map.addLayer({
    'id': 'outlets',
    'type': 'line',
    'source': 'outlets',
    'layout': {
      "visibility": 'visible'
    },
    'paint': {
      'line-width': 3,
      'line-color': '#089099'
    }
  });

  // map.addLayer({
  //     'id': 'conduitArrows',
  //     'type': 'symbol',
  //     'source': 'conveyance',
  //     'layout': {
  //       "visibility": 'none',
  //       'symbol-placement': 'line',
  //       'symbol-spacing': 50,
  //       "icon-image": "oneway-white-small",
  //       "icon-allow-overlap": true,
  //       "text-rotation-alignment": "map",
  //       "icon-size": 1,
  //       "text-keep-upright": false,
  //       "icon-padding": 0,
  //       "icon-ignore-placement": true
  //     },
  //     'paint': {
  //     }
  // });

  map.addLayer({
    'id': 'outletLabels',
    'type': 'symbol',
    'source': 'outlets',
    'layout': {
      "visibility": 'visible',
      "text-optional": true,
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{id}',
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      'text-size': 10,
      "text-padding": 100,
    },
    'paint': {
      'text-color': '#F8F4F0',
      'text-halo-color': '#089099',
      'text-halo-width': 1
    }
  });

  map.addLayer({
    'id': 'dividers',
    'type': 'circle',
    'source': 'dividers',
    'layout': {
      "visibility": 'visible'
    },
    'paint': {
      'circle-radius': 5,
      'circle-color': '#f7945d'
    }
  });

  map.addLayer({
    'id': 'dividerLabels',
    'type': 'symbol',
    'source': 'dividers',
    'layout': {
      "visibility": 'visible',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{id}",
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-offset": [0, 1],
      "text-anchor": "top"
    },
    "paint": {
      "text-color": "#f7945d",
      "text-halo-color": "#F8F4F0",
      "text-halo-width": 1,
    }
  });

  map.addLayer({
    'id': 'junctions',
    'type': 'circle',
    'source': 'junctions',
    'layout': {
      "visibility": 'visible'
    },
    'paint': {
      'circle-radius': 5,
      'circle-color': '#f7945d'
    }
  });

  map.addLayer({
    'id': 'junctionLabels',
    'type': 'symbol',
    'source': 'junctions',
    'layout': {
      "visibility": 'visible',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{id}",
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-offset": [0, 1],
      "text-anchor": "top"
    },
    "paint": {
      "text-color": "#f7945d",
      "text-halo-color": "#F8F4F0",
      "text-halo-width": 1,
    }
  });

  map.addLayer({
    'id': 'outfalls',
    'type': 'circle',
    'source': 'outfalls',
    'layout': {
      "visibility": 'visible'
    },
    'paint': {
      'circle-radius': 5,
      'circle-color': '#f7945d'
    }
  });

  map.addLayer({
    'id': 'outfallsLabels',
    'type': 'symbol',
    'source': 'outfalls',
    'layout': {
      "visibility": 'visible',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{id}",
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-offset": [0, 1],
      "text-anchor": "top"
    },
    "paint": {
      "text-color": "#f7945d",
      "text-halo-color": "#F8F4F0",
      "text-halo-width": 1,
    }
  });

  map.addLayer({
    'id': 'storages',
    'type': 'circle',
    'source': 'storages',
    'layout': {
      "visibility": 'visible'
    },
    'paint': {
      'circle-radius': 5,
      'circle-color': '#f7945d'
    }
  });

  map.addLayer({
    'id': 'storageLabels',
    'type': 'symbol',
    'source': 'storages',
    'layout': {
      "visibility": 'visible',
      "text-optional": true,
      "text-line-height": 1,
      "text-size": 12,
      "text-field": "{id}",
      'text-font': ['Roboto Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      "text-offset": [0, 1],
      "text-anchor": "top"
    },
    "paint": {
      "text-color": "#f7945d",
      "text-halo-color": "#F8F4F0",
      "text-halo-width": 1,
    }
  });

  map.addLayer({
    'id': 'basinOutlines',
    'type': 'line',
    'source': 'basins',
    'source-layer': 'basins-amk86j',
    'layout': {
      'visibility': 'none',
    },
    'paint': {
      'line-width': 1,
      'line-opacity': 1,
      'line-color': 'rgba(0,0,0,1)',
      'line-dasharray': [8, 4]
    }
  });

  //  CWCB Floodplain 500yr Hatch
  map.addLayer({
    'id': 'zoneXshallowFlooding',
    'type': 'fill',
    'source': 'zoneXshallowFlooding',
    // 'filter': ['==', "ZONE_SUBTY", "0.2 PCT ANNUAL CHANCE FLOOD HAZARD"],
    'paint': {
      'fill-color': 'rgb(255,128,0)',
      'fill-opacity': 0.3,
    },
    'layout': {
      'visibility': 'visible'
    }
  });

  // map.addLayer({
  //     'id': 'basinLabels',
  //     'type': 'symbol',
  //     'source': 'basins_pts',
  //     'source-layer':'basins_pts-57794c',
  //     'layout': {
  //        "visibility": 'visible',
  //        "text-optional": true,
  //        "text-line-height": 1,
  //        "text-size": {
  //            "stops": [[15, 10], [17, 12], [19, 14]]
  //        },
  //        "text-field": "{Area_AC} Ac. | {E_Per_Imp}%| {F_Per_Imp}%",
  //        'text-font': ['Roboto Medium','Open Sans Regular','Arial Unicode MS Regular'],
  //        "text-offset": {
  //            "stops": [[13, [0, .25]], [17, [0, .75]]]
  //        },
  //        "text-anchor": "top"
  //    },
  //    "paint": {
  //      "text-color": "#F8F4F0",
  //      "text-halo-color": "rgba(0,0,0,.87)",
  //      "text-halo-width": {"stops": [[15,1],[17,1.25]]}
  //    }
  // });
  //
  // map.addLayer({
  //     'id': 'basinLabels2',
  //     'type': 'symbol',
  //     'source': 'basins_pts',
  //     'source-layer':'basins_pts-57794c',
  //     'layout': {
  //        "visibility": 'none',
  //        "text-optional": true,
  //        "text-line-height": 1,
  //        "text-size": {
  //            "stops": [[15, 10], [17, 12], [19, 14]]
  //        },
  //        "text-field": "{Basin_Name}",
  //        "text-offset": {
  //            "stops": [[13, [0, -1]], [17, [0, -1.5]]]
  //        },
  //        'text-font': ['Roboto Medium','Open Sans Regular','Arial Unicode MS Regular'],
  //        "text-anchor": "top"
  //    },
  //    "paint": {
  //      "text-color": "#F8F4F0",
  //      "text-halo-color": "rgba(0,0,0,.87)",
  //      "text-halo-width": {"stops": [[15,1],[17,1.25]]}
  //    }
  // });


  map.addLayer({
    'id': 'mhfd-streams',
    'type': 'line',
    'source': 'mhfd-streams',
    'source-layer': 'mhfd_streams-dbmy0f',
    'paint': {
      'line-width': 2,
      'line-opacity': 1,
      'line-color': 'rgba(0,77,168,1)'
    },
    'layout': {
      'visibility': 'none'
    }
  });

  //Drainageway Centerline LABEL
  map.addLayer({
    'id': 'mhfd-stream-labels',
    'type': 'symbol',
    'source': 'mhfd-streams',
    'source-layer': 'mhfd_streams-dbmy0f',
    'layout': {
      'visibility': 'none',
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{Str_Name}',
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

  // map.addLayer({
  //     'id': 'conduitCompsLabels',
  //     'type': 'symbol',
  //     'source': 'conveyance',
  //     "filter": ['!=', 'ACE05_Q2', -9999],
  //     'layout': {
  //       "visibility": 'none',
  //       "text-optional": true,
  //       'symbol-placement': 'line',
  //       'symbol-spacing': 100,
  //       'text-field': '{Name}',
  //       'text-font': ['Roboto Bold','Open Sans Regular','Arial Unicode MS Regular'],
  //       'text-size': 10,
  //       "text-padding": 100,
  //     },
  //     'paint': {
  //       'text-color': '#F8F4F0',
  //       'text-halo-color': '#045275',
  //       'text-halo-width': 1
  //     }
  // });


  // map.addLayer({
  //     'id': 'junctionComps',
  //     'type': 'circle',
  //     'source': 'junctions',
  //     "filter": ['!=', 'ACE05_Q2', -9999],
  //     'layout': {
  //        "visibility": 'none'
  //      },
  //     'paint': {
  //         'circle-radius': 6,
  //         'circle-color': '#ee4d5a'
  //     }
  // });



  // map.addLayer({
  //     'id': 'junctionCompsLabels',
  //     'type': 'symbol',
  //     'source': 'junctions',
  //     "filter": ['!=', 'ACE05_Q2', -9999],
  //     'layout': {
  //        "visibility": 'none',
  //        "text-optional": true,
  //        "text-line-height": 1,
  //        "text-size": 12,
  //        "text-field": "{Name}",
  //        'text-font': ['Roboto Bold','Open Sans Regular','Arial Unicode MS Regular'],
  //        "text-offset": [0, 1],
  //        "text-anchor": "top"
  //    },
  //    "paint": {
  //      "text-color": "#ee4d5a",
  //      "text-halo-color": "#F8F4F0",
  //      "text-halo-width": 1,
  //    }
  // });



  // map.addLayer({
  //     'id': 'watershedLabels',
  //     'type': 'symbol',
  //     'source': 'watersheds',
  //     'layout': {
  //     	 "visibility": 'visible',
  //        "text-optional": true,
  //        "text-line-height": 1,
  //        "text-size": {
  //            "stops": [[15, 14], [17, 17]]
  //        },
  //        "text-field": "{Outfall}",
  //        'text-font': ['Roboto Black Italic','Open Sans Bold','Arial Unicode MS Regular'],
  //        "symbol-placement": "point"
  //    },
  //    "paint": {
  //      "text-color": "#754A3F",
  //      "text-halo-color": "#eee",
  //      "text-halo-width": {"stops": [[15,2],[17,2.5]]},
  //      "text-opacity":1
  //    }
  // });

  // var style = map.getStyle();
  //
  // if (style.name != 'Light'){
  //   map.setLayoutProperty('conduitArrows','icon-image','oneway-spaced-white-small');
  //   map.setLayoutProperty('conduitCompsArrows','icon-image','oneway-spaced-white-small');
  // };

});


// map.on('click', function (e) {
//   var features = map.queryRenderedFeatures(e.point, { layers: ['conduits', 'junctions'] });
//   if (!features.length) {
//     return;
//   }

//   var feature = features[0];
//   var id = feature.layer.id

//   if (id == 'conduits' || id == 'junctions') {

//     var data = [{ name: "2-yr", value: feature.properties.Q_Ex_002 },
//     { name: "10-yr", value: feature.properties.Q_Ex_010 },
//     { name: "100-yr", value: feature.properties.Q_Ex_100 }];

//     var margin = { top: 10, right: 40, bottom: 30, left: 50 },
//       width = 240 - margin.left - margin.right,
//       height = 240 - margin.top - margin.bottom;

//     var x = d3.scaleBand()
//       .rangeRound([0, width])
//       .paddingInner(0.1);

//     var y = d3.scaleLinear()
//       .range([height, 0]);

//     var z = d3.scaleOrdinal()
//       .range(['#089099', '#00718b', '#045275']);

//     var div = window.document.createElement('div');
//     if (id == 'conduits' && feature.properties.Shape1 == 'IRREGULAR') {
//       div.innerHTML = '<div class="row"><b>Conduit ' + feature.properties.NAME + '</b><br />Irregular</div>';
//     } else if (id == 'conduits' && feature.properties.Shape1 == 'CIRCULAR') {
//       div.innerHTML = '<div class="row"><b>Conduit ' + feature.properties.NAME + '</b><br />' + feature.properties.Geom1 + 'ft Circular</div>';
//     } else if (id == 'conduits' && feature.properties.Shape1 == 'RECT_CLOSED') {
//       div.innerHTML = '<div class="row"><b>Conduit ' + feature.properties.NAME + '</b><br />' + feature.properties.Geom1 + 'ft x ' + feature.properties.Geom2 + 'ft Box</div>';
//     } else {
//       div.innerHTML = '<div class="row"><b>Junction ' + feature.properties.NAME + '</b></div>';
//     };

//     var svg = d3.select(div)
//       .append("svg")
//       .attr("class", "xs")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     d3.select(".xs").selectAll(".bar").remove()

//     x.domain(data.map(function (d) { return d.name; }));
//     y.domain([0, d3.max(data, function (d) {
//       if (d.value <= 25) { return 25 }
//       else if (d.value <= 50) { return 50 }
//       else if (d.value <= 75) { return 75 }
//       else if (d.value <= 250) { return 250 }
//       else if (d.value <= 500) { return 500 }
//       else if (d.value <= 1000) { return 1000 }
//       else if (d.value <= 2500) { return 2500 }
//       else { return 5000 }
//       ;
//     })
//     ]);

//     svg.selectAll(".bar")
//       .data(data)
//       .enter().append("rect")
//       .attr("x", function (d) { return x(d.name); })
//       .attr("width", x.bandwidth())
//       .attr("y", function (d) { return height; })
//       .attr("height", 0)
//       .attr("fill", function (d) { return z(d.name); })
//       .transition()
//       .delay(function (d, i) { return i * 100; })
//       .attr("height", function (d) { return height - y(d.value); })
//       .attr("y", function (d) { return y(d.value); });

//     svg.selectAll("text.bar")
//       .data(data)
//       .enter().append("text")
//       .attr("class", "bar")
//       .attr("text-anchor", "middle")
//       .attr("x", function (d) { return x(d.name) + 23; })
//       .attr("y", function (d) {
//         if (height - y(d.value) < 20) { return y(d.value) - 5; }
//         else { return y(d.value) + 12; }
//         ;
//       })
//       .attr("fill", function (d) {
//         if (height - y(d.value) < 20) { return '#000' }
//         else { return '#fff' }
//         ;
//       })
//       .attr('font-size', '10px')
//       .attr('font-weight', 'bold')
//       .text(function (d) { return Math.round(d.value); });

//     // Add the X Axis
//     svg.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x).tickSizeOuter(0));

//     // Add the Y Axis
//     svg.append("g")
//       .call(d3.axisLeft(y).ticks(4))
//       .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 3)
//       .attr("dy", ".71em")
//       .attr("font-size", 8)
//       .attr("fill", "#000")
//       .style("text-anchor", "end")
//       .text("cfs");

//     function type(d) {
//       d.value = +d.value;
//       return d;
//     }

//     var d3popup = new mapboxgl.Popup()
//       .setLngLat(e.lngLat)
//       .setDOMContent(div)
//       .addTo(map);
//   } else { return; }
// });



// map.on('mousemove', function (e) {
//   var features = map.queryRenderedFeatures(e.point, { layers: ['conduits', 'junctions'] });

//   map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

// });

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

// document.getElementById('LeaydenCreekMDP').addEventListener('click',function() {
//   var bbox = [[-105.255,39.882],[-105.116,39.809]];
//   map.fitBounds(bbox,{padding: 10});
// });



//Reach buttons use coordinates SW to NE Coordinates

document.getElementById('Reach1').addEventListener('click', function () {
  var bbox = [[-104.960, 39.804], [-104.936, 39.815]];
  map.fitBounds(bbox, { padding: 50 });
});

document.getElementById('Reach2').addEventListener('click', function () {
  var bbox = [[-104.946, 39.796], [-104.926, 39.806]];
  map.fitBounds(bbox, { padding: 50 });
});
document.getElementById('Reach3').addEventListener('click', function () {
  var bbox = [[-104.932, 39.790], [-104.911, 39.797]];
  map.fitBounds(bbox, { padding: 50 });
});
document.getElementById('Reach4').addEventListener('click', function () {
  var bbox = [[-104.919, 39.784], [-104.902, 39.793]];
  map.fitBounds(bbox, { padding: 50 });
});
document.getElementById('Reach5').addEventListener('click', function () {
  var bbox = [[-105.1305, 39.7359], [-105.1069, 39.7435]];
  map.fitBounds(bbox, { padding: 50 });
});
document.getElementById('Reach6').addEventListener('click', function () {
  var bbox = [[-105.1305, 39.7359], [-105.1069, 39.7435]];
  map.fitBounds(bbox, { padding: 50 });
});
document.getElementById('Reach7').addEventListener('click', function () {
  var bbox = [[-105.1305, 39.7359], [-105.1069, 39.7435]];
  map.fitBounds(bbox, { padding: 50 });
});
document.getElementById('Reach8').addEventListener('click', function () {
  var bbox = [[-105.1305, 39.7359], [-105.1069, 39.7435]];
  map.fitBounds(bbox, { padding: 50 });
});