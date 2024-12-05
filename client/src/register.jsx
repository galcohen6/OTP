import { Link,useNavigate } from "react-router-dom";
import React, { useState } from "react";
import accountRegister from "./functions/accountRegister";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birth, setBirth] = useState("");
  const [phoneUser, setPhone] = useState("");
  const [emailUser, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    accountRegister(emailUser, firstName, lastName, phoneUser, birth,setError,navigate);
  };

  const handleDateChange = (date) => {
    setBirth(date);
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      setBirth(formattedDate);
    } else {
      setBirth(""); 
    }
  };

  return (
    <div className="containerForm">
      <div className="form-section">
      <form className="registerForm" onSubmit={handleSubmit}>
        <p className="formTitle">Register </p>
        <label>
          <input
            className="formInput"
            value={firstName}
            placeholder="First Name"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label>
          <input
            className="formInput"
            value={lastName}
            placeholder="Last Name"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label>
        <DatePicker
          selected={birth ? new Date(birth) : null}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Date of birth"
          maxDate={new Date()} 
          showMonthDropdown 
          showYearDropdown 
          dropdownMode="select" 
        />
      </label>

        <label>
          <input
            className="formInput"
            value={phoneUser}
            placeholder="Phone"
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

      
        <label>
          <input
            className="formInput"
            value={emailUser}
            placeholder="Email"
            type="email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </label>

        <button type="submit" className="formButton">
          Submit
        </button>
        <p>
        Have you connected before? <Link to="/">Signin</Link>
        </p>
      </form>
      </div>
      <div className="divider"></div>
      <img src="bg-right.png" alt="placeholder" />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Register;