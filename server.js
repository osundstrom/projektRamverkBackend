//---------------------------Allt som krävs----------------------------------//

//koa
const koa = require("koa");

//bodyparser
const bodyParser = require("koa-bodyparser");

//cors
const cors = require("@koa/cors");

//dotenv
require("dotenv").config();

//---------------------------Använder----------------------------------//

//använder koa
const app = new koa();

//använd cors
app.use(cors());

//använd bodyparser
app.use(bodyParser());



//---------------------------startar----------------------------------//

//För local
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servern startar");
});