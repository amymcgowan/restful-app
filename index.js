var express             = require("express");
    app                 = express();
    bodyParser          = require("body-parser");
    mongoose            = require("mongoose");
    methodOverride      = require("method-override");
    
// APP CONFIG
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/restful-art-app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var tutorialSchema = new mongoose.Schema({
    title: String,
    image: String,
    videoID: String,
    videoLink: String,
    colors: String
})

var Tutorial = mongoose.model("Tutorial", tutorialSchema);

// CREATE SAMPLE DATA

// Tutorial.create({
//     title: "Rustic Doorway",
//     image: "https://img.youtube.com/vi/_W9Pir8sgaA/maxresdefault.jpg",
//     videoID: "_W9Pir8sgaA",
//     videoLink: "https://www.youtube.com/watch?v=_W9Pir8sgaA",
//     colors: "Dandelion Yellow, Fuschia, Azure Blue"
// })

// ROUTES

app.get("/", function(req, res) {
    res.redirect("tutorials");
})

// INDEX ROUTE
app.get("/tutorials", function(req, res) {
    Tutorial.find({}, function(err, tutorials) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {tutorials: tutorials});
        }
    });
});

// NEW ROUTE


// CREATE ROUTE


// SHOW ROUTE


// EDIT ROUTE


// UPDATE ROUTE


// DESTROY ROUTE



app.listen(3000);