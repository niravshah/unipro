var _ = require('underscore');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schemas = {

    supplier_schema: [
        {
            label: 'Supplier Id',
            field: 'supplier_id',
            type: 'Number',
            summaryScreen: true,
            excelUpload: false,
            mDef: {type: 'Number', field_name: 'supplier_id'}
        },
        {
            label: 'Supplier Name',
            field: 'supplier_name',
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: true, field_name: 'supplier_name'}
        },
        {
            label: 'GS1 GSRN',
            field: 'gs1_gsrn',
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: false, field_name: 'gs1_gsrn'}
        },
        {
            label: 'Contact Person',
            field: 'contact_person',
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: false, field_name: 'contact_person'}
        },
        {
            label: 'Contact Number',
            field: 'contact_number',
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: false, field_name: 'contact_number'}
        },
        {
            label: 'Address',
            field: 'address',
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: false, field_name: 'address'}
        },
        {
            label: 'Additional Details',
            field: 'additional_details',
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: false, field_name: 'additional_details'}
        }

    ],
    supplier_schema_vdef: [
        {field_name: 'name', title: 'Supplier Name', rules: 'required', col: 'col-md-6'},
        {field_name: 'address', title: 'Address', rules: '', col: 'col-md-12'},
        {field_name: 'additional_details', title: 'Additional Details', rules: '', col: 'col-md-12'}
    ],
    catalogue_schema: [
        {
            label: 'Catalogue Id',
            field: 'catalogue_id',
            type: 'Number',
            excelUpload: false,
            summaryScreen: true,
            mDef: {type: 'Number', field_name: 'catalogue_id'}
        },
        {
            label: 'Supplier',
            field: 'supplier_ref.supplier_name',
            type: 'String',
            excelUpload: false,
            summaryScreen: true,
            mDef: {type: Schema.Types.ObjectId, ref: 'Supplier', field_name: 'supplier_ref'}
        },
        {
            label: 'GS1 GTIN',
            field: 'gs1_gtin',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false, field_name: 'gs1_gtin'}
        },
        {
            label: 'Description',
            field: 'description',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false, field_name: 'description'}
        }

    ],
    catalogue_schema_vdef: [
        {
            field_name: 'supplier_ref',
            title: 'Supplier',
            type: 'v-select',
            rules: 'required',
            col: 'col-md-8',
            label: 'supplier_name'
        },
        {col: 'col-md-4'},
        {field_name: 'gs1_gtin', title: 'GS1 GTIN', type: 'input', rules: 'required', col: 'col-md-6'},
        {col: 'col-md-8'},
        {field_name: 'description', title: 'Description', type: 'input', rules: '', col: 'col-md-6'}
    ],
    goods_schema: [
        {
            label: 'Goods Id',
            field: 'goods_id',
            type: 'Number',
            excelUpload: false,
            summaryScreen: true,
            mDef: {type: 'Number', field_name: 'goods_id'}
        },
        {
            label: 'GS1 GTIN',
            field: 'catalogue_ref.description',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: Schema.Types.ObjectId, ref: 'Catalogue', field_name: 'catalogue_ref'}
        },
        {
            label: 'Quantity',
            field: 'quantity',
            type: 'Number',
            excelUpload: false,
            summaryScreen: true,
            mDef: {type: 'Number', field_name: 'quantity'}
        },
        {
            label: 'Description',
            field: 'description',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false, field_name: 'description'}
        }
    ],
    goods_schema_vdef: [
        {
            field_name: 'catalogue_ref',
            title: 'GTIN',
            type: 'v-select',
            rules: 'required',
            col: 'col-md-6',
            label: 'description'
        },
        {col: 'col-md-4'},
        {field_name: 'quantity', title: 'Quantity', type: 'input', rules: 'required', col: 'col-md-4'},
        {field_name: 'description', title: 'Description', type: 'input', rules: '', col: 'col-md-4'}

    ],
    location_schema: [
        {
            label: 'Location Id',
            field: 'location_id',
            type: 'Number',
            excelUpload: false,
            summaryScreen: true,
            mDef: {type: 'Number', field_name: 'location_id'}
        },
        {
            label: 'GS1 GLN',
            field: 'gs1_gln',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false, field_name: 'gs1_gln'}
        },
        {
            label: 'Description',
            field: 'description',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false, field_name: 'description'}
        },
        {
            label: 'Building',
            field: 'building',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false, field_name: 'building'}
        },
        {
            label: 'Floor',
            field: 'floor',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false, field_name: 'floor'}
        },
        {
            label: 'Store',
            field: 'store',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false, field_name: 'store'}
        },
        {
            label: 'Shelf',
            field: 'shelf',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false, field_name: 'shelf'}
        },
        {
            label: 'Postcode',
            field: 'postcode',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false, field_name: 'postcode'}
        },
        {
            label: 'Details',
            field: 'details',
            excelUpload: true,
            summaryScreen: false,
            mDef: {type: 'String', required: false, field_name: 'details'}
        }

    ],
    stock_schema: [
        {
            label: 'Stock Id',
            field: 'stock_id',
            type: 'Number',
            required: true,
            summaryScreen: true,
            excelUpload: false,
            mDef: {type: 'Number', field_name: 'stock_id'}
        },
        {
            label: 'GS1 GTIN',
            field: 'catalogue_ref',
            type: 'String',
            required: false,
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: Schema.Types.ObjectId, required: true, ref: 'Catalogue', field_name: 'catalogue_ref'}
        },
        {
            label: 'Item Description',
            field: 'description',
            type: 'String',
            required: false,
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: false, field_name: 'description'}
        },
        {
            label: 'GS1 GLN',
            field: 'location_ref',
            required: false,
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: Schema.Types.ObjectId, required: true, ref: 'Location', field_name: 'location_ref'}
        },
        {
            label: 'Quantity',
            field: 'quantity',
            type: 'Number',
            required: true,
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'Number', field_name: 'quantity'}
        }
    ],
    stock_schema_vdef: [
        {
            field_name: 'catalogue_ref',
            title: 'GTIN',
            type: 'v-select',
            rules: 'required',
            col: 'col-md-4',
            label: 'description'
        },
        {
            field_name: 'location_ref',
            title: 'GLN',
            type: 'v-select',
            rules: 'required',
            col: 'col-md-4',
            label: 'description'
        },
        {col: 'col-md-4'},
        {field_name: 'quantity', title: 'Quantity', type: 'input', rules: 'required', col: 'col-md-4'},
        {field_name: 'description', title: 'Description', type: 'input', rules: '', col: 'col-md-4'}
    ],
    user_schema: [
        {
            label: 'User Id',
            field: 'user_id',
            type: 'Number',
            required: true,
            summaryScreen: true,
            excelUpload: false,
            mDef: {type: 'Number', field_name: 'user_id'}
        },
        {
            label: 'Name',
            field: 'name',
            type: 'String',
            required: false,
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: false, field_name: 'name'}
        },
        {
            label: 'Email',
            field: 'email',
            type: 'String',
            required: false,
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: true, field_name: 'email'}
        },
        {
            label: 'Password',
            field: 'password',
            type: 'String',
            required: false,
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: true, field_name: 'password'}
        },
        {
            label: 'Admin',
            field: 'admin',
            type: 'Boolean',
            required: false,
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'Boolean', required: false, field_name: 'admin', default: false}
        },
        {
            label: 'Active',
            field: 'active',
            type: 'Boolean',
            required: false,
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'Boolean', required: false, field_name: 'active', default: true}
        }
    ],
    user_schema_vdef: [
        {field_name: 'name', title: 'Name', type: 'input', rules: 'required', col: 'col-md-4'},
        {field_name: 'email', title: 'Email', type: 'input', rules: 'required', col: 'col-md-4'},
        {col: 'col-md-4'},
        {field_name: 'password', title: 'Password', type: 'input', rules: 'required', col: 'col-md-4'}
    ],

    getExcelUploadHeaders: function (schema) {
        var fnames = [];
        _.each(schema, function (ele) {
            if (ele.excelUpload) {
                fnames.push(ele.field);
            }
        });
        return fnames
    },
    getMongooseSchema: function (schema) {
        var mSchema = {};
        _.each(schema, function (ele) {
            mSchema[ele.mDef.field_name] = ele.mDef
        });
        return mSchema;
    },
    getSummarySchema: function (schema) {

        var list = _.filter(schema, function (items) {
            return items.summaryScreen
        });
        return list
    }
};

module.exports = schemas;