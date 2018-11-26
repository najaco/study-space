import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from "./MapContainer";

/* Google Maps */
import { Map, GoogleApiWrapper } from 'google-maps-react';

/* PrimeReact */
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { GMap } from 'primereact/gmap';

const mapStyles = {
    width: '100%',
    height: '100px'
};

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="p-grid">
                    <div className="p-col-8">
                        <GMap options={{
                                center: {lat: 40.4318914, lng: -86.91750952604869},
                                zoom: 14
                            }} style={mapStyles}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyD5x5n_np54p6TzuSVG_DYu9nEQSWH75LI'
})(App);
