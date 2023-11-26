import { API_ENDPOINT } from "../../config"

export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN"
export const LOGIN_USER_STATUS = "LOGIN_USER_STATUS"

const baseEndpoint = API_ENDPOINT

export const getAccessToken = (loggingInAuthor) => {
  console.log(baseEndpoint)
  return async (dispatch) => {
    const options = {
      method: "POST",
      body: JSON.stringify(loggingInAuthor),
      headers: {
        "Content-Type": "application/json"
      }
    }
    console.log("options", options)
    try {
      console.log("---------inside the getAccessToken action----------")
      const response = await fetch(baseEndpoint + "/users/login", options)
      if (response.ok) {
        const tokens = await response.json()
        const accessToken = await tokens.accessToken

        if (accessToken) {
          console.log("---------access token created----------")
          dispatch({
            type: SET_ACCESS_TOKEN,
            payload: accessToken
          })
          localStorage.setItem("accessToken", accessToken)
          try {
            const opts = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken
              }
            }
            const userResponse = await fetch(baseEndpoint + "/users/me", opts)
            if (userResponse.ok) {
              // action for when the user is
              console.log("-------successfully got the user")
            } else {
              console.log("error getting the user")
            }
          } catch (error) {
            console.log("error in trycatch", error)
          }
        } else {
          console.log("access token not created")
        }
      } else {
        const errorResponse = await response.json()
        console.log("error logging in user", errorResponse.message)
        dispatch({
          type: LOGIN_USER_STATUS,
          payload: { status: "fail", message: errorResponse.message }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
