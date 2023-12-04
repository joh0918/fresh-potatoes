const jwt = require("jsonwebtoken"); // Fixed the quotation mark

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ msg: "No auth token, access denied" });
    }
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) {
      return res.status(401).json({ msg: "Token verification failed, authorization denied" });
    }
    // Since the token was made out of the document id
    req.user = verified.id; // Fixed "reg.user" to "req.user"
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;