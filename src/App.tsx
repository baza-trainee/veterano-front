import './App.css'
import Container from "./components/Container.tsx";
import Input from "./UIKit/Input.tsx";

function App() {


  return (
    <>
      <Container>
        <Input type="text" placeholder="Iм'я" label="Ім'я"/>
        <Input type="text" placeholder="Прізвище" label="Прізвище"/>
      </Container>
    </>
  )
}

export default App
