
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
} else {
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cihxv74vo00oynpm48wsujwo3',
    zoom: 13,
    center: [-104.705, 40.42]
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.value;
    map.setStyle('mapbox://styles/iconeng/' + layerId);
    document.getElementById('contours').className = '';
    document.getElementById('contoursMobile').className = 'link depth-1';
    document.getElementById('landuse').className = '';
    document.getElementById('landuseMobile').className = 'link depth-1';
    document.getElementById('depth').className = '';
    document.getElementById('depthMobile').className = 'link depth-1';
    document.getElementById('velocity').className = '';
    document.getElementById('velocityMobile').className = 'link depth-1';
    document.getElementById('stormMains').className = '';
    document.getElementById('stormMainsMobile').className = 'link depth-1';
    document.getElementById('route').className = '';
    document.getElementById('routeMobile').className = 'link depth-1';
    document.getElementById('outfall').className = '';
    document.getElementById('outfallMobile').className = 'link depth-1';
    document.getElementById('basins').className = '';
    document.getElementById('basinsMobile').className = 'link depth-1';
    document.getElementById('junctions').className = 'display';
    document.getElementById('junctionsMobile').className = 'link depth-1 display';
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

map.on('style.load', function () {

  map.addSource('landUse', {
  type: 'vector',
  url: 'mapbox://iconeng.a8402f65'
  });
  map.addLayer({
      'id': 'grass',
      'type': 'fill',
      'source': 'landUse',
      'source-layer': 'NGD_Impervious_Clip',
      'filter': ['all', ['==', 'Imperv', 5]],
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'fill-color': '#A0DB8E',
          'fill-opacity': 0.8
      }
  },'road_label');
  map.addLayer({
      'id': 'gravel',
      'type': 'fill',
      'source': 'landUse',
      'source-layer': 'NGD_Impervious_Clip',
      'filter': ['all', ['==', 'Imperv', 40]],
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'fill-color': '#FFC44D',
          'fill-opacity': 0.8
      }
  },'road_label');
  map.addLayer({
      'id': 'resLow',
      'type': 'fill',
      'source': 'landUse',
      'source-layer': 'NGD_Impervious_Clip',
      'filter': ['all', ['==', 'Imperv', 45]],
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'fill-color': '#b3ecec',
          'fill-opacity': 0.8
      }
  },'road_label');
  map.addLayer({
      'id': 'resMed',
      'type': 'fill',
      'source': 'landUse',
      'source-layer': 'NGD_Impervious_Clip',
      'filter': ['all', ['==', 'Imperv', 60]],
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'fill-color': '#89ecda',
          'fill-opacity': 0.8
      }
  },'road_label');
  map.addLayer({
      'id': 'resHigh',
      'type': 'fill',
      'source': 'landUse',
      'source-layer': 'NGD_Impervious_Clip',
      'filter': ['all', ['==', 'Imperv', 75]],
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'fill-color': '#3bd6c6',
          'fill-opacity': 0.8
      }
  },'road_label');
  map.addLayer({
      'id': 'indLight',
      'type': 'fill',
      'source': 'landUse',
      'source-layer': 'NGD_Impervious_Clip',
      'filter': ['all', ['==', 'Imperv', 80]],
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'fill-color': '#ac81bd',
          'fill-opacity': 0.8
      }
  },'road_label');
  map.addLayer({
      'id': 'indMed',
      'type': 'fill',
      'source': 'landUse',
      'source-layer': 'NGD_Impervious_Clip',
      'filter': ['all', ['==', 'Imperv', 85]],
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'fill-color': '#896797',
          'fill-opacity': 0.8
      }
  },'road_label');
  map.addLayer({
      'id': 'concrete',
      'type': 'fill',
      'source': 'landUse',
      'source-layer': 'NGD_Impervious_Clip',
      'filter': ['all', ['==', 'Imperv', 90]],
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'fill-color': '#666',
          'fill-opacity': 0.8
      }
  },'road_label');
  map.addLayer({
      'id': 'asphalt',
      'type': 'fill',
      'source': 'landUse',
      'source-layer': 'NGD_Impervious_Clip',
      'filter': ['all', ['==', 'Imperv', 100]],
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'fill-color': '#333',
          'fill-opacity': 0.8
      }
  },'road_label');

    map.addSource('contours', {
        type: 'vector',
        url: 'mapbox://iconeng.eda7576e'
    });
    map.addLayer({
        'id': '1ftContours',
        'type': 'line',
        'source': 'contours',
        'source-layer': 'NGD_Contours',
        'filter': ['all', ['==', 'Index', 0]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 0], [17, .5], [19, 1]]
          },
            'line-color': '#333'
        }
    },'road_label');
    map.addLayer({
        'id': '5ftContours',
        'type': 'line',
        'source': 'contours',
        'source-layer': 'NGD_Contours',
        'filter': ['all', ['>=', 'Index', 5],['<=', 'Index', 10]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 1.75], [19, 2.5]]
          },
            'line-color': '#111'
        }
    },'road_label');
    map.addLayer({
        'id': '5ftLabels',
        'type': 'symbol',
        'source': 'contours',
        'source-layer': 'NGD_Contours',
        'filter': ['all', ['>=', 'Index', 5],['<=', 'Index', 10]],
        'layout': {
          'symbol-placement': 'line',
          'visibility': 'none',
          'text-field': '{CONTOUR}',
          'text-size': {
            "stops": [[15,12],[17,14],[19,16]]
          }
        },
        'paint': {
          'text-color': '#000',
          'text-halo-color': 'rgba(255,255,255,0.9)',
          'text-halo-width': 1,
          'text-halo-blur': 1
        }
    });

    map.addSource('basins', {
        type: 'vector',
        url: 'mapbox://iconeng.5558omjd'
    });
    map.addLayer({
        'id': 'basins',
        'type': 'fill',
        'source': 'basins',
        'source-layer': 'NGD_Watersheds',
        'layerGroup': 1,
        'interactive': true,
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'fill-color': '#dc0714',
            'fill-opacity': 0
        }
    });

    map.addLayer({
        "id": "basins-borders",
        "type": "line",
        "source": "basins",
        'source-layer': 'NGD_Watersheds',
        "layout": {
            'visibility': 'none',},
        "paint": {
            "line-color": "#dc0714",
            "line-width": 2
        }
    });

  //  map.addLayer({
  //      "id": "basins-hover",
  //      "type": "fill",
  //      "source": "basins",
  //      'source-layer': 'NGD_Watersheds',
  //      "layout": {},
  //      "paint": {
  //          "fill-color": "#627BC1",
  //          "fill-opacity": 0.25
  //      },
  //      "filter": ["==", "Basin", ""]
  //  });

    map.addSource('basinCentroids', {
        type: 'vector',
        url: 'mapbox://iconeng.51s2rjyj'
    });
    map.addLayer({
        "id": "basins-label",
        "type": "symbol",
        "source": "basinCentroids",
        'source-layer': 'NGD_Centroids',
        "layout": {
          'visibility': 'none',
          "text-size": {
              "stops": [[8,10],[20,20]],
              "base": 1.5
          },
          "text-field": "{Basin} {Area}ac {Imperv}%",
          "text-font": ["Lato Bold", "Arial Unicode MS Bold"],
          "text-max-width": 4
        },
        "paint": {
          "text-color": "#dc0714",
          "text-halo-color": "#F8F4F0",
          "text-halo-width": {
              "base": 1.5,
              "stops": [[11,2],[20,3.75]]
          }
        }
    });

    map.addSource('flowDepthOver', {
    type: 'vector',
    url: 'mapbox://iconeng.4c9ca096'
    });
    map.addLayer({
        'id': 'flowDepth2O',
        'type': 'fill',
        'source': 'flowDepthOver',
        'source-layer': 'ngd_maxflowdepth_over',
        'filter': ['all', ['==', 'GRIDCODE', 1]],
        'maxzoom':14.99,
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 0,
            'line-opacity':0,
            'fill-color': '#ffffcc',
            'fill-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth3O',
        'type': 'fill',
        'source': 'flowDepthOver',
        'source-layer': 'ngd_maxflowdepth_over',
        'filter': ['all', ['==', 'GRIDCODE', 2]],
        'maxzoom':14.99,
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 0,
            'line-opacity':0,
            'fill-color': '#c7e9b4',
            'fill-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth4O',
        'type': 'fill',
        'source': 'flowDepthOver',
        'source-layer': 'ngd_maxflowdepth_over',
        'filter': ['all', ['==', 'GRIDCODE', 3]],
        'maxzoom':14.99,
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 0,
            'line-opacity':0,
            'fill-color': '#7fcdbb',
            'fill-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth5O',
        'type': 'fill',
        'source': 'flowDepthOver',
        'source-layer': 'ngd_maxflowdepth_over',
        'filter': ['all', ['==', 'GRIDCODE', 4]],
        'maxzoom':14.99,
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 0,
            'line-opacity':0,
            'fill-color': '#41b6c4',
            'fill-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth6O',
        'type': 'fill',
        'source': 'flowDepthOver',
        'source-layer': 'ngd_maxflowdepth_over',
        'filter': ['all', ['==', 'GRIDCODE', 5]],
        'maxzoom':14.99,
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 0,
            'line-opacity':0,
            'fill-color': '#1d91c0',
            'fill-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth7O',
        'type': 'fill',
        'source': 'flowDepthOver',
        'source-layer': 'ngd_maxflowdepth_over',
        'filter': ['all', ['==', 'GRIDCODE', 6]],
        'maxzoom':14.99,
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 0,
            'line-opacity':0,
            'fill-color': '#225ea8',
            'fill-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth8O',
        'type': 'fill',
        'source': 'flowDepthOver',
        'source-layer': 'ngd_maxflowdepth_over',
        'filter': ['all', ['==', 'GRIDCODE', 7]],
        'maxzoom':14.99,
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 0,
            'line-opacity':0,
            'fill-color': '#0c2c84',
            'fill-opacity': 0.8
        }
    },'road_label');

    map.addSource('flowDepth', {
    type: 'vector',
    url: 'mapbox://iconeng.4100adae'
    });
    map.addLayer({
        'id': 'flowDepth2',
        'interactive': true,
        'type': 'fill',
        'source': 'flowDepth',
        'source-layer': 'NGD_MaxFlowDepth',
        'filter': ['all', ['>', 'Var', 0.25],['<=', 'Var', 0.5]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 0,
            'line-opacity':0,
            'fill-color': '#ffffcc',
            'fill-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth3',
        'interactive': true,
        'type': 'fill',
        'source': 'flowDepth',
        'source-layer': 'NGD_MaxFlowDepth',
        'filter': ['all', ['>', 'Var', 0.5],['<=', 'Var', 1]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 0,
            'line-opacity':0,
            'fill-color': '#c7e9b4',
            'fill-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth4',
        'interactive': true,
        'type': 'fill',
        'source': 'flowDepth',
        'source-layer': 'NGD_MaxFlowDepth',
        'filter': ['all', ['>', 'Var', 1],['<=', 'Var', 1.5]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 0,
            'line-opacity':0,
            'fill-color': '#7fcdbb',
            'fill-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth5',
        'interactive': true,
        'type': 'fill',
        'source': 'flowDepth',
        'source-layer': 'NGD_MaxFlowDepth',
        'filter': ['all', ['>', 'Var', 1.5],['<=', 'Var', 2]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 0,
            'line-opacity':0,
            'fill-color': '#41b6c4',
            'fill-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth6',
        'interactive': true,
        'type': 'fill',
        'source': 'flowDepth',
        'source-layer': 'NGD_MaxFlowDepth',
        'filter': ['all', ['>', 'Var', 2],['<=', 'Var', 3]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 0,
            'line-opacity':0,
            'fill-color': '#1d91c0',
            'fill-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth7',
        'interactive': true,
        'type': 'fill',
        'source': 'flowDepth',
        'source-layer': 'NGD_MaxFlowDepth',
        'filter': ['all', ['>', 'Var', 3],['<=', 'Var', 4]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 0,
            'line-opacity':0,
            'fill-color': '#225ea8',
            'fill-opacity': 0.8
        }
    },'road_label');
    map.addLayer({
        'id': 'flowDepth8',
        'interactive': true,
        'type': 'fill',
        'source': 'flowDepth',
        'source-layer': 'NGD_MaxFlowDepth',
        'filter': ['all', ['>', 'Var', 4]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 0,
            'line-opacity':0,
            'fill-color': '#0c2c84',
            'fill-opacity': 0.8
        }
    },'road_label');

    map.addSource('velocity', {
    type: 'vector',
    url: 'mapbox://iconeng.22468322'
    });
    map.addLayer({
        'id': 'velocity2',
        'interactive': true,
        'type': 'line',
        'source': 'velocity',
        'source-layer': 'NGD_Velocity',
        'filter': ['all', ['>', 'Var', 0.25],['<=', 'Var', 0.5]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 1.2,
            'line-color': '#ffffb2'
        }
    },'road_label');
    map.addLayer({
        'id': 'velocity3',
        'interactive': true,
        'type': 'line',
        'source': 'velocity',
        'source-layer': 'NGD_Velocity',
        'filter': ['all', ['>', 'Var', 0.5],['<=', 'Var', 1]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 1.4,
            'line-color': '#fed976'
        }
    },'road_label');
    map.addLayer({
        'id': 'velocity4',
        'interactive': true,
        'type': 'line',
        'source': 'velocity',
        'source-layer': 'NGD_Velocity',
        'filter': ['all', ['>', 'Var', 1],['<=', 'Var', 1.5]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 1.6,
            'line-color': '#feb24c'
        }
    },'road_label');
    map.addLayer({
        'id': 'velocity5',
        'interactive': true,
        'type': 'line',
        'source': 'velocity',
        'source-layer': 'NGD_Velocity',
        'filter': ['all', ['>', 'Var', 1.5],['<=', 'Var', 2]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 1.8,
            'line-color': '#fd8d3c'
        }
    },'road_label');
    map.addLayer({
        'id': 'velocity6',
        'interactive': true,
        'type': 'line',
        'source': 'velocity',
        'source-layer': 'NGD_Velocity',
        'filter': ['all', ['>', 'Var', 2],['<=', 'Var', 3]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 2,
            'line-color': '#fc4e2a'
        }
    },'road_label');
    map.addLayer({
        'id': 'velocity7',
        'interactive': true,
        'type': 'line',
        'source': 'velocity',
        'source-layer': 'NGD_Velocity',
        'filter': ['all', ['>', 'Var', 3],['<=', 'Var', 4]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 2.2,
            'line-color': '#e31a1c'
        }
    },'road_label');
    map.addLayer({
        'id': 'velocity8',
        'interactive': true,
        'type': 'line',
        'source': 'velocity',
        'source-layer': 'NGD_Velocity',
        'filter': ['all', ['>', 'Var', 4]],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-width': 2.4,
            'line-color': '#b10026'
        }
    },'road_label');

    map.addSource('stormMain', {
    type: 'vector',
    url: 'mapbox://iconeng.8e41ebe7'
    });
    map.addLayer({
        'id': 'stormMain',
        'type': 'line',
        'source': 'stormMain',
        'source-layer': 'StormMain_Clipped',
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
            'line-color': '#0000ff'
        }
    });

    map.addSource('outfalls', {
    type: 'vector',
    url: 'mapbox://iconeng.7eapzcyu'
    });
    map.addLayer({
        'id': 'outfalls1',
        'type': 'line',
        'source': 'outfalls',
        'source-layer': 'ngd_outfalls',
        'filter': ['all', ['==', 'OutfallNo', 1]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 4], [17, 6], [19, 7]]
          },
            'line-color': "#e31a1c"
        }
    });
    map.addLayer({
        'id': 'outfalls2',
        'type': 'line',
        'source': 'outfalls',
        'source-layer': 'ngd_outfalls',
        'filter': ['all', ['==', 'OutfallNo', 2]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 4], [17, 6], [19, 7]]
          },
            'line-color': "#fb9a99"
        }
    });
    map.addLayer({
        'id': 'outfalls3',
        'type': 'line',
        'source': 'outfalls',
        'source-layer': 'ngd_outfalls',
        'filter': ['all', ['==', 'OutfallNo', 3]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 4], [17, 6], [19, 7]]
          },
            'line-color': "#33a02c"
        }
    });
    map.addLayer({
        'id': 'outfalls4',
        'type': 'line',
        'source': 'outfalls',
        'source-layer': 'ngd_outfalls',
        'filter': ['all', ['==', 'OutfallNo', 4]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 4], [17, 6], [19, 7]]
          },
            'line-color': "#ff7f00"
        }
    });
    map.addLayer({
        'id': 'outfalls5',
        'type': 'line',
        'source': 'outfalls',
        'source-layer': 'ngd_outfalls',
        'filter': ['all', ['==', 'OutfallNo', 5]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 4], [17, 6], [19, 7]]
          },
            'line-color': "#b2df8a"
        }
    });
    map.addLayer({
        'id': 'outfalls6',
        'type': 'line',
        'source': 'outfalls',
        'source-layer': 'ngd_outfalls',
        'filter': ['all', ['==', 'OutfallNo', 6]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 4], [17, 6], [19, 7]]
          },
            'line-color': "#1f78b4"
        }
    });
    map.addLayer({
        'id': 'outfalls7',
        'type': 'line',
        'source': 'outfalls',
        'source-layer': 'ngd_outfalls',
        'filter': ['all', ['==', 'OutfallNo', 7]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 4], [17, 6], [19, 7]]
          },
            'line-color': "#fdbf6f"
        }
    });
    map.addLayer({
        'id': 'outfalls9',
        'type': 'line',
        'source': 'outfalls',
        'source-layer': 'ngd_outfalls',
        'filter': ['all', ['==', 'OutfallNo', 9]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 4], [17, 6], [19, 7]]
          },
            'line-color': "#cab2d6"
        }
    });
    map.addLayer({
        'id': 'outfalls8',
        'type': 'line',
        'source': 'outfalls',
        'source-layer': 'ngd_outfalls',
        'filter': ['all', ['==', 'OutfallNo', 8]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 4], [17, 6], [19, 7]]
          },
            'line-color': "#6a3d9a"
        }
    });
    map.addLayer({
        'id': 'outfalls10',
        'type': 'line',
        'source': 'outfalls',
        'source-layer': 'ngd_outfalls',
        'filter': ['all', ['==', 'OutfallNo', 10]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 4], [17, 6], [19, 7]]
          },
            'line-color': "#a6cee3"
        }
    });
    map.addLayer({
        'id': 'outfalls11',
        'type': 'line',
        'source': 'outfalls',
        'source-layer': 'ngd_outfalls',
        'filter': ['all', ['==', 'OutfallNo', 11]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 4], [17, 6], [19, 7]]
          },
            'line-color': "#ffff99"
        }
    });
    map.addLayer({
        'id': 'outfalls12',
        'type': 'line',
        'source': 'outfalls',
        'source-layer': 'ngd_outfalls',
        'filter': ['all', ['==', 'OutfallNo', 12]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 4], [17, 6], [19, 7]]
          },
            'line-color': "#cab2d6"
        }
    });
    map.addLayer({
        'id': 'outfalls13',
        'type': 'line',
        'source': 'outfalls',
        'source-layer': 'ngd_outfalls',
        'filter': ['all', ['==', 'OutfallNo', 13]],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 4], [17, 6], [19, 7]]
          },
            'line-color': "#b15928"
        }
    });

    map.addSource('routing', {
        type: 'vector',
        url: 'mapbox://iconeng.2w7cnk9w'
    });
    map.addLayer({
        'id': 'routing',
        'type': 'line',
        'source': 'routing',
        'source-layer': 'ngd_conduits',
        'interactive': true,
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#ffd700'
        }
    });

    map.addLayer({
        'id': 'routingLabels',
        'type': 'symbol',
        'source': 'routing',
        'source-layer': 'ngd_conduits',
        'layout': {
          'symbol-placement': 'line',
          'symbol-spacing': 100,
          'visibility': 'none',
          'text-field': '{Conduit}',
          'text-size': {
            "stops": [[15,12],[17,14],[19,16]]
          },
          "text-padding": 100,
        },
        'paint': {
          'text-color': '#000',
          'text-halo-color': 'rgba(255,215,0,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 1
        }
    });

    map.addLayer({
        'id': 'routingArrows',
        'type': 'symbol',
        'source': 'routing',
        'source-layer': 'ngd_conduits',
        'layout': {
          'symbol-placement': 'line',
          'symbol-spacing': 75,
          'visibility': 'none',
          "icon-image": "oneway-road-black",
          "icon-allow-overlap": true,
          "text-rotation-alignment": "map",
          "icon-size": {
              "base": 1,
              "stops": [
                  [
                      15,
                      0.5
                  ],
                  [
                      22,
                      1
                  ]
              ]
          },
          "text-keep-upright": false,
          "icon-padding": 0,
          "icon-ignore-placement": true
        },
        'paint': {
          'text-color': '#000',
          'text-halo-color': 'rgba(255,215,0,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 1
        }
    },'routingLabels');

    map.addSource('junctions', {
        type: 'vector',
        url: 'mapbox://iconeng.4u0iz0t3'
    });
    map.addLayer({
        'id': 'junctions',
        'type': 'symbol',
        'interactive': true,
        'source': 'junctions',
        'source-layer': 'ngd_junctions',
        'layout': {
            "text-optional": true,
            "text-line-height": 1,
            "text-size": {
                "stops": [[8,10],[20,20]],
                "base": 1.5
            },
           "icon-image": "{symbol}-c",
           "icon-halo-color": '#000000',
           "icon-halo-width":1,
           "text-field": "{Node}",
           "text-font": ["Lato Regular", "Arial Unicode MS Bold"],
           "text-offset": [0, 1.2],
           "text-anchor": "top"
       },
       "paint": {
         "text-color": "#504a4c",
         "text-halo-color": "#F8F4F0",
         "text-halo-width": {
             "base": 1.5,
             "stops": [[11,2],[20,3.75]]
         }
       }
    });

}); //end style load

function toggleLayer(id, id2, layer) {

        var visibility = map.getLayoutProperty(layer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(layer, 'visibility', 'none');
            document.getElementById(id).className = '';
            document.getElementById(id2).className = 'link depth-1';
        } else {
            document.getElementById(id).className = 'display';
            document.getElementById(id2).className = 'link depth-1 display';
            map.setLayoutProperty(layer, 'visibility', 'visible');
        }
    };

function toggleTwo(id, id2, layer, layer2) {

            var visibility = map.getLayoutProperty(layer, 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty(layer, 'visibility', 'none');
                map.setLayoutProperty(layer2, 'visibility', 'none');
                document.getElementById(id).className = '';
                document.getElementById(id2).className = 'link depth-1';
            } else {
                document.getElementById(id).className = 'display';
                document.getElementById(id2).className = 'link depth-1 display';
                map.setLayoutProperty(layer, 'visibility', 'visible');
                map.setLayoutProperty(layer2, 'visibility', 'visible');
            }
        };

function toggleThree(id, id2, layer, layer2, layer3) {

        var visibility = map.getLayoutProperty(layer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(layer, 'visibility', 'none');
            map.setLayoutProperty(layer2, 'visibility', 'none');
            map.setLayoutProperty(layer3, 'visibility', 'none');
            document.getElementById(id).className = '';
            document.getElementById(id2).className = 'link depth-1';
        } else {
            document.getElementById(id).className = 'display';
            document.getElementById(id2).className = 'link depth-1 display';
            map.setLayoutProperty(layer, 'visibility', 'visible');
            map.setLayoutProperty(layer2, 'visibility', 'visible');
            map.setLayoutProperty(layer3, 'visibility', 'visible');
        }
    };

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

        function toggleNine(id, id2, layer, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9) {

                    var visibility = map.getLayoutProperty(layer, 'visibility');

                    if (visibility === 'visible') {
                        map.setLayoutProperty(layer, 'visibility', 'none');
                        map.setLayoutProperty(layer2, 'visibility', 'none');
                        map.setLayoutProperty(layer3, 'visibility', 'none');
                        map.setLayoutProperty(layer4, 'visibility', 'none');
                        map.setLayoutProperty(layer5, 'visibility', 'none');
                        map.setLayoutProperty(layer6, 'visibility', 'none');
                        map.setLayoutProperty(layer7, 'visibility', 'none');
                        map.setLayoutProperty(layer8, 'visibility', 'none');
                        map.setLayoutProperty(layer9, 'visibility', 'none');
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
                        map.setLayoutProperty(layer8, 'visibility', 'visible');
                        map.setLayoutProperty(layer9, 'visibility', 'visible');
                    }
                };

function toggleThirteen(id, id2, layer, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9, layer10, layer11, layer12, layer13) {

                            var visibility = map.getLayoutProperty(layer, 'visibility');

                            if (visibility === 'visible') {
                                map.setLayoutProperty(layer, 'visibility', 'none');
                                map.setLayoutProperty(layer2, 'visibility', 'none');
                                map.setLayoutProperty(layer3, 'visibility', 'none');
                                map.setLayoutProperty(layer4, 'visibility', 'none');
                                map.setLayoutProperty(layer5, 'visibility', 'none');
                                map.setLayoutProperty(layer6, 'visibility', 'none');
                                map.setLayoutProperty(layer7, 'visibility', 'none');
                                map.setLayoutProperty(layer8, 'visibility', 'none');
                                map.setLayoutProperty(layer9, 'visibility', 'none');
                                map.setLayoutProperty(layer10, 'visibility', 'none');
                                map.setLayoutProperty(layer11, 'visibility', 'none');
                                map.setLayoutProperty(layer12, 'visibility', 'none');
                                map.setLayoutProperty(layer13, 'visibility', 'none');
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
                                map.setLayoutProperty(layer8, 'visibility', 'visible');
                                map.setLayoutProperty(layer9, 'visibility', 'visible');
                                map.setLayoutProperty(layer10, 'visibility', 'visible');
                                map.setLayoutProperty(layer11, 'visibility', 'visible');
                                map.setLayoutProperty(layer12, 'visibility', 'visible');
                                map.setLayoutProperty(layer13, 'visibility', 'visible');
                            }
                        };
    function toggleFourteen(id, id2, layer, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9, layer10, layer11, layer12, layer13, layer14) {

                                                    var visibility = map.getLayoutProperty(layer, 'visibility');

                                                    if (visibility === 'visible') {
                                                        map.setLayoutProperty(layer, 'visibility', 'none');
                                                        map.setLayoutProperty(layer2, 'visibility', 'none');
                                                        map.setLayoutProperty(layer3, 'visibility', 'none');
                                                        map.setLayoutProperty(layer4, 'visibility', 'none');
                                                        map.setLayoutProperty(layer5, 'visibility', 'none');
                                                        map.setLayoutProperty(layer6, 'visibility', 'none');
                                                        map.setLayoutProperty(layer7, 'visibility', 'none');
                                                        map.setLayoutProperty(layer8, 'visibility', 'none');
                                                        map.setLayoutProperty(layer9, 'visibility', 'none');
                                                        map.setLayoutProperty(layer10, 'visibility', 'none');
                                                        map.setLayoutProperty(layer11, 'visibility', 'none');
                                                        map.setLayoutProperty(layer12, 'visibility', 'none');
                                                        map.setLayoutProperty(layer13, 'visibility', 'none');
                                                        map.setLayoutProperty(layer14, 'visibility', 'none');
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
                                                        map.setLayoutProperty(layer8, 'visibility', 'visible');
                                                        map.setLayoutProperty(layer9, 'visibility', 'visible');
                                                        map.setLayoutProperty(layer10, 'visibility', 'visible');
                                                        map.setLayoutProperty(layer11, 'visibility', 'visible');
                                                        map.setLayoutProperty(layer12, 'visibility', 'visible');
                                                        map.setLayoutProperty(layer13, 'visibility', 'visible');
                                                        map.setLayoutProperty(layer14, 'visibility', 'visible');
                                                    }
                                                };

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (e) {
    map.featuresAt(e.point, {layer: ['junctions'], radius: 5, includeGeometry: true}, function (err, features) {
      if (err) throw err;
      var feature = features[0];

      var data = [{name: "2yr", value: feature.properties.Pk_2yr},
                  {name: "5yr", value: feature.properties.Pk_5yr},
                  {name: "10yr", value: feature.properties.Pk_10yr},
                  {name: "50yr", value: feature.properties.Pk_50yr},
                  {name: "100yr", value: feature.properties.Pk_100yr}];



        var tooltip = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .addTo(map);

              var margin = {top: 20, right: 20, bottom: 30, left: 40},
                  width = 200 - margin.left - margin.right,
                  height = 200 - margin.top - margin.bottom;

              var div = d3.select("body").append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);

              var x = d3.scale.ordinal()
                  .rangeRoundBands([0, width], .1);

              var y = d3.scale.linear()
                  .range([height, 0]);

              var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom");

              var yAxis = d3.svg.axis()
                  .scale(y)
                  .orient("left")
                  .tickValues([250,500,750,1000,1250,1500,1750,2000]);

              var svg = d3.select(".mapboxgl-popup-content").append("svg")
                  .attr("class", "junction")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                d3.select(".junction").selectAll(".bar").remove()

                x.domain(data.map(function(d) { return d.name; }));
                y.domain([0, 2000]);

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
                    .text("cfs");

                svg.selectAll(".bar")
                    .data(data)
                  .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d) { return x(d.name); })
                    .attr("width", x.rangeBand())
                    .attr("y", function(d) { return height; })
                    .attr("height", 0)
                    .on("mouseover", function(data) {
                        div.transition()
                            .duration(200)
                            .style("opacity", .9);
                        div	.html(function(d) {
                              return "<strong><span style='color:#1B55C0'>" + data.value + "</span> cfs</strong>";
                            })
                            .style("left", (d3.event.pageX - 30) + "px")
                            .style("top", (d3.event.pageY - 50) + "px");
                        })
                    .on("mouseout", function(data) {
                        div.transition()
                            .duration(500)
                            .style("opacity", 0);
                    })
                    .transition()
                    .delay(function (d, i) { return i*100; })
                    .attr("height", function(d) { return height - y(d.value); })
                    .attr("y", function(d) { return y(d.value); });

                svg.append("text")
                    .attr("x", 0)
                    .attr("y", 0 - (margin.top / 2))
                    .attr("text-anchor", "left")
                    .style("font-size", "12px")
                    .style("font-weight", "bold")
                    .text(feature.properties.TYPE + " " + feature.properties.Node);

              function type(d) {
                d.value = +d.value;
                return d;
              }

    });
});

map.on('click', function (e) {
    map.featuresAt(e.point, {layer: ['routing'], radius: 5, includeGeometry: true}, function (err, features) {
      if (err) throw err;
      var feature = features[0];

      var data = [{name: "2yr", value: feature.properties.Pk_2yr},
                  {name: "5yr", value: feature.properties.Pk_5yr},
                  {name: "100yr", value: feature.properties.Pk_100yr}];



        var tooltip = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .addTo(map);

            var margin = {top: 20, right: 20, bottom: 30, left: 40},
                width = 200 - margin.left - margin.right,
                height = 200 - margin.top - margin.bottom;

            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickValues([250,500,750,1000,1250,1500,1750,2000]);

            var svg = d3.select(".mapboxgl-popup-content").append("svg")
                .attr("class", "routing")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              d3.select(".routing").selectAll(".bar").remove()

              x.domain(data.map(function(d) { return d.name; }));
              y.domain([0, 2000]);

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
                  .text("cfs");

                  svg.selectAll(".bar")
                      .data(data)
                    .enter().append("rect")
                      .attr("class", "bar")
                      .attr("x", function(d) { return x(d.name); })
                      .attr("width", x.rangeBand())
                      .attr("y", function(d) { return height; })
                      .attr("height", 0)
                      .on("mouseover", function(data) {
                          div.transition()
                              .duration(200)
                              .style("opacity", .9);
                          div	.html(function(d) {
                                return "<strong><span style='color:#1B55C0'>" + data.value + "</span> cfs</strong>";
                              })
                              .style("left", (d3.event.pageX - 30) + "px")
                              .style("top", (d3.event.pageY - 50) + "px");
                          })
                      .on("mouseout", function(data) {
                          div.transition()
                              .duration(500)
                              .style("opacity", 0);
                      })
                      .transition()
                      .delay(function (d, i) { return i*100; })
                      .attr("height", function(d) { return height - y(d.value); })
                      .attr("y", function(d) { return y(d.value); });

                  svg.append("text")
                      .attr("x", 0)
                      .attr("y", 0 - (margin.top / 2))
                      .attr("text-anchor", "left")
                      .style("font-size", "12px")
                      .style("font-weight", "bold")
                      .text(feature.properties.Conduit);

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
    map.featuresAt(e.point, {layer: ['junctions','routing'], radius: 10}, function (err, features) {
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
