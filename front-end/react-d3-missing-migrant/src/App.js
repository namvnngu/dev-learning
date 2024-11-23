import * as d3 from "d3";
import "./App.css";
import AxisBottom from "./components/AxisBottom";
import AxisLeft from "./components/AxisLeft";
import Marks from "./components/Marks";
import useData from "./hooks/useData";

const URL =
  "https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/267eac8b97d161c479d950ffad3ddd5ce2d1f370/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";

const width = window.innerWidth;
const height = window.innerHeight;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };

function App() {
  const data = useData(URL);

  if (!data) {
    return <pre>Loadding...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  const xAxisLableOffset = 55;
  const xValue = (d) => d["Reported Date"];
  const xAxisLable = "Time";

  const yAxisLableOffset = 50;
  const yValue = (d) => d["Total Dead and Missing"];
  const yAxisLable = "Total Dead and Missing";

  const siFormat = d3.timeFormat("%d/%m/%Y");
  const xAxisTickFormat = (tickValue) => siFormat(tickValue);

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain();
  const binnedData = d3
    .bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(d3.timeMonths(start, stop))(data)
    .map(array => ({
      y: d3.sum(array, yValue),
      x0: array.x0,
      x1: array.x1
    }));

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(binnedData, d => d.y)])
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
          data={binnedData}
          xScale={xScale}
          yScale={yScale}
          toolTipFormat={d => d.y}
          innerHeight={innerHeight}
        />
      </g>
    </svg>
  );
}

export default App;
