import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter,
	Route,
	Navigate,
	Outlet,
	Routes,
	useLocation,
} from "react-router-dom";
import Profileaddress from "./components/Profile/ProfileAddress";
import Profilecart from "./components/Profile/ProfileCart";
import Profileorders from "./components/Profile/ProfileOrders";
import Authuser from "./pages/AuthUser";
import CheckOutWrapper from "./pages/Checkout";
import AddAddress from "./pages/Checkout/Steps/Address/AddAddress";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile";
import { setLocation } from "./store/slices/locationSlice";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route>
					<Route path="/" element={<Home />} />
					<Route path="/cat/:category" element={<Home />} />
					<Route path="cart" element={<Profilecart />} />

					<Route path="/auth" element={<Authuser />} />
					<Route element={<ProtectedRoute />}>
						<Route
							path="/checkout"
							element={<CheckOutWrapper />}
						/>
						<Route path="/profile" element={<Profile />}>
							<Route path="" element={<Profileorders />} />
							<Route
								path="address"
								element={<Profileaddress />}
							/>
						</Route>
						<Route
							path="/address/add"
							element={<AddAddress />}
						/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

const ProtectedRoute = () => {
	const auth = useSelector((state) => state.user.auth);
	const location = useLocation();
	const dispatch = useDispatch();
	!auth && dispatch(setLocation(location));
	return !auth ? (
		<Navigate to="/auth" state={{ from: location }} />
	) : (
		<Outlet />
	);
};

export default App;
