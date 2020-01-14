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
    video: String,
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
app.get("/tutorials/new", function(req, res) {
    res.render("new");
})

// CREATE ROUTE
app.post("/tutorials", function(req, res) {
    Tutorial.create(req.body.tutorial, function(err, newTutorial) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/tutorials");
        }
    });
})

// SHOW ROUTE
app.get("/tutorials/:id", function(req, res) {
    Tutorial.findById(req.params.id, function(err, foundTutorial) {
        if(err) {
            res.redirect("/tutorials");
        } else {
            res.render("show", {tutorial: foundTutorial});
        };
    });
});

// EDIT ROUTE
app.get("/tutorials/:id/edit", function(req, res) {
    Tutorial.findById(req.params.id, function(err, foundTutorial) {
        if(err) {
            res.redirect("/tutorials");
        } else {
            res.render("edit", {tutorial: foundTutorial})
        };
    });
})

// UPDATE ROUTE
app.put("/tutorials/:id", function(req, res) {
    Tutorial.findByIdAndUpdate(req.params.id, req.body.tutorial, function(err, updatedTutorial) {
        if(err) {
            res.redirect("/tutorials");
        } else {
            res.redirect("/tutorials/" + req.params.id);
        }
    })
})

// DESTROY ROUTE



app.listen(3000);