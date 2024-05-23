const db = require('./db');
const app = require("../server");
const supertest = require("supertest");

const request = supertest(app);

beforeAll(async () => {
  await db.migrate.latest()

})



afterAll(async () => {
  await db.destroy();
})
