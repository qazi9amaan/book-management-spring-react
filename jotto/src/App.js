import { useEffect } from "react";
import { getSecretWord } from "./actions";
import GuessWords from "./components/GuessWords/GuessWords";
import Input from "./components/Input/Input";

function App() {
	useEffect(() => {
		getSecretWord();
	}, []);
	return (
		<div data-test="component-app">
			<h1>Jotto</h1>
			<Input success={false} secretWord={"party"} />
			<GuessWords guesses={[]} />
		</div>
	);
}

export default App;
