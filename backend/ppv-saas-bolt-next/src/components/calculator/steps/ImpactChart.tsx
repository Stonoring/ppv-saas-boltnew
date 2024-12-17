"use client"

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface ImpactChartProps {
  monthlyAmount: number
  yearlyAmount: number
}

export function ImpactChart({ monthlyAmount, yearlyAmount }: ImpactChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Impact sur le pouvoir d\'achat',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `${value}€`,
        },
      },
    },
  }

  const data = {
    labels: ['Mensuel', 'Annuel'],
    datasets: [
      {
        label: 'Montant',
        data: [monthlyAmount, yearlyAmount],
        backgroundColor: [
          'rgba(53, 162, 235, 0.5)',
          'rgba(53, 162, 235, 0.8)',
        ],
        borderColor: [
          'rgb(53, 162, 235)',
          'rgb(53, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="w-full h-[300px]">
      <Bar options={options} data={data} />
    </div>
  )
}
