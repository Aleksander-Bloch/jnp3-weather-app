import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

export const BaseHistogram = ({ distribution, label }) => {
  const barChartData = Object.entries(distribution).map(
    (distEntry) => ({ range: distEntry[0], count: distEntry[1] })
  )

  console.log(barChartData)

  return (
    <BarChart width={1000} height={500} data={barChartData}>
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="range" angle={-30} tickMargin={30} height={100} label={label}/>
      <YAxis allowDecimals={false} label={{ value: 'Number of cities', angle: -90, position: 'insideLeft' }}/>
      <Tooltip/>
      <Bar dataKey="count" fill="#82ca9d"/>
    </BarChart>
  )
}