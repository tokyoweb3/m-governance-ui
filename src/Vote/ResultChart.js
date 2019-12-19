import React from 'react';
import {Doughnut} from 'react-chartjs-2';



export default function ResultChart({aye, nay}){
  const data = {
    labels: [
      'Aye',
      'Nay',
    ],
    datasets: [{
      data: [aye && aye.length, nay && nay.length],
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ],
      hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ]
    }]
  };

  return (
    <div>
      <h1>Result Chart</h1>
      <Doughnut data={data} />
    </div>
  );
}
