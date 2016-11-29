'use strict';

const Knex = require('knex');
const config = require('../../../knexfile');
const Model = require('objection').Model;

exports.register = (server, option, next) => {
	// Initialize knex.
    var knex = Knex(config.development);
    //console.log(Model);
    Model.knex(knex);
    next();
};

exports.register.attributes = {
	name: 'knex'
}