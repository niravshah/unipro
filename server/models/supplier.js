var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    util = require('../utils/schemas'),
    mongoosePaginate = require('mongoose-paginate'),
    mongoTenant = require('mongo-tenant'),
    schema = util.getMongooseSchema(util.supplier_schema),
    AutoIncrement = require('mongoose-sequence')(mongoose),
    mSchema = new Schema(schema);

mSchema.plugin(mongoosePaginate, 'Supplier');
mSchema.plugin(mongoTenant, 'Supplier');
mSchema.plugin(AutoIncrement, {inc_field: 'supplier_id'});

module.exports = mongoose.model('Supplier', mSchema);
