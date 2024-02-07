import { useSelector } from "react-redux";
import { nicenessDistributionSelector } from "../../../cities-data/selectors.js";
import { Cell, LabelList, Legend, Pie, PieChart, Tooltip } from "recharts";
import { WEATHER_ATTRIBUTES } from "../../../cities-data/const.js";

export const NicenessDistributionChart = () => {
  const nicenessDistribution = useSelector(nicenessDistributionSelector)
  if (nicenessDistribution === null) {
    return null
  }

  const nicenessPieData = Object.entries(nicenessDistribution).map(
    (distEntry) => ({ niceness: distEntry[0], count: distEntry[1].count })
  )

  const tooltipFormatter = (value, name) => [`${value} cities (${nicenessDistribution[name].percent}%)`, `${WEATHER_ATTRIBUTES[name].text}`]
  const labelListFormatter = (value) => nicenessDistribution[value].count > 0 ? `${WEATHER_ATTRIBUTES[value].emoji}` : ''

  const legendFormatter = (value) => `${WEATHER_ATTRIBUTES[value].text}`

  return (
    <PieChart width={400} height={300}>
      <Tooltip formatter={tooltipFormatter}/>
      <Legend formatter={legendFormatter} align="left" verticalAlign="middle" layout="vertical"/>
      <Pie data={nicenessPieData} dataKey="count" nameKey="niceness" outerRadius={100} label>
        {
          nicenessPieData.map((entry) => (
            <Cell key={entry.niceness} fill={WEATHER_ATTRIBUTES[entry.niceness].color}/>
          ))
        }
        <LabelList dataKey="niceness" formatter={labelListFormatter}/>
      </Pie>
    </PieChart>
  )
}