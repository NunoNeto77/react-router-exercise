const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const users = require("./../data").userDB;
const cors = require("cors");
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt");
// const { createSecretKey } = require("crypto");
const jwt = require("jsonwebtoken");
//const users = [];

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true,
}));


const SECRET = "RENATO"

app.use(cookieParser());

// headers
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin: *");
  res.header("Access-Control-Allow-Credentials: true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})


function printList() {
  console.log("User List: ");
  for (let i = 0; i < users.length; i++) {
    console.log(
      "id: " +
        users[i].id +
        "\nemail: " +
        users[i].email +
        "\nusername: " +
        users[i].username
    );
  }
}

// REGISTER

app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    let foundUser = users.find((data) => req.body.email === data.email);
   
    if (!foundUser) {
      let hashPassword = await bcrypt.hash(password, 10);

      console.log(hashPassword);

      let newUser = {
        id: Date.now(),
        username: username,
        email: email,
        password: hashPassword,
      };

      users.push(newUser);
      printList();

      res.status(200).send({ message: "Registration successful" });
    } else {
      res.status(200).send({ message: "Email already used" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Registration successful" });
  }
});

// LOGIN

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let foundUser = users.find((data) => req.body.email === data.email);
    if (foundUser) {
      let submittedPass = req.body.password;
      let storedPass = foundUser.password;

      const passwordMatch = await bcrypt.compare(submittedPass, storedPass);

      if (passwordMatch) {
        let usrname = foundUser.username;
      
        res.cookie("token", generateAccessToken(req.body));

        res.status(200).send({ message: `Hello ${usrname}` });
        
      } else {
     
        res.status(400).send({ message: "Invalid email or password" });

      }
    } else {
       
        res.status(400).send({ message: "Invalid email or password" });

    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
  
});


function generateAccessToken(user) {
  return jwt.sign(user, SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });
}



app.get("/checkToken", async (req, res) => {
    const token = req.cookies.token;

    if (token == null) return res.json({error: true, message: "no token provided"});

    await jwt.verify(token, SECRET, function (err, decoded) {
        let foundUser = users.find( (data) => decoded.email === data.email);

        if (err) return res.status(500).send({error: true, message: 'Failed to authenticate token.'});
        if (foundUser) return res.status(200).send({error: false, message: decoded.email})
        return res.status(500).send({error: true, message: 'Failed to authenticate token.'});
    });
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});