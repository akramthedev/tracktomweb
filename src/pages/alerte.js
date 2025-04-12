import React, { useState } from 'react'
import { IoLogoWhatsapp } from "react-icons/io";
import { TfiEmail } from "react-icons/tfi";
import Overlay from '../component/overlay';

const Alerte = () => {
    const [open, setOpen] = useState(false)
    const toggle = () => {
        setOpen(!open)
    }

    return (

        <>
            <div className='p-4 flex-col  space-y-8' >
                <div className='border rounded-md border-green1'>
                    <div className="border-b border-green1 p-4  ">

                        <div className="flex justify-between p-2  ">
                            <h2 className='text-green4 text-2xl'>Alertes actives</h2>
                            <button type="button" className="flex items-center justify-center rounded-md whitespace-normal h-[40px] py-6 p-2 bg-green4 text-white hover:bg-white hover:text-green4   hover:border-green4 border border-transparent sm:py-0"
                                onClick={e => setOpen(true)}
                            >Configuration des alertes</button>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <div className="">
                            </div>
                            {/* icons */}
                            <div className="flex gap-2 justify-end p-4 ">
                                <div className=' shadow-xx border border-green1 rounded max-w-min p-1'>

                                    <a className=' text-lg opacity-30'>
                                        <IoLogoWhatsapp />
                                    </a>
                                </div>
                                <div className='shadow-xx border border-green1 rounded max-w-min p-1'>

                                    <a className='opacity-30 text-lg'>
                                        <TfiEmail />
                                    </a>
                                </div>
                            </div>
                            {/* end icons */}
                        </div>
                    </div>
                </div>
                {/* =========================end alerte actives ==========*/}

                {/* =============================alerte entrantes ============== */}
                <div className='border rounded-md border-green1'>
                    <div className="border-b border-green1 p-4  ">

                        <div className="flex justify-between p-2  ">
                            <h2 className='text-green4 text-2xl'>Alertes entrantes</h2>

                        </div>
                    </div>
                    <div className='p-4 ' >
                        <table className="table w-full border-collapse border  border-green1 my-7">
                            <thead>
                                <tr className='bg-green7 border-b  border-green1  text-gray-600'>
                                    <th className="px-4 py-2 text-left font-thin ">Sujet</th>
                                    <th className="px-4 py-2 text-left font-thin  ">Ferme</th>
                                    <th className="px-4 py-2 text-left font-thin  ">Type</th>
                                    <th className="px-4 py-2 text-left font-thin  ">Date d'envoi</th>
                                    <th className="px-4 py-2 text-left font-thin  "></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className=' '>
                                    <td colSpan="5" className="px-4 py-10 text-center text-2xl text-gray-400 ">Aucune alerte disponible</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>



            {/* ===============modal================== */}

            <Overlay toggle={toggle} x={open}>
                <form id=" " action=" " method='POST' >

                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"  >
                        {/*header*/}
                        <div className="flex items-center justify-between px-5 py-3  border-b-2  border-solid border-green3 rounded-t text-green4">
                            <h3 className="text-xl font-thin uppercase">
                                Configuration des alertes
                            </h3>

                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <div className="p-4 ">


                                <div className="grid grid-cols-1 space-y-4">
                                    <div className="">
                                        <label htmlFor='farm_id' >Couleur du fruit</label>
                                        <input type="text" name="farm_id" id="name" className=" border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3 " placeholder="" required="" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Calibre_du_fruit">Calibre du fruit</label>
                                        <input type="text" name=" Calibre_du_fruit" id="Calibre_du_fruit" className=" border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3" placeholder="" required="" />
                                    </div>
                                    <div className=" ">
                                        <label htmlFor="calculated-area">Numéro de Whatsapp</label>
                                        <input type="text" name="Numéro_de_Whatsapp" id="Numéro_de_Whatsapp" className=" border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3" placeholder="0000000000" required="" />
                                    </div>
                                    <div className=" ">
                                        <label htmlFor="Adresse_e-mail">Adresse e-mail</label>
                                        <input type="text" name="Adresse_e-mail" id="Adresse_e-mail" className=" border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3" placeholder="demo.trackseeds@gmail.com" required="" />
                                    </div>

                                    <div className="col-12 mb-4 flex items-center">

                                        <label className="inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" id='Envoi_d_alertes_par_Whatsapp'/>
                                            <div className="relative w-11 h-6 peer-focus:outline-none bg-gray-200  peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all   peer-checked:bg-green-900"></div>
                                            <span className="ms-3 text-sm font-medium text-black  ">Envoi d'alertes par Whatsapp</span>
                                        </label>

                                    </div>
                                    <div className="col-12 mb-4 flex items-center">

                                        <label className="inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" />
                                            <div className="relative w-11 h-6 peer-focus:outline-none bg-gray-200  peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all   peer-checked:bg-green-900"></div>
                                            <span className="ms-3 text-sm font-medium text-black  ">Envoi d'alertes par Email</span>
                                        </label>

                                    </div>

                                </div>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-1 border-t-2 border-solid border-green3 rounded-b gap2">

                            <div className="flex items-end gap-5">
                                <a className="rounded-md h-[40px] px-3 text-white bg-green4 hover:bg-white hover:text-green4   hover:border-green4 border border-transparent cursor-pointer flex items-center"
                                    onClick={e => toggle()}
                                >Annuler</a>
                                <button type='submit' className="flex items-center justify-center rounded-md whitespace-normal h-[40px] px-4 hover:bg-green4 hover:text-white bg-white text-green4   border-green4 border   ">Sauvegarde</button>
                            </div>
                        </div>
                    </div>
                </form>                 
            </Overlay>
        </>
    )
}
export default Alerte;
