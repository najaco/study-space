var dbcon = require("./DBConnect"); //Database Connector
exports.handler = function(event, context, callback) {
    let qs = event.queryStringParameters;
    let command = qs.command;
    var response = null;

    //case 1: get reviews that have Location Name
    // passed: location
    if (command.localeCompare('get') == 0) {
        let username = qs.username;
        let locationName = qs.location;
        let promise = dbcon.getReviewsAtLocation(locationName);

        promise.then(function(result) {
            let response = createResponse(JSON.stringify(result));
            callback(null, response)
        }).catch(err => console.log(err));
    }
    //case 2: add Review
    else if (command.localeCompare('add') == 0) {
        //let body = event.body;
        let promise = dbcon.sendReview(qs);
        promise.then(function(result) {
            let response = createResponse(JSON.stringify(result));
            callback(null, response)
        }).catch(err => console.log(err));

    }


};

function createResponse(body) {
    var response = {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": body,
        "isBase64Encoded": false
    };
    return response
}
