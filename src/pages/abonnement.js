import React from 'react'
import { Link } from 'react-router-dom';

const Abonnement = () => {
    return (
        <div className='p-4 flex-col space-y-8'>

            <div className='border rounded-md border-green1'>
                <div className="border-b border-green1 p-4  ">

                    <div className="flex justify-between p-2  ">
                        <h2 className='text-green4 text-2xl'> Abonnement </h2>
                        <Link to={'/subscription/create'}>
                            <button type="button" className="flex items-center justify-center rounded-md whitespace-normal h-[40px] py-6 p-2 bg-green4 text-white hover:bg-white hover:text-green4   hover:border-green4 border border-transparent sm:py-0">Ajout d'un nouveau client</button>
                        </Link>
                    </div>
                </div>
                <div className='p-4' >
                    <table className="table w-full border-collapse border  border-green1 my-7">
                        <thead>
                            <tr className='bg-green7 border-b  border-green1  text-gray-600'>
                                <th className="px-4 py-2 text-left font-thin ">Date de départ	</th>
                                <th className="px-4 py-2 text-left font-thin  ">Date de fin</th>
                                <th className="px-4 py-2 text-left font-thin  ">Statut</th>                                  
                            </tr>
                        </thead>
                        <tbody>
                            <tr className=' '>
                                <td colSpan="5" className="px-4 py-10 text-center text-2xl text-gray-400 ">Aucun abonnement  disponible</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Abonnement;
