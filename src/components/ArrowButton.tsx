import { FC, MouseEvent } from "react";
import { MdArrowForwardIos } from "react-icons/md";

type ArrowButtonProps = {
  direction: "top" | "bottom" | "right" | "left";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  variant: "faq" | "carousel";
  disabled?: boolean;
};
const ArrowButton: FC<ArrowButtonProps> = ({
  direction = "right",
  variant = "faq",
  disabled = "false",
  onClick,
}) => {
  const arrowStyle = {
    top: "transform rotate-[270deg]",
    bottom: "transform rotate-90",
    left: "transform rotate-180",
    right: "transform rotate-0",
  };

  const buttonStyle = {
    faq: {
      active:
        "w-8 h-8 arrow-btn bg-white hover:bg-yellow100 active:bg-yellow50",
      disable:
        "w-8 h-8 arrow-btn bg-grey50 hover:bg-yellow100 active:bg-yellow50 pointer-events-none",
    },
    carousel: {
      active:
        "w-10 h-12 arrow-btn bg-black hover:bg-yellow100 active:bg-yellow50",
      disable:
        "w-10 h-12 arrow-btn bg-grey50 hover:bg-yellow100 active:bg-yellow50 pointer-events-none",
    },
  };
  let variantStyle = "";
  if (disabled) {
    variantStyle = buttonStyle[variant].disable;
  } else {
    variantStyle = buttonStyle[variant].active;
  }

  return (
    <button onClick={onClick} className={variantStyle}>
      <MdArrowForwardIos
        color={variant === "faq" ? "black" : "white"}
        size={variant === "faq" ? 20 : 30}
        className={arrowStyle[direction]}
      />
    </button>
  );
};

export default ArrowButton;
