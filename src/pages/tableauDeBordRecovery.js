

import React, { useEffect, useState, useContext } from 'react';
import CarreTableauDeBord from '../component/carreTableauDeBord';
import TitrePage from '../component/titrePage';
import pen from '../assets/icons/pen-green.svg';
import Chart from '../component/charts';
import BasicBars from '../component/BasicBars';
import Select from 'react-select';
import CircularProgress from '@mui/material/CircularProgress'; 
import { AppContext } from '../context/AuthContext';
import Modal from 'react-modal'; 
import { Button } from '@mui/material'; 
import { BASE_ENDPOINT_URL } from "../utils/Constants";


const TabelauDeBord = () => {
  const [fermes, setFermes] = useState([]);
  const [serres, setSerres] = useState([]);

  const [clicked, isClicked] = useState(false);
  const [selectedFerme, setSelectedFerme] = useState(null);
  const [selectedSerre, setSelectedSerre] = useState(null);
  const [loadingFermes, setLoadingFermes] = useState(true);
  const [loadingSerres, setLoadingSerres] = useState(false);
  const [poidsMoyenFruits, setPoidsMoyenFruits] = useState(12);
  const [editedPoidsMoyenFruits, setEditedPoidsMoyenFruits] = useState(poidsMoyenFruits);
  const [poids, setPoids] = useState('12');
  const [tiges, setTiges] = useState('0');
  const [nombreTotalTiges, setNombreTotalTiges] = useState('0');
 
  const [modalVisible, setModalVisible] = useState(false);
  const [rendementTotalKg, setRendementTotalKg] = useState('0');
  const [rendementEstimeKg, setRendementEstimeKg] = useState('0');
  const [predictions, setPredictions] = useState([]);
  const [totalFruitsDetected, setTotalFruitsDetected] = useState(0);
  const [colorPercentages, setColorPercentages] = useState({});
  const [filterClicked, setFilterClicked] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState('');
  const [modalVisiblee, setModalVisiblee] = useState(false);

  const { token } = useContext(AppContext);

  const fetchFermes = async () => {
    setLoadingFermes(true);
    try {
      const response = await fetch(`${BASE_ENDPOINT_URL}fermes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const json = await response.json();
      console.log(json);
      setFermes(json.fermes.map(f => ({ value: f.id, label: f.nom_ferme })));
    } catch (error) {
      console.error('Erreur lors de la récupération des fermes:', error);
    } finally {
      setLoadingFermes(false);
    }
  };


  useEffect(() => {
    // Recalculate 'Rendement estimé en Kg' when poidsMoyenFruits changes
    const poidsMoyenFruitsValue = parseFloat(poidsMoyenFruits) || 0;
    const totalFruitsDetectedValue = parseFloat(totalFruitsDetected) || 0;
    
    if (totalFruitsDetectedValue > 0 && poidsMoyenFruitsValue > 0) {
      const rendementEstime = (totalFruitsDetectedValue * poidsMoyenFruitsValue) / 1000;
      setRendementEstimeKg(rendementEstime.toFixed(2)); // Set the updated value
    } else {
      setRendementEstimeKg('0');
    }
  }, [poidsMoyenFruits, totalFruitsDetected]); // Dependency array includes poidsMoyenFruits
  

  useEffect((token) => {
    fetchFermes();

  }, [token]);

useEffect(() => {
    const fetchSerres = async () => {
      if (!selectedFerme) return; 
      setLoadingSerres(true); 
      try {
        console.warn(selectedFerme);
        const response = await fetch(`${BASE_ENDPOINT_URL}ferme/${selectedFerme}/serres`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          console.warn(response);
          const data = await response.json();
          console.warn(data)
          setSerres(data.map(serre => ({
            value: serre.id,    
            label: serre.name
          })));
        } else {
          console.warn(`Error: `);
          console.warn(response);
        }
      } catch (error) {
        console.warn(error);
      } finally {
        setLoadingSerres(false); 
      }
    };
  
    fetchSerres(); 
  }, [selectedFerme, token]); 
    
  const iconClick = () => {
    setEditedPoidsMoyenFruits(poidsMoyenFruits); // Set current value
    setModalVisiblee(true); // Open modal
  };

  const handleCloseModal = () => setModalVisiblee(false);

  const handleCloseModall = () => setModalVisible(false);

const handleSavePoids = () => {
    setModalVisiblee(false)
    // Vérifie que la valeur modifiée est bien un nombre valide
    const newPoidsMoyenFruits = parseFloat(editedPoidsMoyenFruits);
    if (!isNaN(newPoidsMoyenFruits)) {
      // Mettez à jour la valeur principale
      setPoidsMoyenFruits(newPoidsMoyenFruits);
      setPoids(newPoidsMoyenFruits.toString());
  
      // Ferme la popup après avoir sauvegardé
    } else {
      alert("Veuillez entrer un poids moyen valide.");
    }
  };
  
  
  const handleNombreTotalTigesChange = (e) => {
    setNombreTotalTiges(e.target.value);
  };
  


const getPrediction = async () => {
    if (!selectedFerme || !selectedSerre) return;
    try {
        const response = await fetch(`${BASE_ENDPOINT_URL}predictions?ferme_id=${selectedFerme}&serre_id=${selectedSerre}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        
        if (response.ok) {
            const res = await response.json();
            setPredictions(res);
            console.log('Predictions data:', res);

        } else {
            console.error('Failed to fetch predictions:', await response.json());
            alert('Failed to fetch predictions. Please try again later.');
        }
    } catch (error) {
        console.error('Error fetching predictions:', error);
        alert('An error occurred while fetching predictions.');
    } finally {
        setFilterClicked(false);

    }
};


  useEffect(() => {
    if ( selectedPrediction) {
      setRendementTotalKg('0');

      if (selectedPrediction.traitement_videos && selectedPrediction.traitement_videos.length > 0) {
        const traitementVideos = selectedPrediction.traitement_videos;
        const classes = traitementVideos[0].classes.slice(1);
        const stems = traitementVideos[0].stems;
        setTiges(stems);

        const totalFruitsDetected = classes.reduce((acc, value) => acc + value, 0);
        setTotalFruitsDetected(totalFruitsDetected);
        console.log('total',totalFruitsDetected)
        const colorPercentages = {
          color_1: ((classes[0] / totalFruitsDetected) * 100),
          color_2: ((classes[1] / totalFruitsDetected) * 100),
          color_3: ((classes[2] / totalFruitsDetected) * 100),
          color_4: ((classes[3] / totalFruitsDetected) * 100),
          color_5: ((classes[4] / totalFruitsDetected) * 100),
          color_6: ((classes[5] / totalFruitsDetected) * 100),
        //   color_7: ((classes[6] / totalFruitsDetected) * 100).toFixed(2),
        };
        setColorPercentages(colorPercentages);
        console.log('percentage color',colorPercentages)

        const poidsMoyenFruitsValue = parseFloat(poids) || 0;
        const rendementEstime = (totalFruitsDetected * poidsMoyenFruitsValue) / 1000;
        setRendementEstimeKg(rendementEstime);

      }
    }
  }, [filterClicked, selectedPrediction,poidsMoyenFruits,poids]);

   
    

    useEffect(() => {
        getPrediction();
        setFilterClicked(false);
      }, [selectedFerme, selectedSerre]);


    const calculateResults = (e) => {
     e.preventDefault();
        setModalVisible(true)
    
        if (selectedPrediction) {
    
          console.log("Prédiction sélectionnée:", selectedPrediction);
        } else {
          console.log("Aucune prédiction sélectionnée");
        }
        if (!selectedFerme) {
          setModalVisible(false)
    
          alert('Veuillez sélectionner une ferme avant de filtrer.');
          return;
        }
        if (!selectedSerre) {
          setModalVisible(false)
    
        }
        setFilterClicked(true);
    
    
      };




    const handleExtrapolerClick = (e) => {
        e.preventDefault()

        const nombreTotalTigesValue = parseFloat(nombreTotalTiges) || 0;
      
        if (tiges === 0) {
          setRendementTotalKg('0');
          return;
        }
      
        if (nombreTotalTigesValue === 0) {
          setRendementTotalKg('0');
          return;
        }
      
        const rendementTotal = ((nombreTotalTigesValue * rendementEstimeKg) / tiges).toFixed(2);
        setRendementTotalKg(rendementTotal); 
      };
    

    const downloadVideo = async (e,videoName) => {
        e.preventDefault();
        if (!videoName) {
            console.log('Video name is not provided, no action taken.');
            return; // Exit the function if videoName is not provided
          }
        try {
          // Define the download URL for the video
          const downloadUrl = `https://ws-tracktom.pcs-agri.com/download/${videoName}`;
      
          // Open the video in a new browser tab or window without refreshing the current page
          window.open(downloadUrl, '_blank');
        } catch (error) {
          console.error('Error opening video in browser:', error);
        }
      };
      

    return (
        <>
        <div className='flex flex-col bg-green5 '>
        <TitrePage titre={'Tableau de bord'} />

        <div className="bg-white mb-3 mt-2 border-2 border-[#BFE3C3] border-r-0 border-l-0">
        <form className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-2">
            <div className="grid grid-cols-2 gap-3">
                <div>
                <label className="text-base color-[#212529]">Fermes</label>
                <Select
                    options={fermes}
                    value={fermes.find(option => option.value === selectedFerme)}
                    onChange={(option) => setSelectedFerme(option ? option.value : null)}
                    placeholder={loadingFermes ? <CircularProgress size={20} /> : "Sélectionner une ferme"}
                    className="basic-single text-[#374151]"
                    classNamePrefix="select"
                    isLoading={loadingFermes}
                    styles={{ control: (provided) => ({ ...provided, backgroundColor: '#eef5ec' }) }}
                />
                </div>
                <div>
                <label className="text-base color-[#212529]">Serres</label>
                    <Select
                    options={serres} // Ensure serres is an array of objects { value, label }
                    value={serres.find(option => option.value === selectedSerre)} // Ensure selected value is shown
                    onChange={(option) => setSelectedSerre(option ? option.value : null)} // Handle selection
                    placeholder={loadingSerres ? <CircularProgress size={20} /> : "Sélectionner une serre"} // Show loading
                    className="basic-single text-[#374151]"
                    classNamePrefix="select"
                    isLoading={loadingSerres} // Ensure this toggles correctly
                    styles={{ control: (provided) => ({ ...provided, backgroundColor: '#eef5ec' }) }}
                    />
                </div>
            </div>
            <div className="flex gap-3 items-end ml-auto w-full justify-end">
                {/* Filtre Button */}
                <button
                className="rounded-md w-[150px] h-[40px] text-white bg-green4 hover:bg-white hover:text-green4 hover:border-green4 border border-transparent flex items-center justify-center"
                type="submit"
                onClick={calculateResults}
                >
                Filtre
                </button>
                <button
                className={`rounded-md w-[150px] h-[40px] text-white bg-green4 
                    ${!selectedPrediction ? 'cursor-not-allowed' : 'hover:bg-white hover:text-green4 hover:border-green4'} 
                    border border-transparent flex items-center justify-center`}
                disabled={!selectedPrediction || !selectedPrediction.traitement_videos || !selectedPrediction.traitement_videos.length}
                onClick={(e) => downloadVideo(e, selectedPrediction?.traitement_videos[0]?.nom_video)}
                >
                Download Vidéo
                </button>

            </div>
            </div>
        </form>
        </div>
 
         <div className='grid p-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>
              <CarreTableauDeBord>
                 <p className='font-sans text-lg mb-2'>Nombre des fruits détectés</p>
                <h1 className='font-sans text-2xl'>{totalFruitsDetected}</h1> {/* Display the number of detected fruits */}
                </CarreTableauDeBord>
                <CarreTableauDeBord icon={pen}>
                  <p className='font-sans text-lg mb-2'>Poids moyen de fruits en gr</p>
               <h1 className='font-sans text-2xl'>{poidsMoyenFruits}</h1> {/* Display the updated weight */}
                  <div className={`absolute bottom-3 right-3 ${clicked ? 'border border-black rounded-md' : ''}`}>
                        <img alt='' src={pen} className={`w-5 h-5 m-2`} onClick={iconClick} />
                 </div>
                    </CarreTableauDeBord>
                    <CarreTableauDeBord>
                        <p className='font-sans text-lg mb-2'>Rendement estimé en Kg</p>
                        <h1 className='font-sans text-2xl'>{rendementEstimeKg}</h1> {/* Display the calculated estimated yield */}
                    </CarreTableauDeBord>
                    <CarreTableauDeBord icon={pen} >
                        <p className='font-sans text-lg mb-6'>Nombre de tiges</p>
                        <h1 className='font-sans text-2xl'>{tiges}</h1>
                    </CarreTableauDeBord>
                </div>
 
                <div className='p-4 w-full'>
                    <form action=''>
                        <div className=' grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 rounded-md border-2 border-[#BFE3C3] bg-white p-4 justify-between '>
                            <input type='number'
                            value={nombreTotalTiges}
                            onChange={handleNombreTotalTigesChange}
                            placeholder='Entrer le nombre total des tiges' className='shadow  border rounded-md text-lg py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-green3   mb-0 col-span-2' />
                            <button  onClick={handleExtrapolerClick}
                                     className="shadow rounded-md  whitespace-normal h-[40px] px-4  bg-green4 text-white  hover:bg-white hover:text-green4 hover:border-green4 border border-transparent  col-span-1 flex items-center justify-center">Extrapoler</button>
                            {/* </div> */}
                            <input placeholder='Rendement total en kg'   
                             value={rendementTotalKg}
                             disabled 
                             className='shadow border rounded-md text-lg py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-green3  mb-0 col-span-2' />
                        </div>
                    </form>
                </div>












                <div className="flex flex-col xl:flex-row max-w-[2000px] gap-2 p-4">
                  {/* First div for percentage */}
                  <div className="border shadow-lg rounded-md w-[900px] min-w-[500px] flex flex-col">
                    <h4 className="p-3 w-full border-b bg-green4 rounded-t-md text-white font-semibold">
                      Répartition du rendement estimé selon la couleur des fruits (en pourcentage)
                    </h4>
                    <div className="flex flex-col items-start space-y-1 ">
                      <div className="w-full flex text-center items-center justify-center bg-[#ffff] border-2 border-[#BFE3C3] rounded-md border-t-0 rounded-t-none">
                      <Chart per={colorPercentages} totalF={totalFruitsDetected} />
                      </div>
                    </div>
                  </div>

                  {/* Second div for kilogrammes */}
                  <div className="border shadow-lg rounded-md w-[900px] min-w-[500px] flex flex-col mt-4 xl:mt-0">
                    <h4 className="p-3 border-b bg-green4 rounded-t-md text-white font-semibold">
                      Répartition du rendement estimé selon la couleur des fruits 
                    </h4>
                    <div className="flex-grow flex items-center justify-center bg-[#ffff] border-2 border-[#BFE3C3] rounded-md border-t-0 rounded-t-none">
                      <BasicBars
                        per={colorPercentages}
                        poid={poids}
                        NbrTiges={tiges}
                        totalF={totalFruitsDetected}
                        rendementEstm={rendementEstimeKg}
                        rendementTotal={rendementTotalKg}
                      />
                    </div>
                  </div>
                </div>
            </div >
            {modalVisiblee && (
                
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-2xl p-6 w-96 shadow-lg relative">
          <h2 className="text-xl font-bold text-center mb-4">Modifier le Poids moyen de fruits</h2>
  
          <input 
        //   className="mb-6"
        className='shadow border rounded-md  py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-green3  mb-3 col-span-2'
            type="number" 
            value={editedPoidsMoyenFruits} 
            onChange={(e) => setEditedPoidsMoyenFruits(e.target.value)} 
          />
          <div className="flex justify-between space-x-4">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg w-full font-bold hover:bg-green-700 transition "
              onClick={handleSavePoids}
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg w-full font-bold hover:bg-red-600 transition "
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      )}
      <Modal
        isOpen={modalVisible}
        onRequestClose={handleCloseModall} 
        contentLabel="Liste des prédictions"
         className="modal-container fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        overlayClassName="modal-overlay" 
      >
        <div className="modal-content p-6 bg-white rounded-lg shadow-xl max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Liste des prédictions</h2>
          
          <div className="predictions-list max-h-60 overflow-y-auto">
            {predictions  && predictions.length > 0 ? (
              predictions.map((prediction, index) => (
                <div
                  key={index}
                  className="prediction-item p-2 cursor-pointer hover:bg-gray-100 rounded"
                  onClick={() => {
                    setSelectedPrediction(prediction); 
                    setModalVisible(false); 
                  }}
                >
                  <p className="prediction-text text-gray-700">
                    {new Date(prediction.created_at).toLocaleString()} 
                  </p>
                </div>
              ))
            ) : (
              <p>No predictions available</p>
            )}
          </div>

          <Button
            onClick={handleCloseModall}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Fermer
          </Button>
        </div>
      </Modal>
        </>
    )
}
export default TabelauDeBord