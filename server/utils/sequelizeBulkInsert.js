var fs = require('fs');
var async = require('async');
var csv = require('csv');


module.exports = function (Model) {
    this.importFile = function (filename, sCallback, eCallback) {
        var input = fs.createReadStream(filename);
        var parser = csv.parse({
            columns: true,
            relax: true
        });

        var inserter = async.cargo(function (tasks) {
                Model.bulkCreate(tasks).then(function (resp) {
                        console.log("Bulk Create Callback");
                        sCallback(resp);
                    }
                ).catch(function (err) {
                    console.log("Bulk Insert Error: ", err);
                    eCallback(err)
                });
            },
            1000
        );

        parser.on('readable', function () {
            while (line = parser.read()) {
                inserter.push(line);
            }
        });

        parser.on('end', function (count) {
            inserter.drain = function () {
                console.log("Parse End. Draining Inserter");
                sCallback({});
            }
        });

        input.pipe(parser);
    }
}