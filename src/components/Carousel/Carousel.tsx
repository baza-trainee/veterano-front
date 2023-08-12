import CardInfo from "./CardInfo.tsx";
import {FC, useState} from "react";
import ArrowButton from "../ArrowButton.tsx";


type ItemsProps = {
  title: string,
  description: string,
  image: string,
}

interface CarouselProps {
  items: ItemsProps[],

}

const Carousel: FC<CarouselProps> = ({items}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const visibleSlides: number = 3;
  const handlePrev = () => {
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : currentSlide);
  };

  const handleNext = () => {
    setCurrentSlide(Math.min(items.length - visibleSlides, currentSlide + 1));
  };


  return (
   <div style={{ width: '1280px', overflow: 'hidden' }}>
     <div className="flex h-[600px]" style={{ position: 'relative', transition: 'left 0.5s ease-in-out', left: `-${currentSlide * (413 + 20)}px` }}>
       {items.map((item, index) => (
         <div
           key={index}
           style={{ marginRight: index < items.length - 1 ? '20px' : '0px' }}>
           <CardInfo imageSrc={item.image} text={item.description} title={item.title} />
         </div>
       ))}
       <div className={'flex gap-[24px] z-40'}>
         <ArrowButton direction="left" variant="carousel" disabled={currentSlide === 0} onClick={handlePrev} />
         <ArrowButton direction="right" variant="carousel" disabled={currentSlide >= items.length - visibleSlides} onClick={handleNext} />
       </div>
     </div>
   </div>

  );
};

export default Carousel;