import React, { ReactNode, MouseEvent } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'wide' | 'contrast';
type ButtonSize = 'small' | 'large' | 'wideMob';

interface ButtonProps {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  [props: string]: unknown;
}

const Button: React.FC<ButtonProps> = ({
  children = 'Click',
  onClick = () => {
    console.log('clicked');
  },
  className = '',
  variant = 'primary',
  size = 'small',
  disabled = false,
  ...props
}) => {
  let buttonStyles =
    'py-2  font-light rounded hover:shadow disabled:bg-[#808080]';

  if (size === 'large') {
    buttonStyles += ' text-18  w-[128px]';
  } else if (size === 'wideMob') {
    buttonStyles += ' text-sm  w-[288px]';
  } else {
    buttonStyles += ' text-sm w-[132px]';
  }

  switch (variant) {
    case 'primary':
      buttonStyles +=
        ' bg-black text-[#FCFCFC] border border-black disabled:border-none ';
      if (!disabled) {
        buttonStyles += ' hover:bg-[#FCFCFC] hover:text-black';
      }
      break;
    case 'secondary':
      buttonStyles +=
        '  text-black border border-black disabled:text-[#ECECEC] disabled:border-none';
      if (!disabled) {
        buttonStyles +=
          ' hover:bg-black hover:text-white active:bg-[#FDF5E1] active:text-black';
      }
      break;
    case 'wide':
      buttonStyles += '  bg-[#FCFCFC] text-black border border-black';
      if (!disabled) {
        buttonStyles +=
          ' hover:bg-black hover:text-white active:bg-[#FDF5E1] active:text-black';
      }
      break;
    case 'contrast':
      buttonStyles += '  bg-[#FCFCFC] text-black ';
      if (!disabled) {
        buttonStyles +=
          ' hover:bg-[#F9E1A1] active:bg-[#FDF5E1] active:bg-[#F7D67F]';
      }
      break;
    default:
      buttonStyles +=
        ' bg-black text-[#FCFCFC] border border-black disabled:border-none ';
      if (!disabled) {
        buttonStyles += ' hover:bg-[#FCFCFC] hover:text-black';
      }
  }

  return (
    <button
      onClick={onClick}
      className={`${buttonStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
