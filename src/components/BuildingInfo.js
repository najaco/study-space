import React, {Component} from 'react';
import {Rating} from "primereact/rating";

export default class BuildingInfo extends Component {

    render() {
        return (
            <div className="p-col-12" style={{'text-align': 'left'}}>
                <div className="p-col-12" style={{'text-align': 'left'}}>
                    <h4>Building Address:</h4>
                    {this.props.street} {this.props.city}, {this.props.state} {this.props.zip}
                </div>
                <div className="p-col-12" style={{'text-align': 'left'}}>
                    <h4>Name:</h4>
                    {this.props.location} ({this.props.shortName})
                </div>

                <div className="p-col-12" style={{'text-align': 'left'}}>
                    <h4>Comments:</h4>
                    {this.props.comments}
                </div>
                <div className="p-col-12" style={{'text-align': 'left'}}>
                    <h4>Average rating:</h4>
                    <Rating value={this.props.average_review} readonly={true} stars={10} cancel={false}/>
                </div>
            </div>
        );
    }

}