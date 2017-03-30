mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    zoom: 13,
    center: [-104.9442, 38.8642],
    hash: true,
    preserveDrawingBuffer: true
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.value;
    map.setStyle('mapbox://styles/' + layerId);
    $('.layer-off').prop('checked', false);
    $('.layer-on').prop('checked', true);
    $('.label-off').removeClass('is-checked');
    $('.label-on').addClass('is-checked');
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

function printCanvas() {
    var w = window.open('', '');
    w.document.title = "Printed - Manitou Springs Flood Data";
    var img = new Image();
    img.src = map.getCanvas().toDataURL('image/png', 1.0);
    img.style.maxWidth = "100%";
    w.document.body.appendChild(img);
}

map.on('style.load', function () {

    map.addSource('floodingPts', {
        type: 'vector',
        url: 'mapbox://iconeng.f97313be'
    });
    map.addSource('basins', {
      type: 'geojson',
      data: 'basins.geojson'
  });


    map.addLayer({
        'id': 'basins',
        'type': 'line',
        'source': 'basins',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[13, 1], [17, 4], [19, 6]]
          },
            'line-color': '#e74c3c'
        }
    },'road-label-small');

    map.addLayer({
        'id': 'flooding',
        'type': 'circle',
        'source': 'floodingPts',
        'source-layer': 'gridPts',
        'interactive': true,
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': {
                property: 'velocity',
                base: 1.99,
                type: 'interval',
                stops: [
                    [{zoom: 13, value: .01}, .5],
                    [{zoom: 13, value: 1}, .5],
                    [{zoom: 13, value: 2}, .5],
                    [{zoom: 13, value: 4}, 1],
                    [{zoom: 13, value: 6}, 1],
                    [{zoom: 13, value: 8}, 1],
                    [{zoom: 13, value: 10}, 1.25],
                    [{zoom: 15, value: .01}, 2],
                    [{zoom: 15, value: 1}, 2.5],
                    [{zoom: 15, value: 2}, 3],
                    [{zoom: 15, value: 4}, 3.5],
                    [{zoom: 15, value: 6}, 4],
                    [{zoom: 15, value: 8}, 4.5],
                    [{zoom: 15, value: 10}, 5],
                    [{zoom: 17, value: .01}, 8],
                    [{zoom: 17, value: 1}, 10],
                    [{zoom: 17, value: 2}, 12],
                    [{zoom: 17, value: 4}, 14],
                    [{zoom: 17, value: 6}, 16],
                    [{zoom: 17, value: 8}, 18],
                    [{zoom: 17, value: 10}, 20],
                    [{zoom: 19, value: .01}, 50],
                    [{zoom: 19, value: 1}, 55],
                    [{zoom: 19, value: 2}, 60],
                    [{zoom: 19, value: 4}, 65],
                    [{zoom: 19, value: 6}, 70],
                    [{zoom: 19, value: 8}, 75],
                    [{zoom: 19, value: 10}, 80]
                    ]
            },
            'circle-color': {
                property: 'depth',
                type: 'interval',
                stops: [
                    ['1', '#6e016b'],
                    ['2', '#88419d'],
                    ['4', '#8c6bb1'],
                    ['6', '#8c96c6'],
                    ['8', '#9ebcda'],
                    ['10', '#bfd3e6'],
                    ['40', '#edf8fb']
                    ]
            }
        }
    });

}); //end style load

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['flooding'] });
  if (!features.length) {
      return;
  }

  var feature = features[0];

        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<span>Depth: ' + feature.properties.depth.toFixed(2) + ' ft</span><br />' +
                    '<span>Velocity: ' + feature.properties.velocity.toFixed(2) + ' fps</span><br />')
            .addTo(map);
    });

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['flooding'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

map.addControl(new mapboxgl.Navigation({position: 'top-left'}));

