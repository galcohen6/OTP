  
  
  export const threeRandomCities = () => {
    const citiesArray = [];
    while (citiesArray.length < 3) {
      const randomIndex = Math.floor(Math.random() * cities.length);
      const randomCity = cities[randomIndex];
      if (!citiesArray.includes(randomCity)) {
        citiesArray.push(randomCity);
      }
    }
    return citiesArray;
  };
  
  export const temperatureCities = async (arayRandomCities) => {
    const temperatureArray = [];
    console.log(import.meta.env.VITE_APIKEY);
  
    await Promise.all(
      arayRandomCities.map(async (cityName) => {
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=8930e9bd5eed4bfc862102126242911&q=${cityName}`;
        console.log(`Fetching data for: ${cityName}`);
  
        try {
          const response = await fetch(apiUrl, { method: "GET" });
  
          if (!response.ok) {
            throw new Error(`Failed to fetch data for ${cityName}: ${response.status}`);
          }
  
          const data = await response.json();

          if (data && data.current && data.current.temp_c !== undefined) {
            let temperature = data.current.temp_c;
            temperature = Math.abs(temperature).toString(); 
  
            if (temperature < 10 && temperature >= 0) {
              temperature = "0" + temperature;
            }
  
            temperature = temperature.substring(0, 2);
  
            temperatureArray.push(temperature);
          } else {
            console.error(`Data for ${cityName} does not have the expected structure.`);
            temperatureArray.push("NA");
          }
        } catch (error) {
          console.error("Error fetching temperature:", error);
          temperatureArray.push("NA");
        }
      })
    );
    return temperatureArray;
  };
  
  export const generateOTP = (temperatures) => {
    const codeOTP = temperatures.reduce((acc, curr) => {
      if (typeof curr === "string") {
        acc += curr.substring(0, 2);
      }
      return acc;
    }, "");
    return codeOTP;
  };
  
  export const generateOTPFromCities = async () => {
    const randomCities = threeRandomCities();
    const temperatureInCities= await temperatureCities(randomCities);
    const otpCode = generateOTP(temperatureInCities);
  
    return otpCode;
  };
  
  
  const cities = [
    "New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio",
    "San Diego","Dallas","San Jose","Austin","Jacksonville","San Francisco","Columbus",
    "Fort Worth","Indianapolis","Charlotte","Seattle","Denver","Washington",
  ];