# User Registration API

This is a simple API for registering users using Node.js, Express.js, and NeDB (a lightweight NoSQL database).

## Requirements

- Node.js 12 or later
- NeDB

## Installation

1. Clone the repository with ` git clone https://github.com/Michael-Seth/Kunda-Box-Test-1 `
2. Install dependencies with `npm install`.

## Usage

- Run the server with `nodemon app`.
  The server will start on port 3100.

NOTE: You can test the API with postman or any other testing tool of your choice

### POST /create_user

Creates a new user with the given data. Returns a JSON object containing the user's ID.

#### Request Body

- `user_name` (string, required): the user's name
- `email` (string, required): the user's email address
- `password` (string, required): the user's password (must be at least 8 characters)
- `dob` (string, required): the user's date of birth (in the format "MM/DD/YYYY")

#### Responses

Returns a JSON object `{result: true}` if the user was created successfully. Otherwise, returns a JSON object with the following structure:

```
{
  "result": false,
  "code": "string (one of the error codes below)"
}

```

The possible error codes are:

` USER_ALREADY_REGISTERED` : The user with the provided email already exists.
` INVALID_NAME` : The user name provided is either not a string or is not between 5 and 16 characters long, or is already taken.
` INVALID_DOB` : The date of birth provided is not valid (not a date, in the future, or less than 18 years ago).
` INVALID_EMAIL` : The email provided is not valid (not in the format of an email address).
` INVALID_PASSWORD` : The password provided is not valid (not between 5 and 16 characters long, doesn't contain at least two digits and one uppercase letter).

- 201: User created successfully. Returns a JSON object with the user's ID.
- 400: Bad request. Returned if any of the required fields are missing or invalid, or if the user already exists in the database.

## Tests

To run the tests, use `npm test`. The tests use Jest and Supertest.

This will run a suite of tests using Jest and Supertest. The tests will ensure that the API behaves as expected and will check that all error codes are returned correctly.

Note: Before running the tests, please ensure that the database.db file is empty.
