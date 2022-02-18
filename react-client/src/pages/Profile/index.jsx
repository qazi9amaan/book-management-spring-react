import React from "react";
import { useDispatch } from "react-redux";
import {
	Link,
	Outlet,
	useNavigate,
} from "react-router-dom";
import Navbar from "../../components/Navbar";
import { clearAuth } from "../../store/slices/userSlice";

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
						<div
							onClick={logout}
							style={{
								cursor: "pointer",
								textDecoration: "none",
								borderRadius: "3rem",
								fontSize: "1.2rem",
								fontWeight: "500",
							}}>
							<div
								style={{
									cursor: "pointer",
									textDecoration: "none",
									borderRadius: "3rem",
									fontSize: "1.2rem",
									fontWeight: "500",
									padding: ".9rem 1.3rem",
								}}
								className="alert-success  list-group-item-action mb-2   ">
								<p
									style={{ opacity: 0.8 }}
									className="mb-0">
									Logout
								</p>
							</div>
						</div>
					</div>
					<div className="col">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

function LinkComponent({ item }) {
	return (
		<Link
			to={item.url}
			style={{
				cursor: "pointer",
				textDecoration: "none",
				borderRadius: "3rem",
				fontSize: "1.2rem",
				fontWeight: "500",
			}}>
			<div
				style={{
					cursor: "pointer",
					textDecoration: "none",
					borderRadius: "3rem",
					fontSize: "1.2rem",
					fontWeight: "500",
					padding: ".9rem 1.3rem",
				}}
				className="alert-success  list-group-item-action mb-2   ">
				<p style={{ opacity: 0.8 }} className="mb-0">
					{item.title}
				</p>
			</div>
		</Link>
	);
}
export default Profile;
