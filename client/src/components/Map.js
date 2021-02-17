import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmNpcy1nIiwiYSI6ImNrbDZyc3U4bjFndG0ycG1uam5sdjYyMzkifQ.5I5Q5hF5IEv9n2f87hGw2g';

const Map = ({startLoc, endLoc}) => {
  const mapContainerRef = useRef(null);

  // Initial latitude, longitude and zoom
  const [lng, setLng] = useState(-1.4704);
  const [lat, setLat] = useState(53.3847);
  const [zoom, setZoom] = useState(15.35);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat],
      zoom: zoom
    });
    
    // Map bounds
    var bounds = [
      [-1.4866000, 53.3718000], // [west, south] i.e. [minlong, minlat]
      [-1.4542000, 53.3906000]  // [east, north] i.e. [maxlong, maxlat]
    ]
    map.setMaxBounds(bounds);

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl({
      showCompass: false // Hide compass control
    }), 'top-right');

    // Start location
    var startMark = new mapboxgl.Marker()
    .setLngLat(startLoc) // Carver street
    .addTo(map);
    
    // End location
    var endMark = new mapboxgl.Marker()
      .setLngLat(endLoc) // Alma street
      .addTo(map);

    // Clean up on unmount
    return () => map.remove()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;
