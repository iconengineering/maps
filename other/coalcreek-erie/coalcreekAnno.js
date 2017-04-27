function drawAnno(){
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
          svg.selectAll("#anno0-group .annotation")
          	.data(feature)
          .attr("transform", "translate (" + project(feature[0]).x + "," + project(feature[0]).y + ")");
        }

        function render1() {
          svg.selectAll("#anno1-group .annotation")
          	.data(feature)
          .attr("transform", "translate (" + project(feature[1]).x + "," + project(feature[1]).y + ")");
        }

        function render2() {
          var x1 = projectLineStart(feature[2]).x;
          var y1 = projectLineStart(feature[2]).y;
          var x2 = projectLineEnd(feature[2]).x;
          var y2 = projectLineEnd(feature[2]).y;

          svg.selectAll("#anno2-group .annotation")
            .attr("transform", "translate (" + (x1 + x2) / 2 + "," + (y1 + y2) / 2 + ")");

          svg.selectAll("#anno2-group .subject")
            .attr("d", "M0," + -(y1 - y2) / 2 + "L0," + (y1 - y2) / 2);
        }

        function render3() {
          svg.selectAll("#anno3-group .annotation")
            .data(feature)
          .attr("transform", "translate (" + project(feature[3]).x + "," + project(feature[3]).y + ")");
        }

        function render4() {
          svg.selectAll("#anno4-group .annotation")
            .data(feature)
          .attr("transform", "translate (" + project(feature[4]).x + "," + project(feature[4]).y + ")");
        }

        function render5() {
          svg.selectAll("#anno5-group .annotation")
            .data(feature)
          .attr("transform", "translate (" + project(feature[5]).x + "," + project(feature[5]).y + ")");
        }

        function render6() {
          svg.selectAll("#anno6-group .annotation")
            .data(feature)
          .attr("transform", "translate (" + project(feature[6]).x + "," + project(feature[6]).y + ")");
        }

        var radius = d3.scaleLinear()
          .domain([13, 19])
          .range([20, 70]);

      var annotation0 = [
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
            radius: radius(map.getZoom()) / 2,
          },
          x: project(feature[0]).x,
          y: project(feature[0]).y,
          dy: -50,
          dx: -75
        }];

      var annotation1 = [
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
          dy: 0,
          dx: 75
        }];

      var annotation2 = [
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
          dy: 25,
          dx: -40
        }];

      var annotation3 = [
        {
          //below in makeAnnotations has type set to d3.annotationLabel
          //you can add this type value below to override that default
          type: d3.annotationCalloutCircle,
          note: {
            label: feature[3].properties.label,
            title: feature[3].properties.title,
            wrap: 190
          },
          //settings for the subject, in this case the circle radius
          subject: {
            radius: radius(map.getZoom()) / 2,
          },
          x: project(feature[3]).x,
          y: project(feature[3]).y,
          dy: -50,
          dx: 75
        }];

      var annotation4 = [
        {
          //below in makeAnnotations has type set to d3.annotationLabel
          //you can add this type value below to override that default
          type: d3.annotationCalloutCircle,
          note: {
            label: feature[4].properties.label,
            title: feature[4].properties.title,
            wrap: 190
          },
          //settings for the subject, in this case the circle radius
          subject: {
            radius: radius(map.getZoom()) / 2,
          },
          x: project(feature[4]).x,
          y: project(feature[4]).y,
          dy: 50,
          dx: -75
        }];

      var annotation5 = [
        {
          //below in makeAnnotations has type set to d3.annotationLabel
          //you can add this type value below to override that default
          type: d3.annotationCalloutCircle,
          note: {
            label: feature[5].properties.label,
            title: feature[5].properties.title,
            wrap: 190
          },
          //settings for the subject, in this case the circle radius
          subject: {
            radius: radius(map.getZoom()),
          },
          x: project(feature[5]).x,
          y: project(feature[5]).y,
          dy: 50,
          dx: -75
        }];

      var annotation6 = [
        {
          //below in makeAnnotations has type set to d3.annotationLabel
          //you can add this type value below to override that default
          type: d3.annotationCalloutCircle,
          note: {
            label: feature[6].properties.label,
            title: feature[6].properties.title,
            wrap: 190
          },
          //settings for the subject, in this case the circle radius
          subject: {
            radius: radius(map.getZoom()),
          },
          x: project(feature[6]).x,
          y: project(feature[6]).y,
          dy: -50,
          dx: 75
        }];

        var makeAnno0 = d3.annotation()
          .editMode(true)
          .type(d3.annotationLabel)
          .annotations(annotation0);

        d3.select(".d3-svg")
          .append("g")
          .attr("id", "anno0-group")
          .attr("class", "annotation-group")
          .call(makeAnno0);

        var makeAnno1 = d3.annotation()
          .editMode(true)
          .type(d3.annotationLabel)
          .annotations(annotation1);

        d3.select(".d3-svg")
          .append("g")
          .attr("id", "anno1-group")
          .attr("class", "annotation-group")
          .call(makeAnno1);

        var makeAnno2 = d3.annotation()
          .editMode(true)
          .type(d3.annotationLabel)
          .annotations(annotation2);

        d3.select(".d3-svg")
          .append("g")
          .attr("id", "anno2-group")
          .attr("class", "annotation-group")
          .call(makeAnno2);

        var makeAnno3 = d3.annotation()
          .editMode(true)
          .type(d3.annotationLabel)
          .annotations(annotation3);

        d3.select(".d3-svg")
          .append("g")
          .attr("id", "anno3-group")
          .attr("class", "annotation-group")
          .call(makeAnno3);

        var makeAnno4 = d3.annotation()
          .editMode(true)
          .type(d3.annotationLabel)
          .annotations(annotation4);

        d3.select(".d3-svg")
          .append("g")
          .attr("id", "anno4-group")
          .attr("class", "annotation-group")
          .call(makeAnno4);

        var makeAnno5 = d3.annotation()
          .editMode(true)
          .type(d3.annotationLabel)
          .annotations(annotation5);

        d3.select(".d3-svg")
          .append("g")
          .attr("id", "anno5-group")
          .attr("class", "annotation-group")
          .call(makeAnno5);

        var makeAnno6 = d3.annotation()
          .editMode(true)
          .type(d3.annotationLabel)
          .annotations(annotation6);

        d3.select(".d3-svg")
          .append("g")
          .attr("id", "anno6-group")
          .attr("class", "annotation-group")
          .call(makeAnno6);

      // re-render our visualization whenever the view changes
      map.on("viewreset", function() {
        render0()
        render1()
        render2()
        render3()
        render4()
        render5()
        render6()
      })
      map.on("move", function() {
        render0()
        render1()
        render2()
        render3()
        render4()
        render5()
        render6()
      })

document.querySelector('#anno0').addEventListener('click', function(){
  var anno = document.querySelector('#anno0-group');
  var annoButton = document.querySelector('#anno0');
  if (anno.className.baseVal == 'annotation-group hidden') {
    $(anno).removeClass('hidden');
    $(annoButton).parent('li').removeClass('lighten-3');
    map.flyTo({center: getLL(feature[0])});
  } else {
    $(anno).addClass('hidden');
    $(annoButton).parent('li').addClass('lighten-3');
  }
});

document.querySelector('#anno1').addEventListener('click', function(){
  var anno = document.querySelector('#anno1-group');
  var annoButton = document.querySelector('#anno1');
  if (anno.className.baseVal == 'annotation-group hidden') {
    $(anno).removeClass('hidden');
    $(annoButton).parent('li').removeClass('lighten-3');
    map.flyTo({center: getLL(feature[1])});
  } else {
    $(anno).addClass('hidden');
    $(annoButton).parent('li').addClass('lighten-3');
  }
});

document.querySelector('#anno2').addEventListener('click', function(){
  var anno = document.querySelector('#anno2-group');
  var annoButton = document.querySelector('#anno2');
  if (anno.className.baseVal == 'annotation-group hidden') {
    $(anno).removeClass('hidden');
    $(annoButton).parent('li').removeClass('lighten-3');
    map.flyTo({center: [-105.05538940429688,40.058]});
  } else {
    $(anno).addClass('hidden');
    $(annoButton).parent('li').addClass('lighten-3');
  }
});

document.querySelector('#anno3').addEventListener('click', function(){
  var anno = document.querySelector('#anno3-group');
  var annoButton = document.querySelector('#anno3');
  if (anno.className.baseVal == 'annotation-group hidden') {
    $(anno).removeClass('hidden');
    $(annoButton).parent('li').removeClass('lighten-3');
    map.flyTo({center: getLL(feature[3])});
  } else {
    $(anno).addClass('hidden');
    $(annoButton).parent('li').addClass('lighten-3');
  }
});

document.querySelector('#anno4').addEventListener('click', function(){
  var anno = document.querySelector('#anno4-group');
  var annoButton = document.querySelector('#anno4');
  if (anno.className.baseVal == 'annotation-group hidden') {
    $(anno).removeClass('hidden');
    $(annoButton).parent('li').removeClass('lighten-3');
    map.flyTo({center: getLL(feature[4])});
  } else {
    $(anno).addClass('hidden');
    $(annoButton).parent('li').addClass('lighten-3');
  }
});

document.querySelector('#anno5').addEventListener('click', function(){
  var anno = document.querySelector('#anno5-group');
  var annoButton = document.querySelector('#anno5');
  if (anno.className.baseVal == 'annotation-group hidden') {
    $(anno).removeClass('hidden');
    $(annoButton).parent('li').removeClass('lighten-3');
    map.flyTo({center: getLL(feature[5])});
  } else {
    $(anno).addClass('hidden');
    $(annoButton).parent('li').addClass('lighten-3');
  }
});

document.querySelector('#anno6').addEventListener('click', function(){
  var anno = document.querySelector('#anno6-group');
  var annoButton = document.querySelector('#anno6');
  if (anno.className.baseVal == 'annotation-group hidden') {
    $(anno).removeClass('hidden');
    $(annoButton).parent('li').removeClass('lighten-3');
    map.flyTo({center: getLL(feature[6])});
  } else {
    $(anno).addClass('hidden');
    $(annoButton).parent('li').addClass('lighten-3');
  }
});

});
}
