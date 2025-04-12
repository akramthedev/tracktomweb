import React, { useState, useEffect, useContext } from 'react'; 
import TitrePage from '../component/titrePage';
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa"; // Importing FaTrash for delete icon
import axios from 'axios';
import { AppContext } from '../context/AuthContext';
import { BASE_ENDPOINT_URL } from "../utils/Constants";

const Utilisateur = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusLoading, setStatusLoading] = useState(null); // For status change loading
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, userId: null }); // Manage delete confirmation
    const { token } = useContext(AppContext);
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true); 
                const response = await axios.get(`${BASE_ENDPOINT_URL}admins`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('Fetched users:', response.data.admins);
                setUsers(response.data.admins); 
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUsers();
    }, [token]);
    

    const toggleStatus = async (userId) => {
        setStatusLoading(userId); // Show loading spinner for this user
        try {
            const response = await axios.put(`${BASE_ENDPOINT_URL}users/${userId}/status`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const updatedStatus = response.data.is_active;

            // Update the state for this specific user
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user.id === userId ? { ...user, is_active: updatedStatus } : user
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
            setError(error.response ? error.response.data.message : error.message);
        } finally {
            setStatusLoading(null); // Stop loading after request is done
        }
    };

    const confirmDeleteUser = (userId) => {
        setDeleteConfirm({ open: true, userId });
    };

    const deleteUser = async () => {
        const { userId } = deleteConfirm;
        setDeleteConfirm({ open: false, userId: null }); // Close the popup
        try {
            await axios.delete(`${BASE_ENDPOINT_URL}users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update the state to remove the deleted user
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <>
            <TitrePage titre={'Gestion des clients'} />
            <div className='p-4 space-y-8'>
                <div className='border rounded-md border-green1'>
                    <div className="border-b border-green1 p-4">
                        <div className="p-2 items-center grid grid-cols-3 sm:grid-cols-6 md:grid-cols-3 lg:grid-cols-6">
                            <h2 className='text-green4 text-2xl'>Gestion des clients</h2>
                        </div>
                    </div>
                    <div className='p-4'>
                        {loading ? (
                            <div className="text-center text-gray-500">Loading...</div>
                        ) : error ? (
                            <div className="text-center text-red-500">{error}</div>
                        ) : (
                            <table className="table w-full border-collapse border border-green1 my-7">
                                <thead>
                                    <tr className='bg-green7 border-b border-green1 text-gray-600'>
                                        <th className="px-4 py-2 text-left font-thin">Nom</th>
                                        <th className="px-4 py-2 text-left font-thin">Email</th>
                                        <th className="px-4 py-2 text-left font-thin">Status</th>
                                        <th className="px-4 py-2 text-left font-thin">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map(user => (
                                            <tr key={user.id}>
                                                <td className="px-4 py-2">{user.name}</td>
                                                <td className="px-4 py-2">{user.email}</td>
                                                <td className="px-4 py-2">
                                                    {user.is_active ? 'Active' : 'Inactive'}
                                                </td>
                                                <td className="px-4 py-2 flex space-x-2"> {/* Added flex for space between buttons */}
                                                    <button
                                                        className={`px-3 py-1 rounded-md ${user.is_active ? 'bg-green-500' : 'bg-red-500'}`}
                                                        onClick={() => toggleStatus(user.id)} 
                                                        disabled={statusLoading === user.id} // Disable button while loading
                                                    >
                                                        {statusLoading === user.id ? (
                                                            <span className="loader"></span> // Loading spinner
                                                        ) : (
                                                            user.is_active ? (
                                                                <FaCheck className="text-white" />
                                                            ) : (
                                                                <FaTimes className="text-white" />
                                                            )
                                                        )}
                                                    </button>
                                                    <button
                                                        className="px-3 py-1 rounded-md bg-red-500"
                                                        onClick={() => confirmDeleteUser(user.id)} 
                                                    >
                                                        <FaTrash className="text-white" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-4 py-10 text-center text-2xl text-gray-400">
                                                Aucun client disponible
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Popup */}
            {deleteConfirm.open && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md">
                        <p className="text-gray-700">Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                                onClick={deleteUser}
                            >
                                Supprimer
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-md"
                                onClick={() => setDeleteConfirm({ open: false, userId: null })}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Utilisateur;
