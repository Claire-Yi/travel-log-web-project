import Image from 'next/image';
import React from 'react';
import Link, {LinkProps as NextLinkProps} from 'next/link';

type MyLinkProps = {
  label?: string;
  icon?: string;
  path: string;
  variant: "lnk-icon";
}

const MyLink: React.FC<NextLinkProps & MyLinkProps> = ({label, icon, path, variant}) => {
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   event.preventDefault();
  //   if (onClick) {
  //     onClick();
  //   }
  // };

  return (
    <div  className={ `cursor-pointer ${variant}`}>
      <Link href={path}>
        <>
        {icon && <Image src={icon} alt={label || '' } width={24} height={24}/>}
        {label && <label className='text-black'>{label}</label>}
        </>
      </Link>
    </div>
  )
}

export default MyLink;
