import Container from "../Container";
import Link from "../Link.tsx";
import NavigationLink from "../NavigationLink.tsx";
import Button from "../Button.tsx";
import {BsFacebook, BsTelegram} from "react-icons/bs";
import {FaPhoneAlt} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {useMediaQuery} from "react-responsive";


const Footer = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 480px)'
  });

  return (
    <footer className={'bg-black pb-[70px]'}>
      <Container className={'flex flex-col'}>
        <div className="footer">
          <div className="footer-info">
            <img srcSet="/images/logo-white-sm.svg 135w, /images/logo-white-md.svg 164w, /images/logo-white-lg.svg 172w"
                 sizes="(max-width: 480px) 135px, (max-width: 769px) 164px, (min-width: 769px) 172px"
                 src="/images/logo-white-lg.svg"
                 alt="Хист Лого"
                 className={'mb-[55px] md:mb-[97px] lg:mb-[82px]'}/>
            {isMobile ?
              <Button variant='secondary' size='wideMob'>Підтримати</Button> :
              <Button variant='contrast' size='wideMob'>Підтримати</Button>}
          </div>

          <div className={'footer-nav md:mt-9'}>
            <ul>
              <li><NavigationLink to={'/#'} variant={'underlineNoneFooter'}>Про нас</NavigationLink></li>
              <li><NavigationLink to={'/#'} variant={'underlineNoneFooter'}>Проєкти</NavigationLink></li>
              <li><NavigationLink to={'/#'} variant={'underlineNoneFooter'}>Контакти</NavigationLink></li>
            </ul>
            <ul>
              <li className={'text-white flex items-center leading-6'}>
                <FaPhoneAlt size={24} color={'white'}/><p className={'pl-[10px]'}>+38 044 XXX XX XX</p></li>
              <li className={'text-white flex items-center'}>
                <FaPhoneAlt size={24} color={'white'}/><p className={'pl-[10px]'}>+38 044 XXX XX XX</p></li>
              <li className={'text-white flex items-center'}>
                <MdEmail size={24} color={'white'}/><p className={'pl-[10px]'}>info@baza-trainee.tech</p></li>
            </ul>
            <ul>
              <li><Link to={'/#'} variant={'underlineFooter'}>Політика конфіденційності</Link></li>
              <li><Link to={'/#'} variant={'underlineFooter'}>Правила користування сайтом</Link></li>
            </ul>
            <ul className={'lg:col-start-3'} >
              <li className={"social-icons "}>
                <Link to={'/#'} variant={'underlineFooter'}><BsFacebook color={'#BCBCBC'} size={42}/></Link>
                <Link to={'/#'} variant={'underlineFooter'}><BsTelegram color={'#BCBCBC'} size={42}/></Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={'text-white text-[12px] ml-4 mt-4 leading-4 w-[169px]'}>
          <p>Baza Trainee Ukraine 2023</p>
          <p>Всі права захищені</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;