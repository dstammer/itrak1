var mongoose = require("mongoose");

module.exports.devPort = process.env.PORT || 9010;
module.exports.prodPort = process.env.PORT || 80;

module.exports.dbConnection = mongoose.createConnection("mongodb://heroku_tbgr3kv2:730kmucarmsspf813nblnumugq@ds053194.mongolab.com:53194/heroku_tbgr3kv2");

module.exports.cloudinary = {
		cloud_name: 'hwwhmjkbq',
		api_key: '765817942924157',
		api_secret: 'S7b_WIGbQ4hFnhNZzqMy1MEx5LY',
};