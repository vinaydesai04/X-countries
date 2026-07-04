
import React, { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://xcountries-backend.labs.crio.do/all"
        );
        const data = await response.json();
        setCountries(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <h1>XCountries Flags</h1>
        <p>Loading countries...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>XCountries Flags</h1>
      <div className="flags-container">
        {countries.map((country) => (
          <div key={country.code} className="flag-card">
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              className="flag-image"
            />
            <p className="country-name">{country.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;