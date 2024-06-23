import React, { useRef, useEffect } from 'react';
import './Map.css';


const Map = props => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.ol.Map({
      target: mapRef.current,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM()
        })
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom
      })
    });

    // Add a marker
    const marker = new window.ol.Feature({
      geometry: new window.ol.geom.Point(window.ol.proj.fromLonLat([center.lng, center.lat])),
    });

    const markerStyle = new window.ol.style.Style({
      image: new window.ol.style.Icon({
        anchor: [0.5, 1],
        src: 'https://images.ctfassets.net/3prze68gbwl1/assetglossary-17su9wok1ui0z7w/c4c4bdcdf0d0f86447d3efc450d1d081/map-marker.png',
        height:45
      })
    });

    marker.setStyle(markerStyle);

    const vectorSource = new window.ol.source.Vector({
      features: [marker]
    });

    const vectorLayer = new window.ol.layer.Vector({
      source: vectorSource
    });

    map.addLayer(vectorLayer);

  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
