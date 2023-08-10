import {FC, ReactNode} from "react";
import {NavLink} from "react-router-dom";

interface LinkPropsType {
  children?: ReactNode
  to: string
  variant: 'primary' | 'primaryDarkBg' | 'secondary' | 'fileLink' | 'listLink'
  size?: 'small' | 'large' | 'wideMob'
  disabled?: boolean,
  component: "a" | "NavLink"
}

type sizeClassType = {
  small: string,
  large: string,
  wideMob: string,
}


const Link: FC<LinkPropsType> = ({
                                   to,
                                   variant ='listLink',
                                   children,
                                   component,
                                   size,
                                   disabled,
                                   ...props
                                 }) => {

  const sizeClassNames: sizeClassType = {
    small: " w-[136px] h-[36px] leading-[24px] ",
    large: " max-w-[128px] text-[18px]",
    wideMob: "w-[288px] bg-white text-[18px] leading-[28px]",
  };

  const variantClassNames = {
    fileLink: " link-style underline decoration-1 underline-offset-[5px]",
    listLink: "link-style ",
    primary: {
      active: "primary-btn btn-style bg-black text-white",
      disabled: "primary-btn btn-style bg-grey50 text-white shadow-none pointer-events-none"
    },
    secondary: {
      active: "secondary-btn btn-style border border-black  text-black ",
      disabled: " secondary-btn btn-style !bg-grey50 text-white shadow-none pointer-events-none "
    },
    primaryDarkBg:{
      active: "primary-dark-bg btn-style bg-white text-black border border-black",
      disabled: "primary-dark-bg btn-style !bg-grey50 text-white shadow-none pointer-events-none"
    }
  };

  const sizeClassName = size ? sizeClassNames[size] : ''
  const variantStyles = variantClassNames[variant] || '';

  let variantClassName = '';
  if (typeof variantStyles === 'string') {
    variantClassName = variantStyles;
  } else if (disabled) {
    variantClassName = variantStyles?.disabled || '';
  } else {
    variantClassName = variantStyles?.active || '';
  }

  return (
    <>
      {component === "a" && (
        <a
          href={to}
          className={`${variantClassName} ${sizeClassName} `}
          {...props}
        >
          {children}
        </a>
      )}
      {component === "NavLink" && (
        <NavLink
          to={to}
          className={`${variantClassName} ${sizeClassName}`}
          {...props}
        >
          {children}
        </NavLink>
      )}
    </>
  );
};

export default Link;