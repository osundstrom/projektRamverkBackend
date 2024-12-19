const Router = require('@koa/router');
const router = new Router();

//model
const itemModel = require("./model/item.js");




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

module.exports = router;