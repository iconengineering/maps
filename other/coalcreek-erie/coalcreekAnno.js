// let's try some D3
// Setup our svg layer that we can manipulate with d3
    var container = map.getCanvasContainer()
    var svg = d3.select(container).append("svg").attr("class", "d3-svg")

    var data = [{
      lon: -105.05543231964111,
      lat: 40.06582195986086
    },
    {
      lon: -105.05884408950804,
      lat: 40.06932789712973
    }];

    function project(d) {
      return map.project(getLL(d));
    }
    function getLL(d) {
      return new mapboxgl.LngLat(+d.lon, +d.lat)
    }

      function render0() {
        svg.selectAll("#anno1-group .annotation")
        	.data(data)
        .attr("transform", "translate (" + project(data[0]).x + "," + project(data[0]).y + ")")
      }

      function render1() {
        svg.selectAll("#anno2-group .annotation")
        	.data(data)
        .attr("transform", "translate (" + project(data[1]).x + "," + project(data[1]).y + ")")
      }

      var anno1 = [
        {
          //below in makeAnnotations has type set to d3.annotationLabel
          //you can add this type value below to override that default
          type: d3.annotationCalloutCircle,
          id: "anno1",
          note: {
            label: "Reduce flooding.",
            title: "County Line Road",
            wrap: 190
          },
          //settings for the subject, in this case the circle radius
          subject: {
            radius: 50
          },
          x: project(data[0]).x,
          y: project(data[0]).y,
          dy: 137,
          dx: 102
        }];

      var anno2 = [
        {
          //below in makeAnnotations has type set to d3.annotationLabel
          //you can add this type value below to override that default
          type: d3.annotationCalloutCircle,
          id: "anno2",
          note: {
            label: "Reduce flooding",
            title: "Westview Estates",
            wrap: 190
          },
          //settings for the subject, in this case the circle radius
          subject: {
            radius: 50
          },
          x: project(data[1]).x,
          y: project(data[1]).y,
          dy: -137,
          dx: -102
        }];

        var makeAnno1 = d3.annotation()
          .type(d3.annotationLabel)
          .annotations(anno1);

        d3.select(".d3-svg")
          .append("g")
          .attr("id", "anno1-group")
          .attr("class", "annotation-group hidden")
          .call(makeAnno1);

        var makeAnno2 = d3.annotation()
          .type(d3.annotationLabel)
          .annotations(anno2);

        d3.select(".d3-svg")
          .append("g")
          .attr("id", "anno2-group")
          .attr("class", "annotation-group hidden")
          .call(makeAnno2);

      // re-render our visualization whenever the view changes
      map.on("viewreset", function() {
        render0()
        render1()
      })
      map.on("move", function() {
        render0()
        render1()
      })

document.querySelector('#anno1').addEventListener('click', function(){
  var anno = document.querySelector('#anno1-group');
  if (anno.className.baseVal == 'annotation-group hidden') {
    $(anno).removeClass('hidden');
    map.flyTo({center: getLL(data[0])});
  } else {
    $(anno).addClass('hidden');
  }
});

document.querySelector('#anno2').addEventListener('click', function(){
  var anno = document.querySelector('#anno2-group');
  if (anno.className.baseVal == 'annotation-group hidden') {
    $(anno).removeClass('hidden');
    map.flyTo({center: getLL(data[1])});
  } else {
    $(anno).addClass('hidden');
  }
});
