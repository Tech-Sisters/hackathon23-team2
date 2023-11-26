import firebase from "../firebaseInit.cjs";

const authenticateUser = (req, res, next) => {
  const idToken = req.headers.authorization;


  if (!idToken) {
    return res.send({ message: "No token provided" }).status(401);
  }

  if (idToken && idToken.split(" ")[0] !== "Bearer") {
    return res.send({ message: "Invalid token" }).status(401);
  }

  const token = idToken.split(" ")[1];
  firebase
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      // Proceed to the next middleware or route handler
      next();
    })
    .catch((error) => {
      console.error("Error verifying token:", error);
      return res.status(403).send({ message: "Could not authorize" });
    });
};

export default authenticateUser;