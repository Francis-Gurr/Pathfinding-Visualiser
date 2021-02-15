import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmNpcy1nIiwiYSI6ImNrbDZyc3U4bjFndG0ycG1uam5sdjYyMzkifQ.5I5Q5hF5IEv9n2f87hGw2g';

class Application extends React.Component {
    // Initial latitude, longitude and zoom
    constructor(props) {
        super(props);
        this.state = {
            lng: -1.4704,
            lat: 53.3847,
            zoom: 15.35
        };
    }
    
    // Initialise map
    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
    
        // Set map bounds
        var bounds = [
            [-1.4866000, 53.3718000], // [west, south] i.e. [minlong, minlat]
            [-1.4542000, 53.3906000]  // [east, north] i.e. [maxlong, maxlat]
        ];
        map.setMaxBounds(bounds);
        
        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        // Add initial markers
        var startMark = new mapboxgl.Marker()
        .setLngLat([-1.4741566, 53.3807122]) // Carver street
        .addTo(map);
        var endMark = new mapboxgl.Marker()
        .setLngLat([-1.4717378, 53.3884883]) // Alma street
        .addTo(map);
    }
    
    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </div>
        )
    }
}
 
ReactDOM.render(<Application />, document.getElementById('app'));
