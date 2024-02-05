import { Cell, LabelList, Pie, PieChart, Tooltip } from "recharts";
import { useSelector } from "react-redux";
import { nicenessDistributionSelector } from "../../cities-data/selectors.js";
import { WEATHER_ATTRIBUTES } from "../../cities-data/const.js";

export const ChartsPanel = () => {
  const nicenessDistribution = useSelector(nicenessDistributionSelector)
  const nicenessPieData = Object.entries(nicenessDistribution).map(
    (distEntry) => ({ niceness: distEntry[0], count: distEntry[1].count })
  )

  return (
    <PieChart width={730} height={300}>
      <Tooltip
        formatter={(value, name) => [`${value} cities (${nicenessDistribution[name].percent}%)`, `${WEATHER_ATTRIBUTES[name].text}`]}/>
      <Pie data={nicenessPieData} dataKey="count" nameKey="niceness" outerRadius={100}>
        {
          nicenessPieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={WEATHER_ATTRIBUTES[entry.niceness].color}/>
          ))
        }
        <LabelList dataKey="niceness"
                   formatter={(value) => `${WEATHER_ATTRIBUTES[value].emoji}`}/>
      </Pie>
    </PieChart>
  )
}