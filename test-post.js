//set a reference to the request module
var request = require("request")
  //stubs

//create an object to send as POST data
const insert_user = {
	user_name: "testuser",
	email: "test@example.com",
	password: "Test12345",
	dob: "01/01/2000",
  };

//the config for our HTTP POST request
postConfig = {
  url: "http://localhost:3000/create_user",
  body: insert_user,
  json: true,
};

//the HTTP POST request success handler
postSuccessHandler = function (err, httpResponse, body) {
  //look for this message in your JS console:
  console.log("JSON response from the server: " + body);
};

//make the POST request
request.post(postConfig, postSuccessHandler);
