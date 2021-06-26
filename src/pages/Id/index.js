import React from 'react';
import Chart from "react-google-charts"
import './styles.css';

export default function Id(){
  const id = localStorage.getItem('idNumber');

  return(
<body>
  <h1>{id}</h1>

  <Chart
    width={'1200x'}
    height={'800px'}
    chartType="LineChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['', id],
      [0, 0],
      [1, 10],
      [2, 23],
      [3, 17],
      [4, 18],
      [5, 9],
      [6, 11],
      [7, 27],
      [8, 33],
      [9, 40],
      [10, 32],
      [11, 35],
    ]}
    options={{
      curveType:'function',
      hAxis: {
        title: 'Time',
      },
      vAxis: {
        title: 'Temperature',
      },
  }}
  rootProps={{ 'data-testid': '1' }}
/> 
</body>
    )

}