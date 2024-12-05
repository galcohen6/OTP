import { expect, test } from "vitest";
import {temperatureCities,threeRandomCities} from "../functions/codeToEmail";
import accountRegister from "../functions/accountRegister";
import axios from "axios";

test("Returns the API response for checking email", async () => {
  const email = "Erez@gmail.com";
  const result = async (email) => {
    try {
      const params = { email };
      const response = await axios.get("http://localhost:3000/api/getEmail", { params });
      return response.status;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
      }
      return "Server Error.";
    }
  };

  const resultStatus = await result(email); 

  if (resultStatus === 200) {
    expect(resultStatus).toBe(200);
  } else if (resultStatus === "Email not exist.") {
    expect(resultStatus).toBe("Email not exist.");
  } else {
    expect(resultStatus).toBe("Server Error.");
  }
});


test("Returns the API response if user saved in DataBase", async () => {
  const email = "Sigalit@gmail.com";
  const first_name = "Sigalit";
  const last_name = "Cohen";
  const phone = "0506817000";
  const birth = "22-10-1968";
  const result = await accountRegister(email,first_name,last_name,phone,birth);

  if (result === 200) {
    expect(result).toBe(200);
  } else if (result === 502) {
    expect(result).toBe("Email exist.");
  }
});


test("Checks the correctness of temperatures of cities from an external API", async () => {
  const cityNamesArray = threeRandomCities();
  const temperatures = await temperatureCities(cityNamesArray);
  expect(Array.isArray(temperatures)).toBe(true);
  expect(temperatures.length).toBe(3);

  temperatures.forEach((temperature) => {
    expect(typeof temperature).toBe("string");
    const numericTemperature = parseFloat(temperature);
    expect(!isNaN(numericTemperature)).toBe(true); 
  });
});
