//Require Dependecies and modules
const express = require("express");
const path = require("path");
const cors = require('cors');

//Settings
const app = express();
const port = process.env.PORT || 6006;
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({ extended: false })); // Required for processing POST method information
app.use(express.json()); // Required for processing POST method information
app.use(cors());

//Set Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

//Set Routes
const mainRouter = require("./src/Routes/indexRoutes");
const iaApiRouter = require("./src/Routes/API/iaApiRoute");
const pythonApiRouter = require("./src/Routes/API/pythonApiRoute");

app.get("/", mainRouter);
app.use("/api/ia", iaApiRouter);
app.use("/api/python", pythonApiRouter);

app.listen(port, ()=>{console.log("\n------------------------------------\nLevantando servidor en puerto " + port +  ": \nhttp://localhost:" + port + "\n------------------------------------\n")
});
