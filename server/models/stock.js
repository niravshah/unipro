var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    util = require('../utils/schemas'),
    mongoosePaginate = require('mongoose-paginate'),
    mongoTenant = require('mongo-tenant'),
    schema = util.getMongooseSchema(util.stock_schema),
    AutoIncrement = require('mongoose-sequence')(mongoose),
    mSchema = new Schema(schema);

mSchema.plugin(mongoosePaginate, 'Stock');
mSchema.plugin(mongoTenant, 'Stock');
mSchema.plugin(AutoIncrement, {inc_field: 'stock_id'});

module.exports = mongoose.model('Stock', mSchema);
