var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var invoiceSchema = new Schema({
	'vendor' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'vendor'
	},
	'vendorGST' : { type: String},
	'date' : {type:Date,default:Date.now},
	'pan' : { type: String, required: true ,default:"AABFW8165F"},
	'services' : Array,
	'invoice_no' : { type: String, required: true },
	'tax' : { type: Number, required: true },
	'discount':{ type: Number, required: true },
	'total':{ type: Number, required: true },
	'due':{ type: Number, required: true },

});

module.exports = mongoose.model('invoice', invoiceSchema);
