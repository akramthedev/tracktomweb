import { useState, useEffect, useContext } from 'react';
import TitrePage from '../component/titrePage';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AppContext } from '../context/AuthContext';
import { BASE_ENDPOINT_URL } from "../utils/Constants";
import axios from 'axios';
import "./index.css";

const CarteDesFermes = () => {
    const { token } = useContext(AppContext);
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
                nom_ferme: '',
                surface: 0,
                commune: 'AGADIR'
            });
    const [currentFarm, setCurrentFarm] = useState(null);
    const [newName, setNewName] = useState('');
    const [newSurface, setNewSurface] = useState('');
    const [newCommune, setNewCommune] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [nameExists, setNameExists] = useState(false); 

    const fetchFarms = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_ENDPOINT_URL}fermes`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            console.log(response.data.fermes);
            setFarms(response.data.fermes);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
    };

    useEffect(() => {
        if(token){
            fetchFarms();
        }
    },[token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

  
    

    


    // Common validation function
const validateRequest = (token, fields = {}) => {
    if (!token) {
        alert('Vous devez etre connecté pour pouvoir créer une ferme.');
        return false;
    }
    
    // Check for required fields in create/update operations
    if (fields.hasOwnProperty('nom_ferme') && !fields.nom_ferme.trim()) {
        alert('Le nom de la ferme ne peux pas etre vide.');
        return false;
    }
    
    if (fields.hasOwnProperty('surface')) {
        const surfaceValue = parseFloat(fields.surface);
        if (isNaN(surfaceValue)) {
            alert('La surface doit etre un nombre correct.');
            return false;
        }
    }
    
    return true;
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const { nom_ferme, surface, commune } = formData;
    
    // Validation checks
    if (!validateRequest(token, { nom_ferme, surface })) return;

    try {
        await axios.post(`${BASE_ENDPOINT_URL}fermes`, 
            { nom_ferme, surface: parseFloat(surface), commune },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        );
        fetchFarms();
        setFormData({ nom_ferme: '', surface: '', commune: '' });
    } catch (error) {
        let errorMessage = "Oups, une erreur est survenue lors de l'enregistrement.";
        if (error.response) {
            if (error.response.status === 401) {
                errorMessage = 'Session expired. Please login again.';
            } else if (error.response.status === 400) {
                errorMessage = 'Invalid data submitted. Please check your inputs.';
            }
        }
        setError(errorMessage);
        console.error('Submission error:', error);
    }
};

const handleDeleteClick = async (id) => {
    if (!validateRequest(token)) return;
    if (!id) {
        alert('Invalid farm ID');
        return;
    }
    setLoading(true);

    try {
        await axios.delete(`${BASE_ENDPOINT_URL}fermes/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        setFarms(farms.filter((farm) => farm.id !== id));
        setLoading(false);
    } catch (error) {
        setLoading(false);
        let errorMessage = "Oups, une erreur est survenue lors de la suppression de la ferme";
        if (error.response?.status === 404) {
            errorMessage = 'Oups, une erreur est survenue lors de la suppression de la ferme';
        }
        alert(errorMessage);
        console.error('Delete error:', error);
    }

};

const handleUpdate = (farm) => {
    setCurrentFarm(farm);
    setNewName(farm.nom_ferme);
    setNewSurface(farm.surface.toString());
    setNewCommune(farm.commune);
    setIsModalVisible(true);
};




const handleSave = async () => {
    if (!currentFarm?.id) {
        alert('No farm selected for update');
        return;
    }

    setLoading(true);
    
    const updateData = {
        nom_ferme: newName,
        surface: newSurface,
        commune: newCommune
    };
    
    if (!validateRequest(token, updateData)) return;

    try {
        await axios.put(
            `${BASE_ENDPOINT_URL}fermes/${currentFarm.id}`,
            { ...updateData, surface: parseFloat(updateData.surface) },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        );

        setFarms(farms.map((farm) =>
            farm.id === currentFarm.id ? { 
                ...farm, 
                ...updateData,
                surface: parseFloat(updateData.surface)
            } : farm
        ));
        
        setIsModalVisible(false);
        setCurrentFarm(null);
        setNewName('');
        setNewSurface('');
        setNewCommune('');
    } catch (error) {
        let errorMessage = "Oups, une erreur est survenue lors de la modification de la ferme";
        if (error.response) {
            if (error.response.status === 401) {
                errorMessage = "Oups, une erreur est survenue lors de la modification de la ferme";
            } else if (error.response.status === 404) {
                errorMessage = "Oups, une erreur est survenue lors de la modification de la ferme";
            }
        }
        alert(errorMessage);
        console.error('Update error:', error);
    } finally{
        setLoading(false);
    }
};








    return (
        <>
            <div className={loading ? "popup-overlay popup-overlayvisible" : "popup-overlay"}>
                <div class="loader"></div>
            </div>
            <TitrePage titre={'Fermes'} />
            <div className='grid grid-cols-1 p-4 space-y-4'>
                <div className="border shadow-lg rounded-md">
                    <h4  style={{background : "#68a46c"}} className="p-3 border-b rounded-t-md text-white font-semibold">Créer une nouvelle ferme</h4>
                    <div className="flex flex-col items-start space-y-1">
                        <div className="w-full">
                            <form id="farms" onSubmit={handleSubmit}>
                                <div className="">
                                    <div className=''>
                                        <div className="col-span-1" style={{ display : "flex", alignItems : "center", justifyContent : "flex-start", width : "100%", height : "75px", paddingLeft : "1rem" }} >
                                            <input
                                                type="text"
                                                name="nom_ferme"
                                                id="name"
                                                value={formData.nom_ferme}
                                                onChange={handleChange}
                                                style={{
                                                    height : 44, 
                                                    borderWidth : 1, 
                                                    borderColor : "rgb(153, 205, 157)", 
                                                    marginRight : "1rem", 
                                                    width : "200px"
                                                }}
                                                className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3"
                                                placeholder="Entrez le nom de la ferme"
                                                required
                                            />
                                            <button style={{background : "rgb(218, 255, 220)",borderWidth : 1, borderColor : "rgb(153, 205, 157)", fontWeight : 600, height : 44 ,color : "rgb(85, 148, 90)", width : 160, fontSize : 16}}  type="submit" className="rounded-md h-9  px-3   hover:bg-white hover:text-green4   border border-transparent">Enregistrer</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="border shadow-lg rounded-md col-span-2">
                    <h4  style={{background : "#68a46c"}}  className="p-3 border-b  rounded-t-md text-white font-semibold">Fermes</h4>
                    <div className="flex flex-col items-start p-3 space-y-1">
                        <div className="w-full">
                            {error && <div className="text-red-500 mb-3">Error: {error}</div>}
                            <table className="table w-full border-collapse border border-green1">
                                <thead>
                                    <tr className='bg-green7 border-b border-green1 text-gray-600'>
                                        <th className="px-4 py-2 text-left font-thin">Nom</th>
                                        <th className="px-4 py-2 text-left font-thin">Surface</th>
                                        <th className="px-4 py-2 text-left font-thin">Commune</th>
                                        <th className='px-4 py-2 text-left font-thin'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="4" className="px-4 py-10 text-center text-2xl text-gray-400">
                                                <div className="flex justify-center items-center">
                                                    <svg aria-label="Loading" className="animate-spin h-8 w-8 text-green4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                                    </svg>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        farms.length > 0 ? (
                                            farms.map(farm => (
                                                <tr key={farm.id} className="border-b border-green1">
                                                    <td className="border-green1 border-r px-4 py-2">{farm.nom_ferme}</td>
                                                    <td className="border-green1 border-r px-4 py-2">{farm.surface}</td>
                                                    <td className="border-green1 border-r px-4 py-2">{farm.commune}</td>
                                                    <td className='border-green1 px-4 py-2 flex space-x-2'>
                                                        <button onClick={() => handleDeleteClick(farm.id)} className='text-red-500'>
                                                            <DeleteIcon />
                                                        </button>
                                                        <button onClick={() => handleUpdate(farm)} className='text-yellow-500'>
                                                            <EditIcon />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-4 py-10 text-center text-xl text-gray-400">
                                                    Aucune donnée
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {isModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div style={{ width : "450px" }} className="bg-white rounded-lg p-6 space-y-4">
                        <h3 className="text-lg  font-semibold" style={{ color : "#68a46c" }} >Modifier la ferme</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nom de la ferme</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Surface</label>
                            <input
                                type="text"
                                value={newSurface}
                                onChange={(e) => setNewSurface(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Commune</label>
                            <input
                                type="text"
                                value={newCommune}
                                onChange={(e) => setNewCommune(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleSave}
                                style={{
                                    background : "#68a46c", 
                                    fontWeight : '500', 

                                }}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Sauvegarder
                            </button>
                            <button
                                style={{
                                    background : "gainsboro", 
                                    fontWeight : '500', 
                                }}
                                onClick={() => setIsModalVisible(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {nameExists && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 space-y-4">
                            <h3 className="text-lg text-red-500 font-semibold">Nom de ferme déjà trouvé</h3>
                            <p className="text-sm text-gray-600">Le nom de la ferme existe déjà, veuillez en choisir un autre.</p>
                            <div className="flex justify-end">
                                <button
                                    onClick={()=>{setNameExists(false)}}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
};

export default CarteDesFermes;
