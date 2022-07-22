const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	timestamp: {
		type: String,
		default: Date.now()
	}
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;