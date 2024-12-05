README - OTP Generation and Verification System


Project Overview:
This project provides a backend API using Node.js and a frontend client application using React to implement a secure OTP (One-Time Password) generation and verification system. The system uses random weather data from an external API to create OTP codes and sends them to users via email. It includes database integration to store and manage user data.

Features

Email-based authentication: Sends a unique OTP to a registered email address using an EmailJS.

City temperature-based OTP: The OTP is generated from temperatures of three random cities, ensuring randomness and uniqueness.
Example OTP: London: 07°C, Jerusalem: 12°C, Bangkok: 33°C → OTP: "071233".

Time-limited OTP: The OTP is valid for 5 minutes from the time of generation.

User registration:
If a user is not registered, he can register by providing his details.
The registration data is stored securely in the database.

After registration, the user can proceed with OTP-based authentication.

Backend:
Node.js with Express for API creation.
emailjs for sending emails.
Weather API for fetching city temperatures.
Database: SQL Server.
Frontend:
React.js for creating a dynamic user interface.
React Router for navigation between registration and OTP verification pages.


Click to view:
https://www.loom.com/share/b52b42873a5142eb8c7d5c41ecd1af02?sid=12449ed7-dffd-4522-892f-f1a34fb10b0c
