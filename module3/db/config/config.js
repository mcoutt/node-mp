const config = require('../../config/config')
const {database, username, dialect, host, pass} = config.db

module.exports = {
  "development": {
    "username": username,
    "password": pass,
    "database": database,
    "host": host,
    "dialect": dialect,
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
