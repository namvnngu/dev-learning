const Marks = ({
  data,
  yScale,
  xScale,
  colorScale,
  xValue,
  yValue,
  colorValue,
  toolTipFormat,
  circleRadius,
}) => {
  return (
    <>
      {data.map((d, index) => (
        <circle
          className="mark"
          key={index}
          cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          fill={colorScale(colorValue(d))}
          r={circleRadius}
        >
          <title>{toolTipFormat(xValue(d))}</title>
        </circle>
      ))}
    </>
  );
};

export default Marks;
