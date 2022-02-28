import React, { useState } from "react";
import CategoryService from "../../service/CategoryService";
import SidebarItem from "./SidebarItem";

function Sidebar() {
	const [sidebarSate, setSideBarState] = React.useState({
		categories: [],
		isLoading: true,
		error: null,
	});

	const { categories, isLoading, error } = sidebarSate;

	const setCategories = (categories) => {
		setSideBarState({
			...sidebarSate,
			categories,
			isLoading: false,
		});
	};

	React.useEffect(() => {
		CategoryService.getAllCategories()
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err) => {
				console.log("Error occured in Sidebar");
				setSideBarState({
					...sidebarSate,
					error: err.message,
					isLoading: false,
				});
			});
	}, []);

	return (
		<aside
			data-test="component-side-bar"
			style={{
				overflowY: "scroll",
				paddingBottom: "2rem",
				height: "89vh",
				background: "#f9f9f9a6",
			}}
			className="col-md-3 border px-0">
			<h4 className="h5 text-muted py-4 px-3 mb-3 border-bottom">
				Categories
			</h4>
			<p className="w-75 px-4 fs-6 text-muted">
				A curated list of every book ever written
			</p>

			<div className=" px-2  ">
				{isLoading ? (
					// isLoading
					<div
						data-test="loading-spinner"
						className="text-center">
						<div
							className="spinner-border text-primary"
							role="status"></div>
					</div>
				) : error ? (
					// showError
					<div
						data-test="error-message"
						className="text-center">
						<div
							className="alert alert-danger"
							role="alert">
							{error}
						</div>
					</div>
				) : (
					<div>
						<SidebarItem name="All Books" url="/" />
						{categories.map((category) => (
							<SidebarItem
								name={category.name}
								key={category.id}
							/>
						))}
					</div>
				)}
			</div>
		</aside>
	);
}

export default Sidebar;
