import request from "supertest";
import { app, server } from "../src/index";
import {connectionTest} from "../src/config/config";
import { Pokedb } from "../src/models";

let t: any;
beforeAll(async () => {
  await connectionTest.sync();
});

afterAll(async () => {
  server.close()
})

beforeEach(async () => {
  t = await connectionTest.transaction();
});

afterEach(async () => {
  // await Pokedb.drop();
  await t.rollback();
});

describe("post pokemon", () => {
  test("It should respond with a 200 status code", async () => {
    const response = await request(app).post("/pokedb/add").send({
      "id_poke": "6",
      "name": "charizard",
      "exp": "50",
      "expMax": "50",
      "lvl": "1",
      "user_id":"2"
    });
    expect(response.statusCode).toBe(201);
  });
});

describe("update pokemon", () => {
  test("It should respond with a 200 status code", async () => {
    const response = await request(app).put("/pokedb/update/6&2").send({
      "lvl" : "42"
    });
    expect(response.statusCode).toBe(200);
  });
});

describe("Get all pokemon", () => {
  test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/pokedb/getAll");
    expect(response.statusCode).toBe(200);
  });
});

describe("get pokemon by id", () => {
  test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/pokedb/get/6&2");
    expect(response.statusCode).toBe(200);
  });
});
