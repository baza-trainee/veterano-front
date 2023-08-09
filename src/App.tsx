import './App.css'
import Container from "./components/Container.tsx";
import Input2 from "./UIKit/Input2.tsx";
import {ChangeEvent, useState} from "react";

interface ValueStateType {
  name: string,
  password: string,
  email: string
}
function App() {

  const [ value, setValue] = useState<ValueStateType>({
    name: "",
    password: "",
    email:""
  })
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  }

return (
  <>
    <Container>
      <Input2
        id='name'
        type="text"
        name="name"
        value={value.name}
        required
        onChange={handleOnChange}
        label="Ім'я"
      />
      <Input2
        id='lastName'
        type="email"
        name="email"
        value={value.email}
        disabled
        required
        onChange={handleOnChange}
        label="Email"
      />
      <Input2
        id='password'
        type="password"
        name="password"
        value={value.password}
        required
        onChange={handleOnChange}
        label="Пароль"
      />

    </Container>
  </>
)
}

export default App
