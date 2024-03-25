import { useEffect, useState } from "react";
import * as d3 from "d3";

const useData = (URL) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchedData = async () => {
      const row = (d) => {
        d.sepal_length = +d.sepal_length;
        d.sepal_width = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width = +d.petal_width;
        return d;
      };

      const data = await d3.csv(URL, row);
      setData(data);
      console.log(d3.csvFormat(data).length / 1024 + " kB");
      console.log(data.length + " rows");
      console.log(data.columns.length + " columns");
    };
    fetchedData();
  }, [URL]);
  return data;
};
export default useData;
