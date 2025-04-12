import React from 'react'
import TitrePage from './titrePage';
import { Link } from 'react-router-dom';

const CreateAutorisation = () => {

    const elements = [
        { titre:'Staff' ,contenu: ['Voir les utilisateurs','Ajouter un utilisateur','Modifier un utilisateur','Supprimer un utilisateur'] },
        { titre:'Fermes' , contenu: ['Afficher les fermes','Ajouter une ferme','Modifier la ferme','Supprimer la ferme'] },
        { titre:'Serres' , contenu: ['Afficher les serres','Ajouter une serre','Modifier la serre','Supprimer la serre'] },
        { titre:'Lines' , contenu: ['Afficher les lines','Ajouter les lines','Réinitialiser les lines'] },
        { titre:'Roles' , contenu: ['Afficher les autorisations d\'accés','Ajouter une autorisation d\'accés','Modifier une autorisation d\'accés','Supprimer une autorisation d\'accés'] },
        { titre:'Alertes' , contenu: ['Afficher les alertes','Configure une alerte','Changer le type de notification','Supprimer une alerte'] },
        { titre:'Abonnements' , contenu: ['Afficher abonnement'] },

        // Ajoutez autant d'éléments que vous le souhaitez avec des contenus différents
      ];


    return (

        <>
        <TitrePage titre={'Rôles'} />
            <div className='p-4 flex-col space-y-8'>

                <div className='border   rounded-md  gap-4   ' >
                    <div className='text-green4 text-xl border-b   col-span-3 w-full p-4 '>
                        Ajouter un nouveau autorisations d'accès
                    </div>
                    <form action='' method='POST'>
                    <div className="p-4 space-y-2 grid grid-cols-2">
                        <label htmlFor='farm_id' className='col-span-2  text-gray-600' >Nom de rôle
                            <span className='text-red-600'> *</span>
                        </label>
                        <input type="text" name="farm_id" id="name" className=" border-green-100 shadow appearance-none border rounded-md   py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3 col-span-1" placeholder="" required="" />
                    </div>
                    <div className='p-4 grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        {elements && elements.map((element, index1) => (
                        <div key={index1} className="border  shadow-lg rounded-md  ">
                            <h4 className="p-3 border-b bg-green4 rounded-t-md text-white font-semibold ">{element.titre}</h4>
                            <div className="flex flex-col items-start p-3 space-y-1">
                                {element.contenu.map((contenu, index2) => (
                                    <div className="w-full " key={index2}>
                                        <input
                                            type="checkbox"
                                            id={`myCheckbox${index1}-${index2}`}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label
                                            htmlFor={`myCheckbox${index1}-${index2}`}
                                            className="ml-2 text-gray-600">
                                            {contenu}
                                        </label>
                                    </div>))
                                }
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="flex   justify-end gap-5 p-4 border-t sticky  bg-white bottom-0">
                            
                       <Link to={'/roles'}>
                       <button className="flex items-center justify-center rounded-md whitespace-normal h-[40px] px-4 hover:bg-green4 hover:text-white bg-white text-green4   border-green4 border  ">Retour</button>
                       </Link>
                        <button className="rounded-md h-[40px] px-3 text-white bg-green4 hover:bg-white hover:text-green4   hover:border-green4 border border-transparent" type="submit"
                        >Enregistrer</button>
                    </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default CreateAutorisation;