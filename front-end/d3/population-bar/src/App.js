import * as d3 from "d3";
import "./App.css";
import AxisBottom from "./components/AxisBottom";
import AxisLeft from "./components/AxisLeft";
import Marks from "./components/Marks";
import useData from "./hooks/useData";

const URL =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

const width = window.innerWidth;
const height = window.innerHeight;
const margin = { top: 100, right: 60, bottom: 100, left: 230 };
const xAxisLabelOffset = 50;

function App() {
  const data = useData(URL);

  if (!data) {
    return <pre>Loadding...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  const yValue = (d) => d.Country;
  const xValue = (d) => d.Population;

  const siFormat = d3.format(".2s")
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");
  
  const yScale = d3
    .scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={window.innerWidth} height={window.innerHeight}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          Population
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          toolTipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  );
}

export default App;
