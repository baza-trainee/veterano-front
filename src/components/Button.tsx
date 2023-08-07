import React, { ReactNode, MouseEvent } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'wide' | 'contrast';
type ButtonSize = 'small' | 'large' | 'wideMob';

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'small',
  disabled,
}) => {
  let buttonStyles =
    'py-2 px-8 font-light rounded hover:shadow disabled:bg-[#808080]';

  if (size === 'large') {
    buttonStyles += ' text-18 px-8';
  } else if (size === 'wideMob') {
    buttonStyles += ' text-sm px-9';
  } else {
    buttonStyles += ' text-sm px-9';
  }

  switch (variant) {
    case 'primary':
      buttonStyles +=
        ' max-w-[128px] bg-black text-[#FCFCFC] border border-black disabled:border-none ';
      if (!disabled) {
        buttonStyles += ' hover:bg-[#FCFCFC] hover:text-black';
      }
      break;
    case 'secondary':
      buttonStyles +=
        ' max-w-[128px] text-black border border-black disabled:text-[#ECECEC] disabled:border-none';
      if (!disabled) {
        buttonStyles +=
          ' hover:bg-black hover:text-white active:bg-[#FDF5E1] active:text-black';
      }
      break;
    case 'wide':
      buttonStyles +=
        ' max-w-[288px] bg-[#FCFCFC] text-black border border-black';
      if (!disabled) {
        buttonStyles +=
          ' hover:bg-black hover:text-white active:bg-[#FDF5E1] active:text-black';
      }
      break;
    case 'contrast':
      buttonStyles += ' w-[128px] bg-[#FCFCFC] text-black ';
      if (!disabled) {
        buttonStyles +=
          ' hover:bg-[#F9E1A1] active:bg-[#FDF5E1] active:bg-[#F7D67F]';
      }
      break;
    default:
      buttonStyles +=
        ' max-w-[128px] bg-black text-[#FCFCFC] border border-black disabled:border-none ';
      if (!disabled) {
        buttonStyles += ' hover:bg-[#FCFCFC] hover:text-black';
      }
  }

  return (
    <button
      onClick={onClick}
      className={`${buttonStyles} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
