import { SET_ACCESS_TOKEN, LOGIN_USER_STATUS, REMOVE_ACCESS_TOKEN } from "../Actions/userActions"

const initialState = {
  accessToken: null,
  loginStatus: null
}
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload
      }
    case LOGIN_USER_STATUS:
      return {
        ...state,
        loginStatus: action.payload
      }
    case REMOVE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: null
      }

    default:
      return state
  }
}

export default profileReducer
