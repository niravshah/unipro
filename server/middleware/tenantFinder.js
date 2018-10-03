var Sequelize = require('../sequelize/models');
module.exports = function (req, res, next) {

    var sdomain = null;

    if (req.subdomains[0]) {
        sdomain = req.subdomains[0];
    } else if (typeof req.body.subdomain !== 'undefined') {
        sdomain = req.body.subdomain;
    } else if (typeof req.query.subdomain !== 'undefined') {
        sdomain = req.query.subdomain;
    }
    if (sdomain !== null) {

        if (Sequelize.tenants) {
            var found = false;
            Sequelize.tenants.forEach(tenant => {
                if (tenant.sudomain === sdomain) {
                    if (!req.body.data) {
                        req.body.data = []
                    }
                    req.body.data['tenant'] = tenant.id;
                    found = true;
                    next();
                }
            });

            if (!found) {
                next(new Error('No valid tenants founds'))
            }

        } else {
            Sequelize.Tenant.findOne({where: {sudomain: sdomain}}).then(tenant => {
                if (tenant != null) {
                    if (!req.body.data) {
                        req.body.data = []
                    }
                    req.body.data['tenant'] = tenant.id;
                    next();
                } else {
                    next(new Error('No valid tenants founds'))
                }
            }).catch(err => {
                next(err)
            });
        }

    } else {
        next(new Error('No valid tenants founds'))
    }
};