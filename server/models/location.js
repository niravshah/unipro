var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    util = require('../utils/schemas'),
    mongoosePaginate = require('mongoose-paginate'),
    mongoTenant = require('mongo-tenant'),
    schema = util.getMongooseSchema(util.location_schema),
    AutoIncrement = require('mongoose-sequence')(mongoose),
    mSchema = new Schema(schema);

mSchema.plugin(mongoosePaginate, 'Location');
mSchema.plugin(mongoTenant, 'Location');
mSchema.plugin(AutoIncrement, {inc_field: 'location_id'});

module.exports = mongoose.model('Location', mSchema);
