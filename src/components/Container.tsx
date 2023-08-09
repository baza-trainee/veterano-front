
import {FC, ReactNode} from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({children}) => {
  return (
    <div className="max-w-[480px]
    md:min-w-[768px]
    md:max-w-[1279px]
    lg:min-w-[1280px]
    lg:max-w-[1440px]
    bg-red-400 mx-auto
    ">
      {children}
    </div>
  );
};

export default Container;