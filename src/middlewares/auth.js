const jwt = require("jsonwebtoken");


//=========authentication ============>>>

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authentication;
    if (!token) {
      return res
        .status(400)
        .send({ status: false, message: "Token is missing." });
    }
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res
          .status(401)
          .send({ status: false, message: "authentication failed." });
        return;
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { authMiddleware };
