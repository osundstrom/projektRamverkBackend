//mongoose
const mongoose = require("mongoose");

//schema 
const itemSchema = new mongoose.Schema({
    itemCode: { 
        type: String,
        required: true, 
        trim: true, 
    },
    itemBrand: { 
        type: String,
        required: true, 
    },
    itemStock: { 
        type: Number,
        required: true, 
    },
    itemPrice: { 
        type: Number,
        required: true, 
    },
    itemImage:{
        type: String,
        required: true,
    }

});

//skapar model
const itemModel = mongoose.model("itemModel", itemSchema);

//exporterar
module.exports = itemModel;