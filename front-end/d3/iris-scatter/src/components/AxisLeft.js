const AxisLeft = ({ yScale, innerWidth, tickOffset }) => {
  return (
    <>
      {yScale.ticks().map((tick, index) => (
        <g key={index} className="tick" transform={`translate(0,${yScale(tick)})`}>
          <line x2={innerWidth} />
          <text key={tick} style={{ textAnchor: "end" }} x={-tickOffset} dy=".32em">
            {tick}
          </text>
        </g>
      ))}
    </>
  );
};

export default AxisLeft;
