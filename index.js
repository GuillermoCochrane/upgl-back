//Require Dependecies and modules
const express = require("express");
const path = require("path");
const cors = require('cors');
const cronJobs = require("./src/functions/cron");
const endpointCron = "https://api-upgl.onrender.com/api/controlpanel/up"; 

//Settings
const app = express();
const port = process.env.PORT || 6006;
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({ extended: false })); // Required for processing POST method information
app.use(express.json()); // Required for processing POST method information
app.use(cors());

//Set Template Engine
app.set('views', path.join(__dirname, './src/views'));

//Set Routes
const mainRouter = require("./src/Routes/indexRoutes");
const courseApiRouter = require("./src/Routes/API/courseApiRoute");
const controlPanelApiRouter = require("./src/Routes/API/controlPanelApiRoute");



app.get("/", mainRouter);
app.use("/api/course", courseApiRouter);
app.use("/api/controlPanel", controlPanelApiRouter);

cronJobs(endpointCron);

app.listen(port, ()=>{console.log("\n------------------------------------\nLevantando servidor en puerto " + port +  ": \nhttp://localhost:" + port + "\n------------------------------------\n")
});
