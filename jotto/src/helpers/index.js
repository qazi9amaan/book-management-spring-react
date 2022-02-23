export const getLetterMatchCount = (
	guessWord,
	secretWord
) => {
	const secretLetters = secretWord.split("");
	const guessedLetterSet = new Set(guessWord);

	let count = 0;

	guessedLetterSet.forEach((element) => {
		if (secretLetters.includes(element)) {
			count++;
		}
	});

	return count;
};
