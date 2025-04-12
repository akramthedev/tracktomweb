import React, { useState } from 'react'
import TitrePage from '../component/titrePage'
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import SelectCompo from '../component/select';



const CreateCustomer = () => {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [dateD, setDateD] = useState(Date)
    const [dateF, setDateF] = useState(Date)


    const formatDate = (date) => {
        return format(date, "yyyy-MM-dd'T'HH:mm");
    };


    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };


    const status = ['Suspendu', 'Payé', 'Impayé']

    const handelSubmit = (e) => {
        // e.preventDefault();
        console.log('from parent '+selectedStatus);
    }


    return (
        <>
            <TitrePage titre={'Abonnement'} />




            <div className='mx-auto my-auto grid grid-cols-3  '>

                <div className="  w-auto  p-4 col-span-3 lg:col-span-2    ">
                    {/*================content ===========================*/}
                    <div className="border  rounded-lg   flex flex-col w-full col-span-1 "  >
                        {/*header*/}
                        <div className="flex items-center justify-between px-5 py-3  border-b-2  border-solid border-green3 rounded-t text-green4">
                            <h3 className="text-2xl    ">
                                Ajouter un nouveau Abonnement
                            </h3>


                        </div>
                        <form id="abonnement" onSubmit={handelSubmit} method='POST' action=''>
                            {/*body*/}
                            <div className="relative p-4 flex-auto">
                                <div className=" ">


                                    <div className="grid grid-cols-1 space-y-4">
                                        <div className='col-span-1'>

                                            <label className="">Client</label>
                                            <select id="" className=" shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3">
                                                {/* <option selected>Fermes</option> */}

                                            </select>
                                        </div>
                                        <div className='col-span-1'>
                                            <label  >Date de départ</label>
                                            <input type="datetime-local" name="from" id="from" value={formatDate(dateD)} className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3" onChange={e => setDateD(e.target.value)} />
                                        </div>

                                        <div className='col-span-1'>
                                            <label  >Date de fin</label>
                                            <input type="datetime-local" name="to" id="to" value={formatDate(dateF)} className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3 " onChange={e => setDateF(e.target.value)} />
                                        </div>


                                        <div className='col-span-1 pt-4'>
                                            <SelectCompo status={status} onStatusChange={handleStatusChange} />                                           
                                            <input type='hidden' name='status_de_client' value={selectedStatus}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-start p-2 px-5 border-t-2 border-solid border-green3 rounded-b gap-3">
                                <Link to={'/subscription'}>
                                    <button className="flex items-center justify-center rounded-md whitespace-normal h-[40px] px-4 hover:bg-green4 hover:text-white bg-white text-green4   border-green4 border  ">Retour</button>
                                </Link>
                                <button className="rounded-md h-[40px] px-3 text-white bg-green4 hover:bg-white hover:text-green4   hover:border-green4 border border-transparent" type="submit"
                                >Enregistrer</button>
                            </div>
                        </form>

                    </div>
                </div>


            </div>


        </>
    )
}
export default CreateCustomer