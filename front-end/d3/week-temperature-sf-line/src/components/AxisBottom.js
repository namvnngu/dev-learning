const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset }) => {
  return (
    <>
      {xScale.ticks().map((tick, index) => (
        <g className="tick" key={index} transform={`translate(${xScale(tick)},0)`}>
          <line x1={0} y1={0} x2={0} y2={innerHeight}/>
          <text
            y={innerHeight + tickOffset}
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
