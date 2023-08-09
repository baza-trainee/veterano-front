import { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[480px] md:max-w-[768px] xl:max-w-[1440px] mx-auto">
      {children}
    </div>
  );
};

export default Container;
