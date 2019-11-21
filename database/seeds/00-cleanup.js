const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    mode: 'truncate',
    ignoreTables: ['dbmigrations', 'dbmigrations_lock'],
  });
};