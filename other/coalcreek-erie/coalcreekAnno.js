// let's try some D3
// Setup our svg layer that we can manipulate with d3
    var container = map.getCanvasContainer();
    var svg = d3.select(container).append("svg").attr("class", "d3-svg");

      d3.json('./pointGeojson.geojson', function(err,data) {
        var feature = data.features;

      function project(d) {
        return map.project(getLL(d));
      }
      function getLL(d) {
        return new mapboxgl.LngLat(+d.geometry.coordinates[0], +d.geometry.coordinates[1]);
      }

      function projectLineStart(d) {
        return map.project(getLLStart(d));
      }
      function getLLStart(d) {
        return new mapboxgl.LngLat(+d.geometry.coordinates[0][0], +d.geometry.coordinates[0][1]);
      }

      function projectLineEnd(d) {
        return map.project(getLLEnd(d));
      }
      function getLLEnd(d) {
        return new mapboxgl.LngLat(+d.geometry.coordinates[1][0], +d.geometry.coordinates[1][1]);
      }

        function render0() {
          svg.selectAll("#anno1-group .annotation")
          	.data(feature)
          .attr("transform", "translate (" + project(feature[0]).x + "," + project(feature[0]).y + ")");
        }


        function render1() {
          svg.selectAll("#anno2-group .annotation")
          	.data(feature)
          .attr("transform", "translate (" + project(feature[1]).x + "," + project(feature[1]).y + ")");
        }

        function render2() {
          var x1 = projectLineStart(feature[2]).x;
          var y1 = projectLineStart(feature[2]).y;
          var x2 = projectLineEnd(feature[2]).x;
          var y2 = projectLineEnd(feature[2]).y;

          svg.selectAll("#anno3-group .annotation")
            .attr("transform", "translate (" + (x1 + x2) / 2 + "," + (y1 + y2) / 2 + ")");

          svg.selectAll("#anno3-group .subject")
            .attr("d", "M0," + -(y1 - y2) / 2 + "L0," + (y1 - y2) / 2);
        }

        var radius = d3.scaleLinear()
          .domain([13, 19])
          .range([20, 70]);

      var annotation1 = [
        {
          //below in makeAnnotations has type set to d3.annotationLabel
          //you can add this type value below to override that default
          type: d3.annotationCalloutCircle,
          note: {
            label: feature[0].properties.label,
            title: feature[0].properties.title,
            wrap: 190
          },
          //settings for the subject, in this case the circle radius
          subject: {
            radius: radius(map.getZoom()),
          },
          x: project(feature[0]).x,
          y: project(feature[0]).y,
          dy: -50,
          dx: -75
        }];

      var annotation2 = [
        {
          //below in makeAnnotations has type set to d3.annotationLabel
          //you can add this type value below to override that default
          type: d3.annotationCalloutCircle,
          id: "anno2",
          note: {
            label: feature[1].properties.label,
            title: feature[1].properties.title,
            wrap: 190
          },
          //settings for the subject, in this case the circle radius
          subject: {
            radius: radius(map.getZoom()),
          },
          x: project(feature[1]).x,
          y: project(feature[1]).y,
          dy: 50,
          dx: 75
        }];

      var annotation3 = [
        {
          //below in makeAnnotations has type set to d3.annotationLabel
          //you can add this type value below to override that default
          type: d3.annotationXYThreshold,
          id: "anno3",
          note: {
            label: feature[2].properties.label,
            title: feature[2].properties.title,
            wrap: 190
          },
          //settings for the subject
          subject: {
            y1: projectLineStart(feature[2]).y,
            y2: projectLineEnd(feature[2]).y
          },
          x: projectLineStart(feature[2]).x,
          y: (projectLineStart(feature[2]).y + projectLineEnd(feature[2]).y) / 2,
          dy: -25,
          dx: -40
        }];

        var makeAnno1 = d3.annotation()
          .editMode(true)
          .type(d3.annotationLabel)
          .annotations(annotation1);

        d3.select(".d3-svg")
          .append("g")
          .attr("id", "anno1-group")
          .attr("class", "annotation-group hidden")
          .call(makeAnno1);

        var makeAnno2 = d3.annotation()
          .editMode(true)
          .type(d3.annotationLabel)
          .annotations(annotation2);

        d3.select(".d3-svg")
          .append("g")
          .attr("id", "anno2-group")
          .attr("class", "annotation-group hidden")
          .call(makeAnno2);

        var makeAnno3 = d3.annotation()
          .editMode(true)
          .type(d3.annotationLabel)
          .annotations(annotation3);

        d3.select(".d3-svg")
          .append("g")
          .attr("id", "anno3-group")
          .attr("class", "annotation-group hidden")
          .call(makeAnno3);

      // re-render our visualization whenever the view changes
      map.on("viewreset", function() {
        render0()
        render1()
        render2()
      })
      map.on("move", function() {
        render0()
        render1()
        render2()

      })

document.querySelector('#anno1').addEventListener('click', function(){
  var anno = document.querySelector('#anno1-group');
  var annoButton = document.querySelector('#anno1');
  if (anno.className.baseVal == 'annotation-group hidden') {
    $(anno).removeClass('hidden');
    $(annoButton).addClass('white-text');
    $(annoButton).parent('li').addClass('cyan darken-2');
    map.flyTo({center: getLL(feature[0])});
  } else {
    $(anno).addClass('hidden');
    $(annoButton).removeClass('white-text');
    $(annoButton).parent('li').removeClass('cyan darken-2');
  }
});

document.querySelector('#anno2').addEventListener('click', function(){
  var anno = document.querySelector('#anno2-group');
  var annoButton = document.querySelector('#anno2');
  if (anno.className.baseVal == 'annotation-group hidden') {
    $(anno).removeClass('hidden');
    $(annoButton).addClass('white-text');
    $(annoButton).parent('li').addClass('cyan darken-2');
    map.flyTo({center: getLL(feature[1])});
  } else {
    $(anno).addClass('hidden');
    $(annoButton).removeClass('white-text');
    $(annoButton).parent('li').removeClass('cyan darken-2');
  }
});

document.querySelector('#anno3').addEventListener('click', function(){
  var anno = document.querySelector('#anno3-group');
  var annoButton = document.querySelector('#anno3');
  if (anno.className.baseVal == 'annotation-group hidden') {
    $(anno).removeClass('hidden');
    $(annoButton).addClass('white-text');
    $(annoButton).parent('li').addClass('cyan darken-2');
    map.flyTo({center: [-105.05538940429688,40.058]});
  } else {
    $(anno).addClass('hidden');
    $(annoButton).removeClass('white-text');
    $(annoButton).parent('li').removeClass('cyan darken-2');
  }
});

});
