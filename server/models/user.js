var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate'),
    mongoTenant = require('mongo-tenant'),
    AutoIncrement = require('mongoose-sequence')(mongoose);


var userSchema = new Schema({
    user_id: {type: Number},
    name: {type: String},
    email: {type: String},
    password: {type: String},
    admin: {type: Boolean},
    active: {type: Boolean}
});

userSchema.plugin(mongoosePaginate, 'User');
userSchema.plugin(mongoTenant, 'User');
userSchema.plugin(AutoIncrement, {inc_field: 'user_id'});

module.exports = mongoose.model('User', userSchema);
