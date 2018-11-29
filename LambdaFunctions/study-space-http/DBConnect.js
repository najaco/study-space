/* global callback*/
var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: "studyspace-db.cd93tmpmmrz8.us-east-1.rds.amazonaws.com",
//     user: "ncohen4299",
//     password: "password",
//     database: "studyspace",
//     port: 40189
// });




exports.getLocations = function() {

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
            con.query(`SELECT * FROM Locations`, function(err, result, fields) {
                if (err) reject(err);
                con.end(function(err) {
                    if (err) reject(err);
                    let retList = [];
                    // for loop through the result.
                    console.log(result);
                    for (var x in result) {
                        let obj = result[x];
                        // add JSON object to to-be-returned list
                        retList.push({ "location": obj.LocName, "shortName": obj.ShortName });
                    }
                    console.log(retList);
                    resolve(retList); // this acts as the returns statement
                });
            });
        })
    });
};

exports.getLocationInfo = function(name) {

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
            con.query(`SELECT * FROM studyspace.Locations WHERE ShortName="${name}"`, function(err, result, fields) {
                if (err) reject(err);
                con.end(function(err) {
                    if (err) reject(err);
                    let retList = [];
                    // for loop through the result.
                    console.log(result);
                    for (var x in result) {
                        let obj = result[x];
                        // add JSON object to to-be-returned list
                        retList.push({ "id": obj.ID, "street": obj.Street, "city": obj.City, "state": obj.StateAb, "zip": obj.ZIPCode, "location": obj.LocName, "shortName": obj.ShortName });
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
            var rating = obj.rating;
            var header = obj.header;
            var body = obj.body;
            var timestamp = obj.timestamp;
            var locationName = obj.locname;
            var username = obj.username;
            
            con.query(`INSERT INTO Reviews (ID, LocName, Username, Header, Body, Rating, TMSTMP) VALUES ("${id}", "${locationName}", "${username}", "${header}", "${body}", "${rating}", "${timestamp}")`, function(err, result, fields) {
                if (err) reject(err);
                con.end(function(err) {
                    if (err) reject(err);
                    let retList = [];t
                    // for loop through the result.
                    console.log(result);
                    resolve(result); // this acts as the returns statement
                });
            });
        })
    });
};

exports.sendUser = function(obj) {

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
            var username = obj.username;
            var password = obj.password;
            var email = obj.email;
            var picpath = obj.picpath;
            
            con.query(`INSERT INTO Users (ID, Username, Passwd, Email, PicPath) VALUES ("${id}", "${username}", "${password}", "${email}", "${picpath}")`, function(err, result, fields) {
                if (err) reject(err);
                con.end(function(err) {
                    if (err) reject(err);
                    let retList = [];t
                    // for loop through the result.
                    console.log(result);
                    resolve(result); // this acts as the returns statement
                });
            });
        })
    });
};

exports.sendLocation = function(obj) {

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
            var street = obj.street;
            var city = obj.city;
            var state = obj.state;
            var zip = obj.zipcode;
            var loc = obj.name;
            var shortname = obj.shortname;
            
            
            con.query(`INSERT INTO Locations (ID, Street, City, StateAb, ZIPCode, LocName, ShortName) VALUES ("${id}", "${street}", "${city}", "${state}", "${zip}", "${loc}", "${shortname}")`, function(err, result, fields) {
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

