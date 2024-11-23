import * as d3 from "d3";
import "./App.css";
import AxisBottom from "./components/AxisBottom";
import AxisLeft from "./components/AxisLeft";
import Marks from "./components/Marks";
import useData from "./hooks/useData";

const URL =
  "https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv";

const width = window.innerWidth;
const height = window.innerHeight;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const circleRadius = 0;

function App() {
  const data = useData(URL);

  if (!data) {
    return <pre>Loadding...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  const xValue = (d) => d.timestamp;
  const xAxisLable = "Time";
  const xAxisLableOffset = 55;
  const yValue = (d) => d.temperature;
  const yAxisLable = "Temperature";
  const yAxisLableOffset = 50;

  const siFormat = d3.timeFormat("%a")	;
  const xAxisTickFormat = (tickValue) => siFormat(tickValue);

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  return (
    <svg width={window.innerWidth} height={window.innerHeight}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={15}
        />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLableOffset}
          textAnchor="middle"
        >
          {xAxisLable}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={12} />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLableOffset},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLable}
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          toolTipFormat={xAxisTickFormat}
          circleRadius={circleRadius}
        />
      </g>
    </svg>
  );
}

export default App;
