import React, { useState } from 'react'
import Hamburger from 'hamburger-react';
import { useDispatch, useSelector } from 'react-redux';
import { HideMenu } from '../reduxToolkit/sliceMenu';

const TitrePage = ({ titre }) => {
  const [hide, setHide] = useState(true)
  const Dispatch=useDispatch()
  const handleClick = () => {
    setHide(!hide)
    Dispatch(HideMenu(hide))
  }
  
  const etat = useSelector(st=>st.menu.MenuState)

 
   return (
      <header className='flex items-center justify-between h-[64px] bg-green6 pl-4 '>

        <h1 className='text-2xl text-white '>{titre}</h1>
        <div className='flex md:hidden px-4' >
          <Hamburger color='white' toggled={etat} onToggle={handleClick}
          />

        </div>
      </header>
  )
}
export default TitrePage