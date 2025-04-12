import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  Typography,
  Button,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
  LabelList,
  PieChart,
  Pie
} from 'recharts';
import ToggleButton from './ToggleButton';


const classColors = {
  classe_A: '#5D9B4B',
  classe_B: '#8DC63F',
  classe_C: '#B9D92D',
  classe_D: '#FFA500',
  classe_E: '#FF4D00',
  classe_F: '#D32F2F',
};

export default function DashboardCharts({
  data,
  loading,
  rawTomatoCounts,
  tomatoColors,
  selectedFarmIndex,
  selectedGreenhouseIndex,
  NameSelectedFarm,
  NameSelectedSerre,
  NameSelectedPrediction,
  chartType,
  setChartType,
  isSClicked,
  setisSClicked,
  selectedPredictionVideo,
  downloadVideo,
  setIsPopupVisible,
  unitéChoisie,
  unitéChoisieValue,
  selectedData,
}) {

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [chartKey, setChartKey] = useState(Date.now());

  useEffect(() => {
    setChartKey(Date.now());
  }, [data, tomatoColors, rawTomatoCounts]);




  
  if (loading) {
    return (
      <div style={{
        height : 400, width : "100%", alignItems : "center", justifyContent : "center", display : "flex"
      }} >
        <Typography align="center" color="textSecondary">
          Chargement des données...
        </Typography>
      </div>
    );
  }

  if (data && data.length === 0) {
    return (
      <div style={{
        height : 400, width : "100%", alignItems : "center", justifyContent : "center", display : "flex"
      }} >
        <Typography align="center" color="textSecondary">
          Aucune donnée disponible...
        </Typography>
      </div>
    );
  }


  const titleParts = [];
  if (selectedFarmIndex !== -1) titleParts.push(NameSelectedFarm);
  if (selectedGreenhouseIndex !== -1) titleParts.push(NameSelectedSerre);
  if (NameSelectedPrediction && NameSelectedPrediction !== 'all')
    titleParts.push(NameSelectedPrediction);
  const title = titleParts.join(' / ');

  const barData = Object.entries(tomatoColors).map(([key, value]) => {
    const letter = key.replace('classe_', '');      
    const number = letter.charCodeAt(0) - 64;         
    const divisor = unitéChoisieValue || 1;
    return {
      label: `Classe ${number}`,                       
      value: +(value / divisor).toFixed(2),
      fill: classColors[key] || '#CCCCCC',
    };
  });




  const CustomXAxisTick = ({ x, y, payload }) => {
    const label = payload.value;
    const matchingBar = barData.find((item) => item.label === label);
    const fill = matchingBar?.fill || '#000';
    return (
      <text
        x={x}
        y={y + 15}
        fill={fill}
        textAnchor="end"
        fontSize={12}
        transform={`rotate(-35, ${x}, ${y + 15})`}
        >
        {label}
      </text>
    );
  };
  

  const pieData = Object.entries(rawTomatoCounts).map(([key, value]) => {
    const letter = key.split('_')[1];           
    const number = letter.charCodeAt(0) - 64;    
    return {
      name: `Classe ${number}`,                   
      value,                                    
      classKey: key                              
    };
  });
  

  


  return (
    <Box p={2}>

      <Box
        mt={0}
        mb={5}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography style={{
            fontSize : 18,
            color : "gray"
          }} >
            Calcul basé sur le total des tiges par serre&nbsp;&nbsp;
          </Typography>
          <ToggleButton
            isOn={isSClicked}
            onToggle={() => setisSClicked((prev) => !prev)}
          />
        </Box>
      </Box>



    <Box
      display="flex"
      flexDirection={isMdUp ? 'row' : 'column'}
      width="100%"
      gap={2}          
      alignItems="center"
      justifyContent="center"
    >
      <Box flex={1} height={400} display="flex" flexDirection="column">
        <Box textAlign="center" sx={{ mb: 1 }}>
          <Typography variant="h6" fontWeight={600} color="textSecondary" sx={{ lineHeight: 1.2 }}>
            Répartition des tomates en{' '}
            <Typography variant="h6" fontWeight={600} component="span" sx={{ color: '#BE2929', display: 'inline' }}>
              {unitéChoisie}
            </Typography>
          </Typography>
        </Box>
        <Box flex={1}>
          <ResponsiveContainer  width="100%" height="100%">
            <BarChart key={`bar-${chartKey}`}  data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                interval={0}
                height={60}
                tick={<CustomXAxisTick />}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <Tooltip formatter={(value) => [value, 'Valeur']} />
              <Bar dataKey="value" barSize={40} name="Tonnes">
                {barData.map((entry) => (
                  <Cell key={entry.label} fill={entry.fill} />
                ))}
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={(val) => val.toLocaleString()}
                  style={{ fontSize: 12, fill: '#333' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
      <Box flex={1} height={400} display="flex" flexDirection="column">
        <Box textAlign="center" sx={{ mb: 1 }}>
          <Typography variant="h6" fontWeight={600} color="textSecondary" sx={{ lineHeight: 1.2 }}>
            Répartition des tomates par&nbsp;
            <Typography variant="h6" fontWeight={600} component="span" sx={{ color: '#BE2929', display: 'inline' }}>
              couleur
            </Typography>
          </Typography>
        </Box>
        <Box flex={1}>
          <ResponsiveContainer  width="100%" height="100%">
            <PieChart>
              <Pie key={`pie-${chartKey}`} 
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={130}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry) => (
                  <Cell
                    key={entry.classKey}
                    fill={classColors[entry.classKey] || '#CCCCCC'}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>

 
    </Box>
  );
}
