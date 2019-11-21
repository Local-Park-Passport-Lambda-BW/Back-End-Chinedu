exports.seed = function(knex) {
  return knex("user")
    .truncate()
    .then(function() {
      return knex("user").insert([
        {
          name: "mark",
          username: "marky",
          email: "mark@example.com",
          password: "1234"
        },
        {
          name: "brad",
          username: "brady",
          email: "brad@example.com",
          password: "1234"
        },
        {
          name: "ride",
          username: "ridey",
          email: "ride@example.com",
          password: "1234"
        },
        {
          name: "groot",
          username: "grooty",
          email: "groot@example.com",
          password: "1234"
        },
        {
          name: "josh",
          username: "joshy",
          email: "josh@example.com",
          password: "1234"
        }
      ]);
    });
};