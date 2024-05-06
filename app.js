//Require Dependecies and modules
const express = require("express");
//Settings
const app = express();
const port = process.env.PORT || 6006;

app.get("/", (req,res)=>{
    res.send("Home")
});

app.listen(port, ()=>{console.log("\n------------------------------------\nLevantando servidor en puerto " + port +  ": \nhttp://localhost:" + port + "\n------------------------------------\n")
});
