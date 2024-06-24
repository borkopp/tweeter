import jwt from "jsonwebtoken";

const { TOKEN_SECRET = "secret", TOKEN_EXPIRES = "3600" } = process.env;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRES }, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export default authenticateToken;
