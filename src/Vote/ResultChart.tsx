import React from 'react';
import {Doughnut} from 'react-chartjs-2';
const helper = require('./helper.tsx');


export default function ResultChart({options, accounts}: {options:string[]; accounts: string[][]}){
  const data = {
    labels: options.map(v=> helper.hex2a(v)),
    datasets: [{
      data: accounts.map(v => v.length),
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
