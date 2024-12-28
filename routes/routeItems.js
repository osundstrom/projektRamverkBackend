const Router = require('@koa/router');
const router = new Router();

//model
const itemModel = require("./model/item.js");

//---------------------------GET----------------------------------//

//Get förfrågan 
router.get("/item", async (ctx) => { 
    try {
        
        const allItems = await itemModel.find(); 
        
        
        if (allItems.length > 0) {
            ctx.body = allItems; 
        } else {
            ctx.status = 400; 
            ctx.message = "Inga produkter hittades"  
        }


    } catch (error) { 
        ctx.status = 500; 
        ctx.body = {
            message: "Error, kunde ej hämta produkter", 
            error: error.message 
        };
    }
});


//---------------------------POST----------------------------------//

router.post("/item", async (ctx) => {
    try {
        
        const { itemCode, itemBrand, itemStock, itemPrice, itemImage} = ctx.request.body;

        
        const stockItem = new itemModel({
            itemCode,
            itemBrand,
            itemStock,
            itemPrice,
            itemImage
        });

        await stockItem.save(); 

        ctx.body = {
            message: "produkt tillagd", 
            stockItem: stockItem 
        };
        ctx.status = 201; 
    } catch (error) { 
        console.error(error);
        ctx.status = 400; 
        ctx.body = {
            message: "Misslyckad, samtliga fält måste vara ifyllda. ", 
            error: error.message 
        };
    }
});


//---------------------------DELETE----------------------------------//


module.exports = router;