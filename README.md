# README - OTP Generation and Verification System
<br>

**Project Overview:**
<br>
This project provides a backend API using Node.js and a frontend client application using React to implement a secure OTP (One-Time Password) generation and verification system. <br>
The system uses random weather data from an external API to create OTP codes and sends them to users via email.<br>
It includes database integration to store and manage user data.

<br>

## **Features**

**Email-based authentication:**
Sends a unique OTP to a registered email address using an EmailJS.

**City temperature-based OTP:**
The OTP is generated from temperatures of three random cities, ensuring randomness and uniqueness.
<br>
*Example OTP:* London: 07°C, Jerusalem: 12°C, Bangkok: 33°C → OTP: "071233".

**Time-limited OTP:**
The OTP is valid for 5 minutes from the time of generation.

**User registration:**
If a user is not registered, he can register by providing his details.<br>
The registration data is stored securely in the database.<br>
After registration, the user can proceed with OTP-based authentication.

 <br>
 
### Backend:
Node.js with Express for API creation.<br>
emailjs for sending emails.<br>
Weather API for fetching city temperatures. <br>
Database: SQL Server.

### Frontend:
React.js for creating a dynamic user interface.<br>
React Router for navigation between registration and OTP verification pages.

<br>


## **Click to view:** 😊  
<br>
https://www.loom.com/share/b52b42873a5142eb8c7d5c41ecd1af02?sid=12449ed7-dffd-4522-892f-f1a34fb10b0c
