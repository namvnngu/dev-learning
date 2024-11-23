const AxisBottom = ({ xScale, innerHeight, tickFormat }) => {
  return (
    <>
      {xScale.ticks().map((tick, index) => (
        <g className="tick" key={index} transform={`translate(${xScale(tick)},0)`}>
          <line x1={0} y1={0} x2={0} y2={innerHeight}/>
          <text
            y={innerHeight + 3}
            dy="0.71em"
            style={{ textAnchor: "middle" }}
          >
            {tickFormat(tick)}
          </text>
        </g>
      ))}{" "}
    </>
  );
};

export default AxisBottom;
