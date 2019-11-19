
exports.up = function(knex) {
    return knex.schema.table('park', tbl => {
        tbl.dropColumn('state');
  })
};

exports.down = function (knex) {
    return knex.schema.table('park', tbl => {
        tbl.string('state').notNullable();
    })
};
