const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
require("dotenv").config();

jest.setTimeout(10000);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("Signup should work", async () => {
  const res = await request(app)
    .post("/api/auth/signup")
    .send({
      name: "Test",
      email: `test${Date.now()}@test.com`,
      password: "123456"
    });

  console.log(res.body); // 👈 important

  expect(res.statusCode).toBe(201);
});

test("Login should fail with wrong password", async () => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "test@test.com",
      password: "wrong"
    });

  expect(res.statusCode).toBe(401);
});

test("Should not access dashboard without token", async () => {
  const res = await request(app)
    .get("/api/auth/dashboard");

  expect(res.statusCode).toBe(401);
});