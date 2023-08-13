import {FC, useEffect, useRef, useState} from "react";
import ArrowButton from "../ArrowButton.tsx";
import CardInfo from "./CardInfo.tsx";


type ItemsProps = {
  title: string,
  description: string,
  image: string,
}
interface CarouselProps {
  items: ItemsProps[],
  gap: number,
  slides: number
}

const Carousel: FC<CarouselProps> = ({items, gap, slides}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;
      const totalGaps = gap*slides
      const width = ((containerWidth - totalGaps) / slides)
      setSlideWidth(width);
      console.log('containerWidth', containerWidth)
      console.log('slides', slides)
      console.log('gap', gap)
      console.log('totalGaps', totalGaps)

    }
  }, []);
  console.log('slideWidth', slideWidth)


  const handlePrev = () => {
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : currentSlide);
  };

  const handleNext = () => {
    setCurrentSlide(currentSlide + slides < items.length ? currentSlide + 1 : currentSlide);
  };

  return (
   <>
     <div ref={containerRef} className='overflow-hidden m-auto w-320px md:w-[768px] lg:w-[1280px]'>
       <div className="flex relative " style={{
         transition: 'left 0.9s ease-in-out',
         left: `-${(currentSlide * slideWidth)}px`,
       }}>
         {items.map((item, index) => (
           <div key={index}
                className={'flex justify-center md:justify-start'}
                style={{
                  minWidth: `${slideWidth}px`,
                  marginRight: index < slides ? `${gap}px` : '0px'
           }}>
            <div className={'w-[214px] h-[94px]'}><img width={214} height={94} src={item.image} alt=""/></div>
            {/* <CardInfo title={item.title} text={item.description} imageSrc={item.image}/>*/}
           </div>
         ))}
       </div>
       <div className={'flex gap-[24px] '}>
         <ArrowButton direction="left" variant="carousel" disabled={currentSlide === 0} onClick={handlePrev}/>
         <ArrowButton direction="right" variant="carousel" disabled={currentSlide + slides >= items.length} onClick={handleNext}/>
       </div>
     </div></>
  );
};

export default Carousel;
