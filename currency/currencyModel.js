var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var currencySchema = new Schema({
	'code' : String,
	'name' : String,
	'rate' : Number
});

module.exports = mongoose.model('currency', currencySchema);
