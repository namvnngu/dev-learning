import { useEffect, useState } from "react";
import * as d3 from 'd3'

const row = d => {
  d.lat = +d.lat;
  d.lng = +d.lng;
  d.population = +d.population;
  return d;
}
const useCities = (URL) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchedData = () => {
      d3.csv(URL, row).then(setData);
    };
    fetchedData();
  }, [URL]);
  return data;
};

export default useCities;
