var mysql = require('mysql');

var con = mysql.createConnection({
    host: "studyspace-db.cd93tmpmmrz8.us-east-1.rds.amazonaws.com",
    user: "ncohen4299",
    password: "password",
    database: "studyspace",
    port: 40189
});




exports.getLocations = function () {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT LocName, ShortName FROM Locations", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });
};

