import React, { useEffect, useRef } from 'react'

const ConfigurationDesAlertes = ({ handelClose, open }) => {
    const divRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!divRef.current.contains(event.target)) {
                handelClose();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [open, handelClose]);
    return (
        <div className='' >
            <div
                className="flex justify-center items-center  overflow-auto fixed inset-4 z-50 outline-none focus:outline-none"
            >
                <div className="mx-auto my-auto relative w-auto  max-w-2xl  ">
                    {/*================content ===========================*/}
                    <form id="farms" action=" " method='POST' >
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none" ref={divRef}>
                            {/*header*/}
                            <div className="flex items-center justify-between px-5 py-3  border-b-2  border-solid border-green3 rounded-t text-green4">
                                <h3 className="text-xl font-thin uppercase">
                                    Configuration des alertes
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                // onClick={() => setShowModal(false)}
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
                                            <label for='farm_id' >Couleur du fruit</label>
                                            <input type="text" name="farm_id" id="name" className=" border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3 " placeholder="" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label for="calculated-perimeter">Calibre du fruit</label>
                                            <input type="text" name="variety" id="calculated-perimeter" className=" border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3" placeholder="" required="" />
                                        </div>
                                        <div className=" ">
                                            <label for="calculated-area">Numéro de Whatsapp</label>
                                            <input type="text" name="portgreff" id="calculated-area" className=" border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3" placeholder="0000000000" required="" />
                                        </div>
                                        <div className=" ">
                                            <label for="calculated-area">Adresse e-mail</label>
                                            <input type="text" name="portgreff" id="calculated-area" className=" border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3" placeholder="demo.trackseeds@gmail.com" required="" />
                                        </div>
                                        <div className="col-12 mb-4 flex items-center">
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer" />
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
                                        onClick={e => handelClose()}
                                    >Annuler</a>
                                    <button type='submit' className="flex items-center justify-center rounded-md whitespace-normal h-[40px] px-4 hover:bg-green4 hover:text-white bg-white text-green4   border-green4 border   ">Sauvegarde</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"
            ></div>
        </div>
    )
}
export default ConfigurationDesAlertes