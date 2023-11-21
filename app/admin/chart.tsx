'use client';
import { Bar } from 'react-chartjs-2';
import Chart,{registerables, BarElement, CategoryScale, LinearScale} from 'chart.js/auto';
Chart.register(...registerables, BarElement, CategoryScale, LinearScale);

interface userInfo {
  user:{
    name:string;
    email?:string;
    image?:string;
    level?:number;
    }
}


export default function ChartCom(){
  const data= {
    labels : ['orange', 'orangered', 'pink'],
    datasets: [
      {
        label: "차트",
        data: [10,50,5],
        backgroundColor:[
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
        ],
        borderColor:[
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
        ],
        borderWidth:1
      }
    ]
  }
  const options = {
    // animations: {
    //   tension: {
    //     duration: 1000,
    //     easing: 'easeOutElastic',
    //     from: 0,
    //     to: 1,
    //     loop: true,
    //     responsive: true,
    //   }
    // },
    scales : {
      y:{
        beginAtZero: true
      }
    }
  }

  return(
    <>
    <Bar data={data} options={options}/>
    </>
  )
}