var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var vendorSchema = new Schema({
	'name' : String,
	'address' : String,
	'currency' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'currencies'
	}
});

module.exports = mongoose.model('vendor', vendorSchema);
