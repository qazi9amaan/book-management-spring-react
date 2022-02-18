import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../service/CategoryService";
import { BiChevronRight } from "react-icons/bi";

function SidebarItem({ name }) {
	return (
		<div
			style={{
				borderRadius: "2.3rem",
				fontSize: "1.0rem",
				marginBottom: ".5rem",
			}}
			className="col-md-12">
			<Link
				to={`/cat/${name}`}
				className="list-group-item d-flex justify-content-between align-items-center list-group-item-action py-3 px-4 bg-category fs-6 ">
				{name}
				<span>
					<BiChevronRight
						style={{ fontSize: "23px", opacity: 0.6 }}
					/>
				</span>
			</Link>
		</div>
	);
}

function Sidebar() {
	const [categories, setcategories] = useState([]);

	useEffect(() => {
		CategoryService.getAllCategories().then((res) => {
			setcategories(res.data);
		});
	}, []);

	return (
		<aside
			style={{
				overflowY: "scroll",
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
			<div className="row px-3 list-group h-100 ">
				<div
					style={{
						borderRadius: "2.3rem",
						fontSize: "1.0rem",
						marginBottom: ".5rem",
					}}
					className="col-md-12">
					<Link
						to={`/`}
						className="list-group-item d-flex justify-content-between align-items-center list-group-item-action py-3 px-4 bg-category fs-6 ">
						All Books
						<span>
							<BiChevronRight
								style={{ fontSize: "23px", opacity: 0.6 }}
							/>
						</span>
					</Link>
				</div>
				{categories.map((category) => (
					<SidebarItem
						name={category.name}
						key={category.id}
					/>
				))}
			</div>
		</aside>
	);
}

export default Sidebar;
