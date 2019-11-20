
exports.up = function(knex) {
    return knex.schema.createTable('park_facility', tbl => {
        tbl
            .integer('park_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('park')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl
            .integer('facility_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('facility')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('park_facility')
};
