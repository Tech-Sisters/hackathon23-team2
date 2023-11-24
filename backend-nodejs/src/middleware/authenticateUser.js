import firebase from "../firebaseInit.cjs";

const authenticateUser = (req, res, next) => {
  const idToken = req.headers.authorization;

  if (!idToken) {
    return res.send({ message: "No token provided" }).status(401);
  }

  if (idToken && idToken.split(" ")[0] !== "Bearer") {
    res.send({ message: "Invalid token" }).status(401);
  }

  const token = idToken.split(" ")[1];
  firebase
    .auth()
    .verifyIdToken(token)
    .then(() => next())
    .catch(() => res.send({ message: "Could not authorize" }).status(403));
}


export default authenticateUser;