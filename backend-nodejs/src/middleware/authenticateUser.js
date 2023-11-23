import auth from "../firebaseInit.cjs";

const authenticateUser = (req, res, next) => {
  const idToken = req.headers.authorization;

  auth.verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken; // Store user information in the request object if needed
      next(); // Proceed to the next middleware or route handler
    })
    .catch((error) => {
      console.error('Authentication failed:', error);
      res.status(401).send('Unauthorized'); // Respond with an unauthorized status
    });
};

export default authenticateUser;