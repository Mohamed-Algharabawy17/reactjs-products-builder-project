import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement>{
    color: string
}
const CircleColor = ({color, ...rest}: IProps) => {    
    return (
      <span
        className="block w-5 h-5 bg-fuchsia-500 rounded-full mb-1 hover:cursor-pointer"
        style={{ backgroundColor: `${color}` }}
        {...rest}
      />
    );
};

export default CircleColor;