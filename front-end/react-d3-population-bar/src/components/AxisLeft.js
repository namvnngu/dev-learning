const AxisLeft = ({ yScale }) => {
  return (
    <>
      {yScale.domain().map((tick, index) => (
        <g className="tick" key={index}>
          <text
            style={{ textAnchor: "end" }}
            dy="0.32em"
            x="-3"
            y={(0, yScale(tick) + yScale.bandwidth() / 2)}
          >
            {tick}
          </text>
        </g>
      ))}
    </>
  );
};

export default AxisLeft;
