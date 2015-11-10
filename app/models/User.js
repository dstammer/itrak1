var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        company : [{
            type: mongoose.Schema.ObjectId,
            ref: "Company"
		}],
		site : [{
            type: mongoose.Schema.ObjectId,
            ref: "Site"
		}],
		name : {
            type: String
		},
		role : {
            type: String
		},
		sitesafe : {
            type: String
		},
		mobile : {
            type: String
		},
		phone : {
            type: String
		},
		fax : {
            type: String
		},
		email : {
            type: String
		},
		password : {
            type: String
		},
		preferences : {
            type: String
		},
    });
    
    return Schema;
}