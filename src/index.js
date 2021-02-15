import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmNpcy1nIiwiYSI6ImNrbDZyc3U4bjFndG0ycG1uam5sdjYyMzkifQ.5I5Q5hF5IEv9n2f87hGw2g';

class Application extends React.Component {
    // Initial latitude, longitude and zoom
    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2
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
