import { ChangeEvent, useState } from "react";
import "./App.css";
import FilterButton from "./components/FilterButton/FilterButton";

function App() {
	const [selectedOption, setSelectedOption] = useState("");

	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(event.target.value);
	};
	return (
		<>
			<fieldset>
				<h2>Виберіть опцію:</h2>
				<FilterButton
					id={"1"}
					value="test"
					checked={selectedOption === "test"}
					onChange={handleOptionChange}
					label={"test"}
				/>

				<br />
				<FilterButton
					id={"2"}
					value="test1"
					checked={selectedOption === "test1"}
					onChange={handleOptionChange}
					label={"test"}
				/>
				<br />
				<FilterButton
					id={"3"}
					value="test2"
					checked={selectedOption === "test2"}
					onChange={handleOptionChange}
					label={"test"}
				/>
				<br />
				<p>Вибрана опція: {selectedOption}</p>
			</fieldset>
		</>
	);
}

export default App;
