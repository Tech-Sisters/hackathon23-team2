import firebase from "../firebaseInit.cjs"

const authenticateUser = (req, res, next) => {
  const idToken = req.headers.authorization

  if (!idToken) {
    return res.status(401).send({ message: "No token provided" })
  }

  if (idToken && idToken.split(" ")[0] !== "Bearer") {
    return res.status(401).send({ message: "Invalid token" })
  }

  const token = idToken.split(" ")[1]
  firebase
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken
      // Proceed to the next middleware or route handler

      next()
    })
    .catch((error) => {
      console.error("Error verifying token:", error)
      return res.status(403).send({ message: "Could not authorize" })
    })
}

export default authenticateUser
