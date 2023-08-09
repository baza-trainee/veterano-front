import {FC} from "react";

interface InputPropsType {
  type: string,
  label: string,
  id: string,
  value:string,
  onchange: () => void
}

const Input: FC<InputPropsType> = ({type, label, id, value, onchange}) => {
  return (
    <>
      {/*<div className="relative">*/}

      {/*  <label className="mt-0*/}
      {/*  invisible*/}
      {/*  peer-focus:visible*/}
      {/*  text-pink-600*/}
      {/*  text-sm*/}
      {/*  ">{placeholder}</label>*/}

      {/*  <input className="peer w-[288px] md:w-[320px] lg:w-[413px] font-light border-b-[1px] text-base border-black h-[48px] p-[10px] text-grey100*/}
      {/*hover:bg-yellow50 lg:hover:shadow-small*/}
      {/*focus:outline-none focus:bg-inherit focus:h-[64px] focus:py-[10px] focus:pb-[12px]focus:placeholder:focus:text-black*/}
      {/*placeholder:text-grey100*/}
      {/*placeholder-shown:border-gray-500 "*/}
      {/*         type={type}*/}
      {/*         id={id}*/}
      {/*         placeholder={placeholder}/>*/}


      {/*</div>*/}


      <div className="flex flex-col-reverse">
        <input id={id} type={type} placeholder=" " value={value}
               className="
          w-[288px] md:w-[320px] lg:w-[413px]
          font-light
          border-b-[1px]
          text-base
          border-black h-[48px] p-[10px] text-black
      hover:bg-yellow50 lg:hover:shadow-small
      focus:outline-none
      focus:bg-inherit
      focus:p-[10px]
      focus:pb-[12px]
      focus:h-[64px]
     "/>
        <label
          htmlFor="text"
          className="
            pl-[12px]
            focus:text-[14px]
            text-grey50
            leading-7
            translate-y-[2.6rem]
            transition-all
            duration-300">{label}</label>
      </div>


    </>
  );
};

export default Input;