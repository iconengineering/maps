mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/civjrd2la004z2immqynhr4fd',
    zoom: 13,
    center: [-104.705, 40.42],
    hash: true,
    preserveDrawingBuffer: true
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.value;
    map.setStyle('mapbox://styles/iconeng/' + layerId);
    $('.layer-off').prop('checked', false);
    $('.layer-on').prop('checked', true);
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

$(document).ready(function() {
    $("#clear").click(function() {
        var checkBoxes = $("input[type=checkbox]");
        checkBoxes.prop("checked", false);
        map.setPaintProperty('watersheds','fill-opacity', 0);
    });
});

map.on('style.load', function (e) {


  map.addSource('basinOutlines', {
      type: 'geojson',
      "data": 'basinOutlines.geojson'
  });
  map.addSource('alternatives', {
      type: 'geojson',
      "data": 'alternatives.geojson'
  });
  map.addSource('basinPoints', {
      type: 'vector',
      url: 'mapbox://iconeng.51s2rjyj'
  });
  map.addSource('junctions', {
      type: 'vector',
      url: 'mapbox://iconeng.ar1xojg3'
//    url: 'mapbox://iconeng.4u0iz0t3'     original
  });
  map.addSource('conveyance', {
      type: 'vector',
      //merged file
      url: 'mapbox://iconeng.1x8kd1vy'
      //url: 'mapbox://iconeng.2w7cnk9w' original 
  });


  map.addSource('contours', {
      type: 'vector',
      url: 'mapbox://iconeng.eda7576e'
  });
  map.addSource('flowDepth', {
      type: 'vector',
      url: 'mapbox://iconeng.dn7xcwcd'
  });

  map.addLayer({
      'id': '5ftContours',
      'type': 'line',
      'source': 'contours',
      'source-layer': 'NGD_Contours',
      'filter': ['all', ['>', 'Index', 1]],
      'layout': {
          'line-join': 'round',
          'line-cap': 'round'
      },
      'paint': {
        'line-width': {
            "stops": [[15, 1], [17, 1.75], [19, 2.5]]
        },
        'line-opacity': 0,
        'line-color': '#bd925a'
      }
  },'road-label-small');
  map.addLayer({
      'id': '1ftContours',
      'type': 'line',
      'source': 'contours',
      'source-layer': 'NGD_Contours',
      'filter': ['all', ['==', 'Index', 0]],
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-width': {
            "stops": [[15, 0], [17, 0.5], [19, 1]]
        },
        'line-opacity': 0,
        'line-color': '#bd925a'
      }
  },'road-label-small');
  map.addLayer({
      'id': '5ftLabels',
      'type': 'symbol',
      'source': 'contours',
      'source-layer': 'NGD_Contours',
      'filter': ['all', ['>', 'Index', 1]],
      'layout': {
        'symbol-placement': 'line',
        'text-field': '{CONTOUR}',
        'text-font': ['Roboto Light Italic','Open Sans Light','Arial Unicode MS Regular'],
        'text-size': {
          "stops": [[15,9],[17,11],[19,13]]
        }
      },
      'paint': {
        'text-color': '#bd925a',
        'text-halo-color': '#F8F4F0',
        'text-halo-width': 2,
        'text-halo-blur': 0.5,
        'text-opacity': 0
      }
  },'road-label-small');

  map.addLayer({
      'id': 'flowDepthLine',
      'type': 'line',
      'source': 'flowDepth',
      'source-layer': 'NGDGridgeojson',
      'filter': ['>', 'ExF2', 0.25],
      'maxzoom':16,
      'layout': {
        "visibility": 'none'
      },
      'paint': {
          'line-color': {
              property: 'ExF2',
              type: 'interval',
              stops: [
                  [0.25, '#d1eeea'],
                  [0.5, '#a2d7d6'],
                  [1, '#7ebdc5'],
                  [1.5, '#61a4b3'],
                  [2, '#4a89a0'],
                  [3, '#386f8b'],
                  [4, '#2a5674']
                  ]
          },
          'line-opacity': 0.45,
          'line-width': {"stops": [[13,2],[13.99,3],[14,2.5],[14.99,3.5],[15,3],[15.99,4]]},
          'line-gap-width':1,
          'line-blur':3
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'flowDepth',
      'type': 'fill',
      'source': 'flowDepth',
      'source-layer': 'NGDGridgeojson',
      'filter': ['>', 'ExF2', 0.25],
      'layout': {
        "visibility": 'none'
      },
      'paint': {
          'fill-color': {
              property: 'ExF2',
              type: 'interval',
              stops: [
                  [0.25, '#d1eeea'],
                  [0.5, '#a2d7d6'],
                  [1, '#7ebdc5'],
                  [1.5, '#61a4b3'],
                  [2, '#4a89a0'],
                  [3, '#386f8b'],
                  [4, '#2a5674']
                  ]
          },
          'fill-opacity': 0.9
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'basinOutlines',
      'type': 'line',
      'source': 'basinOutlines',
      'paint': {
          'line-width': 1,
          'line-opacity': 1,
          'line-color': 'rgba(0,0,0,1)',
          'line-dasharray': [8,4]
      }
  });

  


  // EXISTING CONVEYANCE
  map.addLayer({
      'id': 'conduits',
      'type': 'line',
      'source': 'conveyance',
      //'source-layer': 'ngd_conduits'
      'source-layer': 'NGD_Conduits_Merge-aqq7jw',
      'filter': ["==", "alt", 'existing'],
      'layout': {
        "visibility": 'none'
       },
      'paint': {
          'line-width': 4,
          'line-color': '#036180'
      }
  });

  map.addLayer({
      'id': 'conduitArrows',
      'type': 'symbol',
      'source': 'conveyance',
      //'source-layer': 'ngd_conduits'
      'source-layer': 'NGD_Conduits_Merge-aqq7jw',
      'filter': ["==", "alt", 'existing'],
      'layout': {
        "visibility": 'none',
        'symbol-placement': 'line',
        'symbol-spacing': 50,
        "icon-image": "oneway-white-small",
        "icon-allow-overlap": true,
        "text-rotation-alignment": "map",
        "icon-size": 1,
        "text-keep-upright": false,
        "icon-padding": 0,
        "icon-ignore-placement": true
      },
      'paint': {
      }
  });

  map.addLayer({
      'id': 'conduitLabels',
      'type': 'symbol',
      'source': 'conveyance',
      //'source-layer': 'ngd_conduits'
      'source-layer': 'NGD_Conduits_Merge-aqq7jw',
      'filter': ["==", "alt", 'existing'],
      'layout': {
        "visibility": 'none',
        "text-optional": true,
        'symbol-placement': 'line',
        'symbol-spacing': 100,
        'text-field': '{Conduit}',
        'text-font': ['Roboto Bold','Open Sans Regular','Arial Unicode MS Regular'],
        'text-size': 10,
        "text-padding": 100,
      },
      'paint': {
        'text-color': '#F8F4F0',
        'text-halo-color': '#036180',
        'text-halo-width': 1
      }
  });



  /* MASTER PLAN CONVEYANCE
  map.addLayer({
      'id': 'conduitsSP',
      'type': 'line',
      'source': 'conveyanceSP',
      'source-layer': 'NGD_Conduits_ConcDesign-d9wxqw',
      'layout': {
        "visibility": 'none'
        },
      'paint': {
          'line-width': 4,
          'line-color': '#036180',
          'line-opacity': 0
      }
  });

  map.addLayer({
      'id': 'conduitArrowsSP',
      'type': 'symbol',
      'source': 'conveyanceSP',
      'source-layer': 'NGD_Conduits_ConcDesign-d9wxqw',
      'layout': {
        "visibility": 'none',
        'symbol-placement': 'line',
        'symbol-spacing': 50,
        "icon-image": "oneway-white-small",
        "icon-allow-overlap": true,
        "text-rotation-alignment": "map",
        "icon-size": 1,
        "text-keep-upright": false,
        "icon-padding": 0,
        "icon-ignore-placement": true
      },
      'paint': {
        'icon-opacity': 0 
      }
  });

  map.addLayer({
      'id': 'conduitLabelsSP',
      'type': 'symbol',
      'source': 'conveyanceSP',
      'source-layer': 'NGD_Conduits_ConcDesign-d9wxqw',
      'layout': {
        "visibility": 'none',
        "text-optional": true,
        'symbol-placement': 'line',
        'symbol-spacing': 100,
        'text-field': '{Conduit}',
        'text-font': ['Roboto Bold','Open Sans Regular','Arial Unicode MS Regular'],
        'text-size': 10,
        "text-padding": 100,
      },
      'paint': {
        'text-color': '#F8F4F0',
        'text-halo-color': '#036180',
        'text-halo-width': 1,
        'text-opacity':0
      }
  });

*/


  map.addLayer({
      'id': 'alternativesCase',
      'type': 'line',
      'source': 'alternatives',
      'filter': ['==', 'alt', 'existing'],
      'layout': {
        "visibility": 'none',
        'line-join': 'bevel'
        },
      'paint': {
          'line-width': 4,
          'line-color': '#000',
          'line-gap-width': 0.1,
          'line-blur': 4
      }
  });

  map.addLayer({
      'id': 'alternatives',
      'type': 'line',
      'source': 'alternatives',
      'filter': ['==', 'alt', 'existing'],
      'layout': {
        "visibility": 'none',
        'line-join': 'bevel'
        },
      'paint': {
          'line-width': 6,
          'line-color': {
              property: 'Improv_Lvl',
              type: 'categorical',
              stops: [
                  ['02-yr', 'rgb(199,101,134)'],
                  ['05-yr', 'rgb(161,59,139)'],
                  ['10-yr', 'rgb(109,23,143)'],
                  ['Existing', 'rgb(14,9,135)']
                  ]
          }
      }
  });

  map.addLayer({
      'id': 'junctions',
      'type': 'circle',
      'source': 'junctions',
      'source-layer': 'NGD_Junctions_Merge_2D-apcjeq',
      'filter': ["==", "alt", 'recPlan'],
      'layout': {
         "visibility": 'none'
       },
      'paint': {
          'circle-radius': 4,
          'circle-color': '#ee4d5a'
      }
  });

  map.addLayer({
      'id': 'junctionLabels',
      'type': 'symbol',
      'source': 'junctions',
      'source-layer': 'NGD_Junctions_Merge_2D-apcjeq',
      'filter': ["==", "alt", 'recPlan'],
      'layout': {
         "visibility": 'none',
         "text-optional": true,
         "text-line-height": 1,
         "text-size": 12,
         "text-field": "{Node}",
         'text-font': ['Roboto Bold','Open Sans Regular','Arial Unicode MS Regular'],
         "text-offset": [0, 1],
         "text-anchor": "top"
     },
     "paint": {
       "text-color": "#ee4d5a",
       "text-halo-color": "#F8F4F0",
       "text-halo-width": 1,
     }
  });

  map.addLayer({
      'id': 'basinLabels',
      'type': 'symbol',
      'source': 'basinPoints',
      'source-layer': 'NGD_Centroids',
      'layout': {
         "visibility": 'none',
         "text-optional": true,
         "text-line-height": 1,
         "text-size": {
             "stops": [[15, 10], [17, 12], [19, 14]]
         },
         "text-field": "{Area} Ac. | {Imperv}%",
         'text-font': ['Roboto Medium','Open Sans Regular','Arial Unicode MS Regular'],
         "text-offset": {
             "stops": [[13, [0, 0.25]], [17, [0, 0.75]]]
         },
         "text-anchor": "top"
     },
     "paint": {
       "text-color": "#F8F4F0",
       "text-halo-color": "rgba(0,0,0,.87)",
       "text-halo-width": {"stops": [[15,1],[17,1.25]]}
     }
  });

  map.addLayer({
      'id': 'basinLabels2',
      'type': 'symbol',
      'source': 'basinPoints',
      'source-layer': 'NGD_Centroids',
      'layout': {
         "visibility": 'none',
         "text-optional": true,
         "text-line-height": 1,
         "text-size": {
             "stops": [[15, 10], [17, 12], [19, 14]]
         },
         "text-field": "{Basin}",
         "text-offset": {
             "stops": [[13, [0, -1]], [17, [0, -1.5]]]
         },
         'text-font': ['Roboto Medium','Open Sans Regular','Arial Unicode MS Regular'],
         "text-anchor": "top"
     },
     "paint": {
       "text-color": "#F8F4F0",
       "text-halo-color": "rgba(0,0,0,.87)",
       "text-halo-width": {"stops": [[15,1],[17,1.25]]}
     }
  });

    var style = map.getStyle();

    if (style.name != 'Outdoors'){
      map.setLayoutProperty('conduitArrows','icon-image','oneway-spaced-white-small');
    }

});

var filterList = document.getElementById('filters');
var radios = filterList.getElementsByTagName('input');
var filterList2 = document.getElementById('filters2');
var radios2 = filterList2.getElementsByTagName('input');

function switchFilter() {
    var con = document.querySelector('input[name="Alt"]:checked').value;
    var cat = document.querySelector('input[name="Freq"]:checked').value;
    var concat = con + cat;
    map.setFilter('flowDepth', ['>', concat, 0.25]);
    map.setPaintProperty('flowDepth', 'fill-color', {
        property: concat,
        type: 'interval',
        stops: [
            [0.25, '#d1eeea'],
            [0.5, '#a2d7d6'],
            [1, '#7ebdc5'],
            [1.5, '#61a4b3'],
            [2, '#4a89a0'],
            [3, '#386f8b'],
            [4, '#2a5674']
            ]
    });
    map.setFilter('flowDepthLine', ['>', concat, 0.25]);
    map.setPaintProperty('flowDepthLine', 'line-color', {
        property: concat,
        type: 'interval',
        stops: [
            [0.25, '#d1eeea'],
            [0.5, '#a2d7d6'],
            [1, '#7ebdc5'],
            [1.5, '#61a4b3'],
            [2, '#4a89a0'],
            [3, '#386f8b'],
            [4, '#2a5674']
            ]
    });
}

for (var i = 0; i < radios.length; i++) {
    radios[i].onclick = switchFilter;
}

for (var i = 0; i < radios2.length; i++) {
    radios2[i].onclick = switchFilter;
}




//Radio Button for Alignment
var altList = document.getElementById('altSwitch');
var altRadio = altList.getElementsByTagName('input');

function switchAlts() {
    var value = document.querySelector('input[name="Pipe"]:checked').value;
    map.setFilter('alternatives', ['==', 'alt', value]);
    map.setFilter('alternativesCase', ['==', 'alt', value]);
}

for (var i = 0; i < altRadio.length; i++) {
    altRadio[i].onclick = switchAlts;
}


var junctionList = document.getElementById('junctionSwitch');
var junctionRadio = junctionList.getElementsByTagName('input');

function switchJunction() {
	var value1 = document.querySelector('input[name="junction2"]:checked').value;
    map.setFilter('junctions', ['==', 'alt', value1]);
    map.setFilter('junctionLabels', ['==', 'alt', value1]);
}

for (var i = 0; i < junctionRadio.length; i++) {
    junctionRadio[i].onclick = switchJunction;
}

//Radio Button for Conduit
var conduitList = document.getElementById('conduitsSwitch');
var conduitRadio = conduitList.getElementsByTagName('input');

function switchConduit() {
    var value3 = document.querySelector('input[name="conduit2"]:checked').value;
    map.setFilter('conduits', ['==', 'alt', value3]);
    map.setFilter('conduitLabels', ['==', 'alt', value3]);
    map.setFilter('conduitArrows', ['==', 'alt', value3]);


}

for (var i = 0; i < conduitRadio.length; i++) {
    conduitRadio[i].onclick = switchConduit;
}







map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['conduits', 'junctions','flowDepth','basinLabels2','alternatives'] });
  if (!features.length) {
      return;
  }

  var feature = features[0];
  var id = feature.layer.id;

    if (id == 'alternatives'){

      var pipeWidth = feature.properties.Pipe_Width,
          pipeDIA = feature.properties.Pipe_DIA,
          barrels =  feature.properties.Barrels,
          level = feature.properties.Improv_Lvl,
          alt = feature.properties.alt,
          diameter = pipeWidth*12;

      if (alt != 'alt04') { var fullFlow = feature.properties.FullFlow; } else { var fullFlow = feature.properties.MaxFlow ;};

      var div = window.document.createElement('div');

      if (pipeWidth == pipeDIA) {
        div.innerHTML = '<div class="row"><b>Level of Improvement:</b> ' + level + '<br /><b>Barrels:</b> ' + barrels + '<br /><b>Type:</b> ' + diameter + '" RCP<br /><b>Pipe Cap:</b> ' + fullFlow + ' cfs</div>';
      } else {
        div.innerHTML = '<div class="row"><b>Level of Improvement:</b> ' + level + '<br /><b>Barrels:</b> ' + barrels + '<br /><b>Type:</b> ' + pipeWidth + '\' x ' + pipeDIA + '\' RCBC<br /><b>Pipe Cap:</b> ' + fullFlow + ' cfs</div>';
      };

      var d3popup = new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setDOMContent(div)
          .addTo(map);

    } else if (id == 'conduits' || id == 'junctions'){

      var data = [{name: "2yr", value: feature.properties.Pk_2yr},
                  {name: "5yr", value: feature.properties.Pk_5yr},
                  {name: "10yr", value: feature.properties.Pk_10yr},
                  {name: "50yr", value: feature.properties.Pk_50yr},
                  {name: "100yr", value: feature.properties.Pk_100yr}];

    var	margin = {top: 10, right: 40, bottom: 30, left: 50},
        width = 320 - margin.left - margin.right,
        height = 240 - margin.top - margin.bottom;

        var x = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);

        var y = d3.scaleLinear()
            .range([height, 0]);

        var z0 = d3.scaleOrdinal()
            .range(['#089099','#058092','#00718b','#036180','#045275']);

        var z1 = d3.scaleOrdinal()
            .range(['#dd686c','#d35d6a','#ca5268','#bd4966','#b13f64']);

      var div = window.document.createElement('div');
      if (id == 'conduits') {
        div.innerHTML = '<div class="row"><b>Conduit ' + feature.properties.Conduit + '</b></div>';
      } else {
        div.innerHTML = '<div class="row"><b>' + feature.properties.TYPE + ' ' + feature.properties.Node + '</b></div>';
      };

      var	svg = d3.select(div)
        .append("svg")
          .attr("class", "xs")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          d3.select(".xs").selectAll(".bar").remove()

          x.domain(data.map(function(d) { return d.name; }));
          y.domain([0, d3.max(data, function(d) {
            if (d.value <= 100) {return 100}
            else if (d.value <= 500) {return 500}
            else if (d.value <= 1000) {return 1000}
            else 	{ return 2000 }
            ;})
          ]);

          svg.selectAll(".bar")
              .data(data)
            .enter().append("rect")
              .attr("x", function(d) { return x(d.name); })
              .attr("width", x.bandwidth())
              .attr("y", function(d) { return height; })
              .attr("height", 0)
              .attr("fill", function(d) {
                if (id == "conduits") { return z0(d.name); }
                else { return z1(d.name);} ;})
              .transition()
              .delay(function (d, i) { return i*100; })
              .attr("height", function(d) { return height - y(d.value); })
              .attr("y", function(d) { return y(d.value); });

          svg.selectAll("text.bar")
              .data(data)
            .enter().append("text")
              .attr("class", "bar")
              .attr("text-anchor", "middle")
              .attr("x", function(d) { return x(d.name) + 20.5; })
              .attr("y", function(d) {
                if (height - y(d.value) < 20) { return y(d.value) - 5; }
                else { return y(d.value) + 12; }
                ;})
              .attr("fill", function(d) {
                if (height - y(d.value) < 20) { return '#000' }
                else { return '#fff' }
                ;})
              .attr('font-size', '10px')
              .attr('font-weight', 'bold')
              .text(function(d) { return d.value; });

          // Add the X Axis
          svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x).tickSizeOuter(0));

          // Add the Y Axis
          svg.append("g")
              .call(d3.axisLeft(y).tickSizeInner(-width).tickPadding(5).tickSizeOuter(0).ticks(4))
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 3)
              .attr("dy", ".71em")
              .attr("font-size", 8)
              .attr("fill", "#000")
              .style("text-anchor", "end")
              .text("cfs");

        function type(d) {
          d.value = +d.value;
          return d;
        }

      var d3popup = new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setDOMContent(div)
          .addTo(map);
    } else if (id == 'basinLabels2'){

          var col = feature.properties.Basin;
          console.log(col);

          var	margin = {top: 10, right: 40, bottom: 30, left: 50},
            	width = 240 - margin.left - margin.right,
            	height = 240 - margin.top - margin.bottom;

            var	x = d3.scaleLinear().range([0, width]);
            var	y = d3.scaleLinear().range([height, 0]);

            var	valueline = d3.line()
              .curve(d3.curveMonotoneX)
              .defined(function(d) {
                 return d.date <= 4 && d.date >= 0 && d.basin100 > 0;
              })
            	.x(function(d) { return x(d.date); })
            	.y(function(d) { return y(d.basin100); });

            var	valueline2 = d3.line()
              .curve(d3.curveMonotoneX)
              .defined(function(d) {
                 return d.date <= 4 && d.date >= 0 && d.basin50 > 0;
              })
            	.x(function(d) { return x(d.date); })
            	.y(function(d) { return y(d.basin50); });

            var	valueline3 = d3.line()
              .curve(d3.curveMonotoneX)
              .defined(function(d) {
                 return d.date <= 4 && d.date >= 0 && d.basin10 > 0;
              })
              .x(function(d) { return x(d.date); })
              .y(function(d) { return y(d.basin10); });

            var	valueline4 = d3.line()
              .curve(d3.curveMonotoneX)
              .defined(function(d) {
                 return d.date <= 4 && d.date >= 0 && d.basin5 > 0;
              })
            	.x(function(d) { return x(d.date); })
            	.y(function(d) { return y(d.basin5); });

            var	valueline5 = d3.line()
              .curve(d3.curveMonotoneX)
              .defined(function(d) {
                 return d.date <= 4 && d.date >= 0 && d.basin2 > 0;
              })
              .x(function(d) { return x(d.date); })
              .y(function(d) { return y(d.basin2); });

            var div = window.document.createElement('div');
            div.innerHTML = '<div class="row"><b>Sub-basin ' + feature.properties.Basin + ' Hydrograph</b><br /><small><span style="font-weight: bold;color: #ecda9a;">2-Year</span> | <span style="font-weight: bold;color: #f1bc77;">5-Year</span> | <span style="font-weight: bold;color: #f69a60;">10-Year</span> | <span style="font-weight: bold;color: #f87357;">50-Year</span> | <span style="font-weight: bold;color: #ee4d5a;">100-Year</span></small></div>';

            var	svg = d3.select(div)
            	.append("svg")
            		.attr("width", width + margin.left + margin.right)
            		.attr("height", height + margin.top + margin.bottom)
            	.append("g")
            		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Get the 100 year data
            d3.csv("NGD_100yrHydrographs.csv", function(error, data) {
            	data.forEach(function(d) {
            		d.date = +d.Time / 60;
            		d.basin100 = +d[col];
            	});

              x.domain([0,4]);
              y.domain([0, d3.max(data, function(d) {
                if (d.basin100 <= 20) {return 20}
                else if (d.basin100 <= 50) {return 50}
                else if (d.basin100 <= 100) {return 100}
                else 	{ return 500 }
                ;})
              ]);

            	var graph = svg.append("path")		// Add the valueline path.
            		.attr("class", "line")
                .style("stroke", "#ee4d5a")
            		.attr("d", valueline(data));

                var totalLength = graph.node().getTotalLength();

                graph
                  .attr("stroke-dasharray", totalLength + " " + totalLength)
                  .attr("stroke-dashoffset", totalLength)
                  .transition()
                    .duration(1000)
                    .ease(d3.easeLinear)
                    .attr("stroke-dashoffset", 0);

                    // Add the X Axis
                    svg.append("g")
                        .attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(x).tickSizeInner(-height).tickPadding(10).tickSizeOuter(0).ticks(4));

                    // text label for the x axis
                    svg.append("text")
                        .attr("transform",
                              "translate(" + (width/2) + " ," +
                                             (height + margin.top + 20) + ")")
                        .style("text-anchor", "middle")
                        .attr("font-size", 9)
                        .attr("font-style", "italic")
                        .text("Hours");

                    // Add the Y Axis
                    svg.append("g")
                        .call(d3.axisLeft(y).tickSizeInner(-width).tickPadding(5).tickSizeOuter(0).ticks(4))
                      .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 3)
                        .attr("dy", ".71em")
                        .attr("font-size", 8)
                        .attr("font-style", "italic")
                        .attr("fill", "#000")
                        .style("text-anchor", "end")
                        .text("cfs");
              });

              // Get the 50 year data
              d3.csv("NGD_50yrHydrographs.csv", function(error, data) {
              	data.forEach(function(d) {
              		d.date = +d.Time / 60;
              		d.basin50 = +d[col];
              	});

                var graph = svg.append("path")		// Add the valueline2 path.
              		.attr("class", "line")
              		.style("stroke", "#f87357")
              		.attr("d", valueline2(data));

                  var totalLength = graph.node().getTotalLength();

                  graph
                    .attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition()
                      .duration(1000)
                      .ease(d3.easeLinear)
                      .attr("stroke-dashoffset", 0);
                });

                // Get the 10 year data
                d3.csv("NGD_10yrHydrographs.csv", function(error, data) {
                	data.forEach(function(d) {
                		d.date = +d.Time / 60;
                		d.basin10 = +d[col];
                	});

                  var graph = svg.append("path")		// Add the valueline3 path.
                		.attr("class", "line")
                		.style("stroke", "#f69a60")
                		.attr("d", valueline3(data));

                    var totalLength = graph.node().getTotalLength();

                    graph
                      .attr("stroke-dasharray", totalLength + " " + totalLength)
                      .attr("stroke-dashoffset", totalLength)
                      .transition()
                        .duration(1000)
                        .ease(d3.easeLinear)
                        .attr("stroke-dashoffset", 0);
                  });

                  // Get the 5 year data
                  d3.csv("NGD_5yrHydrographs.csv", function(error, data) {
                  	data.forEach(function(d) {
                  		d.date = +d.Time / 60;
                  		d.basin5 = +d[col];
                  	});

                    var graph = svg.append("path")		// Add the valueline3 path.
                  		.attr("class", "line")
                  		.style("stroke", "#f1bc77")
                  		.attr("d", valueline4(data));

                      var totalLength = graph.node().getTotalLength();

                      graph
                        .attr("stroke-dasharray", totalLength + " " + totalLength)
                        .attr("stroke-dashoffset", totalLength)
                        .transition()
                          .duration(1000)
                          .ease(d3.easeLinear)
                          .attr("stroke-dashoffset", 0);
                    });

                    // Get the 2 year data
                    d3.csv("NGD_2yrHydrographs.csv", function(error, data) {
                    	data.forEach(function(d) {
                    		d.date = +d.Time / 60;
                    		d.basin2 = +d[col];
                    	});

                      var graph = svg.append("path")		// Add the valueline3 path.
                    		.attr("class", "line")
                    		.style("stroke", "#ecda9a")
                    		.attr("d", valueline5(data));

                        var totalLength = graph.node().getTotalLength();

                        graph
                          .attr("stroke-dasharray", totalLength + " " + totalLength)
                          .attr("stroke-dashoffset", totalLength)
                          .transition()
                            .duration(1000)
                            .ease(d3.easeLinear)
                            .attr("stroke-dashoffset", 0);
                      });

            var d3popup = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setDOMContent(div)
                .addTo(map);
          } else if (id == "flowDepth") {

            var data = [{con: "Ex", name: "100yr", value: feature.properties.ExF100},
                {con: "Alt1", name: "100yr", value: feature.properties.A1F100},
                {con: "Alt2", name: "100yr", value: feature.properties.A2F100},
                {con: "Alt3", name: "100yr", value: feature.properties.A3F100},
                {con: "Alt4", name: "100yr", value: feature.properties.A4F100},
                {con: "SP", name: "100yr", value: feature.properties.SPF100},
                {con: "Ex", name: "50yr", value: feature.properties.ExF50},
                {con: "Alt1", name: "50yr", value: feature.properties.A1F50},
                {con: "Alt2", name: "50yr", value: feature.properties.A2F50},
                {con: "Alt3", name: "50yr", value: feature.properties.A3F50},
                {con: "Alt4", name: "50yr", value: feature.properties.A4F50},
                {con: "SP", name: "50yr", value: feature.properties.SPF50},
                {con: "Ex", name: "10yr", value: feature.properties.ExF10},
                {con: "Alt1", name: "10yr", value: feature.properties.A1F10},
                {con: "Alt2", name: "10yr", value: feature.properties.A2F10},
                {con: "Alt3", name: "10yr", value: feature.properties.A3F10},
                {con: "Alt4", name: "10yr", value: feature.properties.A4F10},
                {con: "SP", name: "10yr", value: feature.properties.SPF10},
                {con: "Ex", name: "5yr", value: feature.properties.ExF5},
                {con: "Alt1", name: "5yr", value: feature.properties.A1F5},
                {con: "Alt2", name: "5yr", value: feature.properties.A2F5},
                {con: "Alt3", name: "5yr", value: feature.properties.A3F5},
                {con: "Alt4", name: "5yr", value: feature.properties.A4F5},
                {con: "SP", name: "5yr", value: feature.properties.SPF5},
                {con: "Ex", name: "2yr", value: feature.properties.ExF2},
                {con: "Alt1", name: "2yr", value: feature.properties.A1F2},
                {con: "Alt2", name: "2yr", value: feature.properties.A2F2},
                {con: "Alt3", name: "2yr", value: feature.properties.A3F2},
                {con: "Alt4", name: "2yr", value: feature.properties.A4F2},
                {con: "SP", name: "2yr", value: feature.properties.SPF2}];

    var	margin = {top: 10, right: 40, bottom: 30, left: 50},
        width = 360 - margin.left - margin.right,
        height = 360 - margin.top - margin.bottom;

        var x = d3.scalePoint()
            .rangeRound([0, width]);

        var y = d3.scaleLinear()
            .range([height, 0]);

            var z0 = d3.scaleOrdinal()
                  .range(['#00C853','#AA00FF','#0091EA','#FFAB00'])
            			.domain(data.map(function(d) { return d.con; }));

            var z1 = d3.scaleOrdinal()
                  .range(["#263238",'#00C853','#AA00FF','#0091EA','#FFAB00','#045275'])
              		.domain(data.map(function(d) { return d.con; }));

            var div = window.document.createElement('div');

            var	svg = d3.select(div)
              .append("svg")
                .attr("class", "xs")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                x.domain(data.map(function(d) { return d.name; }));
                y.domain([0, d3.max(data, function(d) {
                  if (d.value <= 2) {return 2}
                  else if (d.value <= 4) {return 4}
                  else if (d.value <= 8) {return 8}
                  else 	{ return d.value }
                  ;})
                ]);

          	var nestData = d3.nest().key(function(d) { return d.con; }).entries(data);

          	var area = d3.area()
                      .x(function(d) { return x(d.name); })
                      .y0(function(d) { return y(d.value); })
                      .y1(function(d) { return y(0); });
          	var subjectPath = d3.line()
                     .x(function(d) {
                       return x(d.name);
                       })
                     .y(function(d) {
                       return y(d.value);
                       });

                       nestData.forEach(function(d) {
                             if (d.key != "Ex" && d.key != "SP") {
                               svg.append("path")
                                   .attr("class", "trend")
                                   .attr("d", subjectPath(d.values));
                             } else if (d.key == "Ex") {
                                svg.append("path")
                                   .style("fill", "#263238")
                                   .style("fill-opacity", 0.1)
                                   .style("stroke", "#607D8B")
                                   .attr("d", area(d.values));
                             } else {
                                svg.append("path")
                                   .attr("class", "recPlan")
                                   .attr("d", subjectPath(d.values));
                             }

                           });

                           svg.selectAll(".trend")
                           		.data(data)
                               .attr("stroke", function(d) { return z0(d.con); });

                           svg.selectAll(".dot")
                             .data(data)
                           .enter().append("circle")
                             .attr("class", "dot")
                             .attr("r", function(d) {
                                   if (d.con != "Ex" && d.con != "SP") {return 0;}
                                   else {return 3.5;};})
                             .attr("cx", function(d) { return x(d.name); })
                             .attr("cy", function(d) { return y(d.value); })
                           	.attr("stroke", function(d) { if (d.con != "Ex"){ return z1(d.con); } else { return '#607D8B';}})
                           	.style("fill", "none");

    svg.append("text")
                .attr("y", 22)
                .attr("x", 265)
                .attr("font-size", 10)
                .attr("fill", "#00C853")
                .style("text-anchor", "end")
                .text("Alt 1");

            svg.append("text")
                .attr("y", 34)
                .attr("x", 265)
                .attr("font-size", 10)
                .attr("fill", "#AA00FF")
                .style("text-anchor", "end")
                .text("Alt 2");
    svg.append("text")
                .attr("y", 46)
                .attr("x", 265)
                .attr("font-size", 10)
                .attr("fill", "#0091EA")
                .style("text-anchor", "end")
                .text("Alt 3");

            svg.append("text")
                .attr("y", 58)
                .attr("x", 265)
                .attr("font-size", 10)
                .attr("fill", "#FFAB00")
                .style("text-anchor", "end")
                .text("Alt 4");

                svg.append("text")
                    .attr("y", 10)
                    .attr("x", 265)
                    .attr("font-size", 10)
                    .attr("font-weight", "bold")
                    .attr("fill", "#045275")
                    .style("text-anchor", "end")
                    .text("Selected Plan");


          // Add the X Axis
          svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x).tickSizeInner(-height).tickPadding(10).tickSizeOuter(0));

          // Add the Y Axis
          svg.append("g")
              .call(d3.axisLeft(y).tickSizeInner(-width).ticks(4).tickPadding(5).tickSizeOuter(0))
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 3)
              .attr("dy", ".71em")
              .attr("font-size", 8)
              .attr("fill", "#000")
              .style("text-anchor", "end")
              .text("ft");

        function type(d) {
          d.value = +d.value;
          return d;
        }

        var d3popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setDOMContent(div)
            .addTo(map);

          } else { return; }
    });

map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['conduits', 'junctions','flowDepth','basinLabels2','alternatives'] });

    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');
