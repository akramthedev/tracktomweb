import React from 'react'
import TitrePage from '../component/titrePage';
import { Link } from 'react-router-dom';

const Role = () => {

    const elements = [
        { titre: 'Staff', contenu: ['Voir les utilisateurs', 'Ajouter un utilisateur', 'Modifier un utilisateur', 'Supprimer un utilisateur'] },
        { titre: 'Fermes', contenu: ['Afficher les fermes', 'Ajouter une ferme', 'Modifier la ferme', 'Supprimer la ferme'] },
        { titre: 'Serres', contenu: ['Afficher les serres', 'Ajouter une serre', 'Modifier la serre', 'Supprimer la serre'] },
        { titre: 'Lines', contenu: ['Afficher les lines', 'Ajouter les lines', 'Réinitialiser les lines'] },
        { titre: 'Roles', contenu: ['Afficher les autorisations d\'accés', 'Ajouter une autorisation d\'accés', 'Modifier une autorisation d\'accés', 'Supprimer une autorisation d\'accés'] },
        { titre: 'Alertes', contenu: ['Afficher les alertes', 'Configure une alerte', 'Changer le type de notification', 'Supprimer une alerte'] },
        { titre: 'Abonnements', contenu: ['Afficher abonnement'] },

        // Ajoutez autant d'éléments que vous le souhaitez avec des contenus différents
    ];


    return (
        <>

            <TitrePage titre={'Rôles'} />
            {/*  Autorisation d'accès */}
            <div className='p-4 flex-col space-y-8'>

                <div className='border rounded-md border-green1'>
                    <div className="border-b border-green1 p-4  ">

                        <div className="flex justify-between p-2  ">
                            <h2 className='text-green4 text-2xl'>Autorisation d'accès</h2>
                            <Link to={'/roles/create'}>
                                <button type="button" className="flex items-center justify-center rounded-md whitespace-normal h-[40px] py-6 p-2 bg-green4 text-white hover:bg-white hover:text-green4   hover:border-green4 border border-transparent sm:py-0">Ajout d'un nouveau rôle</button>
                            </Link>
                        </div>
                    </div>
                    <div className='p-4 ' >
                        <table className="table w-full border-collapse border  border-green1 my-7">
                            <thead>
                                <tr className='bg-green7 border-b  border-green1  text-gray-600'>
                                    <th className="px-4 py-2 text-left font-thin ">Rôle	</th>
                                    <th className="px-4 py-2 text-left font-thin  ">Permission</th>
                                    <th className="px-4 py-2 text-left font-thin  ">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr className=' '>
                                    <td colSpan="5" className="px-4 py-10 text-center text-2xl text-gray-400 ">Aucun rôle disponible</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Role;