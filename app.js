const express = require("express");
const bodyParser = require("body-parser");
const database = require("nedb");

const app = express();
const db = new database("database.db");
db.loadDatabase();

const StatusCodes = {
  USER_ALREADY_REGISTERED: "USER_ALREADY_REGISTERED",
  INVALID_NAME: "INVALID_NAME",
  INVALID_DOB: "INVALID_DOB",
  INVALID_EMAIL: "INVALID_EMAIL",
  INVALID_PASSWORD: "INVALID_PASSWORD",
};

//app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3100, () => {
  console.log("Listening at port 3100");
});

function checkUserExists(email) {
  return new Promise((resolve, reject) => {
    db.findOne({ email: email }, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

app.post("/create_user", async function (req, res) {
  const { user_name, email, password, dob } = req.body;

  // Check if the email is valid
  if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
    return res
      .status(400)
      .json({ result: false, code: StatusCodes.INVALID_EMAIL });
  }

  // Check if the user already exists
  const userExists = await checkUserExists(email);
  if (userExists) {
    return res
      .status(400)
      .json({ result: false, code: StatusCodes.USER_ALREADY_REGISTERED });
  }
  // Check if the username is valid
  if (
    typeof user_name !== "string" ||
    user_name.length < 5 ||
    user_name.length > 16
  ) {
    const userName = await checkUserExists(user_name);
    if (userName) {
      return res
        .status(400)
        .json({ result: false, code: StatusCodes.INVALID_NAME });
    }
  }

  // Check if the password is valid
  if (!/^(?=.*[A-Z])(?=.*\d.*\d)[A-Za-z\d]{5,16}$/.test(password)) {
    return res
      .status(400)
      .json({ result: false, code: StatusCodes.INVALID_PASSWORD });
  }

  // Check if the date of birth is valid
  const dobDate = new Date(dob);
  const now = new Date();
  const eighteenYearsAgo = new Date(
    now.getFullYear() - 18,
    now.getMonth(),
    now.getDate()
  );
  if (
    !(dobDate instanceof Date && !isNaN(dobDate) && dobDate <= eighteenYearsAgo)
  ) {
    return res
      .status(400)
      .json({ result: false, code: StatusCodes.INVALID_DOB });
  }

  // If all checks pass, create the user
  const newUser = { user_name, email, password, dob: dobDate };
  //console.log(newUser);
  db.insert(newUser);
  res.status(201).json({ result: true });
});

module.exports = app;
