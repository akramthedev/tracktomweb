import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AuthContext';
import axios from "axios";
import "./dashboard.css";
import DashboardCharts from './DashboardCharts';
import CarreTableauDeBord from '../component/carreTableauDeBord';
import TitrePage from '../component/titrePage';
import pen from '../assets/icons/pen-green.svg';
import Chart from '../component/charts';
import BasicBars from '../component/BasicBars';
import Select from 'react-select';
import CircularProgress from '@mui/material/CircularProgress'; 
import Modal from 'react-modal'; 
import { Button } from '@mui/material'; 
import { BASE_ENDPOINT_URL } from "../utils/Constants";
import Leaf from "./leaf0.png";
import Weight from './weight1.png';
import Tomato from './tomato.png';

const ENDPOINT_URL = "https://track-tom.pcs-agri.com/api/";
const DOWNLOAD_URL = "https://ws-tracktom.pcs-agri.com/download/";


const classColors = {
  classe_A: "#5D9B4B",  
  classe_B: "#8DC63F", 
  classe_C: "#B9D92D", 
  classe_D: "#FFA500",  
  classe_E: "#FF4D00",  
  classe_F: "#D32F2F",  
};


function formatNumbers(number) {
  const parsedNumber = parseInt(number, 10);
  if (isNaN(parsedNumber)) {
    return "0";  
  }
  if (parsedNumber < 1000) {
    return parsedNumber.toString();
  }
  if (parsedNumber >= 1000 && parsedNumber <= 49999) {
    return parsedNumber;
  }
  if (parsedNumber >= 50000 && parsedNumber <= 999999) {
    return parsedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  if (parsedNumber >= 1000000 && parsedNumber <= 999999999) {
    const millions = (parsedNumber / 1000000).toFixed(1);  
    return `${millions.replace(/\.0$/, "")}M`;  
  }
  if (parsedNumber >= 1000000000) {
    const billions = (parsedNumber / 1000000000).toFixed(1);  
    return `${billions.replace(/\.0$/, "")}B`; 
  }
  return parsedNumber.toString();
}


function formatPoids(kg, typeOfDashboard) {
  if (typeOfDashboard === 'Bar') {
    if (!kg || isNaN(kg)) {
      return '0 Kg';
    }
    let KKGG = parseFloat(kg);
    if (KKGG >= 500) {
      return (KKGG / 1000).toFixed(2).replace('.', ',') + ' t';
    } else if (KKGG < 1) {
      return KKGG.toFixed(3).replace('.', ',') + ' Kg';
    }
    else if (KKGG < 10) {
      return KKGG.toFixed(1).replace('.', ',') + ' Kg';
    }
    else if (KKGG < 499) {
      return KKGG.toFixed(1).replace('.', ',') + ' Kg';
    } else {
      return KKGG.toFixed(2).replace('.', ',') + ' Kg';
    }
  } else {
    return kg;
  }
}




const TabelauDeBord = () => {


    const [FINALSTATES, setFINALSTATES] = useState(null);
    const [clicked, isClicked] = useState(false);
    const [selectedFerme, setSelectedFerme] = useState(null);
    const [selectedSerre, setSelectedSerre] = useState(null);
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
    const [isSClicked, setisSClicked] = useState(false);
    const [unitéChoisie, setUnitéChoisie] = useState("kilogramme");
    const [unitéChoisieValue, setunitéChoisieValue] = useState(1);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [chartType, setChartType] = useState("Pie");
    const [selectedFarmIndex, setSelectedFarmIndex] = useState(-1);
    const [selectedGreenhouseIndex, setSelectedGreenhouseIndex] = useState(-1);
    const [NameSelectedFarm, setNameSelectedFarm] = useState("");
    const [NameSelectedSerre, setNameSelectedSerre] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);

    const [fermesOptions, setFermesOptions] = useState([]);
    const [serresOptions, setSerresOptions] = useState([]);
    const [predictionsOptions, setPredictionsOptions] = useState([]);


    const [tomatoColors, setTomatoColors] = useState({
      classe_A: 0,
      classe_B: 0,
      classe_C: 0,
      classe_D: 0,
      classe_E: 0,
      classe_F: 0
    });
    const [IsPopUp___Predictions___Visibile, setIsPopUp___Predictions___Visibile] = useState(false);
    const [selectedPredictions, setSelectedPredictions] = useState([]);
    const [selectedPredictionId, setSelectedPredictionId] = useState(null);
    const [selectedPredictionVideo, setselectedPredictionVideo] = useState(null);
    const [NameSelectedPrediction, setNameSelectedPrediction] = useState("all");
    const [rawTomatoCounts, setRawTomatoCounts] = useState({
      classe_A: 0,
      classe_B: 0,
      classe_C: 0,
      classe_D: 0,
      classe_E: 0,
      classe_F: 0
    });
    const [isLoadingCustomizingData, setIsLoadingCustomizingData] = useState(false);
    const defaultData = {
      totalTomatoes: 0,
      totalTomatoesNumber: 0, 
      plants: 0,
      tomatoColors: {
        classe_A: 0,
        classe_B: 0,
        classe_C: 0,
        classe_D: 0,
        classe_E: 0,
        classe_F: 0
      },
      rawTomatoCounts: { 
        classe_A: 0, 
        classe_B: 0, 
        classe_C: 0, 
        classe_D: 0, 
        classe_E: 0, 
        classe_F: 0 
      }
    };


    const combineGreenhouseData = (greenhouse, predictionId) => {
      if (!greenhouse.predictions?.length) return JSON.parse(JSON.stringify(defaultData));
      if (predictionId) {
        const prediction = greenhouse.predictions.find(p => p.id === predictionId);
        if (!prediction) return JSON.parse(JSON.stringify(defaultData));
        const predictionColors = prediction.tomatoColors || {};
        const rawCounts = prediction.rawTomatoCounts || {};
        return {
          totalTomatoes: prediction.totalTomatoes || 0,
          totalTomatoesNumber: prediction.totalTomatoesNumber || 0, 
          plants: prediction.plants || 0,
          tomatoColors: Object.fromEntries(
            Object.entries(predictionColors).map(([key, val]) =>
              [key, typeof val === 'number' ? val : 0]
            )
          ),
          rawTomatoCounts: Object.fromEntries(
            Object.entries(rawCounts).map(([key, val]) =>
              [key, typeof val === 'number' ? val : 0]
            )
          )
        };
      }
      return greenhouse.predictions.reduce((acc, prediction) => {
        const predColors = prediction.tomatoColors || {};
        const predRawCounts = prediction.rawTomatoCounts || {};
        acc.plants += Number(prediction.plants) || 0;
        acc.totalTomatoes += Number(prediction.totalTomatoes) || 0;
        acc.totalTomatoesNumber += Number(prediction.totalTomatoesNumber) || 0;  
        Object.keys(acc.tomatoColors).forEach(key => {
          acc.tomatoColors[key] += Number(predColors[key]) || 0;
        });
        Object.keys(acc.rawTomatoCounts).forEach(key => {
          acc.rawTomatoCounts[key] += Number(predRawCounts[key]) || 0;
        });
        return acc;
      }, JSON.parse(JSON.stringify(defaultData)));
    };



    const combineFarmData = (farm) => {
      if (!farm.serres?.length) return defaultData;
      return farm.serres.reduce((acc, serre) => {
        const greenhouseData = combineGreenhouseData(serre);
        acc.plants += greenhouseData.plants;
        acc.totalTomatoes += greenhouseData.totalTomatoes;
        acc.totalTomatoesNumber += greenhouseData.totalTomatoesNumber;  
        Object.keys(acc.rawTomatoCounts).forEach(key => {
          acc.rawTomatoCounts[key] += greenhouseData.rawTomatoCounts[key];
        });
        Object.keys(acc.tomatoColors).forEach(key => {
          acc.tomatoColors[key] += greenhouseData.tomatoColors[key];
        });
        return acc;
      }, JSON.parse(JSON.stringify(defaultData)));
    };




    
  
    const combineAllData = (data) => {
      return data.reduce((acc, farm) => {
        const farmData = combineFarmData(farm);
        acc.plants += farmData.plants;
        acc.totalTomatoes += farmData.totalTomatoes;
        acc.totalTomatoesNumber += farmData.totalTomatoesNumber;  
        Object.keys(acc.rawTomatoCounts).forEach(key => {
          acc.rawTomatoCounts[key] += farmData.rawTomatoCounts[key];
        });
        Object.keys(acc.tomatoColors).forEach(key => {
          acc.tomatoColors[key] += farmData.tomatoColors[key];
        });
        return acc;
      }, JSON.parse(JSON.stringify(defaultData)));
    };


    function RETURN__MERGED__DATA__OF__Farms__AND__PREDICTIONS(farmsResponse, predictionsResponse) {
      if (!farmsResponse || !predictionsResponse) {
        return [];
      }
      return farmsResponse.map((farm) => {
        const totalPredictionsForFarm = predictionsResponse.filter(
          (p) => parseInt(p.ferme_id) === parseInt(farm.id)
        ).length;
        const greenhouses = farm.serres.map((serre) => {
          const Z_PRIME = serre.poids_fruit && parseInt(serre.poids_fruit) !== 0
            ? parseInt(serre.poids_fruit)
            : 1;
          const X_PRIME = serre.nbr_tiger && parseInt(serre.nbr_tiger) !== 0
            ? parseInt(serre.nbr_tiger)
            : 0;
          const Z_DOUBLE_PRIME = serre.total_tiges && parseInt(serre.total_tiges) !== 0
          ? parseInt(serre.total_tiges)
          : 0;
          const predictions = predictionsResponse.filter((p) => {
            const matchesFarm = parseInt(p.ferme_id) === parseInt(farm.id);
            const matchesSerre = parseInt(p.serre_id) === parseInt(serre.id);
            return matchesFarm && matchesSerre;
          });
          const processedPredictions = predictions.map((p) => {
            const Y_PRIME = p.superficie && parseInt(p.superficie) !== 0
              ? parseInt(p.superficie)
              : 1;
            let tomatoColors = null;
            if (isSClicked) {
              tomatoColors = {
                classe_A: ((((p.traitement_videos_sum_classe1 || 0) * Z_PRIME) / 1000) / (X_PRIME * Y_PRIME)) * Z_DOUBLE_PRIME,
                classe_B: ((((p.traitement_videos_sum_classe2 || 0) * Z_PRIME) / 1000) / (X_PRIME * Y_PRIME)) * Z_DOUBLE_PRIME,
                classe_C: ((((p.traitement_videos_sum_classe3 || 0) * Z_PRIME) / 1000) / (X_PRIME * Y_PRIME)) * Z_DOUBLE_PRIME,
                classe_D: ((((p.traitement_videos_sum_classe4 || 0) * Z_PRIME) / 1000) / (X_PRIME * Y_PRIME)) * Z_DOUBLE_PRIME,
                classe_E: ((((p.traitement_videos_sum_classe5 || 0) * Z_PRIME) / 1000) / (X_PRIME * Y_PRIME)) * Z_DOUBLE_PRIME,
                classe_F: ((((p.traitement_videos_sum_classe6 || 0) * Z_PRIME) / 1000) / (X_PRIME * Y_PRIME)) * Z_DOUBLE_PRIME,
              };
            } else {
              tomatoColors = {
                classe_A: ((p.traitement_videos_sum_classe1 || 0) * Z_PRIME) / 1000,
                classe_B: ((p.traitement_videos_sum_classe2 || 0) * Z_PRIME) / 1000,
                classe_C: ((p.traitement_videos_sum_classe3 || 0) * Z_PRIME) / 1000,
                classe_D: ((p.traitement_videos_sum_classe4 || 0) * Z_PRIME) / 1000,
                classe_E: ((p.traitement_videos_sum_classe5 || 0) * Z_PRIME) / 1000,
                classe_F: ((p.traitement_videos_sum_classe6 || 0) * Z_PRIME) / 1000,
              };
            }
            const totalTomatoes = Object.values(tomatoColors).reduce((a, b) => a + b, 0);
            let totalTomatoesNumber;
            let rawTomatoCountsX;
            let plantsX;
            if(isSClicked){
              totalTomatoesNumber = (
                ((parseInt(p.traitement_videos_sum_classe1) || 0) * Z_DOUBLE_PRIME) +
                ((parseInt(p.traitement_videos_sum_classe2) || 0) * Z_DOUBLE_PRIME) +
                ((parseInt(p.traitement_videos_sum_classe3) || 0) * Z_DOUBLE_PRIME) +
                ((parseInt(p.traitement_videos_sum_classe4) || 0) * Z_DOUBLE_PRIME) +
                ((parseInt(p.traitement_videos_sum_classe5) || 0) * Z_DOUBLE_PRIME) +
                ((parseInt(p.traitement_videos_sum_classe6) || 0) * Z_DOUBLE_PRIME) 
              );
              rawTomatoCountsX = {
                classe_A: (parseInt(p.traitement_videos_sum_classe1) || 0) * Z_DOUBLE_PRIME,
                classe_B: (parseInt(p.traitement_videos_sum_classe2) || 0) * Z_DOUBLE_PRIME,
                classe_C: (parseInt(p.traitement_videos_sum_classe3) || 0) * Z_DOUBLE_PRIME,
                classe_D: (parseInt(p.traitement_videos_sum_classe4) || 0) * Z_DOUBLE_PRIME,
                classe_E: (parseInt(p.traitement_videos_sum_classe5) || 0) * Z_DOUBLE_PRIME,
                classe_F: (parseInt(p.traitement_videos_sum_classe6) || 0) * Z_DOUBLE_PRIME
              }
              plantsX = Z_DOUBLE_PRIME;
            }
            else{
              totalTomatoesNumber = (
                (parseInt(p.traitement_videos_sum_classe1) || 0) +
                (parseInt(p.traitement_videos_sum_classe2) || 0) +
                (parseInt(p.traitement_videos_sum_classe3) || 0) +
                (parseInt(p.traitement_videos_sum_classe4) || 0) +
                (parseInt(p.traitement_videos_sum_classe5) || 0) +
                (parseInt(p.traitement_videos_sum_classe6) || 0)
              );
              rawTomatoCountsX = {
                classe_A: parseInt(p.traitement_videos_sum_classe1) || 0,
                classe_B: parseInt(p.traitement_videos_sum_classe2) || 0,
                classe_C: parseInt(p.traitement_videos_sum_classe3) || 0,
                classe_D: parseInt(p.traitement_videos_sum_classe4) || 0,
                classe_E: parseInt(p.traitement_videos_sum_classe5) || 0,
                classe_F: parseInt(p.traitement_videos_sum_classe6) || 0,
              }
              plantsX = X_PRIME * Y_PRIME;
            }
            return {
              id: p.id,
              createdAt: p.created_at && p.created_at,
              classeTotale: p.classeTotale && p.classeTotale,
              created_at: p.created_at && p.created_at,
              nom_ferme: p.ferme.nom_ferme && p.ferme.nom_ferme,
              commune: p.ferme.commune && p.ferme.commune,
              ferme_id: p.ferme_id && p.ferme_id,
              serre_id: p.serre_id && p.serre_id,
              nom_serre: p.serre.name && p.serre.name,
              superficie: p.superficie && p.superficie,
              stemsDetected: p.stemsDetected && p.stemsDetected,
              videoName: p.videos.length !== 0 && p.videos[0],
              traitement_videos_sum_classe1: p.traitement_videos_sum_classe1 && p.traitement_videos_sum_classe1,
              traitement_videos_sum_classe2: p.traitement_videos_sum_classe2 && p.traitement_videos_sum_classe2,
              traitement_videos_sum_classe3: p.traitement_videos_sum_classe3 && p.traitement_videos_sum_classe3,
              traitement_videos_sum_classe4: p.traitement_videos_sum_classe4 && p.traitement_videos_sum_classe4,
              traitement_videos_sum_classe5: p.traitement_videos_sum_classe5 && p.traitement_videos_sum_classe5,
              traitement_videos_sum_classe6: p.traitement_videos_sum_classe6 && p.traitement_videos_sum_classe6,
               Y: Y_PRIME,
              tomatoColors,
              rawTomatoCounts: rawTomatoCountsX,
              totalTomatoes,
              totalTomatoesNumber,  
              plants: plantsX,
              X: X_PRIME,
              Z: Z_PRIME,
            };
          });
          return {
            id: parseInt(serre.id),
            name: serre.name,
            predictions: processedPredictions,
            X: X_PRIME,
            Z: Z_PRIME,
          };
        });
        return {
          id: parseInt(farm.id),
          farmName: farm.nom_ferme,
          serres: greenhouses,
          totalPredictionsForFarm,
        };
      });
    }



    useEffect(() => {
      const fetchData = async () => {
        if(token){
          try {
            setIsLoading(true);
            const resp = await axios.get(`${ENDPOINT_URL}fermes`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            
            if (resp.status === 200) {
              const resp2 = await axios.get(`${ENDPOINT_URL}predictions`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              
              if (resp2.status === 200) {
                let farms = resp.data.fermes || []; 
                let predictions = resp2.data || []; 
                let MergedData = RETURN__MERGED__DATA__OF__Farms__AND__PREDICTIONS(
                  farms.length > 0 ? farms : [], 
                  predictions.length > 0 ? predictions : []
                );
                setData(MergedData);
              }
            }
          } catch (e) {
            console.error(e);
            alert('Error fetching data');
          } finally {
            setIsLoading(false);
          }
        }
      };
      fetchData();
    }, [isSClicked, token]);



    
    const CustomizingData = async ()=>{
      setIsLoadingCustomizingData(true);
      if (data.length === 0) return;
        let newData;
        if (selectedFarmIndex === -1) {
          newData = combineAllData(data);
        } else if (selectedGreenhouseIndex === -1) {
          newData = combineFarmData(data[selectedFarmIndex]);
        } else {
          const greenhouse = data[selectedFarmIndex].serres[selectedGreenhouseIndex];
          newData = combineGreenhouseData(greenhouse, selectedPredictionId);
        }
        if(newData){
          if(newData.totalTomatoes){
            if(parseInt(newData.totalTomatoes) > 9999){
              setunitéChoisieValue(1000);
              setUnitéChoisie("tonnes");
            }
            else{
              setUnitéChoisie("kilogramme");
              setunitéChoisieValue(1);
            }
          }
        }
        const roundedColors = Object.fromEntries(
          Object.entries(newData.tomatoColors).map(([key, val]) => [key, val.toFixed(2)])
        );
        const roundedRawCounts = Object.fromEntries(
          Object.entries(newData.rawTomatoCounts).map(([key, val]) => [key, Math.round(val)])
        );
        setSelectedData({ ...newData, tomatoColors: roundedColors });
        setTomatoColors(roundedColors);
        setRawTomatoCounts(roundedRawCounts);
        setIsLoadingCustomizingData(false);
    }


    useEffect(() => {
      CustomizingData();
    }, [selectedFarmIndex, selectedGreenhouseIndex,selectedPredictionId, data, isSClicked]);




      
    useEffect(() => {
      const fetchPredictions = () => {
        let predictions = [];
        if (selectedFarmIndex === -1) {  
          data.forEach(farm => {
            farm.serres.forEach(serre => {
              predictions = [...predictions, ...serre.predictions];
            });
          });
        } else if (selectedGreenhouseIndex === -1) {  
          predictions = data[selectedFarmIndex].serres.reduce((acc, serre) => {
            return [...acc, ...serre.predictions];
          }, []);
        } else {  
          predictions = data[selectedFarmIndex].serres[selectedGreenhouseIndex].predictions;
        }
        setSelectedPredictions(predictions);
      };
      if (data.length > 0) {
        fetchPredictions();
      }
    }, [selectedFarmIndex, selectedGreenhouseIndex, data, isSClicked]);


 

    const downloadVideo = async () => {
      try {
        const downloadUrl = `${DOWNLOAD_URL}${selectedPredictionVideo}`;
        window.open(downloadUrl, '_blank');
        alert('Téléchargement de la vidéo...');
      } catch (error) {
        alert("Une erreur est survenue lors du téléchargement de la vidéo...");
     }
    }

    
 

    useEffect(() => {
      if (data?.length) {
        setFermesOptions(
          data.map(f => ({ value: f.id, label: f.farmName }))
        );
      } else {
        setFermesOptions([]);
      }
    }, [data]);
  




    useEffect(() => {
      if (selectedFerme != null) {
        const ferme = data.find(f => f.id === selectedFerme);
        if (ferme?.serres?.length) {
          setSerresOptions(
            ferme.serres.map(s => ({ value: s.id, label: s.name }))
          );
        } else {
          setSerresOptions([]);
        }
        setSelectedSerre(null);
        setPredictionsOptions([]);         
        setSelectedPredictionId(null);  
      } else {
        setSerresOptions([]);
        setSelectedSerre(null);
        setPredictionsOptions([]);
        setSelectedPredictionId(null);
      }
    }, [selectedFerme, data]);



useEffect(() => {
  if (selectedSerre != null) {
    const ferme = data.find(f => f.id === selectedFerme);
    const serre = ferme?.serres?.find(s => s.id === selectedSerre);
    if (serre?.predictions?.length) {
      setPredictionsOptions(
        serre.predictions.map(p => ({
          value: p.id,
          label: p.createdAt
            ? new Date(p.createdAt).toLocaleString()
            : `#${p.id}`
        }))
      );
    } else {
      setPredictionsOptions([]);
    }
    setSelectedPredictionId(null);    
  } else {
    setPredictionsOptions([]);
    setSelectedPredictionId(null);
  }
}, [selectedSerre, data]);






useEffect(() => {
  const filterData = () => {
    if (!data || data.length === 0) return defaultData;

    const filteredFarms = selectedFerme 
      ? data.filter(farm => farm.id === selectedFerme)
      : data;

    const filteredSerres = filteredFarms.map(farm => ({
      ...farm,
      serres: selectedSerre
        ? farm.serres.filter(serre => serre.id === selectedSerre)
        : farm.serres
    }));

    const finalData = filteredSerres.map(farm => ({
      ...farm,
      serres: farm.serres.map(serre => ({
        ...serre,
        predictions: selectedPredictionId
          ? serre.predictions.filter(p => p.id === selectedPredictionId)
          : serre.predictions
      }))
    }));

    return combineAllData(finalData);
  };

  const filteredResults = filterData();
  setFINALSTATES(filteredResults);
}, [selectedFerme, selectedSerre, selectedPredictionId, data]);




useEffect(() => {
  if (selectedFerme !== null) {
    const ferme = data.find(f => f.id === selectedFerme);
    setNameSelectedFarm(ferme ? ferme.farmName : "");
  } else {
    setNameSelectedFarm("");
  }
}, [selectedFerme, data]);

useEffect(() => {
  if (selectedSerre !== null && selectedFerme !== null) {
    const ferme = data.find(f => f.id === selectedFerme);
    const serre = ferme?.serres?.find(s => s.id === selectedSerre);
    setNameSelectedSerre(serre ? serre.name : "");
  } else {
    setNameSelectedSerre("");
  }
}, [selectedSerre, selectedFerme, data]);

useEffect(() => {
  if (selectedPredictionId !== null) {
    const prediction = selectedPredictions.find(p => p.id === selectedPredictionId);
    console.warn(prediction);
    setselectedPredictionVideo(prediction.videoName);
    setNameSelectedPrediction(prediction?.createdAt ? 
      new Date(prediction.createdAt).toLocaleString() : 
      `Prediction #${selectedPredictionId}`);
  } else {
    setNameSelectedPrediction("all");
  }
}, [selectedPredictionId, selectedPredictions]);  


 








       const iconClick = () => {
        setEditedPoidsMoyenFruits(poidsMoyenFruits);  
        setModalVisiblee(true); 
      };



      const handleSavePoids = () => {
        setModalVisiblee(false)
        const newPoidsMoyenFruits = parseFloat(editedPoidsMoyenFruits);
        if (!isNaN(newPoidsMoyenFruits)) {
          setPoidsMoyenFruits(newPoidsMoyenFruits);
          setPoids(newPoidsMoyenFruits.toString());
        } else {
          alert("Veuillez entrer un poids moyen valide.");
        }
      };
      
      
      const handleNombreTotalTigesChange = (e) => {
        setNombreTotalTiges(e.target.value);
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
  









    return (
      <div className='flex flex-col bg-green5 '>

        <TitrePage titre={'Tableau de bord'} />
        <div className="bg-white mb-3 mt-2 border-2 border-[#BFE3C3] border-r-0 border-l-0">
          <div className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-1 p-4 gap-2">
              <div className="grid grid-cols-3 gap-3">
                  <div>
                  <label className="text-base color-[#212529]">Fermes</label>
                    <Select
                      options={fermesOptions}
                      value={fermesOptions.find(o => o.value === selectedFerme) || null}
                      onChange={opt => setSelectedFerme(opt ? opt.value : null)}
                      placeholder={
                        isLoading
                          ? <CircularProgress size={18} />
                          : "Sélectionner une ferme"
                      }
                      className="basic-single text-[#374151]"
                      classNamePrefix="select"
                      isLoading={isLoading}
                      styles={{
                        control: provided => ({ ...provided, backgroundColor: '#eef5ec' }),
                        valueContainer: (provided) => ({
                          ...provided,
                          height: 50,              // align the inner text vertically
                          padding: '0 8px',        // optional: tweak left/right padding
                        }),
                        indicatorsContainer: (provided) => ({
                          ...provided,
                          height: 50,              // align the dropdown arrow vertically
                        }),
                      }}
                    />
                  </div>
                  <div>
                  <label className="text-base color-[#212529]">Serres</label>
                      <Select
                      options={serresOptions}
                      value={serresOptions.find(o => o.value === selectedSerre) || null}
                      onChange={opt => setSelectedSerre(opt ? opt.value : null)}
                      placeholder={
                        isLoading
                          ? <CircularProgress size={18} />
                          : selectedFerme
                            ? "Sélectionner une serre"
                            : "Choisissez d'abord une ferme"
                      }
                      className="basic-single text-[#374151]"
                      classNamePrefix="select"
                      isLoading={isLoading}
                      isDisabled={!selectedFerme}
                      styles={{
                        control: provided => ({ ...provided, backgroundColor: '#eef5ec' }), 
                        valueContainer: (provided) => ({
                          ...provided,
                          height: 50,              // align the inner text vertically
                          padding: '0 8px',        // optional: tweak left/right padding
                        }),
                        indicatorsContainer: (provided) => ({
                          ...provided,
                          height: 50,              // align the dropdown arrow vertically
                        }),
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-base color-[#212529]">Prédictions</label>
                    <Select
                      options={predictionsOptions}
                      value={predictionsOptions.find(o => o.value === selectedPredictionId) || null}
                      onChange={opt => setSelectedPredictionId(opt ? opt.value : null)}
                      placeholder={
                        isLoading
                          ? <CircularProgress size={18} />
                          : selectedSerre
                            ? "Sélectionner une prédiction"
                            : "Choisissez d'abord une serre"
                      }
                      className="basic-single text-[#374151]"
                      classNamePrefix="select"
                      isLoading={isLoading}
                      isDisabled={!selectedSerre}
                      styles={{
                        control: prov => ({ ...prov, backgroundColor: '#eef5ec' }), 
                        valueContainer: (provided) => ({
                          ...provided,
                          height: 50,               
                          padding: '0 8px',       
                        }),
                        indicatorsContainer: (provided) => ({
                          ...provided,
                          height: 50,               
                        }),
                      }}
                    />
                  </div>
              </div>
              <div className="flex gap-3 items-end ml-auto w-full justify-end">
                  <button
                    className="rounded-md w-[180px] h-[40px] text-white bg-green4 hover:bg-white  hover:border-green4 border border-transparent flex items-center justify-center"
                    onClick={()=>{
                      setSelectedFerme(null);
                    }}
                    type="button"
                    style={{
                      background : "#68a46c"
                    }}
                  >
                  Effacer les filtres
                  </button>
                  <button
                  style={{
                    background : "#68a46c"
                  }}
                    type='button'
                    className={`rounded-md w-[180px] h-[40px] text-white bg-green4 
                      ${selectedPrediction === null ? 'cursor-not-allowed' : 'hover:bg-white  hover:border-green4'} 
                      border border-transparent flex items-center justify-center`}
                    disabled={selectedPredictionVideo === null}
                    onClick={(e) => {
                      if(selectedPredictionVideo !== null){
                        downloadVideo(e, selectedPrediction?.traitement_videos?.[0]?.nom_video)
                      }
                    }}
                  >
                    Télécharger la vidéo
                  </button>
              </div>
              </div>
          </div>
        </div>


          <div className='grid p-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>
            <CarreTableauDeBord>
              <p className='font-sans text-lg mb-2'  style={{display : "flex",flexDirection : "row"}}>
                <img style={{
                  width : 26, 
                  height : 26, 
                  objectFit : "cover", 
                }} src={Weight} />
                &nbsp;&nbsp;Rendement estimé en {unitéChoisie === "kilogramme" ? "Kg" : "tonne"}</p>
              <h1 className='font-sans text-2xl'>
                {
                  FINALSTATES && formatPoids(FINALSTATES.totalTomatoes, "Bar")
                }
              </h1>
            </CarreTableauDeBord>
            <CarreTableauDeBord >
              <p className='font-sans text-lg mb-2' style={{display : "flex",flexDirection : "row"}}>
                <img style={{
                  width : 26, 
                  height : 26, 
                  objectFit : "cover", 
                }} src={Tomato} />
                &nbsp;&nbsp;Total des fruits détectés
              </p>
              <h1 className='font-sans text-2xl'>
                {
                  FINALSTATES && formatNumbers(FINALSTATES.totalTomatoesNumber)
                }
              </h1>
            </CarreTableauDeBord>
            <CarreTableauDeBord>
              <p className='font-sans text-lg mb-2'  style={{display : "flex",flexDirection : "row"}}><img style={{
                  width : 26, 
                  height : 26, 
                  objectFit : "cover", 
                }} src={Leaf} />
                &nbsp;&nbsp;Total des tiges détectées</p>
              <h1 className='font-sans text-2xl'>
                {
                  FINALSTATES && formatNumbers(FINALSTATES.plants)
                }
              </h1>
            </CarreTableauDeBord>
            <CarreTableauDeBord icon={pen}>
              <p className='font-sans text-lg mb-2'>Poids moyen de fruits en gr</p>
              <h1 className='font-sans text-2xl'>{poidsMoyenFruits}</h1>  
              <div className={`absolute bottom-3 right-3 ${clicked ? 'border border-black rounded-md' : ''}`}>
                <img alt='' src={pen} className={`w-5 h-5 m-2`} onClick={iconClick} />
              </div>
            </CarreTableauDeBord>
            
          </div>


          
{/* 

          <div className='p-4 w-full'>
            <form action=''>
                <div className=' grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 rounded-md border-2 border-[#BFE3C3] bg-white p-4 justify-between '>
                    <input type='number'
                    value={nombreTotalTiges}
                    onChange={handleNombreTotalTigesChange}
                    placeholder='Entrer le nombre total des tiges' className='shadow  border rounded-md text-lg py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-green3   mb-0 col-span-2' />
                    <button  
                      onClick={handleExtrapolerClick}
                      className="shadow rounded-md  whitespace-normal h-[40px] px-4  bg-green4 text-white  hover:bg-white hover:text-green4 hover:border-green4 border border-transparent  col-span-1 flex items-center justify-center">
                      Extrapoler
                    </button>
                    <input placeholder='Rendement total en kg'   
                     value={rendementTotalKg}
                     disabled 
                     className='shadow border rounded-md text-lg py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-green3  mb-0 col-span-2' />
                </div>
            </form>
          </div>

 */}

        <DashboardCharts 
          data={FINALSTATES}
          loading={isLoading}
          rawTomatoCounts={FINALSTATES?.rawTomatoCounts || {}}
          tomatoColors={FINALSTATES?.tomatoColors || {}}
          selectedFarmIndex={selectedFarmIndex}
          selectedGreenhouseIndex={selectedGreenhouseIndex}
          NameSelectedFarm={NameSelectedFarm}
          NameSelectedSerre={NameSelectedSerre}
          NameSelectedPrediction={NameSelectedPrediction}
          chartType={chartType}
          setChartType={setChartType}
          isSClicked={isSClicked}
          setisSClicked={setisSClicked}
          selectedPredictionVideo={selectedPredictionVideo}
          downloadVideo={downloadVideo}
          setIsPopupVisible={setIsPopupVisible}
          unitéChoisie={unitéChoisie}
          unitéChoisieValue={unitéChoisieValue}
          selectedData={selectedData}
        />
      </div>
    )
}
export default TabelauDeBord;