import './App.css'
import Carousel from "./components/Carousel/Carousel.tsx";


const items = [
  {
    title: 'Проект 1',
    description: 'Короткий опис. Інформаційний блок з описом трьох зовнішніх проєктів. Rороткий опис. Інформаційний блок з описом трьох зовнішніх проєктів.',
    image: 'https://plus.unsplash.com/premium_photo-1664302321879-3a65c22f4578?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    title: 'Проект 2',
    description: 'Короткий опис. Інформаційний блок з описом трьох зовнішніх проєктів. Rороткий опис. Інформаційний блок з описом трьох зовнішніх проєктів.',
    image: 'https://plus.unsplash.com/premium_photo-1661505310352-f5f2b089d0a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    title: 'Проект 3',
    description: 'Короткий опис. Інформаційний блок з описом трьох зовнішніх проєктів. Rороткий опис. Інформаційний блок з описом трьох зовнішніх проєктів.',
    image: 'https://images.unsplash.com/photo-1604158641245-2eca8c0f9365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    title: 'Проект 4',
    description: 'Короткий опис. Інформаційний блок з описом трьох зовнішніх проєктів. Rороткий опис. Інформаційний блок з описом трьох зовнішніх проєктів.',
    image: 'https://images.unsplash.com/photo-1511989130945-c2b632959395?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    title: 'Проект 5',
    description: 'Короткий опис. Інформаційний блок з описом трьох зовнішніх проєктів. Rороткий опис. Інформаційний блок з описом трьох зовнішніх проєктів.',
    image: 'https://images.unsplash.com/photo-1601579859386-2bb026c0a2e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    title: 'Проект 6',
    description: 'Короткий опис. Інформаційний блок з описом трьох зовнішніх проєктів. Rороткий опис. Інформаційний блок з описом трьох зовнішніх проєктів.',
    image: 'https://plus.unsplash.com/premium_photo-1661524222152-85b638529814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  }
]
function App() {

  return(<>


    <Carousel items={items}/></>)
}

export default App;
