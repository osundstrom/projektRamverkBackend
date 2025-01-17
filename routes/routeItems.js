const Router = require('@koa/router');
const router = new Router();

//model
const itemModel = require("./model/item.js")

const authenticeJWT = require("./routes/auth.js");

router.use(authenticeJWT); 
//---------------------------GET----------------------------------//

router.get("/item", async (ctx) => { 
    try {
        //hämtar alla objekt
        const allItems = await itemModel.find(); 
        
        //kollar om de är fler än 0 objekt
        if (allItems.length > 0) {
            ctx.body = allItems; //om de finns returneras dessa
        } else { //annars
            ctx.status = 400; //statuskod
            ctx.message = "Inga produkter hittades"  //meddlande
        }


    } catch (error) { //vid error
        ctx.status = 500; //statuskod
        ctx.body = {
            message: "Error, kunde ej hämta produkter", 
            error: error.message 
        };
    }
});


//---------------------------POST----------------------------------//

router.post("/item", async (ctx) => {
    try {
        
        //hämta värden
        const { itemCode, itemBrand, itemStock, itemPrice, itemImage} = ctx.request.body;

        //skapar ny av itemModel
        const stockItem = new itemModel({
            itemCode,
            itemBrand,
            itemStock,
            itemPrice,
            itemImage
        });

        //sparar
        await stockItem.save(); 

        ctx.body = {
            message: "produkt tillagd", //meddelande
            stockItem: stockItem  //
        };
        ctx.status = 201; //status 201, created
    } catch (error) { //vid error
        console.error(error);
        ctx.status = 400; // status 400, bad request
        ctx.body = {
            message: "Misslyckad, samtliga fält måste vara ifyllda. ", 
            error: error.message 
        };
    }
});


//---------------------------DELETE----------------------------------//

router.delete("/item/:id", async (ctx) => {
    //hämtar ID
    const {id} = ctx.params; 
    try {
        //radera baserat på id
        const itemDelete = await itemModel.findByIdAndDelete(id); 
        //om item ej hittas
        if(!itemDelete) { 
            ctx.status = 404; //not found
            ctx.body = {
                message: "Hittar ingen produkt",//meddelande
            };
            
        }else { 
            ctx.status = 200; //status ok
            ctx.body = {
                message: "produkt borttagen", //meddelande
            }
        }

    } catch (error) { 
        ctx.status = 400; //status, bads request
        ctx.body = {
            message: "Misslyckad förfrågan", //meddelande
            error: error.message 
        };
    }
});


//---------------------------PUT----------------------------------//

router.put("/item/:id", async (ctx) => {
    //hämtar id
    const {id} = ctx.params; 
    try {
        //updaterat baserat på id
        const itemUpdated = await itemModel.findByIdAndUpdate(id, ctx.request.body);

        //om item ej hittas
        if(!itemUpdated) {
            ctx.status = 404; //not found
            ctx.body = {
                message: "Hittar ingen produkt", //meddelande
            };
            
        }else {
            ctx.status = 200; //ok
            
            ctx.body = {
                message: "Produkt är ändrad", 
            };
        }

    } catch (error) { 
        ctx.status = 400; //bad request
        ctx.body = {
            message: "Misslyckad förfrågan", 
            error: error.message 
        };
    }
});


module.exports = router;