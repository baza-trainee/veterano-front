import './App.css'
import Carousel from "./components/Carousel/Carousel.tsx";
import Section from "./components/Section/Section.tsx";


const items = [
  {
    title: 'Проект 1',
    description: 'Короткий опис. Інформаційний блок з описом трьох зовнішніх проєктів. Rороткий опис. Інформаційний блок з описом трьох зовнішніх проєктів.',
    image: 'https://s3-alpha-sig.figma.com/img/37de/5ee0/448ccd2cfd9588ede46bb28ff84cab59?Expires=1692576000&Signature=kdexn3g3sjgao67gcCHXisjCKt-PxwSs2XJScXF6Nfi2EqHFnNiMdsLZv6d8ATtC7miVv2rnQtutHydtarNZRP9pZa2FdkbtyQgTlVqsrC6vQHGf9AvVRBlhwFe1W5OUKjPRO4X7aKtpHhjn0CjBHljTNSw9o659O5Afu0medAMqw3W7YZ3~GNrMX0nzMB0FgqyPgsQOtXxxiAS8~aSuIYKaIHhQi~AlE~SSG0RcLdWNnOSElGo6jhhrBs3qQSRc3zZ7vtTSePIgEtFMUpHORpdsKIpAWAWx~KbElJpNqlsbGLNrC61Ed8TcMY7UwLogVJ93qMhun7XivLqyOL2pcw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
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

  return(
    <>


    <Section className='md:px-[24px] lg:px-[80px]' title={'Ghjtrnb'}  ><Carousel items={items} gap={'52'}/></Section>
</>
    )
}

export default App;
