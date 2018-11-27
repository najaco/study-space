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
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';

const mapStyles = {
    width: '100%',
    height: '570px'
};

// Obtain this from database
var locations = [
    {label: 'Building1', value: '1'},
    {label: 'Building2', value: '2'}
]

var curr_location_data_fake = {
    name: 'Fake Building Name',
    short_name: 'SHRT',
    average_review: null,
    comments: [
        {
            author: 'Fake 1',
            title: 'Love it!',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            rating: 10
        },
        {
            author: 'Fake 2',
            title: 'Eh.',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            rating: 5
        }
    ]
};

class App extends Component {

    constructor() {
        super();

        this.state = {
            building: null
        };

        this.buildingChanged = this.buildingChanged.bind(this);

    }

    buildingChanged(e) {
        this.setState({building: e.value});
    }

    createComments = () => {
        let comments = [];

        curr_location_data_fake.average_review = 0;

        for (let comment of curr_location_data_fake.comments) {
            comments.push(
                <div className="p-col-12">
                    <Card title={comment.title} subTitle={comment.author}>
                        <div className="p-grid">
                            <div className="p-col-12">
                                {comment.desc}
                            </div>
                            <div className="p-col-12">
                                <Rating value={comment.rating} readonly={true} stars={10} cancel={false} />
                            </div>
                        </div>
                    </Card>
                </div>
            );
            curr_location_data_fake.average_review += comment.rating;
        }

        curr_location_data_fake.average_review = curr_location_data_fake.average_review/curr_location_data_fake.comments.length;

        return comments;
    }

    render() {
        return (
            <div className="App">
                <div className="p-grid p-col-12">
                    <div className="p-col-8">
                        <GMap options={{
                                center: {lat: 40.4318914, lng: -86.91750952604869},
                                zoom: 14
                            }} style={mapStyles}
                        />
                    </div>
                    <div className="p-col-4">
                        <Card style={{'width': '100%', 'height': '100%'}}>
                            <div className="p-grid">
                                <div className="p-col-12">
                                    Select Building:
                                    <Dropdown style={{'width': '150px'}} 
                                        value={this.state.building} 
                                        options={locations} 
                                        onChange={this.buildingChanged} 
                                        placeholder="Select a Building"
                                    />
                                </div>
                                <div className="p-col-12">
                                    Building Information:
                                </div>
                                <div className="p-col-12">
                                    Name: {curr_location_data_fake.name} ({curr_location_data_fake.short_name})
                                </div>
                                
                                <div className="p-col-12">
                                    Comments:
                                </div>
                                
                                {this.createComments()}

                                <div className="p-col-12">
                                    Average rating:
                                    <Rating value={curr_location_data_fake.average_review} readonly={true} stars={10} cancel={false} />
                                </div>
                            </div>

                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyD5x5n_np54p6TzuSVG_DYu9nEQSWH75LI'
})(App);
