const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isValidName, isValidPassword } = require("../validator/validations");



//=========user registration API ============>>>

const registerUser = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username)
      return res
        .status(400)
        .send({ status: false, message: "user name is required" });

    if (!isValidName(username.trim()))
      return res
        .status(400)
        .send({ status: false, message: "user name must be valid" });

    // password validation
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "Password is required" });

    if (!isValidPassword(password))
      return res.status(400).send({
        status: false,
        message:
          "Password should be between 8 and 15 character and it should be alpha numeric with a special symbol and 1 capital letter",
      });

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({ status: false, message: err.message });
      }

      db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hash],
        (err, result) => {
          if (err) {
            res.status(400).send({ status: false, message: err.message });
            return;
          }
          res.status(201).send({ status:true, message: "User registered", data: result });
        }
      );
    });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

//=========user login APIs ============>>>

const loginUser = (req, res) => {
  try {
    const { username, password } = req.body;
    // username validation
    if (!username)
      return res
        .status(400)
        .send({ status: false, message: "username is required" });

    //password validation
    if (!password) {
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    }
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, results) => {
        if (err) {
          res.status(500).send({ status: false, message: err.message });
          return;
        }
        if (results.length === 0) {
          res.status(401).send({ status: false, message: err.message });
          return;
        }
        const user = results[0];
        bcrypt.compare(password, user.password, (err, match) => {
          if (err || !match) {
            res
              .status(401)
              .send({ status: false, message: "Invalid username or password" });
            return;
          }
          const token = jwt.sign(
            { id: user.id, username: user.username },
            "secret",
            { expiresIn: "1h" }
          );
          res.send({ token });
        });
      }
    );
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { registerUser, loginUser };
