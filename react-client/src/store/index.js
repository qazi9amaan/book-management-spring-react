import {
	combineReducers,
	configureStore,
	createStore,
} from "@reduxjs/toolkit";
import locationReducer from "./slices/locationSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
	reducer: {
		location: locationReducer,
		user: userReducer,
	},
});

export const createTestStore = () => {
	const store = createStore(
		combineReducers({
			location: locationReducer,
			user: userReducer,
		})
	);
	return store;
};
