var express             = require("express");
    app                 = express();
    bodyParser          = require("body-parser");
    mongoose            = require("mongoose");
    methodOverride      = require("method-override");
    multer              = require("multer");
    cloudinary          = require("cloudinary");
    cloudinaryStorage   = require("multer-storage-cloudinary")
    
// APP CONFIG
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/restful-art-app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// CLOUDINARY CONFIG
cloudinary.config({
    cloud_name: process.env.amymcgowan,
    api_key: process.env.522495214729148,
    api_secret: process.env.TPE01pL1ECj7z_MXZ3ONkKycRn0
});
var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "images",
    allowedFormats: ["jpg", "png"],
    transformation: [{width: 500, height: 500, crop: "limit"}]
});
var parser = multer({ storage: storage });

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

var finishedPieceSchema = new mongoose.Schema({
    image: String
})

var FinishedPiece = mongoose.model("finishedPiece", finishedPieceSchema);

// CREATE SAMPLE DATA

// FinishedPiece.create({
//     image: "https://cdn.shopify.com/s/files/1/2398/2457/products/seaturtle_740x.jpg?v=1556050030"
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

app.get("/gallery", function(req, res) {
    FinishedPiece.find({}, function(err, finishedPieces) {
        if(err) {
            console.log(err);
        } else {
            res.render("gallery", {finishedPieces: finishedPieces});
        }
    })
})

// NEW ROUTE
app.get("/tutorials/new", function(req, res) {
    res.render("new");
})

// app.get("/gallery/new", function(req, res) {
//     res.send("")
// })

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

app.post("/gallery", function(req, res) {
    FinishedPiece.create(req.body.finishedPiece, function(err, newPiece) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/gallery");
        }
    })
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

app.delete("/tutorials/:id", function(req, res) {
    Tutorial.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/tutorials/" + req.params.id);
        } else {
            res.redirect("/tutorials");
        }
    })
})

app.listen(3000);