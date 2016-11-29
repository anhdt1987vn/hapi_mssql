'use strict';

const Path = require('path');

module.exports = {

    server: {
        host: 'localhost',
        port: process.env.PORT || 3000
    },

    // main: {
    //     connection: process.env.NODE_ENV === 'dev' ? 'dogMng' : 'dogMng'
    // },

    /*development: {
        client: 'mysql',
        connection: {
          host: 'localhost',
          port: 3306,
          user: 'root',
          password: '1234abcd',
          database: 'hapi1',
        }
    },*/
    poop: {
        logPath: Path.normalize(`${__dirname}/../poop.log`)
    }

};
