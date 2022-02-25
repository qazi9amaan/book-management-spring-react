import { Link } from "react-router-dom";
import PropTypes from "prop-types";
function LinkComponent({ item }) {
	item.url && (
		<Link
			to={item.url ? item.url : ""}
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
				className="  list-group-item-action mb-2   ">
				<p style={{ opacity: 0.8 }} className="mb-0">
					{item.title}
				</p>
			</div>
		</Link>
	);

	item.clickListener && (
		<div
			onClick={item.clickListener}
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
				className="  list-group-item-action mb-2   ">
				<p style={{ opacity: 0.8 }} className="mb-0">
					{item.title}
				</p>
			</div>
		</div>
	);
}

LinkComponent.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string.isRequired,
		url: PropTypes.string,
		clickListener: PropTypes.func,
	}),
};

export default LinkComponent;
