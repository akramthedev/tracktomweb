import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart = ({ per, totalF }) => {
    const colors = ['#056517', '#bbdb44', '#f2a134', '#FF6600', '#FF3333', '#990000'];
    const labels = ['Classe 1', 'Classe 2', 'Classe 3', 'Classe 4', 'Classe 5', 'Classe 6'];

    const [dataPer, setDataPer] = useState([]);
    const [selectedQuantity, setSelectedQuantity] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        if (per && typeof per === 'object' && Object.keys(per).length > 0) {
            const data = [
                Number(per.color_1) || 0,
                Number(per.color_2) || 0,
                Number(per.color_3) || 0,
                Number(per.color_4) || 0,
                Number(per.color_5) || 0,
                Number(per.color_6) || 0,
            ];
            setDataPer(data);

            const initialQuantity = Math.max(...data) || 0;
            const defaultQuantity = ((initialQuantity / 100) * totalF).toFixed(0);
            setSelectedQuantity(initialQuantity > 0 ? defaultQuantity : null);
            setSelectedIndex(data.indexOf(initialQuantity));
        } else {
            setSelectedQuantity(null);
        }
    }, [per, totalF]);

    const handleSliceClick = (index) => {
        if (dataPer.length === 0 || index < 0 || index >= dataPer.length) return;

        const valueAtIndex = dataPer[index];
        if (valueAtIndex === 0) {
            setSelectedQuantity(null);
            setSelectedIndex(null);
            return;
        }

        const quantity = ((valueAtIndex / 100) * totalF).toFixed(0);
        setSelectedQuantity(quantity);
        setSelectedIndex(index);
    };

    const chartOptions = {
        chart: {
            type: 'donut',
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    const index = config.dataPointIndex;
                    handleSliceClick(index);
                },
            },
        },
        labels,
        colors,
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ marginRight: '30px', textAlign: 'center' }}>
                    {dataPer.length > 0 ? (
                        <ReactApexChart options={chartOptions} series={dataPer} type="donut" width={500} height={500} />
                    ) : (
                        <div className='w-[500px] h-[500px]'></div>
                    )}

                    {selectedQuantity !== null && selectedIndex !== null ? (
                        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <div
                                style={{
                                    backgroundColor: colors[selectedIndex],
                                    padding: '5px',
                                    borderRadius: '5px',
                                    marginRight: '10px',
                                    color: 'white',
                                    fontSize: '20px',
                                }}
                            >
                                {`Quantité: ${Number(selectedQuantity).toLocaleString('fr-FR', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                }).replace(',', '.')}`}
                            </div>
                        </div>
                    ) : (
                        <div style={{ marginTop: '10px', color: 'red' }}></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chart;
