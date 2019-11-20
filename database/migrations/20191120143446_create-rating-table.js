
exports.up = function(knex) {
    return knex.schema.createTable('rating', tbl => {
        tbl.increments();
        tbl.integer('rating');
        tbl.string('comment', 500).notNullable();
        tbl
            .integer('park_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('park')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('user')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('rating');
};
