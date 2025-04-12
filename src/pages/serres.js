

import React, { useState, useEffect, useContext } from 'react';
import TitrePage from '../component/titrePage';
import Select from 'react-select';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from '@mui/material/CircularProgress';
import { AppContext } from '../context/AuthContext';
import { BASE_ENDPOINT_URL } from "../utils/Constants";
import axios from 'axios';
import "./index.css";

function Serres() {
  const { token } = useContext(AppContext);

  const [serres, setSerres] = useState([]);
  const [fermes, setFermes] = useState([]);
  const [nomSerre, setNomSerre] = useState('');
  const [selectedFerme, setSelectedFerme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingFermes, setLoadingFermes] = useState(true);
  const [error, setError] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editSerre, setEditSerre] = useState(null);
  const [newName, setNewName] = useState('');
  const [newFerme, setNewFerme] = useState('');
  const [nameExists, setNameExists] = useState(false);  
  const validerRequete = (champs = {}) => {
    if (!token) {
      alert('Aucun token d\'authentification trouvé. Veuillez vous reconnecter.');
      return false;
    }
    
    if (champs.nomSerre && !champs.nomSerre.trim()) {
      setError('Le nom de la serre est requis');
      return false;
    }
    
    if (champs.selectedFerme && !champs.selectedFerme) {
      setError('Veuillez sélectionner une ferme');
      return false;
    }
    
    return true;
  };


  
  const handleEditClick = (serre) => {
    setEditSerre(serre);
    setNewName(serre.name);
    setNewFerme(serre.ferme_id);
    setIsModalVisible(true);
  };

  
const handleClosePopup = () => {
  setNameExists(false);  
};




  const getFermes = async () => {
    setLoadingFermes(true);
    setLoading(true); 
    try {
      const response = await axios.get(`${BASE_ENDPOINT_URL}fermes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      console.log(response.data.fermes);
      const fermesOptions = response.data.fermes.map(f => ({ 
        value: f.id, 
        label: f.nom_ferme 
      }));
      
      const allSerres = response.data.fermes.flatMap(ferme => 
        ferme.serres.map(serre => ({
          ...serre,
          nom_ferme: ferme.nom_ferme,
          ferme_id: ferme.id
        }))
      );
  
      console.warn(fermesOptions);
      console.warn(allSerres);

      setFermes(fermesOptions);
      setSerres(allSerres);

      
    } catch (error) {
      console.error('Erreur récupération fermes:', error);
      setError('Échec du chargement des données');
    } finally {
      setLoading(false);
      setLoadingFermes(false);
    }
  };




  const handleSave = async (e) => {

    e.preventDefault();
    
    if (!validerRequete({ nomSerre, selectedFerme })) return;

    try {
      await axios.post(
        `${BASE_ENDPOINT_URL}serres/`,
        { ferme_id: selectedFerme, name: nomSerre, superficie : 0 },
        { headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        }}
      );
 
 
      setNomSerre('');
      getFermes();;
      
    } catch (error) {
      console.error(error);
      let message = 'Erreur lors de la sauvegarde';
      if (error.response?.status === 401) {
        message = 'Session expirée. Veuillez vous reconnecter.';
      } else if (error.response?.status === 409) {
        message = 'Une serre avec ce nom existe déjà dans cette ferme';
      }
      setError(message);
    }
  };

  const deleteSerre = async (serreId) => {
    if (!validerRequete()) return;
    
    try {
      await axios.delete(`${BASE_ENDPOINT_URL}serres/${serreId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getFermes();;
    } catch (error) {
      let message = 'Échec de la suppression';
      if (error.response?.status === 404) {
        message = 'Serre non trouvée';
      }
      setError(message);
      console.error('Erreur suppression:', error);
    }
  };

  const handleUpdate = async () => {
    if (!editSerre?.id || !newName || !newFerme) {
      setError('Veuillez remplir tous les champs requis');
      return;
    }

    try {
      // Vérification doublon
      const checkRes = await axios.post(
        `${BASE_ENDPOINT_URL}serres/check-duplicate`,
        { 
          ferme_id: newFerme, 
          name: newName,
          exclude_id: editSerre.id 
        },
        { headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        }}
      );

      if (checkRes.data.exists) {
        setNameExists(true);
        return;
      }

      // Mise à jour
      await axios.put(
        `${BASE_ENDPOINT_URL}serres/${editSerre.id}`,
        { name: newName, ferme_id: newFerme },
        { headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        }}
      );

      setIsModalVisible(false);
      setEditSerre(null);
      getFermes();;
      
    } catch (error) {
      let message = 'Erreur lors de la mise à jour';
      if (error.response?.status === 404) {
        message = 'Serre non trouvée';
      } else if (error.response?.status === 409) {
        message = 'Une serre avec ce nom existe déjà';
      }
      setError(message);
      console.error('Erreur mise à jour:', error);
    }
  };
  

  useEffect(() => {
    if(token){
      getFermes();
    }
  }, [token]);



  
  return (
    <>
      <div className={loading ? "popup-overlay popup-overlayvisible" : "popup-overlay"}>
        <div class="loader"></div>
      </div>
      <TitrePage titre={'Carte des Serres'} />
      <div className="grid grid-cols-1 p-4 space-y-4">
        <div className="border shadow-lg rounded-md">
          <h4  style={{background : "#68a46c"}} className="p-3 border-b   rounded-t-md text-white font-semibold">
            Créer une nouvelle Serre
          </h4>
          <div className="flex flex-col items-start space-y-1">
            <div className="w-full">
              <form id="farms" onSubmit={handleSave}>
                <div className="grid grid-cols-1 md:grid-cols-4 space-y-4 p-4">
                  <div  style={{display : "flex", alignItems :"flex-end"}}  className='col-span-3 grid sm:grid-cols-3 gap-3'>
                  <div className="col-span-1">
                      <label className='text-green2 opacity-90' htmlFor="ferme">
                        Ferme
                      </label>
                      <Select
                        options={fermes}
                        value={fermes.find(option => option.value === selectedFerme)}
                        onChange={(option) => {setError("");setSelectedFerme(option ? option.value : null)}}
                        placeholder={loadingFermes ? <CircularProgress size={20} /> : "Sélectionner une ferme"}
                        className="basic-single text-gray-400"
                        classNamePrefix="select"
                        isLoading={loadingFermes}
                      />
                    </div>
                    <div className="col-span-1">
                      <label className='text-green2 opacity-90' htmlFor='name'>
                        Serre
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={nomSerre}
                        onChange={(e) =>{ setError("");setNomSerre(e.target.value)}}
                        className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3"
                        placeholder="Entre le nom de la serre"
                        required
                      />
                    </div>
                    <button style={{background : "rgb(218, 255, 220)",borderWidth : 1, borderColor : "rgb(153, 205, 157)", fontWeight : 600, height : 44 ,color : "rgb(85, 148, 90)", width : 160, fontSize : 16}}  type="submit" className="rounded-md h-9  px-3   hover:bg-white hover:text-green4   border border-transparent">
                        Enregistrer
                      </button>                    
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="border shadow-lg rounded-md col-span-2">
          <h4  style={{background : "#68a46c"}} className="p-3 border-b bg-green4 rounded-t-md text-white font-semibold">Serres</h4>
          <div className="flex flex-col items-start p-3 space-y-1">
            <div className="w-full">
              <table className="table w-full border-collapse border border-green1">
                <thead>
                  <tr className='bg-green7 border-b border-green1 text-gray-600'>
                  <th className="px-4 py-2 text-left font-thin">Ferme</th>
                    <th className="px-4 py-2 text-left font-thin">Serre</th>
                   
                    <th className="px-4 py-2 text-left font-thin">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        <CircularProgress />
                      </td>
                    </tr>
                  ) : (

                    <>
                    {
                      serres.length === 0 ? 
                      <tr>
                        <td colSpan="4" className="px-4 py-10 text-center text-xl text-gray-400">
                          Aucune donnée
                        </td>
                      </tr>
                    
                      :
                      serres.map(serre => (
                        <tr key={serre.id} className="text-left border-b border-green1">
                          <td className="px-4 py-2">{serre.nom_ferme}</td>
                          <td className="px-4 py-2">{serre.name}</td>
                          
                          <td className="px-4 py-2">
                            <button 
                            className='text-yellow-500'
                            onClick={() => handleEditClick(serre)}>
                              <EditIcon />
                            </button>
                            <button
                              className="text-red-500 ml-2"
                              onClick={() => deleteSerre(serre.id)}
                            >
                              <DeleteIcon />
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-6 w-96">
            <h3 className="text-xl mb-4">Modifier la Serre</h3>
            <label htmlFor="edit-name">Nom de Serre</label>
            <input
              id="edit-name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
            />
            <label htmlFor="edit-ferme">Ferme</label>
            <Select
              options={fermes}
              value={fermes.find(option => option.value === newFerme)}
              onChange={(option) => setNewFerme(option ? option.value : null)} // Update the ferme id for editing
            />
            <div className="mt-4 flex justify-between">
              <button onClick={() => setIsModalVisible(false)} className="bg-gray-300 px-4 py-2 rounded-md">
                Annuler
              </button>
              <button onClick={handleUpdate} className="bg-green4 px-4 py-2 rounded-md text-white">
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {nameExists && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 space-y-4">
                <h3 className="text-lg text-red-500 font-semibold">Nom de serre déjà trouvé</h3>
                <p className="text-sm text-gray-600">Le nom de la serre existe déjà a ce ferme, veuillez en choisir un autre.</p>
                <div className="flex justify-end">
                    <button
                        onClick={handleClosePopup}
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
}

export default Serres;
