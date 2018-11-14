import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                    lat: 40.4318914,
                    lng: -86.91750952604869
                }}
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyD5x5n_np54p6TzuSVG_DYu9nEQSWH75LI'
})(MapContainer);