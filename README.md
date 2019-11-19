Endpoints
1. registration: POST "http://localhost:4500/api/parks/register"
2. login: POST "http://localhost:4500/api/parks/login"
3. get all parks: GET "http://localhost:4500/api/parks"
4. add a park: POST "http://localhost:4500/api/parks/register"
5. registration: "http://localhost:4500/api/parks/register"

On new clone/download
1. npm install
2. npm run server OR npm start

On a pull from github
1. npx knex migrate:rollback
2. delete auth.db3 from database folder
3. npx knex migrate:latest