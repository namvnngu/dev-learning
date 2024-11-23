const Marks = ({
  data,
  yScale,
  xScale,
  toolTipFormat,
  innerHeight,
}) => {
  return (
    <>
      {data.map((d, index) => (
        <rect
          key={index}
          x={xScale(d.x0)}
          y={yScale(d.y)}
          width={xScale(d.x1) - xScale(d.x0)}
          height={innerHeight - yScale(d.y)}
          className="mark"
        >
          <title>{toolTipFormat(d)}</title>
        </rect>
      ))}
    </>
  );
};

export default Marks;
