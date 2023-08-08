import {FC} from "react";

interface InputPropsType {
  type: string,
  placeholder: string,
  label: string
}

const Input: FC<InputPropsType>=  ({type, placeholder, label}) => {
  return (
    <div className="flex flex-col" >
      {/*<label htmlFor={label}>{label}</label>*/}
      <input className="flex gap-1 border-b-[1px] border-grey100 body-default h-[48px] p-[10px]
      sm:w-[300px]
      md:w-[350px]
      lg:w-[413px]
      focus:outline-none focus:bg-black focus:border-white focus:border-b-[1px]
      placeholder:text-grey100 placeholder:focus:text-white
      text-body-default"
             type={type}
             id={label}
             placeholder={placeholder}/>
    </div>
  );
};

export default Input;