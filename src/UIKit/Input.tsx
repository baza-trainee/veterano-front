import {FC} from "react";

interface InputPropsType {
  type: string,
  placeholder: string,
  label: string
}

const Input: FC<InputPropsType>=  ({type, placeholder, label}) => {
  return (
    <>
      {/*<label htmlFor={label}>{label}</label>*/}
      <input className="flex gap-1 leading-6 border-b-[1px] border-black body-default h-[48px] p-[10px]
      sm:w-[300px]
      md:w-[350px]
      lg:w-[413px]
      focus:outline-none focus:bg-black focus:border-white focus:border-b-[1px]
      hover:bg-yellow50
      placeholder:text-grey100 placeholder:focus:text-white
      text-body-default"
             type={type}
             id={label}
             placeholder={placeholder}/>
    </>
  );
};

export default Input;