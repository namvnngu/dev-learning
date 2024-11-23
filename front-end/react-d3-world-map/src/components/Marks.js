import * as d3 from "d3";
const projection = d3.geoNaturalEarth1();
const path = d3.geoPath(projection);
const graticule = d3.geoGraticule();

const Marks = ({
  worldAtlas: { countries, interiors, land },
  citites,
  sizeScale,
  sizeValue,
}) => {
  return (
    <g className="marks">
      <path className="sphere" d={path({ type: "Sphere" })} />
      <path className="gradicules" d={path(graticule())} />
      {/* {countries.features.map((feature, index) => (
        <path className="countries" key={index} d={path(feature)} />
      ))} */}
      {land.features.map((feature, index) => (
        <path className="land" key={index} d={path(feature)} />
      ))}
      <path className="interiors" d={path(interiors)} />
      {citites.map((d, index) => {
        const [x, y] = projection([d.lng, d.lat]);
        return <circle key={index} cx={x} cy={y} r={sizeScale(sizeValue(d))} />;
      })}
    </g>
  );
};

export default Marks;
