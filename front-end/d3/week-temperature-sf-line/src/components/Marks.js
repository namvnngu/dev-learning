import * as d3 from "d3";
const Marks = ({
  data,
  yScale,
  xScale,
  xValue,
  yValue,
  toolTipFormat,
  circleRadius,
}) => {
  return (
    <g className="marks">
      <path
        fill="none"
        stroke="black"
        d={d3
          .line()
          .curve(d3.curveNatural)
          .x((d) => xScale(xValue(d)))
          .y((d) => yScale(yValue(d)))(data)}
      ></path>
      {data.map((d, index) => (
        <circle
          key={index}
          cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          r={circleRadius}
        >
          <title>{toolTipFormat(xValue(d))}</title>
        </circle>
      ))}
    </g>
  );
};

export default Marks;
