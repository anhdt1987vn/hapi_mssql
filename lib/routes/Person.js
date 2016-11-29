var objection = require('objection');
var Person = require('../models/Person');
var Joi = require('joi');
var Boom = require('boom');

module.exports = [
	{
	    method: 'post',
	    path: '/persons',
	    config: {
	    	tags: ['api'],
	    	validate: {
		    	payload: {
		        	firstName: Joi.string().trim().min(3).max(100),
		        	lastName: Joi.string().trim().min(3).max(100),
		        	age: Joi.number().integer()
		      	}
		    },	
	      	handler: (request, reply) => {

		       	Person
	                .query()
	                .insert({firstName: request.payload.firstName, lastName: request.payload.lastName, age: request.payload.age})
	                .then(function (person) {

	                 	reply(person);
	                })
	                .catch(function (err) {
	                    
	                    console.log(err);
	                	reply(err);  
	                })

			}
	  	}
	},
	{
	    method: 'get',
	    path: '/persons',
	    config: {
	    	tags: ['api'],
	      	handler: (request, reply) => {

		       	Person
					.query()
				  	.then(function (people) {

				    	console.log(people[0] instanceof Person); // --> true
				    	console.log('there are', people.length, 'People in total');
				    	reply(people);
				  	})
				  	.catch(function (err) {

				    	var error = Boom.create(400, 'Bad request', { timestamp: Date.now() });
				  	});
				}
	  	}
	},
	// Get by ID
	{
		method: 'get',
		path: '/persons/{id}',
		config: {
			tags: ['api'],
			validate: {
				params: {
					id: Joi.number().integer()
				}
			},
			handler: (request, reply) => {

				Person
					.query()
					.findById(request.params.id)
					.then(function(person) {

						reply(person);
					})
					.catch(function (err) {

						reply(err);
					});
			}
		}
	},
	// Update by ID
	{
		method: 'put',
		path: '/persons/{id}',
		config: {
			tags: ['api'],
			validate: {
				params: {
					id: Joi.number().integer()
				},
				payload: {
					firstName: Joi.string().trim().min(3).max(100),
					lastName: Joi.string().trim().min(3).max(100),
					age: Joi.number().integer()
				}
			},
			handler: (request, reply) => {

				Person
					.query()
					.updateAndFetchById(request.params.id, {firstName: request.payload.firstName, lastName: request.payload.firstName, age: request.payload.age})
					.then(function(person){

						reply(person);
					})
					.catch(function(err){

						reply(err);
					});
			}
		}
	}
];