var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        name : {
            type: String,
            required: true
        },
		phone : {
			type: String,
			required: true
		},
		fax : {
			type: String,
			required: true
		},
		email : {
			type: String,
			required: true
		},
		address : {
			type: String,
			required: true
		},
		suburb : {
			type: String,
			required: true
		},
		city : {
			type: String,
			required: true
		},
		postcode : {
			type: String,
			required: true
		},
		lat : {
			type: String,
			required: true
		},
		lng : {
			type: String,
			required: true
		},
		logo : {
			type: String,
		},
    });
    
    return Schema;
}