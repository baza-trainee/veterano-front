import { useState } from 'react';
import Button from './components/Button';
import CardInfo from './components/CardInfo';

function App() {
  const handleButtonClick = () => {
    console.log('Button clicked');
  };
  return (
    <div className="pt-10 pl-10 bg-slate-500 w-screen h-screen">
      <CardInfo
        imageSrc="../Photo.svg"
        title="Card Title"
        text="Короткий опис. Інформаційний блок з описом трьох зовнішніх проєктів. ороткий опис. Інформаційний блок з описом трьох зовнішніх проєктів."
        buttonText="Click me"
        onButtonClick={handleButtonClick}
      />
    </div>
  );
}

export default App;
