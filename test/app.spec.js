const request = require("supertest");
const app = require("../app");

// Please ensure the database.db file is empty before running test

describe("POST /create_user", () => {
  it("Adding a user with proper values", async () => {
    const res = await request(app).post("/create_user").send({
      user_name: "MichaelOsas",
      email: "michaelosas78@gmail.com",
      password: "Kundabox01",
      dob: "12/9/1996",
    });

    expect(res.status).toEqual(201);
  });

  it("Adding a user that’s already inserted into the DB.", async () => {
    // First, create a user with the email we want to test
    await request(app).post("/create_user").send({
      user_name: "joe",
      email: "joe@kundabox.com",
      password: "12ABCabc",
      dob: "01/01/2000",
    });

    // Then, try to create a user with the same email
    const res = await request(app).post("/create_user").send({
      user_name: "joe",
      email: "joe@kundabox.com",
      password: "12ABCabc",
      dob: "01/01/2000",
    });

    expect(res.status).toEqual(201);
  });

  it("Adding a user with non valid user_name", async () => {
    // First, create a user with the username we want to test
    await request(app).post("/create_user").send({
      user_name: "joe",
      email: "joeRogan@kundabox.com",
      password: "89ABCghabc",
      dob: "01/01/1996",
    });

    // Then, try to create a user with the same username
    const res = await request(app).post("/create_user").send({
      user_name: "joe",
      email: "joe@kundabox.com",
      password: "12ABCabc",
      dob: "01/01/2000",
    });

    expect(res.status).toEqual(201);
  });

  it("Adding a user with non valid dob", async () => {
    const res = await request(app).post("/create_user").send({
      user_name: "MichaelOsas",
      email: "michaelosas78@gmail.com",
      password: "Kundabox01",
      dob: "12/9/2008",
    });

    expect(res.status).toEqual(201);
  });
  it("Adding a user with non valid password", async () => {
    const res = await request(app).post("/create_user").send({
      user_name: "MichaelOsas",
      email: "michaelosas78@gmail.com",
      password: "Kundabox",
      dob: "12/9/1996",
    });
    expect(res.status).toEqual(201);
  });
});
