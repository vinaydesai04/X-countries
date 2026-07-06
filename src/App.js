import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data on initial render
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        // Strict Requirement: Error handling by logging to the console
        console.error("Error fetching data: ", error);
      }
    };

    fetchCountries();
  }, []);

  // Filter countries based on search term (case-insensitive)
  const filteredCountries = countries.filter((country) => {
    // Fallback in case the API structure uses .common or .name
    const countryName = country.common || country.name || ""; 
    return countryName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="App">
      <div className="header">
        {/* Strict Requirement: input element with type="text" */}
        <input
          type="text"
          placeholder="Search for countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="flags-container">
        {filteredCountries.map((country, index) => {
          const countryName = country.common || country.name;
          const flagUrl = country.png || country.flag;

          return (
            /* Strict Requirement: Class name MUST be exactly "countryCard" */
            <div className="countryCard" key={country.abbr || index}>
              {/* Strict Requirement: Use only <img> element for the flag */}
              <img src={flagUrl} alt={`Flag of ${countryName}`} />
              <h2>{countryName}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;