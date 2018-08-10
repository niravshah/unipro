var shortid = require('shortid');
var LocationModel = require('../models/location');


module.exports = {
    getTenantModel: function (Model, tenant) {
        return Model.byTenant(tenant);
    },
    createLocation: function (tenant, gs1_gln, description, store, shelf, callback) {
        var LocationTenantModel = LocationModel.byTenant(tenant);
        var newLocation = new LocationTenantModel();
        //newLocation.location_id = shortid.generate();
        newLocation.gs1_gln = gs1_gln;
        newLocation.description = description;
        newLocation.store = store;
        newLocation.shelf = shelf;
        newLocation.save(function (err, loc) {
            callback(err, loc);
        });
    }
};