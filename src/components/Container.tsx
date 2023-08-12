import {FC, ReactNode} from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[480px] md:min-w-[768px] lg:max-w-[1440px] mx-auto">
      {children}
    </div>
  );
};

export default Container;