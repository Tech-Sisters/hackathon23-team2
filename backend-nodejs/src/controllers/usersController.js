import UsersModel from "../models/User.js"

const UserController = {
  createUser: async (req, res, next) => {
    try {
      const { username, email, auth_id } = req.body
      console.log("req.body", req.body)

      const existingUsername = await UsersModel.findOne({ username })
      if (existingUsername) {
        return res.status(400).send({ message: "user with this username already exists" })
      }

      const newUser = new UsersModel(req.body)
      const savedUser = await newUser.save()

      res.status(201).send(savedUser)
    } catch (error) {
      next(error)
    }
  },

  getUser: async (req, res, next) => {
    try {
      const { auth_id } = req.query // Get auth_id from query parameters
      console.log("Query Parameters For Getting User", req.query)

      if (!auth_id) {
        return res.status(400).send({ message: "auth_id is required" })
      }

      const user = await UsersModel.findOne({ auth_id })
      if (!user) {
        return res.status(404).send({ message: "User not found" })
      }

      res.status(200).send(user)
    } catch (error) {
      next(error)
    }
  }


}

export default UserController;