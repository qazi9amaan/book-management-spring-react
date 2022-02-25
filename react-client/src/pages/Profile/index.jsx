import React from "react";
import { useDispatch } from "react-redux";
import {
	Link,
	Outlet,
	useNavigate,
} from "react-router-dom";
import Navbar from "../../components/Navbar";
import { clearAuth } from "../../store/slices/userSlice";
import LinkComponent from "./ProfileSideLink/LinkComponent";

const config = [
	{
		title: "All orders",
		url: "/profile",
	},
	{
		title: "All Address",
		url: "/profile/address",
	},
	{
		title: "Settings",
		url: "/profile",
	},
];

const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem("auth");
		localStorage.removeItem("token");
		dispatch(clearAuth());
		navigate("/");
	};
	return (
		<>
			<Navbar />
			<div className="container  ">
				<div className="row mt-5  align-items-start">
					<div className="col-md-3   ">
						{config.map((item, index) => (
							<LinkComponent key={index} item={item} />
						))}
						<LinkComponent
							item={{
								title: "Logout",
								clickListener: logout,
							}}
						/>
					</div>
					<div className="col">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
