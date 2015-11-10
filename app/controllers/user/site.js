var utils = require('../../../utils');

module.exports = function (opts) {
    var siteModel = opts.models.Site;
        
    return {
        "post#site/create" : function (req, res) {
            var name = req.body.name,
				company = req.body.company,
				startDate = req.body.startDate,
				endDate = req.body.endDate,
				openTime = req.body.openTime,
				closeTime = req.body.closeTime,
				address = req.body.address,
				suburb = req.body.suburb,
				city = req.body.city,
				postcode = req.body.postcode,
				lat = req.body.lat,
				lng = req.body.lng;

			if (!req.user.role || !(req.user.role != "1" || req.user.role != "2"))
			{
				return res.json({ success : false, error : "Insufficient permission" });
			}
                            
			var query = siteModel.findOne({name : name, company : company});
            query.exec(function (err, site) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false, error : "Internal server error" });
                } else if (site) {
					return res.json({ success : false, exist : true });
                }
					
				site = new siteModel();

				site.name = name;
				console.log(company);
				if(company != ""){
					site.company = company;
				} else {
					site.company = null;
				}
				site.startDate = startDate;
				site.endDate = endDate;
				site.openTime = openTime;
				site.closeTime = closeTime;
				site.address = address;
				site.suburb = suburb;
				site.city = city;
				site.postcode = postcode;
				site.lat = lat;
				site.lng = lng;
				
				site.save(function (err, site) {
					if (err) {
						console.log(err);
						return res.json({ success : false, error : "Internal server error" });
					} else {
						return res.json({ success : true });
					}
				});
            });
        },

		"post#site/get" : function( req, res) {
			siteModel.find({}).exec(function( err, sites ){
				if(err){
					return res.json({ success : false, error : "Internal server error" });
				} else {
					return res.json({ success : true, sites : sites });
				}
			});
		}
    }
}