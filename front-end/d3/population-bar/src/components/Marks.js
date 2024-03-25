const Marks = ({ data, yScale, xScale, xValue, yValue, toolTipFormat }) => {
  return (
    <>
      {data.map((d, index) => (
        <rect
          className="mark"
          key={index}
          x={0}
          y={yScale(yValue(d))}
          width={xScale(xValue(d))}
          height={yScale.bandwidth()}
        >
          <title>{toolTipFormat(xValue(d))}</title>
        </rect>
      ))}
    </>
  );
};

export default Marks;
