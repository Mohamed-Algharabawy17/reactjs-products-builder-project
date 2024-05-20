import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode;
    className: string;
    width?: "w-full" | "w-fit" | "w-50"
}
const Button = ({children, className, width="w-full", ...rest}: IProps) => {    
    return (
        <button className={`${className} outline-none hover:opacity-70 font-bold text-white ${width} p-2 rounded-md`} {...rest}>{children}</button>
    );
};

export default Button;