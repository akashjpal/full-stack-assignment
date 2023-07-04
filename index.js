const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

app.get('/signup',function(req,res){
  res.sendFile(__dirname+"/public/signup.html");
})
app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  var username = req.body.username;
  var password = req.body.password;
  console.log(username+" "+password);

  const exist = USERS.filter((username) => username === username);
  if(exist.length > 0){
    console.log("User already exists");
    res.write("User already exists");
    res.send();
    return;
  }
  else{
    USERS.push({username:username,password:password});
  }
  console.log(USERS);
 
  if(res.statusCode === 200){
    console.log("User created successfully"+res.statusCode);
    console.log(res.statusCode);
    res.redirect("/login");
  }
  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
})

app.get('/login',function(req,res){
  res.sendFile(__dirname+"/public/login.html");
})

app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  var username = req.body.username;
  var password = req.body.password;
  var confirm_password = req.body.password2;

  const user = USERS.filter((user) => user.username === username);
  if(user.length === 0){
    console.log("User does not exist");
    res.write("User does not exist");
    res.status(401).send();
    return;
  }
  console.log(password+" "+confirm_password)
  if(password !== confirm_password){
    console.log("Password does not match");
    res.write("Password does not match");
    res.status(200).send();
    return;
  }

  const token =   Math.random().toString(36).substring(2, 15);
  // res.write(token);
  // res.write("Login successful");
  // res.end();
  res.status(200).redirect("/"+token); // to redirect with dynamic content use this type of route

  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same


  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
})


app.get('/:token', function(req, res) {
  console.log(req.params.token);
  res.write("Akash is Cool!");
  res.write("Your token is "+req.params.token);
  res.send();
})


app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  res.send("Hello World from route 3!")
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  res.send("Hello World from route 4!")
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
  res.send("Hello World from route 4!")
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})