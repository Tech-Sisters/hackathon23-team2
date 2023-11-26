import { API_ENDPOINT } from "../../config"

export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN"
export const LOGIN_USER_STATUS = "LOGIN_USER_STATUS"

const baseEndpoint = API_ENDPOINT

export const getAccessToken = (userData, idToken) => {
  return async (dispatch) => {
    const options = {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      }
    }

    try {
      const response = await fetch(baseEndpoint + "/users/signup", options)
      if (response.ok) {
        const savedUser = await response.json()
        console.log("------savedUser", savedUser)

        localStorage.setItem("accessToken", idToken)
        // setting access token in the profile reducer
        dispatch({
          type: SET_ACCESS_TOKEN,
          payload: idToken
        })

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
