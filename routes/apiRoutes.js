// DEPENDENCIES
const path = require("path");
const fs = require("fs");

// var tableData = require("../data/tableData");
var notesDBJSON = require("../data/notetakerData");
// var waitListData = require("../data/notetakerData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // get all notes
  app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", function (err, data) {
        if (err) throw err;
        // console.log(data)
        res.json(JSON.parse(data))
    });
});


}