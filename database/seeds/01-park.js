
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('park').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('park').insert([
        {name: 'Pleasure Park', city: 'PHC', country: 'Nigeria', description: 'guilty pleasures'},
        {name: 'Golf', city: 'Abuja', country: 'Nigeria', description: 'douchebagery'},
        {name: 'K9', city: 'Omoku', country: 'Nigeria', description: 'mans best friend'},
      ]);
    });
};
