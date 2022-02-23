import GuessWords from "./components/GuessWords/GuessWords";
import Congrats from "./components/Congrats/Congrats";

function App() {
	return (
		<div className="App">
			<h1>Jotto</h1>
			<Congrats success={false} />
			<GuessWords
				guesses={[
					{ guessedWord: "train", letterMatchCount: 3 },
				]}
			/>
		</div>
	);
}

export default App;
