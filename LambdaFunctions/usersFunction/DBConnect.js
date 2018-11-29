/* global callback*/
var mysql = require('mysql');




exports.getUserInfo = function(username) {

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
            con.query(`SELECT * FROM studyspace.Users WHERE Username="${username}"`, function(err, result, fields) {
                if (err) reject(err);
                con.end(function(err) {
                    if (err) reject(err);
                    let retList = [];
                    // for loop through the result.
                    console.log(result);
                    for (var x in result) {
                        let obj = result[x];
                        // add JSON object to to-be-returned list
                        retList.push({ "id": obj.ID, "username": obj.Username, "password": obj.Passwd, "email": obj.Email, "picpath": obj.PicPath});
                    }
                    console.log(retList);
                    resolve(retList); // this acts as the returns statement
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
                    let retList = [];
                    // for loop through the result.
                    console.log(result);
                    resolve(result); // this acts as the returns statement
                });
            });
        })
    });
};