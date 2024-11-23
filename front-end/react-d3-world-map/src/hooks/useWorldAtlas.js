import { useEffect, useState } from "react";
import * as d3 from "d3";
import { feature, mesh } from "topojson";

const useWorldAtlas = (URL) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchedData = () => {
      d3.json(URL).then((data) => {
        const { countries, land } = data.objects;
        setData({
          countries: feature(data, countries),
          land: feature(data, land),
          interiors: mesh(data, countries, (a, b) => a !== b),
        });
      });
    };
    fetchedData();
  }, [URL]);
  return data;
};
export default useWorldAtlas;
