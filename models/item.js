const mongoose = require("mongoose");

let Item = mongoose.model('Item', { 
    id: String, 
    name: String,
	price: String,
	brand: String
});

module.exports = Item;