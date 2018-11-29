var dbcon = require("./DBConnect"); //Database Connector
exports.handler = function(event, context, callback){
    let qs = event.queryStringParameters;
    let command = qs.command;
    var response = null;
    //cases
    //case 1: list
    // return list of all locations in <fullName, shortName>
    if(command.localeCompare('list') == 0){
        console.log('Listing Locations')
        var locations = dbcon.getLocations();
        var response=createResponse(JSON.stringify(locations));
        callback(null, response);
    }
    //case 2: get 
    // name = {fullName}
    if(command.localeCompare('get') == 0){
        let name = qs.name;
    }
    //case 3: review (post)
    //body: review
    if(command.localeCompare('review')){
        let body = event.body;
        // let review = body.review;
        //add review

    }

    var errResponse = {
        "statusCode": 200,
        "headers": {
        },
        "body": JSON.stringify('error'),
        "isBase64Encoded": false
    };

    callback(null, errResponse);

};

function createResponse(body){
    var response = {
        "statusCode": 200,
        "headers": {
        },
        "body": body,
        "isBase64Encoded": false
    };
    return response
}

