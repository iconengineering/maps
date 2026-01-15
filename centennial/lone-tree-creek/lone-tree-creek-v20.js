mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
    zoom: 13,
    center: [-104.839, 39.595],
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
    $('.label-off').removeClass('is-checked');
    $('.label-on').addClass('is-checked');
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

function printCanvas() {
    var w = window.open('', '');
    w.document.title = "Printed - Lone Tree Creek";
    var img = new Image();
    img.src = map.getCanvas().toDataURL('image/png', 1.0);
    img.style.maxWidth = "100%";
    w.document.body.appendChild(img);
}

map.on('style.load', function () {

    map.addSource('contours', {
        type: 'vector',
        url: 'mapbox://iconeng.df7b0466'
    });
    map.addSource('layers', {
        type: 'vector',
        url: 'mapbox://iconeng.6b7a18e9'
    });


    map.addLayer({
        'id': '100year',
        'type': 'fill',
        'source': 'layers',
        'source-layer': 'LoneTreeCrk_SFHA',
        'filter': ['!=', 'ZONE_SUBTY', 'FLOODWAY'],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-opacity': 0.6,
            'fill-color': '#4DB6AC',
            'fill-outline-color': '#4DB6AC'
        }
    });
    map.addLayer({
        'id': 'floodway',
        'type': 'fill',
        'source': 'layers',
        'source-layer': 'LoneTreeCrk_SFHA',
        'filter': ['==', 'ZONE_SUBTY', 'FLOODWAY'],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-opacity': 0.6,
            'fill-color': '#00796B',
            'fill-outline-color': '#00796B'
        }
    });

    map.addLayer({
        'id': '5ftContours',
        'type': 'line',
        'source': 'contours',
        'source-layer': '16040cen_1ft_contours',
        'filter': ['==', 'INDEX', 5],
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 1.75], [19, 2.5]]
          },
          'line-opacity': {
              "stops": [[16, 0.7],[19, 1]]
          },
            'line-color': '#b68054'
        }
    });
    map.addLayer({
        'id': '1ftContours',
        'type': 'line',
        'source': 'contours',
        'source-layer': '16040cen_1ft_contours',
        'filter': ['==', 'INDEX', 1],
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 0], [17, .5], [19, 1]]
          },
          'line-opacity': {
              "stops": [[16, 0.7],[19, 1]]
          },
            'line-color': '#b68054'
        }
    });
    map.addLayer({
        'id': '5ftLabels',
        'type': 'symbol',
        'source': 'contours',
        'source-layer': '16040cen_1ft_contours',
        'filter': ['==', 'INDEX', 5],
        'layout': {
            'visibility': 'none',
          'symbol-placement': 'line',
          'text-field': '{CONTOUR}',
          'text-font': ['DIN Offc Pro Light','Open Sans Light','Arial Unicode MS Regular'],
          'text-size': {
            "stops": [[15,12],[17,14],[19,18]]
          }
        },
        'paint': {
          'text-color': '#b68054',
          'text-halo-color': 'rgba(255,255,235,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 0.5
        }
    });
    map.addLayer({
        'id': 'parcels',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'Parcels',
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 3]]
          },
            'line-color': '#212121'
        }
    }, 'road_label');
    map.addLayer({
        'id': 'parcel-fill',
        'type': 'fill',
        'source': 'layers',
        'source-layer': 'Parcels',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-opacity': 0.01,
            'fill-color': '#ffffff'
        }
    });
    map.addLayer({
        'id': 'pipes',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'SEMSWA_Stormwater_pipes',
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
            'line-color': '#FF5722'
        }
    });
    map.addLayer({
        'id': 'culverts',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'SEMSWA_Culverts',
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
          'line-dasharray': [4,3],
            'line-color': '#FF5722'
        }
    });
    map.addLayer({
        'id': 'centerline',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'LoneTreeCrk_StreamCL',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 3], [19, 6]]
          },
            'line-color': '#0D47A1'
        }
    });
    map.addLayer({
        'id': 'exTrail',
        'type': 'fill',
        'source': 'layers',
        'source-layer': 'Trail_Existing',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-opacity': 0.8,
            'fill-color': '#7E57C2',
            'fill-outline-color': '#5E35B1'
        }
    });
    map.addLayer({
        'id': 'proTrail',
        'type': 'fill',
        'source': 'layers',
        'source-layer': 'Trail_Proposed',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-opacity': 0.8,
            'fill-color': '#26C6DA',
            'fill-outline-color': '#00ACC1'
        }
    });
    map.addLayer({
        'id': 'alignment',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'Alignments',
        'maxzoom':16.5,
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 3], [17, 2], [19, 1]]
          },
            'line-color': '#4DD0E1'
        }
    });
    map.addLayer({
        'id': 'shoulder',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'Trail_Shoulder',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 4], [19, 6]]
          },
            'line-color': '#795548'
        }
    });
    map.addLayer({
        'id': 'crossing',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'Trail_Crossing_Stripe',
        'layout': {
            'visibility': 'visible',
            'line-join': 'bevel',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 3], [17, 15], [19, 50]]
          },
          'line-dasharray': [.1,.2],
            'line-color': '#4DD0E1'
        }
    });
    map.addLayer({
        'id': 'exWall',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'Trail_RetainingWallExisting',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 5], [19, 8]]
          },
          'line-dasharray': [.5,.25],
            'line-color': '#FFEB3B'
        }
    });
    map.addLayer({
        'id': 'proWall',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'Trail_RetainingWallProposed',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 5], [19, 8]]
          },
            'line-color': '#76FF03'
        }
    });
    map.addLayer({
        'id': 'repWall',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'Trail_RetainingWallReplace',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 5], [19, 8]]
          },
            'line-color': '#FFFF00'
        }
    });

}); //end style load

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['parcel-fill'] });
  if (!features.length) {
      return;
  }

  var feature = features[0];

        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<span>' + feature.properties.Situs_Addr + '</span>')
            .addTo(map);
    });

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['parcel-fill'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

map.addControl(new mapboxgl.Navigation({position: 'top-left'}));
