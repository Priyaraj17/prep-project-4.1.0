import React, { useState, useEffect } from "react";
import TripHeader from "./TripHeader";
import TripNavBar from "./TripNavbar";


export const CityContext = React.createContext();

const TripPlannerPage = (props) => {
  const [cities, setCities] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    cities.map((obj) => {
      console.log(obj);
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          obj.city.name +
          "&units=metric" +
          "&appid=" +
          process.env.REACT_APP_APIKEY
      )
        .then((res) => res.json())
        .then(
          (result) => {
            if (result["cod"] !== 200) {
              setIsLoaded(false);
            } else {
              setIsLoaded(true);
              if (obj.type == "from") {
                results.splice(0, 0, result);
              } else {
                results.splice(1, 0, result);
              }
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    });
  }, [cities]);

  return (
    <>
      <CityContext.Provider value={[results, setResults, cities, setCities]}>
        {console.log(results)}
        <TripHeader>
          <TripNavBar />
        </TripHeader>
      </CityContext.Provider>
      {/* <PlacesNearby city={city} setCity={onChangeCity} /> */}
    </>
  );
};

export default TripPlannerPage;
