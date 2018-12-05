import React, {Component} from 'react';
import './App.css';
/* Google Maps */
import {GoogleApiWrapper} from 'google-maps-react';
/* PrimeReact */
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import {GMap} from 'primereact/gmap';
import {Dropdown} from 'primereact/dropdown';
import {Card} from 'primereact/card';
import {Rating} from 'primereact/rating';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputText} from 'primereact/inputtext';

import ReviewModule from './api/ReviewModule';
import LocationModule from './api/LocationModule';
import UserModule from './api/UserModule';
import Review from "./components/Review";
import BuildingInfo from "./components/BuildingInfo";

let reviewModule = ReviewModule.getInstance();
let locationModule = LocationModule.getInstance();
let userModule = UserModule.getInstance();

const mapStyles = {
    width: '100%',
    height: '570px'
};

// Obtain verification from database
var username = "";
var password = "";
var uservalid = false;

// Obtain from database
var locations = [];

// Obtain from database
var curr_location_data = {};

class App extends Component {

    constructor() {
        super();

        this.state = {
            building: null,
            comment: '',
            title: '',
            username: '',
            password: ''
        };

        this.buildingChanged = this.buildingChanged.bind(this);
        this.makePost = this.makePost.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

    }

    isEmptyObject(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    componentDidMount() {
        locationModule.loadLocations(this.getLocations());
    }

    login() {
        username = this.state.username;
        password = this.state.password;
        this.setState({password: ''});
        this.setState({username: ''});
        this.validateUserData();
    }

    logout() {
        username = '';
        password = '';
        /*this.setState({password: ''});
        this.setState({username: ''});*/
        this.validateUserData();
    }

    getLocations() {
        return fetch(locationModule.getListOfLocationsURL(), {method: "GET"}).then((response) => response.json())
            .then((responseJson) => {
                locations = responseJson;
                this.forceUpdate();
            })
            .catch((error) => {
                    console.error(error);
                }
            );
    }

    validateUserData() {
        fetch(userModule.getGetUserURL(username), {method: "GET"}).then((response) => response.json())
            .then((responseJson) => {
                if (!this.isEmptyObject(responseJson[0])) {
                    console.log(responseJson[0]);
                    console.log(password);
                    console.log();
                    if (password === responseJson[0].password) {
                        uservalid = true;
                        this.forceUpdate();
                        return;
                    }
                }

                uservalid = false;
                this.forceUpdate();
                return;
            })
            .catch((error) => {
                    console.error(error);
                }
            );
    }

    /** Makes a call to the database to obtain the reviews for a particular location */
    getLocationReviews(location) {
        return fetch(reviewModule.getLocationCommentsURL(location.shortName), {method: "GET"}).then((response) => response.json())
            .then((responseJson) => {
                curr_location_data.comments = responseJson;
                this.forceUpdate();
            })
            .catch((error) => {
                    console.error(error);
                }
            );
    }

    /** Makes a call to the database to obtain information about a particular location */
    getLocationData(location) {
        return fetch(locationModule.getLocationDataURL(location.shortName), {method: "GET"}).then((response) => response.json())
            .then((responseJson) => {
                if (!this.isEmptyObject(responseJson)) {
                    curr_location_data = responseJson[0];
                } else {
                    console.error("Location Data Empty!");
                    curr_location_data = {
                        location: 'Wilmeth Active Learning Center',
                        shortName: 'WALC',
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
                    }
                }
                this.getLocationReviews(location);
            })
            .catch((error) => {
                    console.error(error);
                }
            );
    }

    buildingChanged(e) {
        this.setState({building: e.value});
        this.getLocationData(e.value);
    }

    makePost(e) {
        let review = {
            username: username,
            loc: this.state.building.shortName,
            header: this.state.title,
            rating: this.state.review,
            body: this.state.comment,
            timestamp: ReviewModule.getTimestamp()
        };

        curr_location_data.comments.push(review);

        return fetch(reviewModule.getAddReviewURL(review), {method: "GET"}).then((response) => response.json())
            .then((responseJson) => {
                this.forceUpdate();
            })
            .catch((error) => {
                    console.error(error);
                }
            );
    }

    createComments = () => {
        let comments = [];

        // If there are no comments or the object is empty, exit
        if (curr_location_data == null || curr_location_data.comments == null || curr_location_data.comments.length === 0) {
            return;
        }

        curr_location_data.average_review = 0;

        for (let comment of curr_location_data.comments) {
            comments.push(
                <Review
                    header={comment.header}
                    username={comment.username}
                    body={comment.body}
                    rating={comment.rating}
                    timestamp={comment.timestamp}
                />
            );
            curr_location_data.average_review += comment.rating;
        }

        curr_location_data.average_review = curr_location_data.average_review / curr_location_data.comments.length;

        return comments;
    };

    showBuildingData = () => {
        if (curr_location_data != null && !this.isEmptyObject(curr_location_data)) {
            return (<BuildingInfo
                location={curr_location_data.location}
                shortName={curr_location_data.shortName}
                comments={this.createComments()}
                average_review={curr_location_data.average_review}
                street={curr_location_data.street}
                city={curr_location_data.city}
                state={curr_location_data.state}
                zip={curr_location_data.zip}
            />);
        }
        return null;
    };

    maybeAllowNewComment = () => {
        let comment = [];
        // TODO: Allow user to login if they aren't authenticated
        if (uservalid) {
            if (this.state.building != null) {
                comment.push(
                    <div className="p-col-12" style={{'text-align': 'left'}}>
                        <h4>Comment Title:</h4>
                        <InputText value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}/>
                    </div>
                );
                comment.push(
                    <div className="p-col-12" style={{'text-align': 'left'}}>
                        <h4>Comment Title:</h4>
                        <InputTextarea rows={5} cols={30} value={this.state.comment} autoResize={true}
                                       onChange={(e) => {
                                           this.setState({comment: e.target.value})
                                       }}/>
                    </div>
                );
                comment.push(
                    <div className="p-col-12" style={{'text-align': 'left'}}>
                        <h4>Give Review:</h4>
                        <Rating value={this.state.review} stars={10} cancel={false} onChange={(e) => {
                            this.setState({review: e.target.value})
                        }}/>
                    </div>
                );
                comment.push(
                    <div className="p-col-12" style={{'text-align': 'left'}}>
                        <Button label="Post Comment" onClick={this.makePost}/>
                    </div>
                );
            } else {
                comment.push(
                    <div className="p-col-12" style={{'text-align': 'left'}}>
                        <h4>Select Building:</h4>
                        <Dropdown style={{'width': '150px'}}
                                  optionLabel="location"
                                  value={this.state.building}
                                  options={locations}
                                  onChange={this.buildingChanged}
                                  placeholder="Select a Building"
                        />
                    </div>
                );
            }
            comment.push(
                <div className="p-col-12" style={{'text-align': 'left'}}>
                    <Button label="Logout" onClick={this.logout}/>
                </div>
            );
        } else {
            comment.push(
                <div className="p-col-12" style={{'text-align': 'left'}}>
                    <h2>Login</h2>
                    <div className="p-col-12" style={{'text-align': 'left'}}>
                        <h4>Username:</h4>
                    </div>
                    <div className="p-col-12" style={{'text-align': 'left'}}>
                        <InputText value={this.state.username}
                                   onChange={(e) => this.setState({username: e.target.value})}/>
                    </div>
                    <div className="p-col-12" style={{'text-align': 'left'}}>
                        <h4>Password:</h4>
                    </div>
                    <div className="p-col-12" style={{'text-align': 'left'}}>
                        <InputText value={this.state.password}
                                   onChange={(e) => this.setState({password: e.target.value})}/>
                    </div>
                    <div className="p-col-12" style={{'text-align': 'left'}}>
                        <Button label="Login" onClick={this.login}/>
                    </div>
                </div>
            )
        }

        return comment;
    };

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
                        <Card style={{'width': '100%', 'height': '570px', 'text-align': 'left'}}
                              title={"Give a Review"}>
                            {this.maybeAllowNewComment()}
                        </Card>
                    </div>
                    <div className="p-col-12">
                        <Card style={{'width': '100%', 'height': '100%', 'text-align': 'left'}} title={"Study Space"}>
                            <div className="p-grid">
                                <div className="p-col-12" style={{'text-align': 'left'}}>
                                    <h4>Select Building:</h4>
                                    <Dropdown style={{'width': '150px'}}
                                              optionLabel="location"
                                              value={this.state.building}
                                              options={locations}
                                              onChange={this.buildingChanged}
                                              placeholder="Select a Building"
                                    />
                                </div>
                                {this.showBuildingData()}
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
