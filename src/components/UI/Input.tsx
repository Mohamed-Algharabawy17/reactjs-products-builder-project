import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement>{}
const Input = ({...rest}: IProps) => {    
    return <input 
    className="border border-grey-400 bg-red p-2 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none text-blue-700" 
    {...rest}
    />
};

export default Input;