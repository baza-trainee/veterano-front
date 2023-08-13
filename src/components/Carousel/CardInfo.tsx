import React, {MouseEvent} from 'react';
import Button from "../Button.tsx";

interface DataType {
  image: string,
  description: string,
  title: string,
}

export interface CardProps {
  buttonText?: string;
  onButtonClick?: (event: MouseEvent<HTMLButtonElement>) => void,
  data: DataType
}

const CardInfo: React.FC<CardProps> = ({data, ...props}) => {
  return (
    <div className="sm:w-[320px] md:w-[350px] lg:w-[413px] transition duration-300">
      <img src={data.image} alt={data.title} className="w-full h-auto" />
      <div className="bg-white p-3 sm:px-4 sm:py-6 md:px-3 md:py-6 lg:p-8">
        <h2 className="text-xl font-semibold mb-3">{data.title}</h2>
        <p className="text-gray-600 mb-6 text-base md:mb-8 md:text-lg" >
          {data.description}
        </p>
        <Button>Детальніше</Button>
      </div>
    </div>
  );
};

export default CardInfo;