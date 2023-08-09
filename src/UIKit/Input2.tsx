import {FC, InputHTMLAttributes} from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string,
  label?: string,
  value: string
}

const Input2: FC<InputProps> = ({id, value, label, ...props}) => {
  const labelStyles = () => {
    let style = `pl-[10px] translate-y-[2.5rem] transition-all duration-300 
    peer-focus:leading-7 
    peer-focus:text-[14px] 
    peer-focus:translate-y-[1.5rem]  
    peer-focus:text-grey50`
    if (value.length > 0) {
      style = `pl-[10px] leading-7 text-[14px]  translate-y-[1.9rem] text-grey50`
    }
    return style
  }
  const inputStyles = () => {
    let style = `
    peer w-[288px] md:w-[320px] lg:w-[413px] font-light border-b-[1px] text-base border-black 
    h-[48px] 
    p-[10px] text-black
        hover:bg-yellow50 lg:hover:shadow-small
        focus:outline-none
        focus:bg-inherit
        focus:p-[10px]
        focus:pb-[10px]
        focus:h-[64px]
    `
    if (value.length > 0) {
      style = `peer w-[288px] md:w-[320px] lg:w-[413px] font-light border-b-[1px]
      text-base border-black 
        hover:bg-yellow50 lg:hover:shadow-small outline-none
        focus:outline-none
        focus:bg-inherit
        p-[10px]
        pt-[20px]
        pb-[1px]
        h-[64px]
        `
    }
    return style
  }


  return (
    <div className="flex flex-col-reverse">
      <input
        id={id}
        value={value}
        {...props}
        className={inputStyles()}
      />
      {label &&
        <label
          htmlFor={id}
          className={labelStyles()}
        >{label}</label>}
    </div>



  );
};

export default Input2;

