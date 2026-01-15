
mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
} else {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/iconeng/cjahqpuz797612sqajznqxkyw',
        zoom: 12.5,
        center: [-105.0857, 40.5840]
    });

    var layerList = document.getElementById('menu');
    var inputs = layerList.getElementsByTagName('input');

    function switchLayer(layer) {
        var layerId = layer.target.value;
        map.setStyle('mapbox://styles/iconeng/' + layerId);
        document.getElementById('contour').className = 'display';
        document.getElementById('contourMobile').className = 'link depth-1 display';
        document.getElementById('floodplain').className = '';
        document.getElementById('floodplainMobile').className = 'link depth-1';
        document.getElementById('infiltration').className = '';
        document.getElementById('infiltrationMobile').className = 'link depth-1';
        document.getElementById('nValue').className = '';
        document.getElementById('nValueMobile').className = 'link depth-1';
        document.getElementById('xs').className = '';
        document.getElementById('xsMobile').className = 'link depth-1';
        document.getElementById('rog-depth').className = '';
        document.getElementById('rog-depthMobile').className = 'link depth-1';
        document.getElementById('magst-depth').className = '';
        document.getElementById('magst-depthMobile').className = 'link depth-1';
        document.getElementById('magloc-depth').className = '';
        document.getElementById('magloc-depthMobile').className = 'link depth-1';
        document.getElementById('rog-velocity').className = '';
        document.getElementById('rog-velocityMobile').className = 'link depth-1';
        document.getElementById('magst-velocity').className = '';
        document.getElementById('magst-velocityMobile').className = 'link depth-1';
        document.getElementById('magloc-velocity').className = '';
        document.getElementById('magloc-velocityMobile').className = 'link depth-1';
        document.getElementById('basins').className = 'display';
        document.getElementById('basinsMobile').className = 'link depth-1 display';
        document.getElementById('stormwater').className = '';
        document.getElementById('stormwaterMobile').className = 'link depth-1';
        document.getElementById('magst').className = '';
        document.getElementById('magstMobile').className = 'link depth-1';
        document.getElementById('magloc').className = '';
        document.getElementById('maglocMobile').className = 'link depth-1';
        document.getElementById('inflow').className = '';
        document.getElementById('inflowMobile').className = 'link depth-1';
        document.getElementById('locTrib').className = '';
        document.getElementById('locTribMobile').className = 'link depth-1';
        document.getElementById('rmTrib').className = '';
        document.getElementById('rmTribMobile').className = 'link depth-1';
        document.getElementById('oldRouting').className = '';
        document.getElementById('oldRoutingMobile').className = 'link depth-1';
        document.getElementById('newRouting').className = '';
        document.getElementById('newRoutingMobile').className = 'link depth-1';
        document.getElementById('newXs').className = '';
        document.getElementById('newXsMobile').className = 'link depth-1';
        document.getElementById('newBasins').className = '';
        document.getElementById('newBasinsMobile').className = 'link depth-1';
        document.getElementById('newTransects').className = '';
        document.getElementById('newTransectsMobile').className = 'link depth-1';
    }

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].onclick = switchLayer;
    }

    map.on('style.load', function () {

        map.addSource('contours', {
            type: 'vector',
            url: 'mapbox://iconeng.e74b2b70'
        });
        map.addLayer({
            'id': '5ftContours',
            'type': 'line',
            'source': 'contours',
            'source-layer': 'oldtown_1ft_contours_smooth',
            'filter': ['all', ['>', 'Index', 1]],
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-width': {
                    "stops": [[15, 1], [17, 1.75], [19, 2.5]]
                },
                'line-opacity': {
                    "stops": [[16, 0.7], [19, 1]]
                },
                'line-color': '#b68054'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': '1ftContours',
            'type': 'line',
            'source': 'contours',
            'source-layer': 'oldtown_1ft_contours_smooth',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-width': {
                    "stops": [[15, 0], [17, .5], [19, 1]]
                },
                'line-opacity': {
                    "stops": [[16, 0.7], [19, 1]]
                },
                'line-color': '#b68054'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': '5ftLabels',
            'type': 'symbol',
            'source': 'contours',
            'source-layer': 'oldtown_1ft_contours_smooth',
            'filter': ['all', ['>', 'Index', 1]],
            'layout': {
                'symbol-placement': 'line',
                'text-field': '{CONTOUR}',
                'text-font': ['DIN Offc Pro Light', 'Open Sans Light', 'Arial Unicode MS Regular'],
                'text-size': {
                    "stops": [[15, 12], [17, 14], [19, 18]]
                }
            },
            'paint': {
                'text-color': '#b68054',
                'text-halo-color': 'rgba(255,255,235,0.9)',
                'text-halo-width': 2,
                'text-halo-blur': 0.5
            }
        }, 'road-label-sm');

        map.addSource('floodplain', {
            type: 'vector',
            url: 'mapbox://iconeng.c0a5784e'
        });
        map.addLayer({
            'id': 'floodplain-medium',
            'type': 'fill',
            'source': 'floodplain',
            'source-layer': 'FOCO_floodplaincity',
            'filter': ['all', ['==', 'RISK', 'MEDIUM']],
            'layout': {
            },
            'paint': {
                'fill-color': '#ffbe00',
                'fill-opacity': 0.25
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'floodplain-high',
            'type': 'fill',
            'source': 'floodplain',
            'source-layer': 'FOCO_floodplaincity',
            'filter': ['all', ['==', 'RISK', 'HIGH']],
            'layout': {
            },
            'paint': {
                'fill-color': '#008fff',
                'fill-opacity': 0.25
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'floodplain-floodway',
            'type': 'fill',
            'source': 'floodplain',
            'source-layer': 'FOCO_floodplaincity',
            'filter': ['all', ['==', 'RISK', 'HIGH FLOODWAY']],
            'layout': {
            },
            'paint': {
                'fill-color': '#0064B2',
                'fill-opacity': 0.4
            }
        }, 'road-label-sm');

        map.addSource('infiltration', {
            type: 'vector',
            url: 'mapbox://iconeng.fd5f2bee'
        });
        map.addLayer({
            'id': 'infil',
            'type': 'fill',
            'source': 'infiltration',
            'source-layer': 'OTH_FLO_2D_infiltration',
            'filter': ['all', ['!=', 'Decay', 0]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#ccff00',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');

        map.addSource('nValue', {
            type: 'vector',
            url: 'mapbox://iconeng.f1f4d781'
        });
        map.addLayer({
            'id': 'nValue1',
            'type': 'fill',
            'source': 'nValue',
            'source-layer': 'OTH_FLO_2D_nValue',
            'filter': ['all', ['==', 'nValue', .03]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#feedde',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'nValue2',
            'type': 'fill',
            'source': 'nValue',
            'source-layer': 'OTH_FLO_2D_nValue',
            'filter': ['all', ['==', 'nValue', .1]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#fdbe85',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'nValue3',
            'type': 'fill',
            'source': 'nValue',
            'source-layer': 'OTH_FLO_2D_nValue',
            'filter': ['all', ['==', 'nValue', .15]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#fd8d3c',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'nValue4',
            'type': 'fill',
            'source': 'nValue',
            'source-layer': 'OTH_FLO_2D_nValue',
            'filter': ['all', ['==', 'nValue', .4]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#d94701',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');

        map.addSource('rog-flowDepthO', {
            type: 'vector',
            url: 'mapbox://iconeng.92452b9f'
        });
        map.addLayer({
            'id': 'rog-flowDepth2O',
            'interactive': true,
            'type': 'fill',
            'source': 'rog-flowDepthO',
            'source-layer': 'oth_rainongrid_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 2]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#ffffcc',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-flowDepth3O',
            'interactive': true,
            'type': 'fill',
            'source': 'rog-flowDepthO',
            'source-layer': 'oth_rainongrid_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 3]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#c7e9b4',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-flowDepth4O',
            'interactive': true,
            'type': 'fill',
            'source': 'rog-flowDepthO',
            'source-layer': 'oth_rainongrid_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 4]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#7fcdbb',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-flowDepth5O',
            'interactive': true,
            'type': 'fill',
            'source': 'rog-flowDepthO',
            'source-layer': 'oth_rainongrid_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 5]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#41b6c4',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-flowDepth6O',
            'interactive': true,
            'type': 'fill',
            'source': 'rog-flowDepthO',
            'source-layer': 'oth_rainongrid_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 6]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#1d91c0',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-flowDepth7O',
            'interactive': true,
            'type': 'fill',
            'source': 'rog-flowDepthO',
            'source-layer': 'oth_rainongrid_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 7]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#225ea8',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-flowDepth8O',
            'interactive': true,
            'type': 'fill',
            'source': 'rog-flowDepthO',
            'source-layer': 'oth_rainongrid_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 8]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#0c2c84',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');

        map.addSource('rog-flowDepth', {
            type: 'vector',
            url: 'mapbox://iconeng.c23ab050'
        });
        map.addLayer({
            'id': 'rog-flowDepth2',
            'interactive': true,
            'type': 'fill',
            'source': 'rog-flowDepth',
            'source-layer': 'OTH_RainOnGrid_MaxFlowDepth',
            'filter': ['all', ['>', 'Var', 0.25], ['<=', 'Var', 0.5]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#ffffcc',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-flowDepth3',
            'interactive': true,
            'type': 'fill',
            'source': 'rog-flowDepth',
            'source-layer': 'OTH_RainOnGrid_MaxFlowDepth',
            'filter': ['all', ['>', 'Var', 0.5], ['<=', 'Var', 1]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#c7e9b4',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-flowDepth4',
            'interactive': true,
            'type': 'fill',
            'source': 'rog-flowDepth',
            'source-layer': 'OTH_RainOnGrid_MaxFlowDepth',
            'filter': ['all', ['>', 'Var', 1], ['<=', 'Var', 1.5]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#7fcdbb',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-flowDepth5',
            'interactive': true,
            'type': 'fill',
            'source': 'rog-flowDepth',
            'source-layer': 'OTH_RainOnGrid_MaxFlowDepth',
            'filter': ['all', ['>', 'Var', 1.5], ['<=', 'Var', 2]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#41b6c4',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-flowDepth6',
            'interactive': true,
            'type': 'fill',
            'source': 'rog-flowDepth',
            'source-layer': 'OTH_RainOnGrid_MaxFlowDepth',
            'filter': ['all', ['>', 'Var', 2], ['<=', 'Var', 3]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#1d91c0',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-flowDepth7',
            'interactive': true,
            'type': 'fill',
            'source': 'rog-flowDepth',
            'source-layer': 'OTH_RainOnGrid_MaxFlowDepth',
            'filter': ['all', ['>', 'Var', 3], ['<=', 'Var', 4]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#225ea8',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-flowDepth8',
            'interactive': true,
            'type': 'fill',
            'source': 'rog-flowDepth',
            'source-layer': 'OTH_RainOnGrid_MaxFlowDepth',
            'filter': ['all', ['>', 'Var', 4]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#0c2c84',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');

        map.addSource('magst-flowDepthO', {
            type: 'vector',
            url: 'mapbox://iconeng.b1f30775'
        });
        map.addLayer({
            'id': 'magst-flowDepth2O',
            'interactive': true,
            'type': 'fill',
            'source': 'magst-flowDepthO',
            'source-layer': 'oth_magnoliast_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 2]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#ffffcc',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-flowDepth3O',
            'interactive': true,
            'type': 'fill',
            'source': 'magst-flowDepthO',
            'source-layer': 'oth_magnoliast_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 3]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#c7e9b4',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-flowDepth4O',
            'interactive': true,
            'type': 'fill',
            'source': 'magst-flowDepthO',
            'source-layer': 'oth_magnoliast_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 4]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#7fcdbb',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-flowDepth5O',
            'interactive': true,
            'type': 'fill',
            'source': 'magst-flowDepthO',
            'source-layer': 'oth_magnoliast_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 5]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#41b6c4',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-flowDepth6O',
            'interactive': true,
            'type': 'fill',
            'source': 'magst-flowDepthO',
            'source-layer': 'oth_magnoliast_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 6]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#1d91c0',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-flowDepth7O',
            'interactive': true,
            'type': 'fill',
            'source': 'magst-flowDepthO',
            'source-layer': 'oth_magnoliast_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 7]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#225ea8',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-flowDepth8O',
            'interactive': true,
            'type': 'fill',
            'source': 'magst-flowDepthO',
            'source-layer': 'oth_magnoliast_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 8]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#0c2c84',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');

        map.addSource('magloc-flowDepthO', {
            type: 'vector',
            url: 'mapbox://iconeng.cd76e293'
        });
        map.addLayer({
            'id': 'magloc-flowDepth2O',
            'interactive': true,
            'type': 'fill',
            'source': 'magloc-flowDepthO',
            'source-layer': 'oth_magnolialocust_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 2]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#ffffcc',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-flowDepth3O',
            'interactive': true,
            'type': 'fill',
            'source': 'magloc-flowDepthO',
            'source-layer': 'oth_magnolialocust_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 3]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#c7e9b4',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-flowDepth4O',
            'interactive': true,
            'type': 'fill',
            'source': 'magloc-flowDepthO',
            'source-layer': 'oth_magnolialocust_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 4]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#7fcdbb',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-flowDepth5O',
            'interactive': true,
            'type': 'fill',
            'source': 'magloc-flowDepthO',
            'source-layer': 'oth_magnolialocust_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 5]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#41b6c4',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-flowDepth6O',
            'interactive': true,
            'type': 'fill',
            'source': 'magloc-flowDepthO',
            'source-layer': 'oth_magnolialocust_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 6]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#1d91c0',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-flowDepth7O',
            'interactive': true,
            'type': 'fill',
            'source': 'magloc-flowDepthO',
            'source-layer': 'oth_magnolialocust_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 7]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#225ea8',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-flowDepth8O',
            'interactive': true,
            'type': 'fill',
            'source': 'magloc-flowDepthO',
            'source-layer': 'oth_magnolialocust_maxflowdepth_over',
            'filter': ['all', ['==', 'GRIDCODE', 8]],
            'maxzoom': 14.99,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#0c2c84',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');

        map.addSource('magst-flowDepth', {
            type: 'vector',
            url: 'mapbox://iconeng.a4304c53'
        });
        map.addLayer({
            'id': 'magst-flowDepth2',
            'interactive': true,
            'type': 'fill',
            'source': 'magst-flowDepth',
            'source-layer': 'OTH_MagnoliaSt_MaxFlowDepth',
            'filter': ['all', ['==', 'Class', 2]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#ffffcc',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-flowDepth3',
            'interactive': true,
            'type': 'fill',
            'source': 'magst-flowDepth',
            'source-layer': 'OTH_MagnoliaSt_MaxFlowDepth',
            'filter': ['all', ['==', 'Class', 3]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#c7e9b4',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-flowDepth4',
            'interactive': true,
            'type': 'fill',
            'source': 'magst-flowDepth',
            'source-layer': 'OTH_MagnoliaSt_MaxFlowDepth',
            'filter': ['all', ['==', 'Class', 4]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#7fcdbb',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-flowDepth5',
            'interactive': true,
            'type': 'fill',
            'source': 'magst-flowDepth',
            'source-layer': 'OTH_MagnoliaSt_MaxFlowDepth',
            'filter': ['all', ['==', 'Class', 5]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#41b6c4',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-flowDepth6',
            'interactive': true,
            'type': 'fill',
            'source': 'magst-flowDepth',
            'source-layer': 'OTH_MagnoliaSt_MaxFlowDepth',
            'filter': ['all', ['==', 'Class', 6]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#1d91c0',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-flowDepth7',
            'interactive': true,
            'type': 'fill',
            'source': 'magst-flowDepth',
            'source-layer': 'OTH_MagnoliaSt_MaxFlowDepth',
            'filter': ['all', ['==', 'Class', 7]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#225ea8',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-flowDepth8',
            'interactive': true,
            'type': 'fill',
            'source': 'magst-flowDepth',
            'source-layer': 'OTH_MagnoliaSt_MaxFlowDepth',
            'filter': ['all', ['==', 'Class', 8]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#0c2c84',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');

        map.addSource('magloc-flowDepth', {
            type: 'vector',
            url: 'mapbox://iconeng.07f6c192'
        });
        map.addLayer({
            'id': 'magloc-flowDepth2',
            'interactive': true,
            'type': 'fill',
            'source': 'magloc-flowDepth',
            'source-layer': 'OTH_MagnoliaLocust_MaxFlowDepth',
            'filter': ['all', ['>', 'Var', 0.25], ['<=', 'Var', 0.5]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#ffffcc',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-flowDepth3',
            'interactive': true,
            'type': 'fill',
            'source': 'magloc-flowDepth',
            'source-layer': 'OTH_MagnoliaLocust_MaxFlowDepth',
            'filter': ['all', ['>', 'Var', 0.5], ['<=', 'Var', 1]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#c7e9b4',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-flowDepth4',
            'interactive': true,
            'type': 'fill',
            'source': 'magloc-flowDepth',
            'source-layer': 'OTH_MagnoliaLocust_MaxFlowDepth',
            'filter': ['all', ['>', 'Var', 1], ['<=', 'Var', 1.5]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#7fcdbb',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-flowDepth5',
            'interactive': true,
            'type': 'fill',
            'source': 'magloc-flowDepth',
            'source-layer': 'OTH_MagnoliaLocust_MaxFlowDepth',
            'filter': ['all', ['>', 'Var', 1.5], ['<=', 'Var', 2]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#41b6c4',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-flowDepth6',
            'interactive': true,
            'type': 'fill',
            'source': 'magloc-flowDepth',
            'source-layer': 'OTH_MagnoliaLocust_MaxFlowDepth',
            'filter': ['all', ['>', 'Var', 2], ['<=', 'Var', 3]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#1d91c0',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-flowDepth7',
            'interactive': true,
            'type': 'fill',
            'source': 'magloc-flowDepth',
            'source-layer': 'OTH_MagnoliaLocust_MaxFlowDepth',
            'filter': ['all', ['>', 'Var', 3], ['<=', 'Var', 4]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#225ea8',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-flowDepth8',
            'interactive': true,
            'type': 'fill',
            'source': 'magloc-flowDepth',
            'source-layer': 'OTH_MagnoliaLocust_MaxFlowDepth',
            'filter': ['all', ['>', 'Var', 4]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#0c2c84',
                'fill-opacity': 0.8
            }
        }, 'road-label-sm');

        map.addSource('rog-velocity', {
            type: 'vector',
            url: 'mapbox://iconeng.8ad980f5'
        });
        map.addLayer({
            'id': 'rog-velocity2',
            'interactive': true,
            'type': 'line',
            'source': 'rog-velocity',
            'source-layer': 'OTH_RainOnGrid_Velocity',
            'filter': ['all', ['>', 'Var', 0.25], ['<=', 'Var', 0.5]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 1.2,
                'line-color': '#ffffb2'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-velocity3',
            'interactive': true,
            'type': 'line',
            'source': 'rog-velocity',
            'source-layer': 'OTH_RainOnGrid_Velocity',
            'filter': ['all', ['>', 'Var', 0.5], ['<=', 'Var', 1]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 1.4,
                'line-color': '#fed976'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-velocity4',
            'interactive': true,
            'type': 'line',
            'source': 'rog-velocity',
            'source-layer': 'OTH_RainOnGrid_Velocity',
            'filter': ['all', ['>', 'Var', 1], ['<=', 'Var', 1.5]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 1.6,
                'line-color': '#feb24c'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-velocity5',
            'interactive': true,
            'type': 'line',
            'source': 'rog-velocity',
            'source-layer': 'OTH_RainOnGrid_Velocity',
            'filter': ['all', ['>', 'Var', 1.5], ['<=', 'Var', 2]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 1.8,
                'line-color': '#fd8d3c'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-velocity6',
            'interactive': true,
            'type': 'line',
            'source': 'rog-velocity',
            'source-layer': 'OTH_RainOnGrid_Velocity',
            'filter': ['all', ['>', 'Var', 2], ['<=', 'Var', 3]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 2,
                'line-color': '#fc4e2a'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-velocity7',
            'interactive': true,
            'type': 'line',
            'source': 'rog-velocity',
            'source-layer': 'OTH_RainOnGrid_Velocity',
            'filter': ['all', ['>', 'Var', 3], ['<=', 'Var', 4]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 2.2,
                'line-color': '#e31a1c'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'rog-velocity8',
            'interactive': true,
            'type': 'line',
            'source': 'rog-velocity',
            'source-layer': 'OTH_RainOnGrid_Velocity',
            'filter': ['all', ['>', 'Var', 4]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 2.4,
                'line-color': '#b10026'
            }
        }, 'road-label-sm');

        map.addSource('magst-velocity', {
            type: 'vector',
            url: 'mapbox://iconeng.cc937f20'
        });
        map.addLayer({
            'id': 'magst-velocity2',
            'interactive': true,
            'type': 'line',
            'source': 'magst-velocity',
            'source-layer': 'OTH_MagnoliaSt_Velocity',
            'filter': ['all', ['>', 'Var', 0.25], ['<=', 'Var', 0.5]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 1.2,
                'line-color': '#ffffb2'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-velocity3',
            'interactive': true,
            'type': 'line',
            'source': 'magst-velocity',
            'source-layer': 'OTH_MagnoliaSt_Velocity',
            'filter': ['all', ['>', 'Var', 0.5], ['<=', 'Var', 1]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 1.4,
                'line-color': '#fed976'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-velocity4',
            'interactive': true,
            'type': 'line',
            'source': 'magst-velocity',
            'source-layer': 'OTH_MagnoliaSt_Velocity',
            'filter': ['all', ['>', 'Var', 1], ['<=', 'Var', 1.5]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 1.6,
                'line-color': '#feb24c'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-velocity5',
            'interactive': true,
            'type': 'line',
            'source': 'magst-velocity',
            'source-layer': 'OTH_MagnoliaSt_Velocity',
            'filter': ['all', ['>', 'Var', 1.5], ['<=', 'Var', 2]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 1.8,
                'line-color': '#fd8d3c'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-velocity6',
            'interactive': true,
            'type': 'line',
            'source': 'magst-velocity',
            'source-layer': 'OTH_MagnoliaSt_Velocity',
            'filter': ['all', ['>', 'Var', 2], ['<=', 'Var', 3]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 2,
                'line-color': '#fc4e2a'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-velocity7',
            'interactive': true,
            'type': 'line',
            'source': 'magst-velocity',
            'source-layer': 'OTH_MagnoliaSt_Velocity',
            'filter': ['all', ['>', 'Var', 3], ['<=', 'Var', 4]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 2.2,
                'line-color': '#e31a1c'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magst-velocity8',
            'interactive': true,
            'type': 'line',
            'source': 'magst-velocity',
            'source-layer': 'OTH_MagnoliaSt_Velocity',
            'filter': ['all', ['>', 'Var', 4]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 2.4,
                'line-color': '#b10026'
            }
        }, 'road-label-sm');

        map.addSource('magloc-velocity', {
            type: 'vector',
            url: 'mapbox://iconeng.879155a4'
        });
        map.addLayer({
            'id': 'magloc-velocity2',
            'interactive': true,
            'type': 'line',
            'source': 'magloc-velocity',
            'source-layer': 'OTH_MagnoliaLocust_Velocity',
            'filter': ['all', ['>', 'Var', 0.25], ['<=', 'Var', 0.5]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 1.2,
                'line-color': '#ffffb2'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-velocity3',
            'interactive': true,
            'type': 'line',
            'source': 'magloc-velocity',
            'source-layer': 'OTH_MagnoliaLocust_Velocity',
            'filter': ['all', ['>', 'Var', 0.5], ['<=', 'Var', 1]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 1.4,
                'line-color': '#fed976'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-velocity4',
            'interactive': true,
            'type': 'line',
            'source': 'magloc-velocity',
            'source-layer': 'OTH_MagnoliaLocust_Velocity',
            'filter': ['all', ['>', 'Var', 1], ['<=', 'Var', 1.5]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 1.6,
                'line-color': '#feb24c'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-velocity5',
            'interactive': true,
            'type': 'line',
            'source': 'magloc-velocity',
            'source-layer': 'OTH_MagnoliaLocust_Velocity',
            'filter': ['all', ['>', 'Var', 1.5], ['<=', 'Var', 2]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 1.8,
                'line-color': '#fd8d3c'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-velocity6',
            'interactive': true,
            'type': 'line',
            'source': 'magloc-velocity',
            'source-layer': 'OTH_MagnoliaLocust_Velocity',
            'filter': ['all', ['>', 'Var', 2], ['<=', 'Var', 3]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 2,
                'line-color': '#fc4e2a'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-velocity7',
            'interactive': true,
            'type': 'line',
            'source': 'magloc-velocity',
            'source-layer': 'OTH_MagnoliaLocust_Velocity',
            'filter': ['all', ['>', 'Var', 3], ['<=', 'Var', 4]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 2.2,
                'line-color': '#e31a1c'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'magloc-velocity8',
            'interactive': true,
            'type': 'line',
            'source': 'magloc-velocity',
            'source-layer': 'OTH_MagnoliaLocust_Velocity',
            'filter': ['all', ['>', 'Var', 4]],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-width': 2.4,
                'line-color': '#b10026'
            }
        }, 'road-label-sm');

        map.addSource('subbasins', {
            type: 'vector',
            url: 'mapbox://iconeng.2jh2ku3h'
        });
        map.addLayer({
            'id': 'subbasins',
            'type': 'line',
            'source': 'subbasins',
            'source-layer': 'oth_subbasin',
            'layout': {
                'visibility': 'none',
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-width': {
                    "stops": [[15, 2], [17, 4], [19, 6]]
                },
                'line-color': '#9ACD32'
            }
        }, 'road-label-sm');

        map.addSource('2016basins', {
            type: 'vector',
            url: 'mapbox://iconeng.dgt2i0tj'
        });
        map.addLayer({
            'id': '2016basins',
            'type': 'fill',
            'source': '2016basins',
            'source-layer': 'oth_2016_basins',
            'interactive': true,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#40E0D0',
                'fill-opacity': 0.05
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': '2016basinsLines',
            'type': 'line',
            'source': '2016basins',
            'source-layer': 'oth_2016_basins',
            'layout': {
                'visibility': 'none',
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-width': {
                    "stops": [[15, 2], [17, 4], [19, 6]]
                },
                'line-color': '#40E0D0'
            }
        }, 'road-label-sm');

        map.addSource('rmtributary', {
            type: 'geojson',
            data: 'OTH_RiversideMulberryTrib.geojson'
        });
        map.addLayer({
            'id': 'rmTrib',
            'type': 'line',
            'source': 'rmtributary',
            'layout': {
                'line-join': 'round',
                'visibility': 'none',
                'line-cap': 'round'
            },
            'paint': {
                'line-width': {
                    "stops": [[15, 2], [17, 4], [19, 6]]
                },
                'line-color': '#8b0000'
            }
        }, 'road-label-sm');

        map.addSource('loctributary', {
            type: 'geojson',
            data: 'OTH_LocustTrib.geojson'
        });
        map.addLayer({
            'id': 'locTrib',
            'type': 'line',
            'source': 'loctributary',
            'layout': {
                'line-join': 'round',
                'visibility': 'none',
                'line-cap': 'round'
            },
            'paint': {
                'line-width': {
                    "stops": [[15, 2], [17, 4], [19, 6]]
                },
                'line-color': '#fb0000'
            }
        }, 'road-label-sm');

        map.addSource('stormwater', {
            type: 'vector',
            url: 'mapbox://iconeng.b5910267'
        });
        map.addLayer({
            'id': 'stormwater',
            'type': 'line',
            'source': 'stormwater',
            'source-layer': 'FOCO_Stormwater',
            'filter': ['all', ['in', 'Layer', 'swPipe', 'swLateral']],
            'layout': {
                'line-join': 'round',
                'visibility': 'none',
                'line-cap': 'round'
            },
            'paint': {
                'line-width': {
                    "stops": [[15, 2], [17, 4], [19, 6]]
                },
                'line-color': '#000080'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'intake',
            'type': 'line',
            'source': 'stormwater',
            'source-layer': 'FOCO_Stormwater',
            'filter': ['all', ['==', 'Layer', 'swIntake']],
            'layout': {
                'line-join': 'round',
                'visibility': 'none',
                'line-cap': 'round'
            },
            'paint': {
                'line-width': {
                    "stops": [[15, 2], [17, 4], [19, 6]]
                },
                'line-color': '#3399ff'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'manhole',
            'type': 'line',
            'source': 'stormwater',
            'source-layer': 'FOCO_Stormwater',
            'filter': ['all', ['==', 'Layer', 'swManhole']],
            'layout': {
                'line-join': 'round',
                'visibility': 'none',
                'line-cap': 'round'
            },
            'paint': {
                'line-width': {
                    "stops": [[15, 2], [17, 4], [19, 6]]
                },
                'line-color': '#8b0000'
            }
        }, 'road-label-sm');

        map.addSource('outflows', {
            type: 'vector',
            url: 'mapbox://iconeng.1wvpscwj'
        });
        map.addLayer({
            'id': 'outflows',
            'type': 'line',
            'source': 'outflows',
            'source-layer': 'oth_flo_2d_outflow',
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
        }, 'road-label-sm');

        map.addSource('2003conduits', {
            type: 'vector',
            url: 'mapbox://iconeng.6edsotbr'
        });
        map.addLayer({
            'id': '2003conduits',
            'type': 'line',
            'source': '2003conduits',
            'source-layer': 'oth_2003mp_conduits',
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
                'line-color': '#6B8E23'
            }
        }, 'road-label-sm');

        map.addSource('2003junctions', {
            type: 'vector',
            url: 'mapbox://iconeng.cj3jvacl'
        });
        map.addLayer({
            'id': '2003junctions',
            'type': 'circle',
            'source': '2003junctions',
            'source-layer': 'oth_2003mp_junction',
            'interactive': true,
            'layout': {
                'visibility': 'none',
            },
            'paint': {
                'circle-radius': {
                    'stops': [[15, 4], [19, 12]]
                },
                'circle-color': '#556B2F'
            }
        });
        map.addLayer({
            'id': '2003junctionLabels',
            'type': 'symbol',
            'source': '2003junctions',
            'source-layer': 'oth_2003mp_junction',
            'layout': {
                "text-optional": true,
                "text-line-height": 1,
                'visibility': 'none',
                'text-field': '{SWMM_ID}',
                'text-font': ['DIN Offc Pro Light', 'Open Sans Light', 'Arial Unicode MS Regular'],
                "text-offset": [0, .5],
                "text-anchor": "top",
                'text-size': {
                    "stops": [[15, 12], [17, 14], [19, 16]]
                }
            },
            'paint': {
                'text-color': '#fff',
                'text-halo-color': 'rgba(85,107,47,0.9)',
                'text-halo-width': 2,
                'text-halo-blur': 1
            }
        });

        map.addSource('2016conduits', {
            type: 'vector',
            url: 'mapbox://iconeng.3f29e65a'
        });
        map.addLayer({
            'id': '2016conduits',
            'type': 'line',
            'source': '2016conduits',
            'source-layer': 'OTH_2016_Conduits',
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
                'line-color': '#008080'
            }
        }, 'road-label-sm');

        map.addSource('2016transects', {
            type: 'vector',
            url: 'mapbox://iconeng.2xc8idue'
        });
        map.addLayer({
            'id': '2016transects',
            'type': 'line',
            'source': '2016transects',
            'source-layer': 'oth_2016_conduit_transects',
            'layout': {
                'line-join': 'round',
                'visibility': 'none',
                'line-cap': 'round'
            },
            'paint': {
                'line-width': {
                    "stops": [[15, 2], [17, 4], [19, 6]]
                },
                'line-color': '#2F4F4F'
            }
        }, 'road-label-sm');

        map.addSource('2016xs', {
            type: 'vector',
            url: 'mapbox://iconeng.1bpzjpvc'
        });
        map.addLayer({
            'id': '2016xs',
            'type': 'line',
            'source': '2016xs',
            'source-layer': 'oth_flo2d_xs',
            'layout': {
                'line-join': 'round',
                'visibility': 'none',
                'line-cap': 'round'
            },
            'paint': {
                'line-width': {
                    "stops": [[15, 2], [17, 4], [19, 6]]
                },
                'line-color': '#66CDAA'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': '2016xsLabels',
            'type': 'symbol',
            'source': '2016xs',
            'source-layer': 'oth_flo2d_xs',
            'layout': {
                'symbol-placement': 'line',
                'visibility': 'none',
                'text-field': '{XS_ID}',
                'text-font': ['DIN Offc Pro Light', 'Open Sans Light', 'Arial Unicode MS Regular'],
                'text-size': {
                    "stops": [[15, 12], [17, 14], [19, 16]]
                }
            },
            'paint': {
                'text-color': '#000',
                'text-halo-color': 'rgba(102,205,170,0.9)',
                'text-halo-width': 2,
                'text-halo-blur': 1
            }
        });

        map.addSource('2016junctions', {
            type: 'vector',
            url: 'mapbox://iconeng.9i8otnky'
        });
        map.addLayer({
            'id': '2016junctions',
            'type': 'circle',
            'source': '2016junctions',
            'source-layer': 'oth_2016_junctions',
            'interactive': true,
            'layout': {
                'visibility': 'none',
            },
            'paint': {
                'circle-radius': {
                    'stops': [[15, 4], [19, 12]]
                },
                'circle-color': '#006060'
            }
        });
        map.addLayer({
            'id': '2016junctionLabels',
            'type': 'symbol',
            'source': '2016junctions',
            'source-layer': 'oth_2016_junctions',
            'layout': {
                "text-optional": true,
                "text-line-height": 1,
                'visibility': 'none',
                'text-field': '{Name}',
                'text-font': ['DIN Offc Pro Light', 'Open Sans Light', 'Arial Unicode MS Regular'],
                "text-offset": [0, .5],
                "text-anchor": "top",
                'text-size': {
                    "stops": [[15, 12], [17, 14], [19, 16]]
                }
            },
            'paint': {
                'text-color': '#fff',
                'text-halo-color': 'rgba(0,96,96,0.9)',
                'text-halo-width': 2,
                'text-halo-blur': 1
            }
        });

        map.addSource('magst', {
            type: 'vector',
            url: 'mapbox://iconeng.1204bl4t'
        });
        map.addLayer({
            'id': 'magst',
            'type': 'line',
            'source': 'magst',
            'source-layer': 'oth_magnoliast_alt',
            'layout': {
                'line-join': 'round',
                'visibility': 'none',
                'line-cap': 'round'
            },
            'paint': {
                'line-width': {
                    "stops": [[15, 4], [17, 8], [19, 12]]
                },
                'line-color': '#008000'
            }
        }, 'road-label-sm');

        map.addSource('magloc', {
            type: 'vector',
            url: 'mapbox://iconeng.4csnof2c'
        });
        map.addLayer({
            'id': 'magloc',
            'type': 'line',
            'source': 'magloc',
            'source-layer': 'oth_locust_alt',
            'layout': {
                'line-join': 'round',
                'visibility': 'none',
                'line-cap': 'round'
            },
            'paint': {
                'line-width': {
                    "stops": [[15, 4], [17, 8], [19, 12]]
                },
                'line-color': '#008000'
            }
        }, 'road-label-sm');

        map.addSource('xs', {
            type: 'vector',
            url: 'mapbox://iconeng.bicvkvbu'
        });
        map.addLayer({
            'id': 'xsLine',
            'type': 'line',
            'source': 'xs',
            'source-layer': 'oth_flo2d_xs',
            'interactive': true,
            'layout': {
                'line-join': 'round',
                'visibility': 'none',
                'line-cap': 'round'
            },
            'paint': {
                'line-width': {
                    "stops": [[15, 4], [17, 8], [19, 12]]
                },
                'line-color': '#d700d7'
            }
        }, 'road-label-sm');
        map.addLayer({
            'id': 'xsLabels',
            'type': 'symbol',
            'source': 'xs',
            'source-layer': 'oth_flo2d_xs',
            'layout': {
                'symbol-placement': 'line',
                'visibility': 'none',
                'text-field': '{Id}',
                'text-size': {
                    "stops": [[15, 12], [17, 14], [19, 16]]
                }
            },
            'paint': {
                'text-color': '#fff',
                'text-halo-color': 'rgba(215,0,215,0.9)',
                'text-halo-width': 2,
                'text-halo-blur': 1
            }
        }, 'road-label-sm');

        map.addSource('inflow', {
            type: 'vector',
            url: 'mapbox://iconeng.6zc0zqo2'
        });
        map.addLayer({
            'id': 'inflow',
            'type': 'symbol',
            'interactive': true,
            'source': 'inflow',
            'source-layer': 'oth_flo_2d_inflow',
            'layout': {
                "text-optional": true,
                "text-line-height": 1,
                "text-size": {
                    "stops": [[8, 10], [20, 20]],
                    "base": 1.5
                },
                "icon-image": "triangle-c",
                "text-field": "{INFLOW_ID}",
                "text-font": ["Lato Regular", "Arial Unicode MS Bold"],
                "text-offset": [0, 1.2],
                "text-anchor": "top",
                'visibility': 'none'
            },
            "paint": {
                "text-color": "#504a4c",
                "text-halo-color": "#F8F4F0",
                "text-halo-width": {
                    "base": 1.5,
                    "stops": [[11, 2], [20, 3.75]]
                }
            }
        }, 'road-label-sm');

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

    function toggleFour(id, id2, layer, layer2, layer3, layer4) {

        var visibility = map.getLayoutProperty(layer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(layer, 'visibility', 'none');
            map.setLayoutProperty(layer2, 'visibility', 'none');
            map.setLayoutProperty(layer3, 'visibility', 'none');
            map.setLayoutProperty(layer4, 'visibility', 'none');
            document.getElementById(id).className = '';
            document.getElementById(id2).className = 'link depth-1';
        } else {
            document.getElementById(id).className = 'display';
            document.getElementById(id2).className = 'link depth-1 display';
            map.setLayoutProperty(layer, 'visibility', 'visible');
            map.setLayoutProperty(layer2, 'visibility', 'visible');
            map.setLayoutProperty(layer3, 'visibility', 'visible');
            map.setLayoutProperty(layer4, 'visibility', 'visible');
        }
    };

    function toggleSix(id, id2, layer, layer2, layer3, layer4, layer5, layer6) {

        var visibility = map.getLayoutProperty(layer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(layer, 'visibility', 'none');
            map.setLayoutProperty(layer2, 'visibility', 'none');
            map.setLayoutProperty(layer3, 'visibility', 'none');
            map.setLayoutProperty(layer4, 'visibility', 'none');
            map.setLayoutProperty(layer5, 'visibility', 'none');
            map.setLayoutProperty(layer6, 'visibility', 'none');
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
        map.featuresAt(e.point, { layer: ['rog-flowDepth2', 'rog-flowDepth3', 'rog-flowDepth4', 'rog-flowDepth5', 'rog-flowDepth6', 'rog-flowDepth7', 'rog-flowDepth8', 'magst-flowDepth2', 'magst-flowDepth3', 'magst-flowDepth4', 'magst-flowDepth5', 'magst-flowDepth6', 'magst-flowDepth7', 'magst-flowDepth8', 'magloc-flowDepth2', 'magloc-flowDepth3', 'magloc-flowDepth4', 'magloc-flowDepth5', 'magloc-flowDepth6', 'magloc-flowDepth7', 'magloc-flowDepth8'], radius: 0, includeGeometry: true }, function (err, features) {
            if (err) throw err;
            var feature = features[0];

            var tooltip = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('Depth: ' + feature.properties.Var)
                .addTo(map);
        });
    });

    map.on('click', function (e) {
        map.featuresAt(e.point, { layer: ['inflow'], radius: 10, includeGeometry: true }, function (err, features) {
            if (err) throw err;
            var feature = features[0];

            var tooltip = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('Peak Inflow: ' + feature.properties.Peak + ' cfs')
                .addTo(map);
        });
    });

    map.on('click', function (e) {
        map.featuresAt(e.point, { layer: ['xsLine'], radius: 10, includeGeometry: true }, function (err, features) {
            if (err) throw err;
            var feature = features[0];

            var tooltip = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<h4>' + feature.properties.Location + '</h4>' +
                    '<p>MP Flow: ' + feature.properties.Eff_Q + ' cfs <br />' +
                    'Rain-on-Grid: ' + feature.properties.RoG + ' cfs <br />' +
                    'Mag. & Locust Outfalls: ' + feature.properties.MagLoc + ' cfs </p>')
                .addTo(map);
        });
    });

    map.on('click', function (e) {
        map.featuresAt(e.point, { layer: ['2003conduits'], radius: 10, includeGeometry: true }, function (err, features) {
            if (err) throw err;
            var feature = features[0];

            var tooltip = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<h4>Conduit ' + feature.properties.Name + '</h4>' +
                    '<p>SWMM ID: ' + feature.properties.Element + '<br />' +
                    '100-year Peak Flow: ' + feature.properties.Flow_100yr + ' cfs </p>')
                .addTo(map);
        });
    });

    map.on('click', function (e) {
        map.featuresAt(e.point, { layer: ['2003junctions'], radius: 10, includeGeometry: true }, function (err, features) {
            if (err) throw err;
            var feature = features[0];

            var tooltip = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<h4>' + feature.properties.Flow_Type + '</h4>' +
                    '<p>SWMM ID: ' + feature.properties.SWMM_ID + '<br />' +
                    '100-year Peak Flow: ' + feature.properties.Flow_100 + ' cfs </p>')
                .addTo(map);
        });
    });

    map.on('click', function (e) {
        map.featuresAt(e.point, { layer: ['2016basins'], radius: 0, includeGeometry: true }, function (err, features) {
            if (err) throw err;
            var feature = features[0];
            var number = feature.properties.Area_Ac;
            var rounded = Math.round(number * 10) / 10;
            var tooltip = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<h4> Basin ' + feature.properties.Name + '</h4>' +
                    '<p>Area: ' + rounded + ' ac <br />' +
                    'Imperviousness: ' + feature.properties.Imperv + '% </p>')
                .addTo(map);
        });
    });

    map.on('click', function (e) {
        map.featuresAt(e.point, { layer: ['2016junctions'], radius: 10, includeGeometry: true }, function (err, features) {
            if (err) throw err;
            var feature = features[0];

            var tooltip = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<h4>' + feature.properties.Type + ' ' + feature.properties.Name + '</h4>' +
                    '<p><b>100-year Peak Flow</b><br />w/ Magnolia St Outfall: ' + feature.properties.wMag + ' cfs <br />' +
                    'w/o Magnolia St Outfall: ' + feature.properties.woMag + ' cfs </p>')
                .addTo(map);
        });
    });

    map.on('click', function (e) {
        map.featuresAt(e.point, { layer: ['2016conduits'], radius: 10, includeGeometry: true }, function (err, features) {
            if (err) throw err;
            var feature = features[0];

            var tooltip = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<h4>Conduit ' + feature.properties.Name + '</h4>' +
                    '<p><b>100-year Peak Flow</b><br />w/ Magnolia St Outfall: ' + feature.properties.w_Mag + ' cfs <br />' +
                    'w/o Magnolia St Outfall: ' + feature.properties.wo_Mag + ' cfs <br />' +
                    '2002 Ayres Study: ' + feature.properties.Ayres + ' cfs </p>')
                .addTo(map);
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
        map.featuresAt(e.point, { layer: ['rog-flowDepth2', 'rog-flowDepth3', 'rog-flowDepth4', 'rog-flowDepth5', 'rog-flowDepth6', 'rog-flowDepth7', 'rog-flowDepth8', 'magst-flowDepth2', 'magst-flowDepth3', 'magst-flowDepth4', 'magst-flowDepth5', 'magst-flowDepth6', 'magst-flowDepth7', 'magst-flowDepth8', 'magloc-flowDepth2', 'magloc-flowDepth3', 'magloc-flowDepth4', 'magloc-flowDepth5', 'magloc-flowDepth6', 'magloc-flowDepth7', 'magloc-flowDepth8'], radius: 0 }, function (err, features) {
            map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';
        });
    });

    map.on('mousemove', function (e) {
        map.featuresAt(e.point, { layer: ['xsLine', 'inflow', '2003conduits', '2003junctions', '2016conduits', '2016junctions', '2016basins'], radius: 10 }, function (err, features) {
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
    map.addControl(new mapboxgl.Navigation({ position: 'top-left' }));

}
