import React, { useState, useEffect, useRef } from "react";
import { generateOTPFromCities } from "./functions/codeToEmail";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import axios from "axios";
import "./sendOTPemail.css";

const SendOTPemail = () => {
  const [email, setUserEmail] = useState("");
  const [inputCode, setInputCode] = useState("");
  const emailInputRef = useRef();
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeExpired, setIsCodeExpired] = useState(false);
  const [timerActive, setIsTimerActive] = useState(false);
  const [CODE, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false); 

  const sendCodeToEmail = async () => {
    const newCode = await generateOTPFromCities();
    console.log(newCode);
    setCode(newCode);

    try {
      emailjs.init(import.meta.env.VITE_EMAILKEY);
      await emailjs.send("service_b4egi1g", "template_9c5junn", {
        to_name: email,
        from_name: "Gal cohen",
        message: newCode,
      });

      setIsCodeExpired(false);
      setIsTimerActive(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    if (emailInputRef.current.value.trim() !== "") {
      setUserEmail(emailInputRef.current.value.trim());
      const answer = await getEmailInServer(emailInputRef.current.value.trim());

      if (answer === 200) {
        sendCodeToEmail();
        setIsCodeSent(true);
      } else {
        alert("You are not registered in the system, please register and try again.");
      }
    }
  };

  useEffect(() => {
    const startCodeTimeout = () => {
      setTimeout(() => {
        setIsCodeExpired(true);
        setIsTimerActive(false);
      }, 60 * 1000 * 5); 
    };
  
    if (isCodeSent) {
      startCodeTimeout();
    }
  
    return () => clearTimeout();
  }, [isCodeSent]);


  const getEmailInServer = async (email) => {
    try {
      const params = {
        email: email,
      };
      const response = await axios.get("http://localhost:3000/api/getEmail", {
        params,
      });
      return response.status;
    } catch (error) {
      return error.response.data.message;
    }
  };


  const sendAgain = () => {
    sendCodeToEmail();
  };

  const handleCheckCode = () => {
    if (inputCode === CODE && !isCodeExpired) {
      setIsVerified(true);
    } else {
      alert("The code is invalid, please try again.");
    }
  };
  


  return (
    <div className="containerForm">
      <div className="form-section">
        {isVerified ? (
           <form className="registerForm">
                   <p className="formTitle">SUCCESS!</p>
           </form>
        ) : (
          <form className="registerForm" onSubmit={handleSubmitEmail}>
            {!isCodeSent && (
              <>
                <p className="formTitle">Sign in with verification code</p>
                <input
                  className="formInput"
                  ref={emailInputRef}
                  type="email"
                  placeholder="Enter email to verify"
                  value={email}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <button className="formButton" type="submit">
                  Submit code
                </button>

                <p>
                  New user? <Link to="/register"> Register here</Link>
                </p>
              </>
            )}

            {isCodeSent && !isCodeExpired && (
              <>
                <h2 className="formTitle">Sign in with an OTP code</h2>
                <p>Sent code to email: {email}</p>
                <input
                  className="formInput"
                  type="text"
                  placeholder="Enter a code"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                />
                <button className="formButton" onClick={handleCheckCode}>
                  Verify
                </button>
              </>
            )}

            {isCodeExpired && isCodeSent && (
              <>
                <p>The code has expired.</p>
                <button className="formButton" onClick={sendAgain
}>
                Send again
                </button>
              </>
            )}
          </form>
        )}
      </div>
      <div className="divider"></div>
      <img src="bg-right.png" alt="placeholder" />
    </div>
  );
};

export default SendOTPemail;

