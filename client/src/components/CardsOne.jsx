import React from 'react'
import Tilt from 'react-parallax-tilt';
function CardsOne({img,title,parrafe}) {
  return (
    <Tilt glareEnable={true} glareBorderRadius='1rem'>
    <div className="bg-white text-black shadow-md w-[350px] p-5 h-[350px] rounded-md flex flex-col items-center justify-evenly text-center">
      <img src={img} alt={title} className='w-16'/>
      <h2 className='font-semibold text-[#0d263b]'>{title}</h2>
      <p className='text-[#0d263b] font-normal text-base'>{parrafe}</p>
    </div>
    </Tilt>
  )
}

export default CardsOne