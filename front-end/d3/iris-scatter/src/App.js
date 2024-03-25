import * as d3 from "d3";
import { useState } from "react";
import "./App.css";
import AxisBottom from "./components/AxisBottom";
import AxisLeft from "./components/AxisLeft";
// import { Dropdown } from "./components/Dropdown";
import Marks from "./components/Marks";
import useData from "./hooks/useData";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import ColorLegend from "./components/ColorLegend";

const URL =
  "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv";

const width = window.innerWidth;
const height = window.innerHeight;
const margin = { top: 20, right: 200, bottom: 65, left: 90 };
const circleRadius = 10;
const fadeOpacity = 0.2
const attributes = [
  { value: "sepal_length", label: "Sepal Length" },
  { value: "sepal_width", label: "Sepal Width" },
  { value: "petal_length", label: "Petal Length" },
  { value: "petal_width", label: "Petal Width" },
  { value: "species", label: "Species" },
];
const getLabel = (attributeValue) => {
  return attributes.filter((attribute) => attribute.value === attributeValue)[0]
    .label;
};

function App() {
  const data = useData(URL);
  const [hoveredValue, setHoveredValue] = useState(null);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  const initialXAttribute = "petal_length";
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];
  const xAxisLable = getLabel(xAttribute);
  const xAxisLableOffset = 55;

  const initialYAttribute = "sepal_width";
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];
  const yAxisLable = getLabel(yAttribute);
  const yAxisLableOffset = 50;

  const colorValue = (d) => d.species;
  const colorLegenLabel = "Species";

  const siFormat = d3.format(".2s");
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

  if (!data) {
    return <pre>Loadding...</pre>;
  }

  const filteredData = data.filter((d) => hoveredValue === colorValue(d));

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([0, innerHeight])
    .nice();

  const colorScale = d3
    .scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#E6842A", "#137B80", "#8E6C8A"]);

  return (
    <>
      <label forhtml="x-select">X:</label>
      <Dropdown
        options={attributes}
        id="x-select"
        value={xAttribute}
        onChange={(option) => setXAttribute(option.value)}
      />
      <label forhtml="y-select">Y:</label>
      <Dropdown
        options={attributes}
        id="y-select"
        value={yAttribute}
        onChange={(option) => setYAttribute(option.value)}
      />
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
          <g transform={`translate(${innerWidth + 60}, 60)`}>
            <text className="axis-label" x={40} y={-25} textAnchor="middle">
              {colorLegenLabel}
            </text>
            <ColorLegend
              colorScale={colorScale}
              tickTextOffset={20}
              tickSpacing={25}
              tickSize={circleRadius}
              onHover={setHoveredValue}
              hoveredValue={hoveredValue}
              fadeOpacity={fadeOpacity}
            />
          </g>
          <g opacity={hoveredValue ? fadeOpacity : 1}>
            <Marks
              data={data}
              xScale={xScale}
              yScale={yScale}
              colorScale={colorScale}
              colorValue={colorValue}
              xValue={xValue}
              yValue={yValue}
              toolTipFormat={xAxisTickFormat}
              circleRadius={circleRadius}
            />
          </g>
          <Marks
            data={filteredData}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            colorValue={colorValue}
            xValue={xValue}
            yValue={yValue}
            toolTipFormat={xAxisTickFormat}
            circleRadius={circleRadius}
          />
        </g>
      </svg>
    </>
  );
}

export default App;
