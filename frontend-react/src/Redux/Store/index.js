import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import localStorage from "redux-persist/es/storage"
import profileReducer from "../Reducers/profileReducer"

// const userReducer = combineReducers({
//   currentUser: profileReducer
// })

// const persistConfig = {
//   key: "root",
//   storage: localStorage,
//   whitelist: ["currentUser", "accessToken"]
// }

// const persistedReducer = persistReducer(persistConfig, userReducer)

// export const store = configureStore({
//   reducer: persistedReducer,

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false
//     })
// })

// export const persistor = persistStore(store)
