'use strict';

const Config = require('./config');

// Glue manifest
const manifest = module.exports = {

    server: {
        app: {
            config: Config
        }
    },

    connections: [
        {
            host: Config.server.host,
            port: Config.server.port,
            labels: 'api'
        }
    ],

    registrations: [
        {
            plugin: {
                register: 'bassmaster',
                options: {
                    batchEndpoint: '/',
                    tags: ['bassmaster', 'batch']
                }
            }
        },
        {
            plugin: './lib/plugins/swagger'
        },
        {
            plugin: './lib/plugins/pinger'
        },
        {
            plugin: './lib/plugins/good'
        },
        {
            plugin: './lib/plugins/knex'
        }
        /*{
            plugin: {
                register: '../lib',
                options: Config.main
            }
        }*/
    ]

};

if (process.env.NODE_ENV === 'dev') {
    manifest.server.debug = {
        log: ['error', 'implementation', 'internal'],
        request: ['error', 'implementation', 'internal']
    };
}
