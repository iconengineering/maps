
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
} else {
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cikh67rk8004n9vkouhls14s4',
    zoom: 15,
    center: [-105.345, 39.903]
});

map.on('style.load', function () {

  map.addSource('nodes', {
      type: 'geojson',
      data: 'CCC_SMS_Nodes.geojson'
  });
    map.addLayer({
        'id': 'flowGrid',
        'interactive': true,
        'type': 'circle',
        'source': 'nodes',
        'layout': {

        },
        'paint': {
            'circle-color': '#fff',
            'circle-opacity': 0.0001
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth2',
        'type': 'circle',
        'source': 'nodes',
        'filter': ['all', ['>', 'V1', 0.25],['<=', 'V1', 0.5]],
        'layout': {

        },
        'paint': {
          "circle-radius": {
              "base": 1.99,
              "stops": [[15, 4.5], [22, 250]]
          },
          "circle-blur": {
              "base": 1,
              "stops": [[15, 1], [20, 0.05]]
          },
            'circle-color': '#edf8b1',
            'circle-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth3',
        'type': 'circle',
        'source': 'nodes',
        'filter': ['all', ['>', 'V1', 0.5],['<=', 'V1', 1]],
        'layout': {
        },
        'paint': {
          "circle-radius": {
              "base": 1.99,
              "stops": [[15, 4.5], [22, 250]]
          },
          "circle-blur": {
              "base": 1,
              "stops": [[15, 1], [20, 0.05]]
          },
            'circle-color': '#c7e9b4',
            'circle-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth4',
        'type': 'circle',
        'source': 'nodes',
        'filter': ['all', ['>', 'V1', 1],['<=', 'V1', 1.5]],
        'layout': {
        },
        'paint': {
          "circle-radius": {
              "base": 1.99,
              "stops": [[15, 4.5], [22, 250]]
          },
          "circle-blur": {
              "base": 1,
              "stops": [[15, 1], [20, 0.05]]
          },
            'circle-color': '#7fcdbb',
            'circle-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth5',
        'type': 'circle',
        'source': 'nodes',
        'filter': ['all', ['>', 'V1', 1.5],['<=', 'V1', 2]],
        'layout': {
        },
        'paint': {
          "circle-radius": {
              "base": 1.99,
              "stops": [[15, 4.5], [22, 250]]
          },
          "circle-blur": {
              "base": 1,
              "stops": [[15, 1], [20, 0.05]]
          },
            'circle-color': '#41b6c4',
            'circle-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth6',
        'type': 'circle',
        'source': 'nodes',
        'filter': ['all', ['>', 'V1', 2],['<=', 'V1', 3]],
        'layout': {
        },
        'paint': {
          "circle-radius": {
              "base": 1.99,
              "stops": [[15, 4.5], [22, 250]]
          },
          "circle-blur": {
              "base": 1,
              "stops": [[15, 1], [20, 0.05]]
          },
            'circle-color': '#1d91c0',
            'circle-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth7',
        'type': 'circle',
        'source': 'nodes',
        'filter': ['all', ['>', 'V1', 3],['<=', 'V1', 4]],
        'layout': {
        },
        'paint': {
          "circle-radius": {
              "base": 1.99,
              "stops": [[15, 4.5], [22, 250]]
          },
          "circle-blur": {
              "base": 1,
              "stops": [[15, 1], [20, 0.05]]
          },
            'circle-color': '#225ea8',
            'circle-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth8',
        'type': 'circle',
        'source': 'nodes',
        'filter': ['all', ['>', 'V1', 4]],
        'layout': {
        },
        'paint': {
          "circle-radius": {
              "base": 1.99,
              "stops": [[15, 4.5], [22, 250]]
          },
          "circle-blur": {
              "base": 1,
              "stops": [[15, 1], [20, 0.05]]
          },
            'circle-color': '#0c2c84',
            'circle-opacity': 0.8
        }
    },'road_label');
}); //end style load

  function start() {

    var margin = { top: 10, right: 20, bottom: 20, left: 20 };

    var startStep = 15,
      endStep = 195,
      initialStep = 15;

    var steps = d3.range(startStep, endStep + 15);

    var startWidth = Math.min(window.innerWidth, 195);
     var width = startWidth - margin.left - margin.right;
     var height = 60 - margin.top - margin.bottom;

     var block = d3.select("#slider").append("svg")

     var stepScale = d3.scale.linear()
       .domain([startStep, endStep])
       .range([0, width])
       .clamp(true);

    var stepIndicator = d3.select('#sliderText')
        .style("display", "none");

    function setStep(step) {
  //  map.setFilter('Ice Extent', ['==', 'year', year]);

      map.setFilter('flowDepth2', ['all', ['>', step, 0.25],['<=', step, 0.5]]);
      map.setFilter('flowDepth3', ['all', ['>', step, 0.5],['<=', step, 1]]);
      map.setFilter('flowDepth4', ['all', ['>', step, 1],['<=', step, 1.5]]);
      map.setFilter('flowDepth5', ['all', ['>', step, 1.5],['<=', step, 2]]);
      map.setFilter('flowDepth6', ['all', ['>', step, 2],['<=', step, 3]]);
      map.setFilter('flowDepth7', ['all', ['>', step, 3],['<=', step, 4]]);
      map.setFilter('flowDepth8', ['all', ['>', step, 4]]);
      stepIndicator.text(step);
    }

    var xAxis = d3.svg.axis()
      .scale(stepScale)
      .orient("bottom")
      .tickValues([15,195]);

    var svgElem = d3.select('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    var svg = svgElem.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var brush = d3.svg.brush()
      .x(stepScale)
      .extent([initialStep, initialStep])
      .on('brush', brushed);

    var slider = svg.append('g')
      .attr('class', 'slider')
      .call(brush);

    slider.selectAll('.extent,.resize,.background')
      .remove();

    var handle = slider.append('g')
      .attr('transform', 'translate(0,' + -8 + ')');

    handle.append('path')
      .attr('d','M0,0L0,' + (height -2))
      .attr('transform', 'translate(0, 8)')
      .attr('class', 'indicator');

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svgElem.on('click', function() {
      var value = stepScale.invert(d3.mouse(svg.node())[0]);
      slider
        .call(brush.event)
        .transition()
          .duration(600)
          .call(brush.extent([value, value]))
          .call(brush.event);
    });

    function brushed() {
      var value = brush.extent()[0];
      if (d3.event.sourceEvent) { // not a programmatic event
        d3.select('.hide-hint').remove();
        value = stepScale.invert(d3.mouse(this)[0]);
        brush.extent([value, value]);
      }

      handle.attr('transform', 'translate(' + stepScale(value) + ',-8)');

      var step = "T" + Math.round(value/15);

      //move indicator needle
      setStep(step);
    }
    d3.selectAll('.line').style('stroke-dashoffset', '0');

    document.body.addEventListener('mousemove', intro);

    function intro() {
      document.body.removeEventListener('mousemove', intro);
      slider
        .call(brush.event)
        .transition()
          .duration(20000)
          .call(brush.extent([endStep, endStep]))
          .call(brush.event);
    }
  }

map.once('style.load', start);

function toggleSeven(id, id2, layer, layer2, layer3, layer4, layer5, layer6, layer7) {

            var visibility = map.getLayoutProperty(layer, 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty(layer, 'visibility', 'none');
                map.setLayoutProperty(layer2, 'visibility', 'none');
                map.setLayoutProperty(layer3, 'visibility', 'none');
                map.setLayoutProperty(layer4, 'visibility', 'none');
                map.setLayoutProperty(layer5, 'visibility', 'none');
                map.setLayoutProperty(layer6, 'visibility', 'none');
                map.setLayoutProperty(layer7, 'visibility', 'none');
                document.getElementById(id).className = '';
                document.getElementById(id2).className = 'link depth-1';
            } else {
                document.getElementById(id).className = 'display';
                document.getElementById(id2).className = 'link depth-1 display';
                map.setLayoutProperty(layer, 'visibility', 'visible');
                map.setLayoutProperty(layer2, 'visibility', 'visible');
                map.setLayoutProperty(layer3, 'visibility', 'visible');
                map.setLayoutProperty(layer4, 'visibility', 'visible');
                map.setLayoutProperty(layer5, 'visibility', 'visible');
                map.setLayoutProperty(layer6, 'visibility', 'visible');
                map.setLayoutProperty(layer7, 'visibility', 'visible');
            }
        };

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (e) {
    map.featuresAt(e.point, {layer: ['flowGrid'], radius: 10, includeGeometry: true}, function (err, features) {
      if (err) throw err;
      var feature = features[0];

      var data = [{name: "15", value: feature.properties.T1},
                  {name: "30", value: feature.properties.T2},
                  {name: "45", value: feature.properties.T3},
                  {name: "60", value: feature.properties.T4},
                  {name: "75", value: feature.properties.T5},
                  {name: "90", value: feature.properties.T6},
                  {name: "105", value: feature.properties.T7},
                  {name: "120", value: feature.properties.T8},
                  {name: "135", value: feature.properties.T9},
                  {name: "150", value: feature.properties.T10},
                  {name: "165", value: feature.properties.T11},
                  {name: "180", value: feature.properties.T12},
                  {name: "195", value: feature.properties.T13}];



        var tooltip = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .addTo(map);

              var margin = {top: 20, right: 20, bottom: 30, left: 40},
                  width = 300 - margin.left - margin.right,
                  height = 200 - margin.top - margin.bottom;

              var div = d3.select("body").append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);

              var x = d3.scale.linear()
                  .range([0, width]);

              var y = d3.scale.linear()
                  .range([height, 0]);

              x.domain([0, 195]);
              y.domain([0, 8]);

              var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom")
                  .tickValues([0,195]);

              var yAxis = d3.svg.axis()
                  .scale(y)
                  .orient("left")
                  .tickValues([2,4,6,8]);

              var svg = d3.select(".mapboxgl-popup-content").append("svg")
                  .attr("class", "junction")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                d3.select(".junction").selectAll(".line").remove()

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
                    .text("depth (ft)");

                var line = d3.svg.line()
                    .x(function(d) { return x(d.name); })
                    .y(function(d) { return y(d.value); })
                    .interpolate('monotone');

                var graph = svg.append("path")
                    .attr("class", "line")
                    .attr("d", line(data));

                var totalLength = graph.node().getTotalLength();

                graph
                  .attr("stroke-dasharray", totalLength + " " + totalLength)
                  .attr("stroke-dashoffset", totalLength)
                  .transition()
                    .duration(1000)
                    .ease("linear")
                    .attr("stroke-dashoffset", 0);

                svg.on("click", function(){
                  path
                    .transition()
                    .duration(1000)
                    .ease("linear")
                    .attr("stroke-dashoffset", totalLength);
                })

                var points = svg.selectAll("dot")
                      .data(data)
                    .enter().append("circle")
                      .style("opacity", 0.1)
                      .attr("r", 2.5)
                      .attr("fill","#69D2E7")
                      .attr("cx", function(d) { return x(d.name); })
                      .attr("cy", function(d) { return y(d.value); });

                    points.on("mouseover", function(data) {
                        d3.select(this)
                          .transition()
                            .duration(200)
                            .attr("r", 6.5)
                            .style("opacity", .8);
                        div.transition()
                            .duration(200)
                            .style("opacity", .9);
                        div	.html(function(d) {
                              return "<strong><span style='color:#1B55C0'>" + data.value + "</span> ft</strong>";
                            })
                            .style("left", (d3.event.pageX - 30) + "px")
                            .style("top", (d3.event.pageY - 50) + "px");
                        })
                    .on("mouseout", function(data) {
                        d3.select(this)
                          .transition()
                            .duration(500)
                            .attr("r", 3.5)
                            .style("opacity", .1);
                        div.transition()
                            .duration(500)
                            .style("opacity", 0);
                    });
;

              function type(d) {
                d.value = +d.value;
                return d;
              }

    });
});

//map.on('click', function (e) {
  //  map.featuresAt(e.point, {layer: ['basins'], radius: 10, includeGeometry: true}, function (err, features) {
    //  if (err) throw err;
      //var feature = features[0];
        //  document.getElementById('features').innerHTML = 'Basin: ' + feature.properties.Basin;
    //});
//});

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
    map.featuresAt(e.point, {layer: ['flowGrid'], radius: 10}, function (err, features) {
        map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';
    });
});

//map.on('mousemove', function (e) {
//    map.featuresAt(e.point, {layer: ['basins'], radius: 10}, function (err, features) {
//        if (!err && features.length) {
//                map.setFilter("basins-hover", ["==", "Basin", features[0].properties.Basin]);
//            } else {
//                map.setFilter("basins-hover", ["==", "Basin", ""]);
//            }
//    });
//});

map.addControl(new mapboxgl.Geocoder());
map.addControl(new mapboxgl.Navigation({position: 'top-left'}));

}
