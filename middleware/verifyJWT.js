import jwt from "jsonwebtoken";

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!authHeader) {
    return res.status(401).send({ message: "access token not found" });
  }
  jwt.verify(token, process.env.ACCESS_SECRET, function (err, decoded) {
    if (err) {
      return res
        .status(403)
        .send({ message: "forbidden access from middleware" });
    }
    req.decoded = decoded;
    next();
  });
}

export default verifyJWT;
