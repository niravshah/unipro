var _ = require('underscore');

var schemas = {
    location_schema: [
        {
            label: 'Location Id',
            field: 'location_id',
            type: 'Number',
            excelUpload: false,
            summaryScreen: true,
            mDef: {type: 'Number'}
        },
        {
            label: 'GS1 GLN',
            field: 'gs1_gln',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false}
        },
        {
            label: 'Description',
            field: 'description',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false}
        },
        {
            label: 'Building',
            field: 'building',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false}
        },
        {
            label: 'Floor',
            field: 'floor',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false}
        },
        {
            label: 'Store',
            field: 'store',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false}
        },
        {
            label: 'Shelf',
            field: 'shelf',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false}
        },
        {
            label: 'Postcode',
            field: 'postcode',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false}
        },
        {
            label: 'Details',
            field: 'details',
            excelUpload: true,
            summaryScreen: false,
            mDef: {type: 'String', required: false}
        }

    ],
    stock_schema: [
        {
            label: 'Stock Id',
            field: 'stock_id',
            type: 'Number',
            required: true,
            summaryScreen: true,
            excelUpload: false
        },
        {
            label: 'Item Description',
            field: 'item_description',
            required: true,
            summaryScreen: true,
            excelUpload: true
        },
        {
            label: 'GS1 GTIN',
            field: 'gs1_gtin',
            type: 'Number',
            required: false,
            summaryScreen: true,
            excelUpload: true
        },
        {
            label: 'Location',
            field: 'location',
            required: true,
            summaryScreen: true,
            excelUpload: true
        },
        {
            label: 'GS1 GLN',
            field: 'gs1_gln',
            required: false,
            summaryScreen: true,
            excelUpload: true
        },
        {
            label: 'Quantity',
            field: 'quantity',
            type: 'Number',
            required: true,
            summaryScreen: true,
            excelUpload: true
        },
        {
            label: 'Status',
            field: 'status',
            required: true,
            summaryScreen: true,
            excelUpload: true
        },
        {
            label: 'Sub Status',
            field: 'sub_status',
            required: false,
            summaryScreen: true,
            excelUpload: true
        },

        {
            label: 'Last Moved',
            field: 'last_moved',
            type: 'date',
            dateInputFormat: 'YYYY-MM-DD',
            dateOutputFormat: 'Do MMM YY',
            summaryScreen: true,
            excelUpload: true
        },
        {
            label: 'Last Purchased',
            field: 'last_purchased',
            type: 'date',
            dateInputFormat: 'YYYY-MM-DD',
            dateOutputFormat: 'Do MMM YY',
            summaryScreen: true,
            excelUpload: true,
            required: false,
        },
        {
            label: 'Supplier',
            field: 'supplier',
            summaryScreen: true,
            excelUpload: true,
            required: false,
        },
        {
            label: 'GS1 GSRN',
            field: 'gs1_gsrn',
            summaryScreen: true,
            excelUpload: true,
            required: false,
        }
    ],
    supplier_schema: [
        {
            label: 'Supplier Id',
            field: 'supplier_id',
            type: 'Number',
            summaryScreen: true,
            excelUpload: false,
            mDef: {type: 'Number'}
        },
        {
            label: 'Supplier Name',
            field: 'supplier_name',
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: true}
        },
        {
            label: 'GS1 GSRN',
            field: 'gs1_gsrn',
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: false}
        },
        {
            label: 'Contact Person',
            field: 'contact_person',
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: false}
        },
        {
            label: 'Contact Number',
            field: 'contact_number',
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: false}
        },
        {
            label: 'Address',
            field: 'address',
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: false}
        },
        {
            label: 'Additional Details',
            field: 'additional_details',
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: false}
        }

    ],
    goods_schema: [
        {
            label: 'Goods Id',
            field: 'goods_id',
            type: 'Number',
            excelUpload: false,
            summaryScreen: true,
            mDef: {type: 'Number'}
        },
        {
            label: 'GS1 GTIN',
            field: 'gs1_gtin',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false}
        },
        {
            label: 'Description',
            field: 'description',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false}
        },
        {
            label: 'Quantity',
            field: 'quantity',
            type: 'Number',
            excelUpload: false,
            summaryScreen: true,
            mDef: {type: 'Number'}
        },
        {
            label: 'Supplier',
            field: 'supplier',
            type: 'String',
            excelUpload: false,
            summaryScreen: true,
            mDef: {type: 'String'}
        },
        {
            label: 'GS1 GSRN',
            field: 'gs1_gsrn',
            type: 'String',
            excelUpload: false,
            summaryScreen: true,
            mDef: {type: 'String'}
        }
    ],
    goods_schema_vdef: [
        {field_name: 'supplier', title: 'Supplier', type: "v-select", rules: 'required', col: 'col-md-6'},
        {col: 'col-md-6'},
        {field_name: 'gs1_gtin', title: 'GS1 GTIN', type: 'input', rules: 'required', col: 'col-md-4'},
        {field_name: 'quantity', title: 'Quantity', type: 'input', rules: 'required', col: 'col-md-4'},
        {col: 'col-md-2'},
        {field_name: 'description', title: 'Description', type: 'input', rules: '', col: 'col-md-8'}
    ],
    supplier_schema_vdef: [
        {field_name: 'supplier_name', title: 'Supplier Name', rules: 'required', col: 'col-md-6'},
        {field_name: 'gs1_gsrn', title: 'GS1 GSRN', rules: '', col: 'col-md-6'},
        {field_name: 'contact_person', title: 'Contact Person', rules: '', col: 'col-md-6'},
        {field_name: 'contact_number', title: 'Contact Number', rules: '', col: 'col-md-6'},
        {field_name: 'address', title: 'Address', rules: '', col: 'col-md-12'},
        {field_name: 'additional_details', title: 'Additional Details', rules: '', col: 'col-md-12'}
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
            mSchema[ele.field] = ele.mDef
        });
        return mSchema;
    },
    getSummarySchema: function (schema) {

        var list = _.filter(schema, function (items) {
            return items.summaryScreen
        })

        return list
    },
    getVeeValidateSchems: function (schema) {
        var mSchema = [];
        _.each(schema, function (ele) {
            if (ele.vDef) {
                mSchema.push(ele.vDef)
            }
        });
        return mSchema;
    }


};

module.exports = schemas;