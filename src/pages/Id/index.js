import React from 'react';
import Chart from "react-google-charts"
import {useEffect, useState} from 'react';

import socketIOClient from 'socket.io-client';

import './styles.css';

//import api from '../../services/api';

const socket = socketIOClient('http://localhost:3334');
const startTime = new Date();
export default function Id(){
  const id = localStorage.getItem('idNumber');
  const [chart, setChart] = useState([]);
  const [time, setTime] =useState([]);
  useEffect(()=> {
    socket.on('Chart', async data => {
        //setChart(chart.shift())
        //setTime(time.shift())
        setChart(prevChart => [...prevChart, data.temperature]);
        setTime(prevTime => [...prevTime, ((new Date() - startTime)/1000)]);
        console.log(chart);
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
      [time[time.length-20], chart[chart.length-20]],
      [time[time.length-19], chart[chart.length-19]],
      [time[time.length-18], chart[chart.length-18]],
      [time[time.length-17], chart[chart.length-17]],
      [time[time.length-16], chart[chart.length-16]],
      [time[time.length-15], chart[chart.length-15]],
      [time[time.length-14], chart[chart.length-14]],
      [time[time.length-13], chart[chart.length-13]],
      [time[time.length-12], chart[chart.length-12]],
      [time[time.length-11], chart[chart.length-11]],
      [time[time.length-10], chart[chart.length-10]],
      [time[time.length-9], chart[chart.length-9]],
      [time[time.length-8], chart[chart.length-8]],
      [time[time.length-7], chart[chart.length-7]],
      [time[time.length-6], chart[chart.length-6]],
      [time[time.length-5], chart[chart.length-5]],
      [time[time.length-4], chart[chart.length-4]],
      [time[time.length-3], chart[chart.length-3]],
      [time[time.length-2], chart[chart.length-2]],
      [time[time.length-1], chart[chart.length-1]],
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