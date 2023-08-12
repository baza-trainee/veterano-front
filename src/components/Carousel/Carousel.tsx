import CardInfo from "./CardInfo.tsx";
import {FC, useEffect, useRef, useState} from "react";
import ArrowButton from "../ArrowButton.tsx";


type ItemsProps = {
  title: string,
  description: string,
  image: string,
}
interface CarouselProps {
  items: ItemsProps[],
  gap: string
}

const Carousel: FC<CarouselProps> = ({items, gap}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    if (slideRef.current) {
      const width = slideRef?.current.offsetWidth + parseInt(gap)
      setSlideWidth(width);
    }
  }, []);



  useEffect(() => {
    if (containerRef.current && slideWidth > 0) {
      const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;
      const newVisibleSlides = Math.floor(containerWidth / slideWidth);
      setVisibleSlides(newVisibleSlides);
    }

  }, [slideWidth, gap]);

  const handlePrev = () => {
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : currentSlide);
  };

  const handleNext = () => {
    setCurrentSlide(currentSlide + visibleSlides < items.length ? currentSlide + 1 : currentSlide);
  };

  return (
    <div ref={containerRef} className='overflow-hidden m-auto w-320px md:w-[740px] lg:w-[1280px]'>
      <div className="flex relative " style={{
        transition: 'left 0.9s ease-in-out',
        left: `-${(currentSlide * slideWidth)}px`,

      }}>
        {items.map((item, index) => (
          <div ref={slideRef} key={index} style={{marginRight: (visibleSlides > 1 && index < items.length - 1) ? `${gap}px` : '0px'}}>
            <CardInfo imageSrc={item.image} text={item.description} title={item.title}/>
          </div>
        ))}
      </div>
      <div className={'flex gap-[24px] '}>
        <ArrowButton direction="left" variant="carousel" disabled={currentSlide === 0} onClick={handlePrev}/>
        <ArrowButton direction="right" variant="carousel" disabled={currentSlide + visibleSlides >= items.length} onClick={handleNext}/>
      </div>
    </div>

  );
};

export default Carousel;