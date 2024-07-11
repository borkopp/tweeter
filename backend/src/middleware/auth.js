import jwt from "jsonwebtoken";

const { TOKEN_SECRET = "secret", TOKEN_EXPIRES = "3600" } = process.env;

/**
 * Middleware function that authenticates a request using a JWT token.
 *
 * This middleware function is responsible for verifying the JWT token sent in the
 * `Authorization` header of the request. If the token is valid, the middleware
 * will attach the decoded user information to the `req.user` object, allowing
 * subsequent middleware functions to access the authenticated user data.
 *
 * If the token is missing or invalid, the middleware will return a 401 or 403
 * status code, respectively, to the client.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the chain.
 */
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
