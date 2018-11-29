var dbcon = require("./DBConnect"); //Database Connector
exports.handler = function(event, context, callback) {
    let qs = event.queryStringParameters;
    let command = qs.command;
    var response = null;

    //case 1: get User
    // passed: Username
    if (command.localeCompare('get') == 0) {
        let username = qs.username;

        let promise = dbcon.getUserInfo(username);

        promise.then(function(result) {
            let response = createResponse(JSON.stringify(result));
            callback(null, response)
        }).catch(err => console.log(err));
    }
    //case 2: add user
    else if (command.localeCompare('add') == 0) {
        //let body = event.body;
        let promise = dbcon.sendUser(qs);
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
