import React from "react";
import { BsArrowRight } from "react-icons/bs";
import PropTypes from "prop-types";
function CategoryCrumb({ category }) {
	return (
		<nav
			aria-label="breadcrumb"
			className="row py-3 border-bottom mb-3">
			<div className="col-md-12 d-flex align-items-center">
				<div
					style={{ borderRadius: "2rem" }}
					className="alert-success font-weight-bold  py-2 px-4 ">
					{category ? category : "All books"}
				</div>
				<BsArrowRight
					className="mx-4"
					style={{ fontSize: "1.8rem" }}
				/>
				<p className="h6 ">Showing all Result(s)</p>
			</div>
		</nav>
	);
}

CategoryCrumb.propTypes = {
	category: PropTypes.string,
};

export default CategoryCrumb;
