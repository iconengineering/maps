mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
  zoom: 15,
  center: [-105.067, 39.485],
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



  map.addSource('20230220', {
    type: 'raster',
    url: 'mapbox://iconeng.wcsr_20230220_byte'
  });


  map.addLayer({
    'id': '20230220',
    'source': '20230220',
    'type': 'raster',
    'layout': {
      'visibility': 'none',
    }
  });

});

// Array of raster layer IDs
const rasterLayerIds = ['20230220', '20230220', '20230220'];

// Function to update layer visibility based on slider value
function updateLayerVisibility(layerId, visibility) {
  map.setLayoutProperty(layerId, 'visibility', visibility);
}


// Add an event listener to the checkbox
document.getElementById('aerialCheckbox').addEventListener('change', function () {
  // Get the slider element
  var slider = document.getElementById('slider');

  // If the checkbox is checked, show the slider; otherwise, hide it
  slider.style.display = this.checked ? 'block' : 'none';

  // If the checkbox is checked and the slider is not yet initialized, initialize it
  if (this.checked && !slider.dataset.initialized) {
    // Add any additional initialization logic for the slider here
    slider.dataset.initialized = true;
  }
});

// Add slider event listener
document.getElementById('slider').addEventListener('input', function (e) {
  const sliderValue = parseInt(e.target.value, 10);

  // Hide all layers
  rasterLayerIds.forEach(layerId => {
    updateLayerVisibility(layerId, 'none');
  });

  // Show the selected layer
  const selectedLayerId = rasterLayerIds[sliderValue - 1];
  updateLayerVisibility(selectedLayerId, 'visible');
});

document.getElementById('slider').style.display = 'none';

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

