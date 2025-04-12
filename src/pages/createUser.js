import React, { useState } from 'react'
import TitrePage from '../component/titrePage'
import { Link } from 'react-router-dom';
import PasseWord from '../component/passeword';

const CreateUser = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };
    return (
        <>
            <TitrePage titre={'Gestion des clients'} />
            <div className='mx-auto my-auto grid grid-cols-3  '>

                <div className="  w-auto  p-4 col-span-3 lg:col-span-2    ">
                    {/*================content ===========================*/}
                    <div className="border  rounded-lg   flex flex-col w-full col-span-1 "  >
                        {/*header*/}
                        <div className="flex items-center justify-between px-5 py-3  border-b-2  border-solid border-green3 rounded-t text-green4">
                            <h3 className="text-2xl    ">
                                Ajouter un nouvel utilisateur
                            </h3>
                        </div>
                        <form id="farms" action="" method="POST">
                            {/*body*/}
                            <div className="relative p-4 flex-auto">
                                <div className=" ">
                                    <div className="grid grid-cols-1 space-y-4">
                                        <div className="">
                                            <label htmlFor='farm_id' >Nom et prénom
                                                <span className='text-red-600'> *</span>
                                            </label>
                                            <input type="text" name="farm_id" id="name" className=" border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3 " placeholder="Nom et prénom " required="" />
                                        </div>
                                        <div className="form-group">
                                            <label  >Adresse email
                                                <span className='text-red-600'> *</span>
                                            </label>
                                            <input type="text" name="variety" id="calculated-perimeter" className=" border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3" placeholder="Adresse email" required="" />
                                        </div>
                                        <div className=" ">
                                            <label htmlFor="calculated-area">Rôle
                                                <span className='text-red-600'> *</span>
                                            </label>
                                            <select id="" className=" shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3"></select>



                                        </div>
                                        <div className=" ">
                                            <label  >Mot de passe
                                            <span className='text-red-600'> *</span>
                                            </label>
                                            <div className="relative py-2">
                                                <input
                                                    placeholder=""
                                                    type={showPassword ? 'text' : 'password'}
                                                    className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3"
                                                />
                                                <PasseWord togglePasswordVisibility={togglePasswordVisibility} showPassword={showPassword} />
                                            </div>
                                        </div>
                                        <div className=" ">
                                            <label  >Confirmer Mot de passe
                                                <span className='text-red-600'> *</span>
                                            </label>
                                            <div className="relative py-2">
                                                <input
                                                    placeholder=""
                                                    type={showPassword2 ? 'text' : 'password'}
                                                    className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3"
                                                />
                                                <PasseWord togglePasswordVisibility={togglePasswordVisibility2} showPassword={showPassword2} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-start p-2 px-5 border-t-2 border-solid border-green3 rounded-b gap-3">
                                <Link to={'/staff'}>
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
export default CreateUser