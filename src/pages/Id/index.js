import React from 'react';
import Chart from "react-google-charts"
import {useEffect, useState} from 'react';

import socketIOClient from 'socket.io-client';

import './styles.css';

//import api from '../../services/api';
const socket = socketIOClient('http://localhost:3334');

export default function Id(){
  const id = localStorage.getItem('idNumber');
  const [chart, setChart] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [time, setTime] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  useEffect(()=> {
    socket.on('chart', data => {
        setChart(chart.shift())
        setTime(time.shift())
        setChart(chart.push(data.temperature));
        setTime(time.push(data.time))
    });

}, []);
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
      [time[time.lengt-19], chart[chart.length-19]],
      [time[time.lengt-18], chart[chart.length-18]],
      [time[time.lengt-17], chart[chart.length-17]],
      [time[time.lengt-16], chart[chart.length-16]],
      [time[time.lengt-15], chart[chart.length-15]],
      [time[time.lengt-14], chart[chart.length-14]],
      [time[time.lengt-13], chart[chart.length-13]],
      [time[time.lengt-12], chart[chart.length-12]],
      [time[time.lengt-11], chart[chart.length-11]],
      [time[time.lengt-10], chart[chart.length-10]],
      [time[time.lengt-9], chart[chart.length-9]],
      [time[time.lengt-8], chart[chart.length-8]],
      [time[time.lengt-7], chart[chart.length-7]],
      [time[time.lengt-6], chart[chart.length-6]],
      [time[time.lengt-5], chart[chart.length-5]],
      [time[time.lengt-4], chart[chart.length-4]],
      [time[time.lengt-3], chart[chart.length-3]],
      [time[time.lengt-2], chart[chart.length-2]],
      [time[time.lengt-1], chart[chart.length-1]],
      [time[time.lengt], chart[chart.length]],
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