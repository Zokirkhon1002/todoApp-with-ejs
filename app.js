const express = require('express');
const todoController = require("./controllers/todoController")
const app = express();
const bodyParser = require('body-parser')


// set up template engine
app.set('view engine','ejs');
// static files
app.use(express.static('./public'));
// body parser
app.use(bodyParser.urlencoded({extended:true}));

// fire Controllers
todoController(app);



let PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server is running port: ${PORT}`));