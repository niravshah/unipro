var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    util = require('../utils/schemas'),
    mongoosePaginate = require('mongoose-paginate'),
    mongoTenant = require('mongo-tenant'),
    schema = util.getMongooseSchema(util.catalogue_schema),
    AutoIncrement = require('mongoose-sequence')(mongoose),
    mSchema = new Schema(schema);

mSchema.plugin(mongoosePaginate, 'Catalogue');
mSchema.plugin(mongoTenant, 'Catalogue');
mSchema.plugin(AutoIncrement, {inc_field: 'catalogue_id'});

module.exports = mongoose.model('Catalogue', mSchema);
