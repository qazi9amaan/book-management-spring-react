import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slices/locationSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
	reducer: {
		location: locationReducer,
		user: userReducer,
	},
});
