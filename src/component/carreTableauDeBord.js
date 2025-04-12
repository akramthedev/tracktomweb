import React from 'react'

const CarreTableauDeBord = ({ children, icon = null }) => {
  return (
      <div className='p-4 m-2 border-2 rounded-md	border-[#BFE3C3] h-[120px] relative bg-[#ffff] '>
        {children}
      </div>
  )
}
export default CarreTableauDeBord