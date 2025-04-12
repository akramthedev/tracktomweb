import React from 'react'
const Element = ({ contenu, icon, clas }) => {
    
return (
    <li className='text-white w-full px-4 p-3 flex items-center cursor-pointer hover:text-green4 hover:bg-blanc '>
        <div className={`flex justify-center items-center gap-3 ${clas} `}>
            <div >
                {icon}
            </div>
            {contenu}
        </div>
    </li>
)
}
export default Element