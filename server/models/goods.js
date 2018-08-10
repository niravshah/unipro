var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    util = require('../utils/schemas'),
    mongoosePaginate = require('mongoose-paginate'),
    mongoTenant = require('mongo-tenant'),
    schema = util.getMongooseSchema(util.goods_schema),
    AutoIncrement = require('mongoose-sequence')(mongoose),
    mSchema = new Schema(schema);

mSchema.plugin(mongoosePaginate, 'Goods');
mSchema.plugin(mongoTenant, 'Goods');
mSchema.plugin(AutoIncrement, {inc_field: 'goods_id'});

module.exports = mongoose.model('Goods', mSchema);
