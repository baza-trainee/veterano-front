import {FC, InputHTMLAttributes, useState} from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string,
  label?: string,
  value: string
  error?: string,
}

const Input: FC<InputProps> = ({error, id, value, label, ...props}) => {

  const [visible, setVisible] = useState(true)
  const labelStyles = () => {
    let style = `  
    pl-[10px] 
    translate-y-[2.5rem] 
    transition-all 
    duration-300 
    peer-focus:leading-7 
    peer-focus:text-[14px] 
    peer-focus:translate-y-[1.9rem]  
    peer-focus:text-grey50
    peer-disabled:text-grey50 
    `
    if (value.length > 0) {
      style = `
      peer-invalid:text-error100 
      pl-[10px] leading-7 
      text-[14px]  
      translate-y-[1.9rem]
      text-grey50`
    }
    return style
  }
  const inputStyles = () => {
    let style = `peer`

    if (value.length > 0) {
      style = `peer h-[64px] pb-[1px] pt-[20px] `
    }
    if (error) {
      style = `peer  border-error100 focus:border-black`
    }
    if (error && value.length > 0) {
      style = `peer  h-[64px] pb-[1px] pt-[20px]`
    }
    return style
  }

  const togglePassword = () => {
    const inputElement = document.querySelector('#password')
    if (inputElement) {
      inputElement.setAttribute(
        'type',
        visible ? 'password' : 'text'
      );
      setVisible(!visible)
    }
  }

  return (
    <div className="flex flex-col-reverse relative w-[288px] md:w-[320px] lg:w-[413px]">
      <input
        id={id}
        placeholder=""
        value={value}
        {...props}
        className={inputStyles()}
      />
      {label &&
        <label
          htmlFor={id}
          className={labelStyles()}
        >{label}</label>}
      {props.type === 'password' &&
        <div
          onClick={togglePassword}
          className="absolute right-[5%] cursor-pointer">
          {visible ?
            <span className="material-icons">visibility_off</span> :
            <span className="material-icons ">visibility</span>
          }
        </div>
      }

      {error && <p className="absolute left-[10px] bottom-[-30px] text-error100 text-[14px] leading-[24px]">
        {error}
      </p>}
    </div>


  );
};

export default Input;

