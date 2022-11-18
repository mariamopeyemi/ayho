import React from 'react';
import Image from 'next/image';

const Blurb = ({src, item, date}) => {
  return (
    <div className='flex flex-row my-[1rem]'>
        <Image src={src} alt='img' width='50px' height='50px' />
        <div className='flex flex-col'>
            <p className="h-full body_heavy text-black-default flex items-center ml-[20px]">{item}</p>
            <p className="h-full text-[#9999B4] flex items-center ml-[20px]">{date}</p>
        </div>
    </div>
  )
}

export default Blurb;