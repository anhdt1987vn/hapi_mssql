'use strict';

const Hoek = require('hoek');
const Glue = require('glue');
const Labbable = require('labbable');
const Manifest = require('./manifest');

const labbable = module.exports = new Labbable();


var knexConfig = require('../knexfile');
const Knex = require('knex');
var Model = require('objection').Model;

Glue.compose(Manifest, { relativeTo: __dirname }, (err, server) => {
    //console.log("PROCESS ENV_2: " + process.env.NODE_ENV);
    //console.log(knexConfig);
    //console.log("PROCESS ENV_2: " + process.env.NODE_ENV);
    //console.log("PROCESS ENV_2: " + process.env.NODE_ENV);
    Hoek.assert(!err, err);

    // Pass server along to labbable
    labbable.using(server);


    // Initialize knex.
    var knex = Knex(knexConfig.development);
    //console.log(Model);
    Model.knex(knex);


    server.initialize((err) => {
        console.log('Server START_1');
        Hoek.assert(!err, err);

        // No need to start server if this is being required (i.e. for testing)
        if (module.parent) {
            console.log('Server START_2');
            return;
        }

        server.start((err) => {

            Hoek.assert(!err, err);

            console.log(`Server started at ${server.info.uri}`);
        });
    });
});