const express = require ("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const empcollection = require('./model/model';)
require("./db/db");


const port = process.env.PORT || 3000;
const static_path = path.join(_dirname,"../public")
const templates_path = path.join(_dirname,"../templates/views")
const templates_path = path.join(_dirname,"../templates/partials")
//console.log(path.join(_dirname,"../public"))

app.use(express.static(static_path));
app,set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);
app.get("/", (req, res) => {
    res.render("index")

})

app.post('/empdata', async(req,res) =>{
    console.log(req.body.name);
    res.send(req.body.name);
})

app.listen(port,() => {
    console.log('server is running at port no ${port}');
})
