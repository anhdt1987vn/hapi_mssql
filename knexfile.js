module.exports = {

 development: {
      client: 'mssql',
      connection: {
        host: 'localhost',
        port: 1433,
        user: 'SA',
        password: '1234@Abcd',
        database: 'testdb',
      }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'example'
    },
    pool: {
      min: 2,
      max: 10
    }
  }

};
