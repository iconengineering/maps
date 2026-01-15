mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
    zoom: 17,
    center: [-104.8974, 39.5721],
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

$(document).ready(function() {
    $("#clear").click(function() {
        var checkBoxes = $("input[type=checkbox]");
        checkBoxes.prop("checked", false);
        map.setPaintProperty('watersheds','fill-opacity', 0);
        map.setPaintProperty('ponds','fill-opacity', 0);
        map.setPaintProperty('flowDepth','fill-opacity', 0);
        map.setPaintProperty('flowDepthOver','fill-opacity', 0);

    });
});



map.on('style.load',function(e){
  
  
  map.addSource('landcover', {
    type: 'geojson',
    "data": 'geojson/landuse.geojson'
  });
  
  
  map.addLayer({
    'id': 'landcover',
    'type': 'fill',
    'source': 'landcover',
    'paint': {
        'fill-opacity': 0.5,
        'fill-color': {
            property: 'Land_Use',
            type: 'categorical',
            stops: [
                ['Apartments', '#a6761d'],
                ['Greenbelt', '#66a61e'],
                ['Park', '#7570b3'],
                ['Residential - 0.25 ac or less', '#e7298a'],
                ['Street - Paved', 'black']
                ]
        }
    }
}, 'road-label-small');

});



map.addControl(new mapboxgl.NavigationControl(), 'top-right');


