import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const BasicBars = ({ per, poid, totalF, rendementTotal, NbrTiges ,rendementEstm}) => {

  // Calculate the first dataset 
  //hello ? 
  const data = [
    Number(per.color_1 /100 * rendementEstm).toFixed(2) || 0,
    Number(per.color_2 /100 * rendementEstm).toFixed(2)  || 0,
    Number(per.color_3 /100 * rendementEstm).toFixed(2) || 0,
    Number(per.color_4 /100 * rendementEstm ).toFixed(2) || 0,
    Number(per.color_5 /100 * rendementEstm).toFixed(2) || 0,
    Number(per.color_6 /100 * rendementEstm).toFixed(2)|| 0,
  ];

  // Calculate the second dataset
  const data_2 = [
    Number(per.color_1/100 * rendementTotal) || 0,
    Number(per.color_2/100  * rendementTotal) || 0,
    Number(per.color_3/100  * rendementTotal) || 0,
    Number(per.color_4/100  * rendementTotal) || 0,
    Number(per.color_5/100  * rendementTotal) || 0,
    Number(per.color_6/100  * rendementTotal) || 0,
  ];

  const colors = ['#056517', '#bbdb44', '#f2a134', '#FF6600', '#FF3333', '#990000'];
  const classes = ['1', '2', '3', '4', '5', '6'];
  const [useFirstData, setUseFirstData] = useState(rendementTotal > 0);
   
  // Choose the dataset to display
  const dataToDisplay = useFirstData ? data_2 : data;

  // Determine if we need to switch from kg to tonnes
  const isTonnes = useFirstData;

  const series = [{
    // data: convertedDataToDisplay
    data:dataToDisplay
  }];

  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      }
    },
    colors: colors,
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: classes,
      labels: {
        style: {
          colors: colors,
          fontSize: 'px'
        }
      }
    },
    yaxis: {
    //   title: {
    //     text: ` (en ${isTonnes ? 'tonnes' : 'kilogrammes'})`,
    //   },
      labels: {
        formatter: (value) => `${value}${isTonnes ? ' T' : ' Kg'}`,
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      {series[0].data.length > 0 ? (
        <>
          <ReactApexChart options={options} series={series} type="bar" width={500} height={350} />
          {rendementTotal > 0 && NbrTiges !== 0 && (
            <button 
              onClick={() => setUseFirstData(!useFirstData)}
              style={{
                backgroundColor: '#4C7559',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                marginTop: '10px',
                cursor: 'pointer'
              }}
            >
              {`Switch to ${useFirstData ? 'Sample Chart' : 'Total Yield'}`}
            </button>
          )}
        </>
      ) : (
        <div className=''></div>
      )}
    </div>
  );
};

export default BasicBars;
