import { Link } from "react-router-dom";

interface ButtonProps {
  text: string;
  className?: string;
  to: string;  
}

export default function Button({ text, className = "", to }: ButtonProps) {
  return (
    <Link      
      to={to}
      className={`hover:scale-105 cursor-pointer px-6 py-3 m-2 rounded-md ${className}`}
    >
      {text}
    </Link>
  );
}
