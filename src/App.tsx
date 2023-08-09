import './App.css'
import Container from "./components/Container.tsx";
import Input2 from "./UIKit/Input2.tsx";
import {ChangeEvent, useState} from "react";

function App() {

  const [ value, setValue] = useState<string | undefined>('')
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log(e.target.value);
  }

return (
  <>
    <Container>
      {/*<Input type="text" label="Ім'я" id={"Ім'я"}/>*/}
      <Input2
        id='name'
        type="text"
        name="Ім'я"
        value={value}
        onChange={handleOnChange}
        label="Ім'я"


      />
    </Container>
  </>
)
}

export default App
