import React from "react";

// recieve sucess state as prop
export default function Congrats({ success }) {
	return (
		<div data-test="component-congrats">
			{success && (
				<span data-test="congrats-message">
					Hurayyy!!!! you've guessed the word.
				</span>
			)}
		</div>
	);
}
