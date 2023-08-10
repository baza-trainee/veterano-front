import './App.css'
import Container from "./components/Container.tsx";
import Input from "./UIKit/Input.tsx";
import React, {ChangeEvent, useState} from "react";

interface ValueStateType {
  userName: string,
  password: string,
  email: string
}
function App() {

  const [ value, setValue] = useState<ValueStateType>({
    userName: "",
    password: "",
    email:""
  })

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  }
  const togglePasswordVisibility = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
  };

return (
  <>
    <Container>
      <Input
        id='password'
        type={passwordVisible ? 'text' : 'password'}
        name="password"
        value={value.password}
        minLength={5}
        required

        onChange={handleOnChange}
        onMouseDown={togglePasswordVisibility}
        passwordVisible={passwordVisible}
        label="Пароль"
        error="Help message"
      />
      <Input
        id='name'
        type="text"
        name="userName"
        disabled
        value={value.userName}
        minLength={5}
        required
        onChange={handleOnChange}
        label="Ім'я"
      />


    </Container>
  </>
)
}

export default App
