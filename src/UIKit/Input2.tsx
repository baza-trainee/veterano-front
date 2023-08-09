import {FC, InputHTMLAttributes} from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string,
  label?: string
}

const Input2: FC<InputProps> = ({id, label, ...props}) => {

  return (
    <div className="flex flex-col-reverse">
      <input
        id={id}
        {...props}
        className="peer w-[288px] md:w-[320px] lg:w-[413px] font-light border-b-[1px] text-base border-black h-[48px] p-[10px] text-black
        hover:bg-yellow50 lg:hover:shadow-small
        focus:outline-none
        focus:bg-inherit
        focus:p-[10px]
        focus:pb-[12px]
        focus:h-[64px]
        "
      />
      {label &&
        <label
          htmlFor={id}
          className="
            pl-[10px]
            translate-y-[2.5rem]
            transition-all
            duration-300
            peer-focus:leading-7
            peer-focus:text-[14px]
            peer-focus:translate-y-[1.5rem]
            peer-focus:text-grey50"
        >{label}</label>}
    </div>
  );
};

export default Input2;

