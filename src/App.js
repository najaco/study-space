import React, {Component} from 'react';
import './App.css';

/* Google Maps */
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

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
import {Password} from 'primereact/password';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputText} from 'primereact/inputtext';
import {Growl} from 'primereact/growl';

import ReviewModule from './api/ReviewModule';
import LocationModule from './api/LocationModule';
import UserModule from './api/UserModule';
import Review from "./components/Review";
import BuildingInfo from "./components/BuildingInfo";
import NetworkModule from "./api/NetworkModule";

let reviewModule = ReviewModule.getInstance();
let locationModule = LocationModule.getInstance();
let userModule = UserModule.getInstance();

const mapStyles = {
    width: '65%',
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
var coordinates = {};

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            building: null,
            comment: '',
            title: '',
            username: '',
            password: '',
            confirm_password: '',
            email: '',
            coordinates: null,
            input_state: 0 // 0 is login, 1 is signup, 2 is leave review
        };

        this.buildingChanged = this.buildingChanged.bind(this);
        this.makePost = this.makePost.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.signup = this.signup.bind(this);
    }

    isEmptyObject(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    componentDidMount() {
        document.title = "Study Space";
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
        this.setState({password: ''});
        this.setState({username: ''});
        this.setState({email: ''});
        this.setState({title: '', comment: ''});
        this.setState({input_state: 0});
    }

    signup() {
        if (this.state.password === this.state.confirm_password) {
            NetworkModule.httpGet(userModule.getAddUserURL(this.state.username, this.state.password, this.state.email, "null"), () => {
                this.setState({input_state: 2});
                username = this.state.username;
                password = '';
                this.setState({password: ''});
                this.setState({username: ''});
            });
        } else {
            this.growl.show({severity: 'error', summary: 'Error Message', detail: 'Passwords do not match.'});
        }
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
                    if (password === responseJson[0].password) {
                        uservalid = true;
                        this.setState({input_state: 2});
                        return;
                    }
                }
                this.growl.show({severity: 'error', summary: 'Error Message', detail: 'Password Incorrect.'});
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
                let address = curr_location_data.street + ', ' + curr_location_data.city + ', ' + curr_location_data.state;
                locationModule.addressToCoordinates(address, (json) => this.extractCoordinates(json));
                this.forceUpdate();
            })
            .catch((error) => {
                    console.error(error);
                }
            );
    }

    extractCoordinates(json) {
        this.setState({coordinates: json.results[0].geometry.location});
        this.forceUpdate();
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
        if (this.state.header == '' || this.state.review == 0 || this.state.comment == '') {
            this.growl.show({severity: 'error', summary: 'Error Message', detail: 'Enter proper information.'});
            return;
        }

        let review = {
            username: username,
            loc: this.state.building.shortName,
            header: this.state.title,
            rating: this.state.review,
            body: this.state.comment,
            timestamp: ReviewModule.getTimestamp()
        };

        this.setState({title: '', comment: ''});

        curr_location_data.comments.push(review);

        return fetch(reviewModule.getAddReviewURL(review), {method: "GET"}).then((response) => response.json())
            .then((responseJson) => {
                this.growl.show({severity: 'success', summary: 'Success Message', detail: 'Comment posted.'});
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

    renderInputCard = () => {
        if (this.state.input_state === 0) {
            return this.renderLogin();
        }
        if (this.state.input_state === 1) {
            return this.renderSignup();
        }
        if (this.state.input_state === 2) {
            return this.renderLeaveReview();
        }
    };

    renderLogin = () => {
        return (
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
                    <Password value={this.state.password} feedback={false}
                              onChange={(e) => this.setState({password: e.target.value})}/>
                </div>
                <div className="p-col-12" style={{'text-align': 'left'}}>
                    <Button label="Login" onClick={this.login}/>
                    <Button label="Sign Up" onClick={() => {
                        this.setState({input_state: 1})
                    }} style={{'marginLeft': 4}}/>
                </div>
            </div>
        )
    };

    renderSignup = () => {
        return (
            <div className="p-col-12" style={{'text-align': 'left'}}>
                <h2>Signup</h2>
                <h4>Username:</h4>
                <InputText value={this.state.username}
                           onChange={(e) => this.setState({username: e.target.value})}/>

                <h4>Password:</h4>
                <Password value={this.state.password}
                          onChange={(e) => this.setState({password: e.target.value})}/>

                <h4>Confirm Password:</h4>
                <Password value={this.state.confirm_password} feedback={false}
                          onChange={(e) => this.setState({confirm_password: e.target.value})}/>

                <h4>Email:</h4>
                <InputText value={this.state.email}
                           onChange={(e) => this.setState({email: e.target.value})}/>
                <div style={{'text-align': 'left', 'marginTop': 4}}>
                    <Button label="Sign Up" onClick={this.signup}/>
                </div>
            </div>
        );
    };

    renderLeaveReview = () => {
        let comment = [];
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
                    <Dropdown style={{'width': '250px'}}
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
                <Button label="Logout" onClick={() => {
                    this.logout()
                }}/>
            </div>
        );
        return comment;
    };

    render() {

        let options = {
            center: {lat: 40.4318914, lng: -86.91750952604869},
            zoom: 14
        }

        if (!this.isEmptyObject(this.state.coordinates)) {
            options = {
                center: this.state.coordinates,
                zoom: 18
            }
        }

        return (
            <div className="App">
                <Growl ref={(el) => this.growl = el} />
                <div className="p-grid p-col-12">
                    <div className="p-col-8">
                        <Map google={this.props.google} style={mapStyles} zoom={options.zoom} center={options.center}>
                            <Marker name={curr_location_data.location} position={this.state.coordinates}/>
                        </Map>
                    </div>
                    <div className="p-col-4" style={{'z-index': '100'}}>
                        <Card style={{'width': '100%', 'height': '570px', 'text-align': 'left'}}
                              title={"Give a Review"}>
                            {this.renderInputCard()}
                        </Card>
                    </div>
                    <div className="p-col-12">
                        <Card style={{'width': '100%', 'height': '100%', 'text-align': 'left'}} title={"Study Space"}>
                            <div className="p-grid">
                                <div className="p-col-12" style={{'text-align': 'left'}}>
                                    <h4>Select Building:</h4>
                                    <Dropdown style={{'width': '250px'}}
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
    apiKey: ('AIzaSyD5x5n_np54p6TzuSVG_DYu9nEQSWH75LI')
})(App);
