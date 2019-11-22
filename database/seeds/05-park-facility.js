exports.seed = function(knex) {
  return knex("park_facility")
    .truncate()
    .then(function() {
      return knex("park_facility").insert([
        { park_id: 1, facility_id: 4 },
        { park_id: 1, facility_id: 5 },
        { park_id: 1, facility_id: 6 },
        { park_id: 1, facility_id: 7 },
        { park_id: 1, facility_id: 9 },
        { park_id: 1, facility_id: 10 },
        { park_id: 2, facility_id: 2 },
        { park_id: 2, facility_id: 4 },
        { park_id: 2, facility_id: 5 },
        { park_id: 2, facility_id: 9 },
        { park_id: 2, facility_id: 10 },
        { park_id: 3, facility_id: 1 },
        { park_id: 3, facility_id: 2 },
        { park_id: 3, facility_id: 3 },
        { park_id: 3, facility_id: 4 },
        { park_id: 3, facility_id: 9 },
        { park_id: 3, facility_id: 5 }
      ]);
    });
};
