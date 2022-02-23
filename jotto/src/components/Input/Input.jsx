import React, { useState } from "react";
import PropTypes from "prop-types";
import Congrats from "../Congrats/Congrats";

const Input = ({ secretWord, success }) => {
	const [currentGuess, setCurrentGuess] = useState("");
	const onChangeHandler = (e) => {
		setCurrentGuess(e.target.value);
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		setCurrentGuess("");
	};

	return (
		<div data-test="component-input">
			{!success && (
				<form method="post" onSubmit={onSubmitHandler}>
					<input
						data-test="input-box"
						placeholder="Enter guess"
						value={currentGuess}
						onChange={onChangeHandler}
					/>
					<input
						type="submit"
						data-test="input-button"
						onClick={onSubmitHandler}
						value="Submit"
					/>
				</form>
			)}

			{success && <Congrats success={success} />}
		</div>
	);
};

Input.propTypes = {
	secretWord: PropTypes.string.isRequired,
	success: PropTypes.bool.isRequired,
};
export default Input;
