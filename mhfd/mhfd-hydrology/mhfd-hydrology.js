
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
} else {
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cikh67rk8004n9vkouhls14s4',
    zoom: 15.15,
    center: [-105.2513, 40.0447],
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
    w.document.title = "Printed - Fourmile Canyon Creek at Palo Park";
    var img = new Image();
    img.src = map.getCanvas().toDataURL('image/png', 1.0);
    img.style.maxWidth = "100%";
    w.document.body.appendChild(img);
}

map.on('style.load', function () {

    map.addSource('PaloPark', {
        type: 'vector',
        url: 'mapbox://iconeng.fadebaca'
    });

    map.addSource('HybridDrops', {
        type: 'geojson',
        "data": 'HybridDrops.geojson'
    });

    map.addSource('HybridFloodplainDrops', {
        type: 'geojson',
        "data": 'HybridFloodplainDrops.geojson'
    });

    map.addSource('ExAlignment', {
        type: 'geojson',
        "data": 'Alignment_Existing.geojson'
    });

    map.addSource('historical', {
        type: 'image',
        url: 'images/historical.jpg',
        coordinates: [
          [-105.31611345,40.0643320562],
          [-105.245127602,40.0643320562],
          [-105.245127602,40.0224325478],
          [-105.31611345,40.0224325478]
        ]
    });
    map.addLayer({
        'id': 'aerial',
        'type': 'raster',
        'source': 'historical',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          'raster-opacity': 0.85,
          'raster-hue-rotate': 90
        }
    },'road-label-sm');
// Wetlands
    map.addLayer({
        'id': 'wetland',
        'type': 'fill',
        'source': 'PaloPark',
        'source-layer': 'Wetlands_regulatory_area',
        'layout': { 'visibility': 'none'},
        'paint': {
            'fill-opacity': 0.6,
            'fill-color': {
                property: 'BUFFER_TYP',
                type: 'categorical',
                stops: [
                    ['INNER', '#4CAF50'],
                    ['OUTER', '#8BC34A']
                    ]
                  }
        }
    }, 'road-label-sm');
// Parcels
    map.addLayer({
        'id': 'parcels',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': 'FCR_ParcelLines',
        'layout': {
          'visibility': 'visible',
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1.5], [17, 2], [19, 3]]
          },
          'line-opacity': {
              "stops": [[16, 0.9],[19, 1]]
          },
          'line-color': '#000'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'easements',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': 'FCR_EasementLines',
        'layout': {
          'visibility': 'visible',
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1.5], [17, 2], [19, 3]]
          },
          'line-opacity': {
              "stops": [[16, 0.9],[19, 1]]
          },
          'line-dasharray': [4,3],
          'line-color': '#000'
        }
    },'road-label-sm');

// Existing Contours
    map.addLayer({
        'id': 'majorContours',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': 'FCR_ExistingContoursMajor',
        'layout': {
          'visibility': 'visible',
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
    },'road-label-sm');
    map.addLayer({
        'id': 'minorContours',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': 'FCR_ExistingContoursMinor',
        'layout': {
          'visibility': 'visible',
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
    },'road-label-sm');
    map.addLayer({
        'id': 'majorLabels',
        'type': 'symbol',
        'source': 'PaloPark',
        'source-layer': 'FCR_ExistingContoursMajor',
        'layout': {
          'visibility': 'visible',
          'symbol-placement': 'line',
          'text-field': '{ELEVATION}',
          'text-font': ['Lato Regular','Open Sans Light','Arial Unicode MS Regular'],
          'text-size': {
            "stops": [[15,11],[17,12],[19,16]]
          }
        },
        'paint': {
          'text-color': '#b68054',
          'text-halo-color': 'rgba(255,255,235,0.9)',
          'text-halo-width': 1,
          'text-halo-blur': 0.25
        }
    });
// Drop Structures
    map.addLayer({
        'id': 'hybridDrops',
        'type': 'fill',
        'source': 'HybridDrops',
        'layout': { 'visibility': 'none'},
        'paint': {
            'fill-opacity': 0.55,
            'fill-color': '#FF6D00'
        }
    }, 'road-label-sm');
    map.addLayer({
        'id': 'hybridFloodplainDrops',
        'type': 'fill',
        'source': 'HybridFloodplainDrops',
        'layout': { 'visibility': 'none'},
        'paint': {
            'fill-opacity': 0.55,
            'fill-color': '#DD2C00'
        }
    }, 'road-label-sm');
// High Sediment Channel
    map.addLayer({
        'id': 'hscMajorContours',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': 'FCR_HSC_MajorContour',
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
          'line-color': '#0b0074'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'hscMinorContours',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': 'FCR_HSC_MinorContour',
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
          'line-color': '#0b0074'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'hscLabels',
        'type': 'symbol',
        'source': 'PaloPark',
        'source-layer': 'FCR_HSC_MajorContour',
        'layout': {
          'visibility': 'none',
          'symbol-placement': 'line',
          'text-font': ['Lato Regular','Open Sans Light','Arial Unicode MS Regular'],
          'text-field': '{ELEVATION}',
          'text-size': {
            "stops": [[15,9],[17,11],[19,15]]
          }
        },
        'paint': {
          'text-color': '#0b0074',
          'text-halo-color': 'rgba(255,255,255,0.9)',
          'text-halo-width': 1,
          'text-halo-blur': 0.25
        }
    });
//Low Sediment Channel
    map.addLayer({
        'id': 'lscMajorContours',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': 'FCR_LSC_MajorContours',
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
          'line-color': '#ca475e'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'lscMinorContours',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': 'FCR_LSC_MinorContours',
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
          'line-color': '#ca475e'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'lscLabels',
        'type': 'symbol',
        'source': 'PaloPark',
        'source-layer': 'FCR_LSC_MajorContours',
        'layout': {
          'visibility': 'none',
          'symbol-placement': 'line',
          'text-font': ['Lato Regular','Open Sans Light','Arial Unicode MS Regular'],
          'text-field': '{ELEVATION}',
          'text-size': {
            "stops": [[15,9],[17,11],[19,15]]
          }
        },
        'paint': {
          'text-color': '#ca475e',
          'text-halo-color': 'rgba(255,255,255,0.9)',
          'text-halo-width': 1,
          'text-halo-blur': 0.25
        }
    });
// Natural Channel
    map.addLayer({
        'id': 'ncMajorContours',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': 'FCR_NC_MajorContour',
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
          'line-color': '#6d007b'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'ncMinorContours',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': 'FCR_NC_MinorContour',
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
          'line-color': '#6d007b'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'ncLabels',
        'type': 'symbol',
        'source': 'PaloPark',
        'source-layer': 'FCR_NC_MajorContour',
        'layout': {
          'visibility': 'none',
          'symbol-placement': 'line',
          'text-font': ['Lato Regular','Open Sans Light','Arial Unicode MS Regular'],
          'text-field': '{ELEVATION}',
          'text-size': {
            "stops": [[15,9],[17,11],[19,15]]
          }
        },
        'paint': {
          'text-color': '#6d007b',
          'text-halo-color': 'rgba(255,255,255,0.9)',
          'text-halo-width': 1,
          'text-halo-blur': 0.25
        }
    });
// Hybrid Channel
    map.addLayer({
        'id': 'hcMajorContours',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': 'HybridGrading',
        'filter': ['==', 'Index', 5],
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
          'line-color': '#FF9100'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'hcMinorContours',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': 'HybridGrading',
        'filter': ['==', 'Index', 1],
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
          'line-color': '#FF9100'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'hcLabels',
        'type': 'symbol',
        'source': 'PaloPark',
        'source-layer': 'HybridGrading',
        'filter': ['==', 'Index', 5],
        'layout': {
          'visibility': 'none',
          'symbol-placement': 'line',
          'text-font': ['Lato Regular','Open Sans Light','Arial Unicode MS Regular'],
          'text-field': '{ELEVATION}',
          'text-size': {
            "stops": [[15,9],[17,11],[19,15]]
          }
        },
        'paint': {
          'text-color': '#FF9100',
          'text-halo-color': 'rgba(255,255,255,0.9)',
          'text-halo-width': 1,
          'text-halo-blur': 0.25
        }
    });
// Hybrid Floodplain Channel
    map.addLayer({
        'id': 'hfcMajorContours',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': 'HybridFloodplainGrading',
        'filter': ['==', 'Index', 5],
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
          'line-color': '#FF3D00'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'hfcMinorContours',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': 'HybridFloodplainGrading',
        'filter': ['==', 'Index', 1],
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
          'line-color': '#FF3D00'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'hfcLabels',
        'type': 'symbol',
        'source': 'PaloPark',
        'source-layer': 'HybridFloodplainGrading',
        'filter': ['==', 'Index', 5],
        'layout': {
          'visibility': 'none',
          'symbol-placement': 'line',
          'text-font': ['Lato Regular','Open Sans Light','Arial Unicode MS Regular'],
          'text-field': '{ELEVATION}',
          'text-size': {
            "stops": [[15,9],[17,11],[19,15]]
          }
        },
        'paint': {
          'text-color': '#FF3D00',
          'text-halo-color': 'rgba(255,255,255,0.9)',
          'text-halo-width': 1,
          'text-halo-blur': 0.25
        }
    });
// Utilities
    map.addLayer({
        'id': 'ExAlignment',
        'type': 'line',
        'source': 'ExAlignment',
        'layout': {
          'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 3], [19, 4]]
          },
          'line-opacity': {
              "stops": [[16, 0.9],[19, 1]]
          },
          'line-color': '#4DD0E1'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'sanitary',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': 'FCR_SanitarySewers',
        'layout': {
          'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 3], [19, 4]]
          },
          'line-opacity': {
              "stops": [[16, 0.9],[19, 1]]
          },
          'line-color': '#9acd32'
        }
    },'road-label-sm');
    map.addLayer({
        'id': 'storm',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': 'FCR_StormSewers',
        'layout': {
          'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 3], [19, 4]]
          },
          'line-opacity': {
              "stops": [[16, 0.9],[19, 1]]
          },
          'line-color': '#00bfff'
        }
    },'road-label-sm');

// Floodplains

    map.addLayer({
        'id': 'effective',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': '100YREffective',
        'layout': {
            'visibility':'none',
            'line-join': 'miter',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
            'line-color': '#3F51B5',
            'line-dasharray': [3,1]
        }
    }, 'road-label-sm');
    map.addLayer({
        'id': 'existing',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': '100YrExistingFloodplain',
        'layout': {
            'visibility':'none',
            'line-join': 'miter',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
            'line-color': '#03A9F4',
            'line-dasharray': [4,1]
        }
    }, 'road-label-sm');
    map.addLayer({
        'id': 'proposed',
        'type': 'line',
        'source': 'PaloPark',
        'source-layer': '100YrProposedFloodplain',
        'layout': {
            'visibility':'none',
            'line-join': 'miter',
            'line-cap': 'butt'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
            'line-color': '#F50057',
            'line-dasharray': [4,.5]
        }
    }, 'road-label-sm');
// Trees
    map.addLayer({
      'id': 'trees',
      'type': 'circle',
      'source': 'PaloPark',
      'source-layer': 'FCR_Trees',
      'layout': {
        'visibility': 'none',
      },
      'paint': {
        'circle-radius': {
          'stops': [[15,1],[19,2.5]]
        },
        'circle-color': 'mediumseagreen'

      }
    });
    map.addLayer({
      'id': 'treesOutline',
      'type': 'circle',
      'source': 'PaloPark',
      'source-layer': 'FCR_Trees',
      'layout': {
        'visibility': 'none',
      },
      'paint': {
        'circle-radius': {
                property: 'Size',
                base: 1,
                stops: [
                    [{zoom: 15, value: 0}, 1],
                    [{zoom: 15, value: 50}, 4],
                    [{zoom: 22, value: 0}, 4],
                    [{zoom: 22, value: 50}, 50]
                    ]
            },
        'circle-opacity': 0.3,
        'circle-color': 'mediumseagreen'
      }
    });

}); //end style load

map.addControl(new mapboxgl.Navigation({position: 'top-left'}));

}
