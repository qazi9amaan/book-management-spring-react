import GuessWords from "./components/GuessWords/GuessWords";
import Input from "./components/Input/Input";

function App() {
	return (
		<div data-test="component-app">
			<h1>Jotto</h1>
			<Input success={false} secretWord={"aa"} />
			<GuessWords
				guesses={[
					{ guessedWord: "train", letterMatchCount: 3 },
				]}
			/>
		</div>
	);
}

export default App;
