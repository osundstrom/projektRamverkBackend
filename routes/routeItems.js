const Router = require('@koa/router');
const router = new Router();

//model
const itemModel = require("./model/item.js");

//---------------------------GET----------------------------------//

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

router.delete("/item/:id", async (ctx) => {
    const {id} = ctx.params; 
    try {
        const itemDelete = await itemModel.findByIdAndDelete(id); 
        if(!itemDelete) { 
            ctx.status = 404; 
            ctx.body = {
                message: "Hittar ingen produkt",
            };
            
        }else { 
            ctx.status = 200; 
            ctx.body = {
                message: "produkt borttagen",
            }
        }

    } catch (error) { 
        ctx.status = 400; 
        ctx.body = {
            message: "Misslyckad förfrågan",
            error: error.message 
        };
    }
});


//---------------------------PUT----------------------------------//

router.put("/item/:id", async (ctx) => {
    const {id} = ctx.params; 
    try {
        const itemUpdated = await itemModel.findByIdAndUpdate(id, ctx.request.body);

        if(!itemUpdated) {
            ctx.status = 404; 
            ctx.body = {
                message: "Hittar ingen produkt",
            };
            
        }else {
            ctx.status = 200; 
            
            ctx.body = {
                message: "Produkt är ändrad", 
            };
        }

    } catch (error) { 
        ctx.status = 400; 
        ctx.body = {
            message: "Misslyckad förfrågan", 
            error: error.message 
        };
    }
});


module.exports = router;