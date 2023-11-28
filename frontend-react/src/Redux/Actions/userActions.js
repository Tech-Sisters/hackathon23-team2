import { API_ENDPOINT } from "../../config"

export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN"
export const LOGIN_USER_STATUS = "LOGIN_USER_STATUS"
export const REMOVE_ACCESS_TOKEN = "REMOVE_ACCESS_TOKEN"

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

        localStorage.setItem("accessToken", idToken)
        console.log("setting new access token")
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

export const loginFirebaseUser = (idToken, firebaseUid) => {
  return async (dispatch) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      }
    }
    //   users?auth_id=EySA1GZ88PVLbKrgTuyD12quXUn1
    try {
      const response = await fetch(baseEndpoint + `/users?auth_id=${firebaseUid}`, options)
      if (response.ok) {
        const user = await response.json()

        localStorage.setItem("accessToken", idToken)
        console.log("setting new access token")
        // setting access token in the profile reducer
        dispatch({
          type: SET_ACCESS_TOKEN,
          payload: idToken
        })

        return user
      } else {
        const errorResponse = await response.json()
        console.log("error logging in user", errorResponse.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeAccessToken = () => {
  return async (dispatch) => {
    try {
      // Remove the access token from local storage
      localStorage.removeItem("accessToken")
      dispatch({
        type: REMOVE_ACCESS_TOKEN
      })
    } catch (error) {
      console.log("error removing access tokens")
    }
  }
}
