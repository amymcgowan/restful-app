var express             = require("express");
    app                 = express();
    bodyParser          = require("body-parser");
    mongoose            = require("mongoose");
    methodOverride      = require("method-override");
    
// APP CONFIG
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/restful-blog-app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var tutorialSchema = new mongoose.Schema({
    title: String,
    image: String,
    videoID: String,
    colors: String
})

var Tutorial = mongoose.model("Tutorial", tutorialSchema);