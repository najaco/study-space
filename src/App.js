import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from "./MapContainer";

class App extends Component {
    render() {
        return (
            <div className="App">
                <MapContainer/>
            </div>
        );
    }
}

export default App;
