import './App.css'
import Container from "./components/Container.tsx";
import Input from "./UIKit/Input.tsx";
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

        <Input
        id='name'
        type="text"
        name="name"
        value={value.name}
        onChange={handleOnChange}
        label="Ім'я"
        error="Help message"
        minLength={2}
        required
      />

        <Input
          id='email'
          type="email"
          name="email"
          value={value.email}
          pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
          required
          onChange={handleOnChange}
          label="Email"
          error=''
        />
        <Input
          id='password'
          type="password"
          name="password"
          value={value.password}
          minLength={5}
          required
          onChange={handleOnChange}
          label="Пароль"
          error="Help message"
        />

    </Container>
  </>
)
}

export default App
