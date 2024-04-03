import Image from 'next/image';
import React from 'react';

type ButtonProps = {
  type: "button" | "submit";
  label?: string;
  icon?: string;
  variant: "btn-primary" | "btn-icon";
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({label, icon, variant, onClick}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className={`cursor-pointer ${variant}`} onClick={handleClick}>
      {icon && <Image src={icon} alt={label} width={24} height={24}/>}
      {label && <label className='text-black'>{label}</label>}
    </button>
  )
}

export default Button
