mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
  zoom: 10,
  center: [-104.9729, 39.7839],
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

  map.addSource('otero_2021-04-08', {
    type: 'raster',
    url: 'mapbox://iconeng.7h98nma5'
  });

  map.addLayer({
    'id': 'otero_2021-04-08',
    'source': 'otero_2021-04-08',
    'type': 'raster',
    'layout': {
      'visibility': 'none',
    }
  });

  map.addSource('otero_2022-01-30', {
    type: 'raster',
    url: 'mapbox://iconeng.Otero_2022-01-30'
  });

  map.addLayer({
    'id': 'otero_2022-01-30',
    'source': 'otero_2022-01-30',
    'type': 'raster',
    'layout': {
      'visibility': 'none',
    }
  });

  map.addSource('otero_2023-11-19', {
    type: 'raster',
    url: 'mapbox://iconeng.Otero_2023-11-19'
  });

  map.addLayer({
    'id': 'otero_2023-11-19',
    'source': 'otero_2023-11-19',
    'type': 'raster',
    'layout': {
      'visibility': 'none',
    }
  });



});




map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['conduits', 'junctions'] });
  if (!features.length) {
    return;
  }

  var feature = features[0];
  var id = feature.layer.id

  if (id == 'conduits' || id == 'junctions') {

    var data = [{ name: "2-yr", value: feature.properties.Q_Ex_002 },
    { name: "10-yr", value: feature.properties.Q_Ex_010 },
    { name: "100-yr", value: feature.properties.Q_Ex_100 }];

    var margin = { top: 10, right: 40, bottom: 30, left: 50 },
      width = 240 - margin.left - margin.right,
      height = 240 - margin.top - margin.bottom;

    var x = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1);

    var y = d3.scaleLinear()
      .range([height, 0]);

    var z = d3.scaleOrdinal()
      .range(['#089099', '#00718b', '#045275']);

    var div = window.document.createElement('div');
    if (id == 'conduits' && feature.properties.Shape1 == 'IRREGULAR') {
      div.innerHTML = '<div class="row"><b>Conduit ' + feature.properties.NAME + '</b><br />Irregular</div>';
    } else if (id == 'conduits' && feature.properties.Shape1 == 'CIRCULAR') {
      div.innerHTML = '<div class="row"><b>Conduit ' + feature.properties.NAME + '</b><br />' + feature.properties.Geom1 + 'ft Circular</div>';
    } else if (id == 'conduits' && feature.properties.Shape1 == 'RECT_CLOSED') {
      div.innerHTML = '<div class="row"><b>Conduit ' + feature.properties.NAME + '</b><br />' + feature.properties.Geom1 + 'ft x ' + feature.properties.Geom2 + 'ft Box</div>';
    } else {
      div.innerHTML = '<div class="row"><b>Junction ' + feature.properties.NAME + '</b></div>';
    };

    var svg = d3.select(div)
      .append("svg")
      .attr("class", "xs")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.select(".xs").selectAll(".bar").remove()

    x.domain(data.map(function (d) { return d.name; }));
    y.domain([0, d3.max(data, function (d) {
      if (d.value <= 25) { return 25 }
      else if (d.value <= 50) { return 50 }
      else if (d.value <= 75) { return 75 }
      else if (d.value <= 250) { return 250 }
      else if (d.value <= 500) { return 500 }
      else if (d.value <= 1000) { return 1000 }
      else if (d.value <= 2500) { return 2500 }
      else { return 5000 }
      ;
    })
    ]);

    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("x", function (d) { return x(d.name); })
      .attr("width", x.bandwidth())
      .attr("y", function (d) { return height; })
      .attr("height", 0)
      .attr("fill", function (d) { return z(d.name); })
      .transition()
      .delay(function (d, i) { return i * 100; })
      .attr("height", function (d) { return height - y(d.value); })
      .attr("y", function (d) { return y(d.value); });

    svg.selectAll("text.bar")
      .data(data)
      .enter().append("text")
      .attr("class", "bar")
      .attr("text-anchor", "middle")
      .attr("x", function (d) { return x(d.name) + 23; })
      .attr("y", function (d) {
        if (height - y(d.value) < 20) { return y(d.value) - 5; }
        else { return y(d.value) + 12; }
        ;
      })
      .attr("fill", function (d) {
        if (height - y(d.value) < 20) { return '#000' }
        else { return '#fff' }
        ;
      })
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .text(function (d) { return Math.round(d.value); });

    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add the Y Axis
    svg.append("g")
      .call(d3.axisLeft(y).ticks(4))
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
  } else { return; }
});

map.on('mousemove', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['conduits', 'junctions'] });

  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

// document.getElementById('LeaydenCreekMDP').addEventListener('click',function() {
//   var bbox = [[-105.255,39.882],[-105.116,39.809]];
//   map.fitBounds(bbox,{padding: 10});
// });

//SW to NE Coordinates
document.getElementById('OteroTrib').addEventListener('click', function () {

  var bbox = [[-104.95109, 39.56747], [-104.94569, 39.57060]];
  map.fitBounds(bbox, { padding: 50 });

});
