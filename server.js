//---------------------------Allt som krävs----------------------------------//

//koa
const koa = require("koa");

//bodyparser
const bodyParser = require("koa-bodyparser");

//cors
const cors = require("@koa/cors");

//dotenv
require("dotenv").config();

//mongoose
const mongoose = require("mongoose");

//route
const router = require("./routes/routeItems.js"); 


//model
const oneMovie = require("./routes/model/item.js");

//---------------------------Använder----------------------------------//

//använder koa
const app = new koa();

//använd cors
app.use(cors());

//använd bodyparser
app.use(bodyParser());

//använder router
app.use(router.routes());

//---------------------------Ansluter mongodb----------------------------------//

mongoose.connect(process.env.URL)
  .then(() => {
    console.log("Ansluten")})
  .catch(error => {
    console.log("Misslyckades", error)});


//---------------------------startar----------------------------------//

app.listen(process.env.PORT, () => {
    console.log("Startar server");
});