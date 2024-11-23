const ColorLegend = ({
  colorScale,
  tickTextOffset = 20,
  tickSpacing = 20,
  tickSize = 10,
  onHover,
  hoveredValue,
  fadeOpacity,
}) => {
  return (
    <>
      {colorScale.domain().map((domainValue, index) => {
        return (
          <g
            className="tick"
            transform={`translate(0, ${index * tickSpacing})`}
            key={index}
            onMouseEnter={() => onHover(domainValue)}
            onMouseLeave={() => onHover(null)}
            opacity={
              hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1
            }
          >
            <circle fill={colorScale(domainValue)} r={tickSize} />
            <text dy="0.32em" x={tickTextOffset}>
              {domainValue}
            </text>
          </g>
        );
      })}
    </>
  );
};

export default ColorLegend;
