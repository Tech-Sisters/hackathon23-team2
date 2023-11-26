import { API_ENDPOINT } from "../../config"

export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN"
export const LOGIN_USER_STATUS = "LOGIN_USER_STATUS"

const baseEndpoint = API_ENDPOINT

// export const getAccessToken = (userData, idToken) => {
//   console.log(baseEndpoint)
//   console.log("userdata", userData)
//   console.log("idToken", idToken)
//   const options = {
//     method: "POST",
//     body: JSON.stringify(userData),
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: idToken
//     }
//   }
//   console.log("options", options)
//   try {
//     return async (dispatch) => {
//         console.log("---------inside the getAccessToken action----------")
//         const response = await fetch(baseEndpoint + "/users/signup", options)
//         if(){
//             const tokens = await response.json()
//         console.log("------tokens", tokens)
//         const accessToken = await tokens.accessToken
//         }
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

export const getAccessToken = (userData, idToken) => {
  console.log(baseEndpoint)
  return async (dispatch) => {
    console.log("--before options")
    const options = {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      }
    }
    console.log("options", options)
    try {
      console.log("---------inside the getUseraction----------")
      const response = await fetch(baseEndpoint + "/users/signup", options)
      if (response.ok) {
        const savedUser = await response.json()
        console.log("------savedUser", savedUser)
        localStorage.setItem("accessToken", idToken)
        console.log("set the idToken as accessToken")
        return savedUser
      } else {
        const errorResponse = await response.json()
        console.log("error creating user", errorResponse.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
