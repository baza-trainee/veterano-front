import {FC, useEffect, useRef, useState} from "react";
import ArrowButton from "../ArrowButton.tsx";


type ItemsProps = {
  title: string,
  description: string,
  image: string,
}

interface CarouselProps {
  items: ItemsProps[],
  gap: number,
  slides: number,
  component: React.ComponentType<any>
  button?: () => React.ReactElement;
}


const Carousel: FC<CarouselProps> = ({items, gap, slides, component: Component, button}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;
      const totalGaps = gap * slides
      const width = ((containerWidth - totalGaps) / slides)
      setSlideWidth(width);
    }
  }, []);

  const handlePrev = () => {
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : currentSlide);
  };

  const handleNext = () => {
    setCurrentSlide(currentSlide + slides < items.length ? currentSlide + 1 : currentSlide);
  };

  return (
    <>
      <div ref={containerRef} className='overflow-hidden m-auto w-[320px] md:w-[768px] lg:w-[1280px]'>
        <div className="flex items-center relative " style={{
          transition: 'left 0.9s ease-in-out',
          left: `-${(currentSlide * slideWidth) + (currentSlide * gap)}px`,
        }}>
          {items.map((item, index) => (
            <div key={index}
                 className={'flex justify-center md:justify-start'}
                 style={{
                   minWidth: `${slideWidth}px`,
                   marginRight: index < items.length - 1 ? `${gap}px` : '0px'
                 }}>
              <Component data={item}/>
            </div>
          ))}
        </div>

      </div>

      <div
        className={button ? 'carousel-actions justify-between md:flex-row md:justify-between' : 'carousel-actions md:flex-row md:justify-end  '}>
        {button && button()}
        <div className={'flex gap-[24px] mt-[5px]'}>
          <ArrowButton direction="left" variant="carousel" disabled={currentSlide === 0} onClick={handlePrev}/>
          <ArrowButton direction="right" variant="carousel" disabled={currentSlide + slides >= items.length}
                       onClick={handleNext}/>
        </div>
      </div>


    </>
  );
};

export default Carousel;