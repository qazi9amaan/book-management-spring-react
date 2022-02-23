import React from "react";
import PropTypes from "prop-types";

const GuessWords = ({ guesses }) => {
	return (
		<div data-test="component-guess-words">
			{guesses.length === 0 && (
				<div data-test="guess-instructions">
					Guess the words to play the game!
				</div>
			)}
		</div>
	);
};

GuessWords.propTypes = {
	guesses: PropTypes.arrayOf(
		PropTypes.shape({
			guessedWord: PropTypes.string.isRequired,
			letterMatchCount: PropTypes.number.isRequired,
		})
	).isRequired,
};
export default GuessWords;
