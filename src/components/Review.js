import React, {Component} from 'react';
import {Card} from "primereact/card";
import {Rating} from "primereact/rating";

export default class Review extends Component {

    render() {
        return (
            <div className="p-col-12">
                <Card title={this.props.header} subTitle={'Author: ' + this.props.username}>
                    <div className="p-grid">
                        <div className="p-col-12" style={{'text-align': 'left'}}>
                            {this.props.body}
                        </div>
                        <div className="p-col-12" style={{'text-align': 'left'}}>
                            <Rating value={this.props.rating} readonly={true} stars={10} cancel={false}/>
                        </div>
                        <div className="p-col-12" style={{'text-align': 'left'}}>
                            {this.props.timestamp}
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

}