
// dependencies
const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

// server port
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("db"));

// ROUTER
// HTML GET Requests
// Below code handles when users "visit" a page.
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// API Routes
  // reads and displays in db.json
app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", function (err, data) {
        if (err) throw err;
        res.json(JSON.parse(data))
    });
});

// saves new notes to db.json and returns new note to user
app.post("/api/notes", function (req, res) {

    fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", function (err, data) {
        if (err) throw err;
        data = JSON.parse(data);

        if (data.length === 0){
            req.body.id = 0;
        } else {
            req.body.id = data[data.length -1].id +1;
        };

        data.push(req.body);

        fs.writeFile(path.join(__dirname + "/db/db.json"), JSON.stringify(data, null, 2), "utf8", function (err) {
            if (err) throw err;
            // sets the response HTTP status code to statusCode and send its string representation as the response body.
            res.sendStatus(200)
        });
    });
});

// delete notes from db.json
app.delete("/api/notes/:id", function (req, res) {
    fs.readFile(path.join(__dirname + "/db/db.json"),"utf8", function (err, data) {
            if (err) throw err;
            data = JSON.parse(data);
            const storedNotes = [];
            for (let i = 0; i < data.length; i++) {
                if (parseInt(req.params.id) !== data[i].id) {
                    storedNotes.push(data[i])
                };
            };
            fs.writeFile(path.join(__dirname + "/db/db.json"), JSON.stringify(storedNotes, null, 2), "utf8", function (err) {
                if (err) throw err;
                // ets the response HTTP status code to statusCode and send its string representation as the response body.
                res.sendStatus(200)
            });
        });
});

// Listners

app.listen(PORT, function () {
    console.log("Server is listening at http://localhost:" + PORT);
});