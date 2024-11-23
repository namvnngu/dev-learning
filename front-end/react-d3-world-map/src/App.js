import "./App.css";
import Marks from "./components/Marks";
import useCities from "./hooks/useCitites";
import useWorldAtlas from "./hooks/useWorldAtlas";
import * as d3 from "d3";

const URL_WORLDATLAS = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
const URL_CITIES =
  "https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv";

const width = window.innerWidth;
const height = window.innerHeight;
const maxRadius = 15;

function App() {
  const worldAtlas = useWorldAtlas(URL_WORLDATLAS);
  const cities = useCities(URL_CITIES);

  const sizeValue = (d) => d.population;

  if (!worldAtlas || !cities) {
    return <pre>Loadding...</pre>;
  }

  const sizeScale = d3.scaleSqrt()
    .domain([0, d3.max(cities, sizeValue)])
    .range([0, maxRadius]);

  return (
    <svg width={width} height={height}>
      <Marks
        worldAtlas={worldAtlas}
        citites={cities}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  );
}

export default App;
