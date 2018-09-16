var fs = require('fs');
var async = require('async');
var csv = require('csv');


module.exports = function (Model) {
    this.importFile = function (filename, sCallback, eCallback) {
        var lines = [];
        var input = fs.createReadStream(filename);
        var parser = csv.parse({
            columns: true,
            relax: true
        });

        var inserter = async.cargo(function (tasks) {
                console.log("Task Size:", tasks.length);
                Model.bulkCreate(tasks).then(function (resp) {
                        console.log("Bulk Create Callback");
                        sCallback(resp);
                    }
                ).catch(function (err) {
                    console.log("Bulk Insert Error: ", err);
                    eCallback(err)
                });
            }
        );

        parser.on('readable', function () {
            while (line = parser.read()) {
                // inserter.push(line);
                lines.push(line);
            }
        });

        parser.on('end', function () {
            console.log('Parser End, Trying to insert data', lines.length);

            Model.bulkCreate(lines).then(function (resp) {
                    console.log("Bulk Insert Successful");
                    sCallback(resp);
                }
            ).catch(function (err) {
                console.log("Bulk Insert Error: ", err);
                eCallback(err)
            });
        });

        input.pipe(parser);
    }
}