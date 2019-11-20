
exports.up = function(knex) {
    return knex.schema.createTable('facility', tbl => {
        tbl.increments();
        tbl.string('name').unique().notNullable();
        tbl.string('description').notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('facility');
};
