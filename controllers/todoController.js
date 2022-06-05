const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config()


// connect to database
mongoose.connect(process.env.URL, (err) => {
    if (!err) console.log("connected successfully");
});

// create a Schema - this is like a blueprint
const todoSchema = new mongoose.Schema({
    item: String,
});

// create a todo Module
const Todo = mongoose.model("Todo", todoSchema);

// let itemOne = Todo({itme: "buy flowers"})

// data = [
//   { item: "get milk" },
//   { item: "giving cat food" },
//   { item: "walk dog" },
//   { item: "Table tennis" }
// ];

module.exports = function (app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get("/", (req, res) => {
        res.send("Hello World is working perfectly");
    });
    app.get("/todo", (req, res) => {
        // get Data from mongoDB and pass it to view;
        Todo.find({}, (err, db) => {
            if (err) throw err;
            res.render("todo", { todos: db });
        });
    });
    app.post("/todo", (req, res) => {
        // get data from the view and add it to mongodb
        Todo(req.body).save((err, db) => {
            if (err) throw err;
            res.json(db);
        });
    });
    app.delete("/todo/:item", (req, res) => {
        console.log(req.params)
        // delete the requested item from mongodb
        Todo.find({ item: req.params.item.replace(/\-/g, " ") }).deleteOne(
            (err, db) => {
                console.log("deleted")
                if (err) throw err;
                res.json(db);
            }
        );
    });
};
