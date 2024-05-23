const db = require('./db');
const app = require("../server");
const supertest = require("supertest");

const request = supertest(app);

beforeAll(async () => {
  await db.migrate.latest()

})

it('Testando registro válido', function (done) {

});

afterAll(async () => {
  await db.destroy();
})
