import React from "react";
import PropTypes from "prop-types";
// recieve sucess state as prop
const Congrats = ({ success }) => {
	return (
		<div data-test="component-congrats">
			{success && (
				<span data-test="congrats-message">
					Hurayyy!!!! you've guessed the word.
				</span>
			)}
		</div>
	);
};

Congrats.propTypes = {
	success: PropTypes.bool.isRequired,
};

export default Congrats;
