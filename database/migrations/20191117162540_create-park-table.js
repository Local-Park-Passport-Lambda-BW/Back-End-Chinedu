
exports.up = function(knex) {
    return knex.schema.createTable('park', tbl => {
        tbl.string('name').notNullable();
        tbl.string('city').notNullable();
        tbl.string('state').notNullable();
        tbl.string('country').notNullable();
        tbl.string('description').notNullable();
        tbl.primary(['name', 'city']);
  })
};

exports.down = function(knex) {
    return knex
        .schema
        .dropTableIfExists('park');
};
