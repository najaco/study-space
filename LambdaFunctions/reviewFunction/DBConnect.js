/* global callback*/
var mysql = require('mysql');




exports.getReviewsAtLocation = function(location) {

    console.log('Starting...');

    return new Promise((resolve, reject) => {
        var con = mysql.createConnection({
            host: "studyspace-db.cd93tmpmmrz8.us-east-1.rds.amazonaws.com",
            user: "ncohen4299",
            password: "password",
            database: "studyspace",
            port: 40189
        });


        con.connect(function(err) {
            if (err) reject(err); // reject outputs to error, so this is good
            con.query(`SELECT * FROM studyspace.Reviews WHERE LocName="${location}"`, function(err, result, fields) {
                if (err) reject(err);
                con.end(function(err) {
                    if (err) reject(err);
                    let retList = [];
                    // for loop through the result.
                    console.log(result);
                    for (var x in result) {
                        let obj = result[x];
                        // add JSON object to to-be-returned list
                        retList.push({ "id": obj.ID, "location": obj.LocName, "header": obj.Header, "body": obj.Body, "rating": obj.Rating, "timestamp": obj.TMSTMP});
                    }
                    console.log(retList);
                    resolve(retList); // this acts as the returns statement
                });
            });
        })
    });
};


exports.sendReview = function(obj) {

    console.log('Starting...');

    return new Promise((resolve, reject) => {
        var con = mysql.createConnection({
            host: "studyspace-db.cd93tmpmmrz8.us-east-1.rds.amazonaws.com",
            user: "ncohen4299",
            password: "password",
            database: "studyspace",
            port: 40189
        });


        con.connect(function(err) {
            if (err) reject(err); // reject outputs to error, so this is good
            var id = obj.id;
            var location = obj.location;
            var username = obj.username;
            var header = obj.header;
            var body = obj.body;
            var rating = obj.rating;
            var timestamp = obj.TMSTMP;
            
            con.query(`INSERT INTO studyspace.Reviews (ID, LocName, Username, Header, Body, Rating, TMSTMP) VALUES ("${id}", "${location}", "${username}", "${header}", "${body}", "${rating}", "${timestamp}")`, function(err, result, fields) {
                if (err) reject(err);
                con.end(function(err) {
                    if (err) reject(err);
                    let retList = [];
                    // for loop through the result.
                    console.log(result);
                    resolve(result); // this acts as the returns statement
                });
            });
        })
    });
};