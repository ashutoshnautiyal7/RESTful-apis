const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	timestamp: {
		type: String,
		default: Date.now()
	}
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;