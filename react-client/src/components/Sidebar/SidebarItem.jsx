import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function SidebarItem({ name, url }) {
	return (
		<div
			data-test="component-side-bar-item"
			style={{
				borderRadius: "2.3rem",
				fontSize: "1.0rem",
				marginBottom: ".5rem",
			}}
			className="col">
			<Link
				to={url ? url : `/cat/${name}`}
				className="list-group-item d-flex 
				justify-content-between 
				align-items-center 
				list-group-item-action 
				py-3 px-4 bg-category fs-6 ">
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

SidebarItem.propType = {
	name: PropTypes.string.isRequired,
	url: PropTypes.string,
};

export default SidebarItem;
