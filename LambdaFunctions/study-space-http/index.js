var dbcon = require("./DBConnect"); //Database Connector
exports.handler = function(event, context, callback) {
    let qs = event.queryStringParameters;
    let command = qs.command;
    var response = null;
    //cases
    //case 1: list
    // return list of all locations in <fullName, shortName>

    if (command.localeCompare('list') == 0) {
        console.log('Listing Locations')
        let promise = dbcon.getLocations();

        promise.then(function(result) {
            let response = createResponse(JSON.stringify(result));
            callback(null, response);
        });
    }
    //case 2: get 
    // name = {fullName}
    else if (command.localeCompare('get') == 0) {
        let shortname = qs.shortName;
        console.log(shortname);
        let promise = dbcon.getLocationInfo(shortname);

        promise.then(function(result) {
            let response = createResponse(JSON.stringify(result));
            callback(null, response)
        }).catch(err => console.log(err));
    }
    //case 3: add user
    else if (command.localeCompare('add') == 0) {
        //let body = event.body;
        let promise = dbcon.sendLocation(qs);

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
