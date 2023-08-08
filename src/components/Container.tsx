import {FC, ReactNode} from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({children}) => {
  return (
    <div className="w-full font-e-Ukraine">
      {children}
    </div>
  );
};

export default Container;