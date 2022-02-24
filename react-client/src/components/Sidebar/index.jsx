import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../service/CategoryService";
import { BiChevronRight } from "react-icons/bi";
import SidebarItem from "./SidebarItem";

function Sidebar() {
	const [categories, setcategories] = useState([]);

	useEffect(() => {
		CategoryService.getAllCategories().then((res) => {
			setcategories(res.data);
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
				<div>
					<SidebarItem name="All Books" url="/" />

					{categories.map((category) => (
						<SidebarItem
							name={category.name}
							key={category.id}
						/>
					))}
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;
