var utils = require('../../../utils'),
	config = require('../../../config');

module.exports = function (opts) {
    var companyModel = opts.models.Company,
		cloudinary = require('cloudinary');
        
    return {
        "post#company/create" : function (req, res) {
            var name = req.body.name,
				phone = req.body.phone,
				fax = req.body.fax,
				email = req.body.email,
				address = req.body.address,
				suburb = req.body.suburb,
				city = req.body.city,
				postcode = req.body.postcode,
				lat = req.body.lat,
				lng = req.body.lng,
				logo = req.body.logo,
				logo_name = req.body.logoName;

			if (req.user.role && req.user.role != "1")
			{
				return res.json({ success : false, error : "Insufficient permission" });
			}
                            
			var query = companyModel.findOne({name : name});
            query.exec(function (err, company) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false, error : "Internal server error" });
                } else if (company) {
					return res.json({ success : false, exist: true } );
                } else {
					company = new companyModel();
                }

				company.name = name;
				company.phone = phone;
				company.fax = fax;
				company.email = email;
				company.address = address;
				company.suburb = suburb;
				company.city = city;
				company.postcode = postcode;
				company.lat = lat;
				company.lng = lng;
				company.logo = logo;
/*
				cloudinary.config(config.cloudinary);

				cloudinary.uploader.upload(logo, function(result){
					company.logo = result.url;
*/
					company.save(function (err, company) {
						if (err) {
							console.log(err);
							return res.json({ success : false, error : "Internal server error" });
						} else {
							return res.json({ success : true });
						}
					});
//				});
            });
        },

		"post#company/get" : function( req, res) {
			companyModel.find({}).exec(function( err, companies ){
				if(err){
					return res.json({ success : false, error : "Internal server error" });
				} else {
					return res.json({ success : true, companies : companies });
				}
			});
		}
    }
}