module.exports = function (opts) {
    var userModel = opts.models.User;
        
    return {
        "post#user/create" : function (req, res) {
            var name = req.body.name,
				site = req.body.site,
				company = req.body.company,
				role = req.body.role,
				sitesafe = req.body.sitesafe,
				mobile = req.body.mobile,
				phone = req.body.phone,
				fax = req.body.fax,
				email = req.body.email,
				password = req.body.password;

			if (!req.user.role || !(req.user.role != "1" || req.user.role != "2"))
			{
				return res.json({ success : false, error : "Insufficient permission" });
			}
                            
			var query = userModel.findOne({name: name});
            query.exec(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false, error : "Internal server error" });
                } else if (user) {
					return res.json({ success : false, exist : true });
                }

				var user = new userModel();

				user.name = name;
				user.site = [];
				user.company = company;
				user.role = role;
				user.sitesafe = sitesafe;
				user.mobile = mobile;
				user.phone = phone;
				user.fax = fax;
				user.email = email;
				user.password = password;
				if(role == "2"){
					user.preferences = JSON.stringify({
						"email": {"minor": req.body.email_minor, "moderate": req.body.email_moderate, "serious": req.body.email_serious, "new": req.body.email_new, "assigned": req.body.email_assigned},
						"alert": {"minor": req.body.alert_minor, "moderate": req.body.alert_moderate, "serious": req.body.alert_serious, "new": req.body.alert_new, "assigned": req.body.alert_assigned}
					});
				} else {
					user.preferences = "";
				}

				user.save(function (err, user) {
					if (err) {
						console.log(err);
						return res.json({ success : false, error : "Internal server error" });
					} else {
						return res.json({ success : true });
					}
				});
            });
        },

		"post#user/get" : function( req, res) {
			userModel.find({$or : [{"role":"2"}, {"role":"3"}]}).exec(function( err, users ){
				if(err){
					return res.json({ success : false, error : "Internal server error" });
				} else {
					return res.json({ success : true, users : users });
				}
			});
		}
    }
}